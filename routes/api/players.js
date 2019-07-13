const express = require("express");
const router = express.Router();

router.get("/highscores", (req, res) => res.json({ msg: "This is the highscores route" }));

module.exports = router;
