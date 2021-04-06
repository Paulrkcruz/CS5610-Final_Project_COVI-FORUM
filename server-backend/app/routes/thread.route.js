const express = require("express");
const threadController = require("../controller/thread.controller");
const locationController = require("../controller/location.controller");
const Thread = require("../models/thread");
const Post = require("../models/post");
const router = express.Router();
const helper = require("./helper");

const addThread = async (req, res) => {
    if (req && req.body) {
        if (
            !req.body.userId ||
            (req.body.userId && req.body.userId.length !== 36)
        ) {
            return res.status(400).send("UserId is not valid"); //
            } else {
            const idExists = await helper.doesUserExistByUserId(req.body.userId);
            if (!idExists) {
                return res.status(400).send("UserId is not valid"); //
            }
        }

        let tags = [];
        if (req.body.tags) {
            try {
                tags = JSON.parse(req.body.tags);
            } catch (error) {
                console.error("Failed to parse tags", req.body.tags);
            }
        }

        const thread = new Thread(req.body.subject, req.body.userId, tags);
        const post = new Post(thread.id, req.body.message || "", req.body.userId);
        thread.posts.push(post);

        threadController
            .addThread(thread)
            .then((thread) => {
                res.json(thread);
            })
            .catch((err) => {
                res.status(500); // 500 Internal Server Error
                res.json({
                    "status-code": 500,
                    message: err || "New Thread not added. Try again!",
                });
            });
    } else {
        // No form data found
        res.status(500);
        res.json({
            "status-code": 500,
            message: err || "New Thread not added. Try again!",
        });
    }
};

const getAllThreads = (req, res) => {
    // read entire table
    threadController
        .readThreads()
        .then((threads) => {
            res.json(threads);
        })
        .catch((err) => {
            // Database call failed return 500 error
            res.status(500); // 500 Internal Server Error
            res.json({
                "status-code": 500,
                message: err || "New Thread not added. Try again!",
            });
        });
};
// get thread
const getOneThread = async (req, res) => {
    const id = req.query.id;

    if (!id || id.length !== 36) {
        return res.status(400).send("Invalid User ID");
    } else {
        const idExists = await helper.doesThreadExistByThreadId(id);
        if (!idExists) {
            return res.status(400).send("Invalid User ID");
        }
    }
    // read threads
    threadController
        .readThread(id)
        .then((thread) => {
            res.json(thread);
        })
        .catch((err) => {
            res.status(500);
            res.json({
                "status-code": 500,
                message: err || "Request Failed. Please try again.",
            });
        });
};

const addPost = async (req, res) => {
    if (req && req.body) {
        // Validate inputs
        if (
            !req.body.userId ||
            (req.body.userId && req.body.userId.length !== 36)
        ) {
            return res.status(400).send("Invalid User ID");
        } else {
            const idExists = await helper.doesUserExistByUserId(req.body.userId);
            if (!idExists) {
                return res.status(400).send("Invalid User ID");
            }
        }

        if (
            !req.body.threadId ||
            (req.body.userId && req.body.userId.length !== 36)
        ) {
            return res.status(400).send("Invalid User ID");
        } else {
            const idExists = await helper.doesThreadExistByThreadId(
                req.body.threadId
            );
            if (!idExists) {
                return res.status(400).send("Invalid ID");       }
        }

        if (req.body.location) {
            try {
                const location = JSON.parse(req.body.location);
                if (location && location.long && location.lat) {
                    await locationController.addLocation(location.long, location.lat);
                }
            } catch (error) {
                console.error("Location Invalid!");
            }
        }

        // Post in boards
        const post = new Post(
            req.body.threadId,
            req.body.message || "",
            req.body.userId
        );

        // Add a User
        threadController
            .addPost(post)
            .then((post) => {
                res.json(post);
            })
            .catch((err) => {
                res.status(500);
                res.json({
                    "status-code": 500,
                    message: err || "Post Error. Please try again",
                });
            });
    } else {

        res.status(500);
        res.json({
            "status-code": 500,
            message: "Request invalid. Please try again.",
        });
    }
};

const searchInThreads = async (req, res) => {
    const searchTerm = req.query.searchTerm;

    if (!searchTerm) {
        return res.status(400).send("Invalid ID");
    }

    threadController
        .searchThread(searchTerm)
        .then((thread) => {
            res.json(thread);
        })
        .catch((err) => {
            res.status(500);
            res.json({
                "status-code": 500,
                message: err || "Request Failed.",
            });
        });
};

// Routes
router.post("/add", addThread);
router.post("/add-post", addPost);
router.get("/all", getAllThreads);
router.get("/one", getOneThread);
router.get("/search", searchInThreads);
module.exports = router;