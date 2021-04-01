module.exports = {
  HOST: "localhost:3306",
  USER: "root",
  PASSWORD: "RyanCruz#3",
  DB: "cs5610server",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
