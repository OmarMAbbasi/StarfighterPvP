const io = require("../app").io;
const Game = require("./classes/game");
const Player = require("./classes/player");

let ROOM_LIST = {};
let PLAYER_LIST = {};

module.exports = function(socket) {
	socket.on("joinRoom", data => {
		console.log(data);
		socket.id = Math.random();
		let game = null;
		if (data.type === "createRoom") {
			game = ROOM_LIST[data.roomId] = new Game();
			game.startGame();
		} else {
			game = ROOM_LIST[data.roomId];
		}
		let player = game.addPlayer(socket.id, socket, data.userTag);
		if (player) {
			PLAYER_LIST[socket.id] = player;
		} else {
			socket.emit("roomFull", false);
		}
	});

	socket.on("playerInput", data => {
		player = PLAYER_LIST[socket.id];
		player.setInputs(data);
		// console.log(data);
	});

	socket.on("receivePlayerMessage", data -> {
		ROOM_LIST[data.roomId].chat.getMessage(data.player, data.message)
	})

	// socket.on("shoot", data => {
	// 	player = PLAYER_LIST[socket.id];
	// 	player.shoot(data);
	// });

	socket.on("disconnect", data => {
		delete PLAYER_LIST[socket.id];
		ROOM_LIST[data.gameId].removePlayer(socket.id);
	});
};
