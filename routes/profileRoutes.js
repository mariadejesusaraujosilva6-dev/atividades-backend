const express = require("express");

const {
    createProfile,
    getProfileById
} = require("../controllers/profileController");

const router = express.Router();

router.post("/", createProfile);
router.get("/:id", getProfileById);

module.exports = router;
