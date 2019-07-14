const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.json({ msg: "This is the GET player route" }));
router.post("/", (req, res) => res.json({ msg: "This is POST player route" }));
router.delete("/", (req, res) => res.json({ msg: "This is DELETE player route" }));

module.exports = router;