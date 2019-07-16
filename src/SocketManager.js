const io = require("../app").io;
const Game = require("./classes/game");
const Player = require("./classes/player");

let SOCKET_LIST = {};
let PLAYER_LIST = {};
let game = new Game(5);
game.startGame();

module.exports = function(socket) {
	socket.id = Math.random();
	socket = SOCKET_LIST[socket.id] = socket;
    PLAYER_LIST[socket.id] = game.addPlayer(socket.id, socket);

	socket.on("playerInput", data => {
		player = PLAYER_LIST[socket.id];
		player.setInputs(data);
		// console.log(data);
	});

	socket.on("disconnect", () => {
		delete SOCKET_LIST[socket.id];
		delete PLAYER_LIST[socket.id];
	});
};
