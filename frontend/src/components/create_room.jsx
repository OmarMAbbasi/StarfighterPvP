import React from "react";
import { withRouter } from "react-router-dom";

class CreateRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userTag: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		//* Get game tag from somewhere. 'game' is placeholder. Probably this.props.roomId
		let roomId = "game";
		if (roomId !== "") {
			if (roomId !== "") {
				this.props.history.push({
					pathname: `/game/${roomId}`,
					type: "createRoom",
					userTag: this.state.userTag,
					roomId: roomId
				});
			}
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
				<form onSubmit={this.handleSubmit} className="player-form">
					<img
						className="player-header"
						src={require("../style/images/logoFinal.png")}
						alt="logo"
						width="1200"
						height="332"
					/>
					{/* <img className='ast-1' src={require('../style/images/asteroid1.png')} alt="ast1" width='250' height='191' />
                    <img className='ast-2' src={require('../style/images/asteroid2.png')} alt="ast2" width='250' height='191' /> */}

					<input
						className="room-input"
						type="text"
						value={this.state.userTag}
						onChange={this.updateType("userTag")}
						placeholder="User Tag"
					/>
					<button className="player-btn" type="submit">
						Play
					</button>
					{this.state.roomId !== "" ? shownView() : null}
				</form>
			</div>
		);
	}
}

export default withRouter(CreateRoom);
