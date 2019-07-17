import React, { Component } from "react";

export default class Chatbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			body: ""
		};
		this.updateBox = this.updateBox.bind(this);
	}

	updateBox(body) {
		return e =>
			this.setState({
				[body]: e.currentTarget.value
			});
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.body !== "") {
			let payload = {
				body: this.state.body,
				roomId: this.props.roomId,
				nickname: this.props.nickname
			};
			let socket = this.socket; //!This.props.socket??
			socket.emit("submitMessage", payload);

			this.setState({ body: "" });
		}
	}

	sendMessage() {
		let socket = this.socket;
		socket.emit("submitMessage", {
			roomId: this.props.history.location.roomId,
			nickname: this.props.history.location.userTag,
			message: "somestring"
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit} className="player-form" />>
			</div>
		);
	}
}
