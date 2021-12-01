const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Review = require("./model/mReviewModel");
var elasticsearch = require("elasticsearch");

const app = express();
var client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace",
  apiVersion: "7.2", // use the same version of your Elasticsearch instance
});
const username = "root";
const password = "example";
const dbname = "mongo-elastic";

mongoose.connect(
  `mongodb://${username}:${password}@localhost:27017/${dbname}?authSource=admin&readPreference=primary`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", async function () {
  console.log("Connected successfully");
});

const parseElasticResponse = (elasticResponse) => {
  const responseHits = elasticResponse.hits.hits;
  const result = responseHits.map((hit) => hit._source);
  return result;
};

app.use(cors());
app.get("/elastic", async (req, res, next) => {
  try {
    const { text = "" } = req.query;
    const response = await client.search(
      {
        index: "zips",
        from: 0,
        body: {
          query: {
            multi_match: {
              query: text,
              fields: ["city", "state", "id"],
              type: "phrase_prefix"
            },
          },
        },
      },
      {
        ignore: [404],
        maxRetries: 3,
      }
    );
    res.json({
      message: "Searched Successfully",
      records: parseElasticResponse(response),
    });
  } catch (err) {
    next(err);
  }
});

app.get("/mongo", async (req, res, next) => {
  try {
    const { text } = req.query;
    console.log(text);
    if (!text) {
      res.json({
        message: "Searched Successfully",
        records: [],
      });
    }
    const regex = new RegExp(text);
    const response = await Review.find({
      $or: [{ name: regex }, { space: regex }, { description: regex }, { summary: regex }, { notes: regex }],
    }).limit(50).lean();
    console.log(response)
    res.json({
      message: "Searched Successfully",
      records: response,
    });
  } catch (err) {
    next(err);
  }
});

app.listen(3030, () => {
  console.log("Server started on port 3000");
});
