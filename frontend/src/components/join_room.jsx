import React from "react";
import { withRouter } from "react-router-dom";
import backSound from "../style/sounds/InterplanetaryOdyssey.ogg";

class JoinRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			roomId: "",
			userTag: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		//* Get game tag from somewhere. 'game' is placeholder. Probably this.props.roomId
		let roomId = this.state.roomId;
		if (roomId !== "" && this.state.userTag !== "") {
			this.props.history.push({
				pathname: `/game/${roomId}`,
				type: "joinRoom",
				userTag: this.state.userTag,
				roomId: roomId
			});
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

		return (
			<div className="player-form">
				<audio src={backSound} autoPlay loop />
				<form onSubmit={this.handleSubmit} className="player-form">
					<img
						className="player-header"
						src={require("../style/images/logoFinal.png")}
						alt="logo"
						width="1200"
						height="332"
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
					{this.state.roomId && this.state.userTag !== "" ? shownView() : null}
				</form>
			</div>
		);
	}
}

export default withRouter(JoinRoom);
