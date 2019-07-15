const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Player = require('../../models/player');

router.get('/', (req, res) => {
    Player.find()
        .sort({ score: 1 })
        .then(players => res.json(players))
});

router.post('/', (req, res) => {
    const newPlayer = new Player({
        tag: req.body.tag,
        score: req.body.score
    });

    newPlayer.save().then(player => res.json(player));
});

// router.get("/", (req, res) => res.json({ msg: "This is the GET player route" }));
// router.post("/", (req, res) => res.json({ msg: "This is POST player route" }));
// router.delete("/", (req, res) => res.json({ msg: "This is DELETE player route" }));

module.exports = router;