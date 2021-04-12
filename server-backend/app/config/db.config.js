module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "RyanCruz#3",
  DB: "coviforum_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};