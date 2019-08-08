import React from "react";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";
import backSound from "../style/sounds/InterplanetaryOdyssey.ogg";

let socketURL = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
	console.log(`process.env: ${process.env}`);
	socketURL =
		process.env.REACT_APP_SOCKET_URL || "https://starfight.herokuapp.com/";
}


class JoinRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roomId: "",
			userTag: "",
			error: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		let roomId = this.state.roomId;
		if (roomId !== "" && this.state.userTag !== "") {
			this.props.history.push({
				pathname: `/game/${roomId}`,
				type: "joinRoom",
				userTag: this.state.userTag,
				roomId: roomId
			})
			this.props.closeModal();
		}
	}

	updateType(type) {
		return e => {
			this.setState({ [type]: e.currentTarget.value });
		};
	}

	render() {
		const shownView = () => (
			<h1 className="enter-room">Press enter to continue</h1>
		);
		
		const errorView = () => (
			<h1 className="error">Room does not exist</h1>
		)

		return (
			<div className="player-form">
				<audio src={backSound} autoPlay loop />
				<form onSubmit={this.handleSubmit} className="player-form">
					<img
						className="player-header"
						src={require("../style/images/logoFinal.png")}
						alt="logo"
					/>

					<input
						className="room-input"
						type="text"
						value={this.state.userTag}
						onChange={this.updateType("userTag")}
						placeholder="User Tag"
					/>
					<input
						className="room-input"
						type="text"
						value={this.state.room_id}
						onChange={this.updateType("roomId")}
						placeholder="Room ID"
					/>
					<button className="player-btn" type="submit">
						Play
					</button>
					{ this.state.roomId && this.state.userTag !== "" ? shownView() : null }
					{ this.state.error !== "" ? errorView() : null }
				</form>
			</div>
		);
	}
}

export default withRouter(JoinRoom);
