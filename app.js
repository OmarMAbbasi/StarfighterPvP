const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
<<<<<<< HEAD
// const players = require("./models/player");
=======
// const player = require("./models/player");
>>>>>>> a90e53c9ee637a61a54b92a54af82c6488693975

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch(err => console.log(err));

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Sup Dawg");
});

const players = require("./routes/api/players");
app.use("/api/players", players);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	app.get("/", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
}