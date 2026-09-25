const express = require("express");

const {
    createProject,
    getAllProjects,
    upvoteProject
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);

// Upvote de projeto
router.put("/:id/upvote", upvoteProject);

module.exports = router;