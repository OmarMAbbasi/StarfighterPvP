const express = require("express");
const router = express.Router();

router.get("/highscores", (req, res) => res.json({ msg: "This is the high score route" }));

module.exports = router;
