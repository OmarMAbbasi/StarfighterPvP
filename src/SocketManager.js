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
            game = ROOM_LIST[data.roomId] = new Game(data.roomId, socket.id);
            game.startGame();
        } else {
            game = ROOM_LIST[data.roomId];
        }

        let player = game.addPlayer(socket.id, socket, data.userTag, data.roomId);
        if (player) {
            PLAYER_LIST[socket.id] = player;
        } else {
            socket.emit("roomFull", false);
        }

        socket.emit("playerJoin", { players: game.players });
    });

    socket.on("playerInput", data => {
        player = PLAYER_LIST[socket.id];
        player.setInputs(data);
        // console.log(data);
    });

    socket.on("submitMessage", data => {
        let player = PLAYER_LIST[socket.id];
        ROOM_LIST[data.roomId].chat.getMessage(player, data.message);
    });

    // socket.on("shoot", data => {
    // 	player = PLAYER_LIST[socket.id];
    // 	player.shoot(data);
    // });

    socket.on("disconnect", () => {
        let roomId = PLAYER_LIST[socket.id].roomId;
        let game = ROOM_LIST[roomId];
        game.removePlayer(socket.id);
        delete PLAYER_LIST[socket.id];
        if (Object.keys(game.players).length === 0) {
            console.log(`Closing room: ${roomId}`);
            delete ROOM_LIST[roomId];
        }
    });

    socket.on("playerReady", data => {
        PLAYER_LIST[socket.id].ready = !PLAYER_LIST[socket.id].ready;
        socket.emit("readyUpdate", { players: ROOM_LIST[data.roomId] });
    });

    socket.on("startGame", data => {
        ROOM_LIST[data.roomId].startGame();
    });
};