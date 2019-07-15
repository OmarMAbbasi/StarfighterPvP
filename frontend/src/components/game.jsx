import React from "react";
import MovingObject from "../classes/movingObject";
import io from "socket.io-client";

const socketURL = "http://localhost:5000";

class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: null,
			hazards: this.props.hazards,
			w: false,
			s: false,
			a: false,
			d: false
		};
		// this.state = this.props;
		this.openSocket = this.openSocket.bind(this);
		this.canvasRef = React.createRef();
	}

	openSocket = () => {
		let socket = io(socketURL);
		socket.on("joinGame");
		this.setState({ socket: { socket } });

		//!Socket Tests
		socket.on("connect", () => {
			console.log("Ayyy! Websockets!");
		});

		socket.emit("c2s", {
			event: "Client Talks to Server"
		});
		socket.on("s2c", data => console.log(data.event));

		socket.on("newPosition", data => {
			let hazards = this.state.hazards;
			// this.setState({ hazards: hazards });
			const canvas = this.canvasRef.current;
			const ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			// this.state.hazards
			let newHazArr = [];
			if (this.props !== {} && this.state.hazards !== {}) {
				// this.state.players.forEach((player) => player.draw(ctx))
				for (let i = 0; i < data.length; i++) {
					let newHazard = hazards[0];
					newHazard = Object.assign(newHazard, data[i]);
					newHazArr.push(newHazard);
					newHazard.draw(ctx);
				}
				this.setState({ hazards: newHazArr });

				// this.state.bullets.forEach((bullet) => bullet.draw(ctx))
			}
		});
	};

	_handleKeyDown(event) {
		switch (event.keyCode) {
			case 87:
				this.setState({ w: true });
			case 83:
				this.setState({ s: true });
			case 65:
				this.setState({ a: true });
			case 68:
				this.setState({ w: true });
			default:
				break;
		}
	}

	// updatePos = () => {
	// 	socket = io(socketURL);
	// };

	componentWillMount() {
		this.openSocket();
	}

	componentDidMount() {
		const canvas = this.canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		if (this.state !== {}) {
			// this.state.players.forEach((player) => player.draw(ctx))
			this.state.hazards.forEach(hazard => hazard.draw(ctx));
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
