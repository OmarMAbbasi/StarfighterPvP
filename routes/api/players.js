const express = require("express");
const router = express.Router();

router.get("/scores", (req, res) => res.json({ msg: "This is the GET score route" }));
router.post("/scores", (req, res) => res.json({ msg: "This is POST score route" }));


module.exports = router;