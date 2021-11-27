const mongoose = require("mongoose");
const fs = require("fs");
const Zip = require("./model/mZipModel");
const Tweet = require("./model/mTweetModel");
const username = "root";
const password = "example";
const dbname = "database";

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

  const jsonContent = fs.readFileSync(`${__dirname}/data.json`, "utf8");
  const dataset = JSON.parse(jsonContent).dataset;
  console.log(dataset);
  await Promise.all(
    dataset.map(async (data) => {
      await new Zip(data).save();
    })
  );
  console.log("Documents inserted successfully");
});

// db.once("open", async function () {
//   console.log("Connected successfully");
//   const twts = await Tweet.find().lean();
//   const json = {
//     dataset: twts,
//   };
//   fs.writeFileSync("./server/data.json", JSON.stringify(json));
//   console.log(twts);
//   console.log("Documents inserted successfully");
// });
