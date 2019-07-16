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
		
		this.players = [];
		this.hazards = this.props.hazards;
		this.socket = null;
		this.openSocket = this.openSocket.bind(this);

		this._handleKey = this._handleKey.bind(this);
		this.canvasRef = React.createRef();
		this.drawObj = this.drawObj.bind(this);
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

		socket.emit("joinRoom", {
			event: "Client Talks to Server"
		});

		socket.on("s2c", data => console.log(data.event));

		socket.on("newPosition", data => {
			this.players = [];
            let players = data.players;
            console.log(players);
            players.forEach(player => {
                this.players.push(new Player(player.pos, player.id, player.dir));
			});
		});
	};

	drawObj() {
		const can1 = document.getElementById('can1');
		const can1Ctx = can1.getContext("2d");
		const can2 = document.getElementById('can2');
		const can2Ctx = can2.getContext("2d");
		can1Ctx.clearRect(0, 0, 1600, 900);
		can1Ctx.rect(0, 0, 1600, 900);
		can1Ctx.fillStyle = "black";
		can1Ctx.fill();
		this.players.forEach(player => {
			player.draw(can1Ctx, can1)
		})
		can2Ctx.drawImage(can1, 0, 0);
		requestAnimationFrame(this.drawObj);
	}

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
	}

	componentDidMount() {
		if (this.props.roundsLeft === 0) {
			this.props.history.push('/gameover')
		};

		const can1 = document.getElementById('can1');
		const can1Ctx = can1.getContext("2d");
		can1Ctx.rect(0, 0, can1.width, can1.height);
		can1Ctx.fillStyle = "black";
		can1Ctx.fill();
		this.drawObj();
        
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
				<h3>Timer: {this.props.timeLeft}</h3>
				<h3>Rounds Left: {this.props.roundsLeft}</h3>
                <canvas 
                    id='can1' 
                    // ref={this.canvasRef} 
                    width='1600' 
                    height='900'
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />
                <canvas 
                    id='can2'
                    // ref={this.canvasRef} 
                    width='1600' 
                    height='900' 
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />
			</div>
		);
	}
}

export default withRouter(Canvas);
