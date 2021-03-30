// Setup environment for Express Server
const fs = require("fs");
let environment =
  process.argv.indexOf("-environment") === -1
    ? process.environment["ENV"] || "localhost"
    : process.argv[process.argv.indexOf("-environment") + 1];

// read config file when developing
let configJson = {};
if (environment === "localhost") {
  try {
    // Get current folder
    configJson = JSON.parse(
      fs.readFileSync(__dirname + "/config.json").toString()
    );
  } catch (err) {
    console.warn("No config.json exists.");
  }
} else {
  let port =
    process.argv.indexOf("-port") === -1
      ? process.environment["PORT"] || "3000"
      : process.argv[process.argv.indexOf("-port") + 1];
  let uri =
    process.argv.indexOf("-uri") === -1
      ? process.environment["URI"] || ""
      : process.argv[process.argv.indexOf("-uri") + 1];

  configJson[environment] = {
    port,
    mongo: {
      uri,
    },
  };
}
// Setup configuration environment
let environmentConfig = configJson[environment] || {};
environmentConfig["environment"] = environment;
module.exports = environmentConfig;
