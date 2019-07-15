const io = require("../../app").io;
const Game = require("./classes/game");
const MovObj = require("./classes/movingObject");

let SOCKET_LIST = {};
let PLAYER_LIST = {};

function randomX() {
	return Math.floor(Math.random() * Math.floor(1500));
}

function randomY() {
	return Math.floor(Math.random() * Math.floor(800));
}

module.exports = function(socket) {
	socket.id = Math.random();
	socket = SOCKET_LIST[socket.id] = socket;
	let playerObj = new MovObj(
		{ x: randomX(), y: randomY() },
		{ x: 25, y: 25 },
		15
	);
	let input = {
		w: false,
		s: false,
		a: false,
		d: false
	};
	player = {
		playerObj: playerObj,
		input: input
	};

	PLAYER_LIST[socket.id] = player;

	setInterval(() => {
		let payload = [];

		for (let i in PLAYER_LIST) {
			let player = PLAYER_LIST[i];
			player.playerObj.pos.x += Math.floor(Math.random() * Math.floor(3));
			player.playerObj.pos.y += Math.floor(Math.random() * Math.floor(3));
			if (player.playerObj.pos.x > 1600) {
				player.playerObj.pos.x -= 1600;
			}
			if (player.playerObj.pos.y > 900) {
				player.playerObj.pos.y -= 900;
			}
			payload.push(player.playerObj);
		}
		for (var i in SOCKET_LIST) {
			socket.emit("newPosition", payload);
		}
	}, 6000 / 1000);

	socket.on("disconnect", () => {
		delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];
	});
};
//!Socket Tests

// socket.on("c2s", data => {
// 	console.log(data.event);
// });

// socket.emit("s2c", {
// 	event: "Server talks to client"
// });

// console.log("HiHo! You are connected to this websocket:" + socket.id);

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
