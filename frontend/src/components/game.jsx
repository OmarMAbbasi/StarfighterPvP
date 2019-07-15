import React from "react";
import MovingObject from "../classes/movingObject";
import io from "socket.io-client";

const socketURL = "http://localhost:5000";

class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: null
		};
		// this.state = this.props;
		this.openSocket = this.openSocket.bind(this);
		this.canvasRef = React.createRef();
	}

	openSocket = () => {
		const socket = io(socketURL);
		this.setState({ socket: { socket } });

		//!Socket Tests
		socket.on("connect", () => {
			console.log("Ayyy! Websockets!");
		});

		socket.emit("c2s", {
			event: "Client Talks to Server"
		});

		socket.on("s2c", data => console.log(data.event));
	};

	componentWillMount() {
		this.openSocket();
	}

	componentDidMount() {
		const canvas = this.canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		if (this.props !== {}) {
			// this.state.players.forEach((player) => player.draw(ctx))
			this.props.hazards.forEach(hazard => hazard.draw(ctx));
			// this.state.bullets.forEach((bullet) => bullet.draw(ctx))
		}
	}

	render() {
		if (!this.props) {
			return null;
		}
		return (
			<div>
				<h3>Timer: {this.props.timeLeft}</h3>
				<h3>Rounds Left: {this.props.roundsLeft}</h3>
				<canvas ref={this.canvasRef} width={1600} height={900} />
			</div>
		);
	}
}

export default Canvas;
