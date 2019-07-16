import React from "react";
import io from "socket.io-client";
import Player from "../classes/player";
import { withRouter } from 'react-router-dom';

let socketURL = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
	socketURL = "https://starfight-staging.herokuapp.com/";
}
class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.input = {
			w: false,
			s: false,
			a: false,
			d: false
        };
        
		this.socket = null;
		this.openSocket = this.openSocket.bind(this);

		this._handleKey = this._handleKey.bind(this);
		this.canvasRef = React.createRef();
	}

	openSocket = () => {
		this.socket = io(socketURL);
		let socket = this.socket;
		// !Socket Tests
		socket.on("connect", () => {
			console.log("Ayyy! Websockets!");
		});

		socket.emit("c2s", {
			event: "Client Talks to Server"
		});
		socket.on("s2c", data => console.log(data.event));

		socket.on("newPosition", data => {
            let players = data.players;
            // console.log(players);
			const canvas = this.canvasRef.current;
            const ctx = canvas.getContext("2d");
            // ctx.rect(0, 0, canvas.width, canvas.height);
            // ctx.fillStyle = "black";
            // ctx.fill();
			players.forEach(player => {
                new Player(player.pos, player.id, player.dir).draw(ctx, canvas);
            });
		});
	};

	_handleKey(event, down) {
		let input = this.input;
		let socket = this.socket;
		console.log(event.keyCode);
		switch (event.keyCode) {
			case 87:
				if (input.w !== down) {
					input.w = down;
					socket.emit("playerInput", input);
					console.log(input);
				}

				break;
			case 83:
				if (input.s !== down) {
					input.s = down;
					socket.emit("playerInput", input);
					console.log(input);
				}

				break;
			case 65:
				if (input.a !== down) {
					input.a = down;
					socket.emit("playerInput", input);
					console.log(input);
				}
				break;
			case 68:
				if (input.d !== down) {
					input.d = down;
					socket.emit("playerInput", input);
					console.log(input);
				}

				break;
			default:
				break;
		}
		this.input = input;
		// debugger;
	}

	// updatePos = () => {
	// 	socket = io(socketURL);
	// };

	componentWillMount() {
		this.openSocket();
	};

	componentDidMount() {
		if (this.props.roundsLeft === 0) {
			this.props.history.push('/gameover')
		};

		const canvas = this.canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.lineWidth = 2;
		ctx.strokeStyle = "#069304"

		ctx.stroke();

		document.addEventListener("keydown", event => {
			this._handleKey(event, true);
		});
		document.addEventListener("keyup", event => {
			this._handleKey(event, false);
		});

	}

	render() {
		if (!this.props) {
			return null;
		}

		if (this.props.timeLeft === 0) {
			this.props.openModal("nextRound")
		};

		const roundOver = () => (
			<div className='roundOver'>
				<h1>Round Over</h1>
				<h2>Player 1</h2>
				<h2>Player 2</h2>
			</div>
		)

		return (
			<div>
				{this.state.modalVis ? roundOver()
				: <div className="screen">
					<h3>Timer: {this.props.timeLeft}</h3>
					<h3>Rounds Left: {this.props.roundsLeft}</h3>
				</div>
				}
				<canvas ref={this.canvasRef} width='1600' height='900' />
			</div>
		);
	}
}

export default withRouter(Canvas);
