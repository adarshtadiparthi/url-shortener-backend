const express = require("express");
const { createLink, getLinks, redirect } = require("../controllers/linkController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createLink);     // create new short link
router.get("/", auth, getLinks);        // get logged-in user's links

module.exports = router;
