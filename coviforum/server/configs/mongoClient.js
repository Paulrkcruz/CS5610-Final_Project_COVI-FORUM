const MongoClient = require("mongodb").MongoClient;
const config = require("./config");
// Setup MongoDB

// Terminal Error
let database;

const mongoDb = (uri, dbName) => {
  const currentMongo = {};
// Set options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
// Start Client
  currentMongo.client = new MongoClient(uri, options);
  return new Promise((resolve) => {
    currentMongo.client.connect((err) => {
      if (err) throw err;
      currentMongo.connection = currentMongo.client.db(dbName);

      console.log("Successfully connected to Mongo DB.");
      resolve(currentMongo);
    });
  });
};
// Initialize
// This will be called before we start listening to express server
const initConnection = () => {
  return new Promise((resolve) => {
    const uri = config.mongo.uri;
    // connect to our forum DB
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
