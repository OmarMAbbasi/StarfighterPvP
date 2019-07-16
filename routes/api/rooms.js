const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    let gameId = Math.random().toString(36).substring(5);
    console.log(gameId);
    res.json({gameId});
});


module.exports = router;