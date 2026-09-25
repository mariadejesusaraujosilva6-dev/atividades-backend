const express = require("express");

const {
    createTechnology,
    getAllTechnologies,
    addTechnologyToProject
} = require("../controllers/technologyController");

const router = express.Router();

router.post("/", createTechnology);

router.get("/", getAllTechnologies);

module.exports = router;