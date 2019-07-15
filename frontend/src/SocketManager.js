const io = require("../../app").io;

module.exports = function(socket) {
	socket.on("c2s", data => {
		console.log(data.event);
	});

	socket.emit("s2c", {
		event: "Server Talks to Client"
	});
	console.log("HiHo! You are connected to this websocket:" + socket.id);
};
