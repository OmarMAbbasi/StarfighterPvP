const io = require("../../app").io;

module.exports = function(socket) {
	console.log("Socket Id" + socket.id);
};
