// Message Board Controller
// Setup models, config for MongoDB
const Board = require("../models/board");
const mongoClient = require("../configs/mongoClient");
const readBoards = (searchTerm) => {
  return new Promise((resolve, reject) => {
//SOURCE: https://css-tricks.com/build-a-chat-app-using-react-hooks-in-100-lines-of-code/
// The above source helped structure the board controller
// Create query
    const query = [
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          count: {
            $cond: {
              if: { $isArray: "$msgs" },
              then: { $size: "$msgs" },
              else: "NA",
            },
          },
          msg: { $arrayElemAt: ["$msgs", 0] },
          user: {
            name: 1,
            id: 1,
          },
          subject: 1,
          created: 1,
          active: 1,
          userId: 1,
          id: 1,
          tags: 1,
          _id: 0,
        },
      },
    ];

    if (searchTerm) {
      query.unshift({ $match: { $text: { $search: searchTerm } } });
    }
    // Sort in reverse order
    mongoClient
      .getDatabase()
      .connection.collection("board")
      .aggregate(query)
      .sort({ created: -1 })
      .toArray((err, docs) => {
        if (err) {
          console.error("ERROR: Failed to read board data from MongoDB", err);
          reject("ERROR: Failed to read board data from MongoDB. Please refresh your browser");
        } else {
          resolve(docs);
        }
      });
  });
};
// MongoDB
// Merge collections: https://www.pluralsight.com/guides/merge-properties-of-array-elements-with-reactjs
const readBoard = (id) => {
  return new Promise((resolve, reject) => {
       mongoClient
      .getDatabase()
      .connection.collection("board")
      .aggregate([
        { $match: { id: id } },
        {
          $lookup: {
            from: "user",
            localField: "userId",
            foreignField: "id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 0,
            userId: 0,
            user: {
              _id: 0,
              active: 0,
              hashed_password: 0,
              updated: 0,
              email: 0,
            },
            "msgs.boardId": 0,
            "msgs.id": 0,
          },
        },
        {
          $unwind: "$msgs",
        },
        {
          $lookup: {
            from: "user",
            localField: "msgs.userId",
            foreignField: "id",
            as: "msgs.user",
          },
        },
        {
          $project: {
            "msgs.user": {
              _id: 0,
              active: 0,
              hashed_password: 0,
              updated: 0,
              email: 0,
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            root: { $mergeObjects: "$$ROOT" },
            msgs: { $push: "$msgs" },
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ["$root", "$$ROOT"],
            },
          },
        },
        {
          $project: {
            root: 0,
            "msgs.userId": 0,
            _id: 0,
          },
        },
      ])
      .toArray((err, docs) => {
        if (err) {
          console.error("ERROR: Failed to read board data from MongoDB", err);
          reject("ERROR: Failed to read board data from MongoDB. Please refresh your browser");
        } else {
          resolve(docs);
        }
      });
  });
};

const addBoard = (board) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("board")
      .insertOne(board)
      .then((result, err) => {
        if (err) {
            console.error("ERROR: Failed to read board data from MongoDB", err);
            reject("ERROR: Failed to read board data from MongoDB. Please refresh your browser");
        } else {
          if (result.ops && result.ops.length && result.ops.length > 0) {
            const board = Board.from(result.ops[0]);
            resolve(board);
          } else {
            resolve(undefined);
          }
        }
      });
  });
};

const addMsg = (msg) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("board")
      .updateOne({ id: msg.boardId }, { $push: { msgs: msg } })
      .then((result, err) => {
        if (err) {
          console.error("ERROR: Failed to read board data from MongoDB. Please refresh your browser", err);
          reject("ERROR: Failed to read board data from MongoDB. Please refresh your browser");
        } else {
          if (result && result.result && result.result.ok > 0) {
            resolve(msg);
          } else {
            resolve(undefined);
          }
        }
      });
  });
};
// Check ID of Msg Board
// use Promise
const checkBoardID = (id) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("board")
      .find(id, {
        projection: { _id: 0, msgs: 0 },
      })
      .toArray((err, docs) => {
        if (err) {
          console.error("ERROR: Failed to read board data from MongoDB. Please refresh your browser", err);
          reject(err);
        } else {
          resolve(docs);
        }
      });
  });
};

const getAmountOfBoards = () => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("board")
      .countDocuments({})
      .then((count) => {
        resolve({ boardCount: count });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getAmountOfMsgs = () => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("board")
      .aggregate([
        {
          $project: {
            _id: 0,
            count: { $size: "$msgs" },
          },
        },
        {
          $group: {
            _id: "$_id",
            msgCount: { $sum: "$count" },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ])
      .toArray((err, docs) => {
        if (err) {
          console.error("ERROR: Failed to read Msg data from MongoDB. Please refresh your browser", err);
          reject("ERROR: Failed to read Msg data from MongoDB. Please refresh your browser");
        } else {
          if (docs && docs.length && docs.length > 0) {
            resolve(docs[0]);
          }
        }
      });
  });
};

const searchBoard = (term) => {
  return readBoards(term);
};
module.exports = {
  addBoard,
  readBoards,
  readBoard,
  addMsg,
  checkBoardID,
  searchBoard,
  getAmountOfMsgs,
  getAmountOfBoards,
};
