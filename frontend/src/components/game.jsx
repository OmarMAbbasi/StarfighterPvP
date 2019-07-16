import React from "react";
import io from "socket.io-client";
import Player from "../classes/player";
import { withRouter } from "react-router-dom";
import Hazard from "../classes/hazard";
import Bullet from "../classes/bullet";

let socketURL = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
	socketURL = "https://starfight-michael.herokuapp.com/";
}
class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.state = { time: 0, round: 5 };
		this.input = {
			w: false,
			s: false,
			a: false,
			d: false
		};

		this.players = [];
		this.hazards = [];
		this.bullets = [];
		this.socket = null;
		this.openSocket = this.openSocket.bind(this);

		this._handleKey = this._handleKey.bind(this);
		this.canvasRef = React.createRef();
		this.drawObj = this.drawObj.bind(this);
		this.joinRoom = this.joinRoom.bind(this);
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

		// socket.emit("joinRoom", {
		// 	event: "Client Talks to Server"
		// });

		socket.on("s2c", data => console.log(data.event));

		socket.on("newPosition", data => {
			this.setState({ time: Math.ceil(data.timer), round: data.rounds })
            console.log(data);
			this.players = [];
			let players = data.players;
            players.forEach(player => {
				let p = new Player();
				p = Object.assign(p, player);
                this.players.push(p);
			});
			this.hazards = [];
			let hazards = data.hazards;
			hazards.forEach(hazard => {
				let h = new Hazard();
				h = Object.assign(h, hazard);
				this.hazards.push(h);
			});
			this.bullets = [];
			let bullets = data.bullets;
			
			bullets.forEach(bullet => {
				let b = new Bullet();
				b = Object.assign(b, bullet);
				this.bullets.push(b);
			});
		});
	};

	drawObj() {
		const can1 = document.getElementById("can1");
		const can1Ctx = can1.getContext("2d");
		const can2 = document.getElementById("can2");
		const can2Ctx = can2.getContext("2d");
		can1Ctx.clearRect(0, 0, 1600, 900);
		can1Ctx.rect(0, 0, 1600, 900);
		can1Ctx.fillStyle = "black";
		can1Ctx.fill();
		let objects = this.players.concat(this.hazards).concat(this.bullets);
		objects.forEach(object => {
			object.draw(can1Ctx, can1)
		})
		// can2Ctx.drawImage(can1, 0, 0);
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
            case 32:
                if (input.space !== down) {
                    input.space = down;
                    // console.log('fire!')
                    socket.emit("playerInput", input);
                    // socket.emit("playerInput", input);
                }

                break;
            case 16:
                if (input.shift !== down) {
                    input.shift = down;
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
		this.joinRoom();
	}

	componentDidMount() {
		if (this.props.roundsLeft === 0) {
			this.props.history.push("/gameover");
		}
		const can1 = document.getElementById("can1");
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

	joinRoom() {
		let socket = this.socket;
		const payload = {
			type: this.props.history.location.type,
			userTag: this.props.history.location.userTag,
			roomId: this.props.history.location.roomId
		};
		socket.emit("joinRoom", payload);
	}

	render() {
		if (!this.props) {
			return null;
		}

		if (this.props.timeLeft === 0) {
			this.props.openModal("nextRound");
		}

		const roundOver = () => (
			<div className="roundOver">
				<h1>Round Over</h1>
				<h2>Player 1</h2>
				<h2>Player 2</h2>
			</div>
		);

		return (
			<div className='gameboard-parent'>
				<div className='board-header'>
					<h3>Timer:{this.state.time}</h3>
					<h3>Rounds Left:{this.state.round}</h3>
				</div>
				<div className='board-container'>
					<canvas 
						id='can1' 
						// ref={this.canvasRef} 
						width='1300' 
						height='750'
						// style={{ position: 'absolute', top: 0 }}
					/>
					<canvas 
						id='can2'
						// ref={this.canvasRef} 
						width='1300' 
						height='750' 
						style={{ position: 'absolute', top: 0 }}
					/>
				</div>
			</div>
		);
	}
}

export default withRouter(Canvas);
