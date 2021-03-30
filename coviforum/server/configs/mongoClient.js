const MongoClient = require("mongodb").MongoClient;
const config = require("./configs");
// Setup Mongo db
let database;
const mongoDb = (uri, dbName) => {
  const currentMongo = {};
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  currentMongo.client = new MongoClient(uri, options);
  return new Promise((resolve) => {
    currentMongo.client.connect((err) => {
      if (err) throw err;
      currentMongo.connection = currentMongo.client.db(dbName);
      console.log("> Mongo db connected.");
      resolve(currentMongo);
    });
  });
};
// Connect to mongo db
const initConnection = () => {
  return new Promise((resolve) => {
    const uri = config.mongo.uri;
    mongoDb(uri, "coviforum").then((db) => {
      database = db;
      resolve();
    });
  });
};
const getDatabase = () => {
  return database;
};
module.exports = { initConnection, getDatabase };
