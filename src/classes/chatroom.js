class Chat {
	constructor() {
		this.memberData = [];
		this.messages = [];
	}

	joinChat(player, socket) {
		this.memberData.push = { player: player, socketId: socket };
	}

	getMessage(player, message) {
		this.messages.push({
			body: message.body,
			playerId: player.id,
			nickname: player.nickname
		});
		this.memberData.forEach(member => {
			member.socket.emit("updateChat", this.messages);
		});
	}
}

module.exports = Chat;
