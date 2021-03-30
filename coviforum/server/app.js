const expressServer = require("./server");
const config = require("./configs/config");
const mongoClient = require("./configs/mongoClient");
// Connect to Mongo DB Server
let server;
mongoClient.initConnection().then(() => {
  server = expressServer.listen(config.port, () => {
    console.info(`Listening to port ${config.port}`);
  });
});
// Error handling
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
