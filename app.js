const express = require("express");

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const app = express();
const http = require("http");
const serv = http.Server(app);

const path = require("path");

const bodyParser = require("body-parser");

const player = require("./models/player");

const io = (module.exports.io = require("socket.io")(serv));
const SocketManager = require("./src/SocketManager");

if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	app.get("/", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
}

let ROOM_SOCKET_LIST = {};

io.on("connection", SocketManager);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	app.get("/", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
}

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

const PORT = process.env.PORT || 5000;

serv.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
