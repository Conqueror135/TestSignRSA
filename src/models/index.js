const { MongoClient } = require("mongodb");

require('dotenv').config()
const client = new MongoClient(
  process.env.URL_CONNECT_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
client.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(-1);
  } else {
    console.log("Connected database!");
  }
});
module.exports = client;
