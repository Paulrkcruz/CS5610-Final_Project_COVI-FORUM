// https://medium.com/swlh/how-to-create-your-first-mern-mongodb-express-js-react-js-and-node-js-stack-7e8b20463e66
// Used above tutorial

const MongoClient = require("mongodb").MongoClient;
const config = require("./config");
//mongodb
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

      console.log("Successfully connected to mongo client!");
      resolve(currentMongo);
    });
  });
};

// Initialize database
const initConnection = () => {
  return new Promise((resolve) => {
    // Get uri from the config
    const uri = config.mongo.uri;
    // connect to our forum DB
    mongoDb(uri, "forum").then((db) => {
      database = db;
      // Resolve the connection
      resolve();
    });
  });
};

// Return the database
// This will be used in the controllers
const getDatabase = () => {
  return database;
};

// Export the init and the database connection
module.exports = { initConnection, getDatabase };
