class Chat {
	constructor() {
		this.memberData = [];
		this.messages = [];
	}

	joinChat(player, socket) {
		this.memberData.push = { player: player, socket: socket };
	}

	getMessage(player, message) {
		this.messages.push({ message: message, playerId: player.id });
		this.memberData.forEach(member => {
			member.socket.emit("sendMessages", this.messages);
		});
	}
}

module.exports = Chat;
