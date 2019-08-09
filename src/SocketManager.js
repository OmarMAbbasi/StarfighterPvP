const io = require("../app").io;
const Game = require("./classes/game");
const Player = require("./classes/player");

let ROOM_LIST = {};
let PLAYER_LIST = {};

module.exports = function(socket) {
	socket.on("joinRoom", data => {
		socket.id = Math.random();
		console.log(data.roomId);
		if (data.type === "createRoom") {
			game = ROOM_LIST[data.roomId] = new Game(data.roomId, socket.id);
		} else {
			game = ROOM_LIST[data.roomId];
		}
		let player;
		if (game) {
			player = game.addPlayer(socket.id, socket, data.userTag, data.roomId);
		} else socket.emit("nullRoomError");

		if (player && !player.spectator) {
			PLAYER_LIST[socket.id] = player;
		} else if (player) {
			socket.emit("roomFullOrStarted");
		}
	});

	socket.on("playerInput", data => {
		player = PLAYER_LIST[socket.id];
		if (player) {
			player.setInputs(data);
		}
	});

	socket.on("submitMessage", data => {
		let player = PLAYER_LIST[socket.id];
		ROOM_LIST[data.roomId].chat.getMessage(player, data.body, data.nickname);
	});

	// socket.on("shoot", data => {
	// 	player = PLAYER_LIST[socket.id];
	// 	player.shoot(data);
	// });

	socket.on("disconnect", () => {
		if (!PLAYER_LIST[socket.id]) {
			return null;
		}
		let roomId = PLAYER_LIST[socket.id].gameId;
		let game = ROOM_LIST[roomId];
		if (socket.id) {
			game.removePlayer(socket.id);
			delete PLAYER_LIST[socket.id];
			if (Object.keys(game.players).length === 0) {
				delete ROOM_LIST[roomId];
			}
		}
	});

	socket.on("playerReady", data => {
		PLAYER_LIST[socket.id].ready = !PLAYER_LIST[socket.id].ready;
		ROOM_LIST[data.roomId].updateReady();
	});

	socket.on("startGame", data => {
		console.log("Starting game");
		ROOM_LIST[data.roomId].startGame();
	});
};
