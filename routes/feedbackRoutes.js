const express = require("express");

const {
    createFeedback
} = require("../controllers/feedbackController");

const router = express.Router();

router.post("/:id/feedbacks", createFeedback);

module.exports = router;