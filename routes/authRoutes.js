const express = require("express");
const { signup, signin, me } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", auth, me);

module.exports = router;
