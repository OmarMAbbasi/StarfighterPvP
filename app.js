const express = require("express");

//! Off while dev websockets
// const mongoose = require("mongoose");
// const db = require("./config/keys").mongoURI;
const app = express();

const serv = require("http").Server(app);
const path = require("path");

const bodyParser = require("body-parser");

// const player = require("./models/player");

//websockets
// var serv = require("http").createServer();
var io = (module.exports.io = require("socket.io")(serv));
const SocketManager = require("./frontend/src/SocketManager.js");

io.on("connection", SocketManager);
//! Off while dev websockets
// mongoose
// 	.connect(db, { useNewUrlParser: true })
// 	.then(() => console.log("Connected to MongoDB successfully"))
// 	.catch(err => console.log(err));

// app.use(
// 	bodyParser.urlencoded({
// 		extended: false
// 	})
// );

// app.use(bodyParser.json());

app.get("/", (req, res) => {
	// res.send("Sup Dawg");
	res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
app.use(express.static("frontend/build"));

// const players = require("./routes/api/players");
// app.use("/api/players", players);
//! Off

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("frontend/build"));
	app.get("/", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
}
