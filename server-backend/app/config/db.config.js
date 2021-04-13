module.exports = {
  HOST: "us-cdbr-east-03.cleardb.com",
  USER: "b433a5a4586959",
  PASSWORD: "afead08f",
  DB: "heroku_d12c9954cf94e81",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};