const express = require("express");
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const app = express();
const bodyParser = require('body-parser');
const Score = require('./models/player');

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));


app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    const highscore = new Score({
        tag: 'Sam',
        highscore: 1000,
    })
    highscore.save();
    res.send("Sup Dawg");
});

const scores = require("./routes/api/scores");
app.use('/api/scores', scores)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
