const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    let gameId = Math.random().toString(36).substring(5);
    res.json({gameId});
});


module.exports = router;