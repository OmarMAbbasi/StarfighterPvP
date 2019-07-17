import React, { Component } from "react";
import Player from "../classes/player";
import ChatListItem from "./chatListItem";

export default class Chatbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: ["Welcome to Starfight!"]
		};
	}

	componentDidMount() {
		this.props.socket.on("updateChat", data => {
			this.updateChat(data);
		});
	}

	updateChat(data) {
		let messages = data.messages;
		this.setState({ messages: messages });
	}

	// componentDidUpdate(e) {
	// 	e.preventDefault();
	// 	if (this.state.body !== "") {
	// 		let payload = {
	// 			body: this.state.body,
	// 			roomId: this.props.roomId,
	// 			nickname: this.props.nickname
	// 		};
	// 		let socket = this.socket; //!This.props.socket??
	// 		socket.emit("submitMessage", payload);

	// 		this.setState({ body: "" });
	// 	}
	// }

	render() {
		let messages = this.state.messages;
		return (
			<div>
				{this.messages.map(message => {
					<ChatListItem
						body={this.message.body}
						nickame={this.message.nickame}
					/>;
				})}
			</div>
		);
	}
}
