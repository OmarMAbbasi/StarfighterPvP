const io = require("../../app").io;
const Game = require("./classes/game");
const MovObj = require('./classes/movingObject')

let SOCKET_LIST = {};

	function randomX()  {
		return Math.floor(Math.random() * Math.floor(1500));
	}

	function randomY()  {
		return Math.floor(Math.random() * Math.floor(800));
	}

module.exports = function(socket) {
	socket.id = Math.random();
	socket.obj = new MovObj({ x: randomX(), y: randomY() }, { x: 25, y: 25 }, 15);
	SOCKET_LIST[socket.id] = socket;
	// emitPayload = (payload) => {
	// 	const { socket } = this.state;
	// 	socket.emit("msg", { msg: "hello" });
	// };
	// let obj = {
	// 	pos: {
	// 		x: Math.floor(Math.random() * Math.floor(1500)),
	// 		y: Math.floor(Math.random() * Math.floor(800))
	// 	},
	// 	vel: {
	// 		x: 25,
	// 		y: 25
	// 	},
	// 	radius: 15
	// };
	setInterval(() => {
		let payload = [];
		for (let i in SOCKET_LIST) {
			let obj = SOCKET_LIST[i].obj;
			obj.pos.x += Math.floor(Math.random() * Math.floor(3));
			obj.pos.y += Math.floor(Math.random() * Math.floor(3));
			if (obj.pos.x > 1600) {
				obj.pos.x -= 1600;
			}
			if (obj.pos.y > 900) {
				obj.pos.y -= 900;
			}
			payload.push(obj);
		}
		for (var i in SOCKET_LIST) {
			socket.emit("newPosition", payload);
		}
	}, 6000 / 1000);

	//!Socket Tests



	socket.on("c2s", data => {
		console.log(data.event);
	});

	socket.emit("s2c", {
		event: "Server talks to client"
	});

	console.log("HiHo! You are connected to this websocket:" + socket.id);
};

// module.exports.roomManager = function(socket) {
// 	socket.id = Math.random();
// 	socket.obj = new MovObj({ x: randomX(), y: randomY() }, { x: 25, y: 25 }, 15);
// 	SOCKET_LIST[socket.id] = socket;

// 	//!Socket Tests
// 	socket.on("c2r", data => {
// 		console.log(data.event);
// 	});

// 	socket.emit("r2c", {
// 		event: "Room talks to client"
// 	});

// 	console.log("HiHo! You are connected to this room:" + socket.id);

// 	setInterval(() => {
// 		let payload = [];
// 		for (let i in SOCKET_LIST) {
// 			let obj = SOCKET_LIST[i].obj;
// 			obj.pos.x += Math.floor(Math.random() * Math.floor(3));
// 			obj.pos.y += Math.floor(Math.random() * Math.floor(3));
// 			if (obj.pos.x > 1600) {
// 				obj.pos.x -= 1600;
// 			}
// 			if (obj.pos.y > 900) {
// 				obj.pos.y -= 900;
// 			}
// 			payload.push(obj);
// 		}
// 		for (var i in SOCKET_LIST) {
// 			socket.emit("newPosition", payload);
// 		}
// 	}, 6000 / 1000);
// };
