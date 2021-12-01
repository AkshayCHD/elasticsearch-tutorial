const express = require("express");
const cors = require("cors");
var elasticsearch = require("elasticsearch");

const app = express();
var client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "trace",
  apiVersion: "7.2", // use the same version of your Elasticsearch instance
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

app.listen(3030, () => {
  console.log("Server started on port 3000");
});
