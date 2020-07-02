const { MongoClient } = require("mongodb");

const localMongoURL = "mongodb://localhost:27017";
const databaseName = "gemp";

var db;

const client = new MongoClient(localMongoURL, { useUnifiedTopology: true });

const connect = (callback) => {
  client.connect((error) => {
    if (!error) {
      db = client.db(databaseName);
    }
    callback(error);
  });
};

const getDatabase = () => {
  return db;
};

const getClient = () => {
  return client;
};

module.exports = {
  connect,
  getDatabase,
  getClient,
};
