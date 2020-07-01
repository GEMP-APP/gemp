const { MongoClient } = require("mongodb");

const localMongoURL = "mongodb+srv://gemp:MONGODBgemp@cluster0.ybqqr.mongodb.net/GEMP-DB?retryWrites=true&w=majority";
const databaseName = "GEMP-DB";

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
