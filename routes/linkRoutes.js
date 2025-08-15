const express = require("express");
const { createLink, getLinks } = require("../controllers/linkController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createLink);
router.get("/", authMiddleware, getLinks);

module.exports = router;
