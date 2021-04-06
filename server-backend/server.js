const express = require("express"), cors = require('cors') , app = express(); app.options('*', cors());
const bodyParser = require("body-parser");
// const cors = require("cors");
// const app = express();
const controller = require("./app/controllers/boards.controller");

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Coviforum!" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/boards.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

// const run = async () => {
//   const tut1 = await controller.createBoards({
//     title: "Living with Covid after-effects",
//     description: "Life after the pandemic..",
//   });
//
//   const tut2 = await controller.createBoards({
//     title: "Covid-19 and the symptoms encountered by patients.",
//     description: "Discuss symptoms associated with Covid-19",
//   });
//
//   const comment1 = await controller.createComment(tut1.id, {
//     name: "John Ryan",
//     text: "Good job John!",
//   });
//
//   await controller.createComment(tut1.id, {
//     name: "Chi-h Ming Sun",
//     text: "Great board!",
//   });
//
//   const comment2 = await controller.createComment(tut2.id, {
//     name: "Ally Alpa",
//     text: "Hi, thank you for sharing your story!",
//   });
//
//   await controller.createComment(tut2.id, {
//     name: "ReactCoder",
//     text: "Very similiar symptoms",
//   });
//
//   const tut1Data = await controller.findBoardsById(tut1.id);
//   console.log(
//       ">> Boards id=" + tut1Data.id,
//       JSON.stringify(tut1Data, null, 2)
//   );
//
//   const tut2Data = await controller.findBoardsById(tut2.id);
//   console.log(
//       ">> Boards id=" + tut2Data.id,
//       JSON.stringify(tut2Data, null, 2)
//   );
//
//   const comment1Data = await controller.findCommentById(comment1.id);
//   console.log(
//       ">> Comment id=" + comment1.id,
//       JSON.stringify(comment1Data, null, 2)
//   );
//
//   const comment2Data = await controller.findCommentById(comment2.id);
//   console.log(
//       ">> Comment id=" + comment2.id,
//       JSON.stringify(comment2Data, null, 2)
//   );
//
//   const boards = await controller.findAll();
//   console.log(">> All boards", JSON.stringify(boards, null, 2));
// };
//
// // db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   run();
// });
