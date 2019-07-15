const io = require("../app").io;
// const Game = require("./classes/game");
const Player = require("./classes/player");

let SOCKET_LIST = {};
let PLAYER_LIST = {};

function randomX() {
	return Math.floor(Math.random() * Math.floor(1500));
}

function randomY() {
	return Math.floor(Math.random() * Math.floor(800));
}

function updatePos(player) {
	if (player.input.w) {
		player.playerObj.pos.y -= 3;
	}
	if (player.input.s) {
		player.playerObj.pos.y += 3;
	}
	if (player.input.d) {
		player.playerObj.pos.x += 3;
	}
	if (player.input.a) {
		player.playerObj.pos.x -= 3;
	}
	return player;
}

module.exports = function(socket) {
	socket.id = Math.random();
	socket = SOCKET_LIST[socket.id] = socket;
	let playerObj = new Player({ x: randomX(), y: randomY() }, socket.id, {
		x: 1,
		y: 0
	});
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
			player = updatePos(player);
			if (player.playerObj.pos.x > 1600) {
				player.playerObj.pos.x -= 1600;
			}
			if (player.playerObj.pos.x < 0) {
				player.playerObj.pos.x += 1600;
			}
			if (player.playerObj.pos.y > 900) {
				player.playerObj.pos.y -= 900;
			}
			if (player.playerObj.pos.y < 0) {
				player.playerObj.pos.y += 900;
			}
			payload.push(player.playerObj);
		}
		for (var i in SOCKET_LIST) {
			socket.emit("newPosition", payload);
		}
	}, 1000 / 30);

	socket.on("playerInput", data => {
		player = PLAYER_LIST[socket.id];
		player.input = data;
		console.log(data);
	});

	socket.on("disconnect", () => {
		delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];
	});
};
