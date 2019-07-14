const io = require("../../app").io;
 
module.exports = function(socket) {
	console.log("HiHo! You are connected to this websocket:" + socket.id);
};
