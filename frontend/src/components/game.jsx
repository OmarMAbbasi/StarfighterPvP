import React from "react";
import io from "socket.io-client";
import Player from "../classes/player";
import { withRouter } from "react-router-dom";
import Hazard from "../classes/hazard";
import Bullet from "../classes/bullet";
import PlayerListItem from "./player_list_item";
import backSound from "../style/sounds/InterplanetaryOdyssey.ogg";
import Modal from "./modal";

let socketURL = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
	socketURL = "https://starfight.herokuapp.com/";
}

const PILOTS = ["Han Solo", "Starbuck", "Wash", "Joker", "Sulu", "Eagle"];

class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: 30,
			round: 5,
			players: [],
			gameStarted: false
		};
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
		this.roomId = props.match.params;
		this._handleKey = this._handleKey.bind(this);
		this.canvasRef = React.createRef();
		this.drawObj = this.drawObj.bind(this);
		this.joinRoom = this.joinRoom.bind(this);
		this.startGame = this.startGame.bind(this);
		this.userTag =
			this.props.history.location.userTag ||
            PILOTS[Math.floor(Math.random() * Math.floor(5))];

        this.spectator = false;
	}

	openSocket = () => {
		this.socket = io(socketURL);
		let socket = this.socket;
		// !Socket Tests
		socket.on("connect", () => {
			console.log("Ayyy! Websockets!");
        });
        
        socket.on("roomFullOrStarted", () => {
            this.spectator = true;
            this.setState({gameStarted: true});
        })

		socket.on("playerJoin", data => {
			this.setState({ players: data.players });
			this.players = data.players.map(player =>
				Object.assign(new Player(), player)
			);
		});

		socket.on("readyUpdate", data => {
			this.setState({ players: data.players });
		});

		// socket.emit("joinRoom", {
		// 	event: "Client Talks to Server"
		// });

		socket.on("s2c", data => console.log(data.event));

		socket.on("newPosition", data => {
			this.setState({ time: Math.ceil(data.timer), round: data.rounds });
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
			if (object instanceof Player) {
				object.draw(can1Ctx, object);
			} else if (object instanceof Bullet) {
				object.draw(can1Ctx, object.color);
			} else {
				object.draw(can1Ctx);
			}
		});
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
		const can1 = document.getElementById("can1");
		const can1Ctx = can1.getContext("2d");
		can1Ctx.rect(0, 0, can1.width, can1.height);
		can1Ctx.fillStyle = "black";
		can1Ctx.fill();
		this.drawObj();

        if (!this.spectator) {
            document.addEventListener("keydown", event => {
                this._handleKey(event, true);
            });
            document.addEventListener("keyup", event => {
                this._handleKey(event, false);
            });
        }

	}

	joinRoom() {
		let socket = this.socket;
		const payload = {
			type: this.props.history.location.type,
			roomId: this.roomId,
			userTag: this.userTag
		};
		socket.emit("joinRoom", payload);
	}

	startGame() {
		this.socket.emit("startGame", { roomId: this.roomId });
		this.setState({ gameStarted: true });
	}

	render() {
		if (!this.props) {
			return null;
		}

		// if (this.props.timeLeft === 0) {
		// 	this.props.openModal("nextRound");
		// }

		const roundOver = () => (
			<div className="roundOver">
				<h1>Round Over</h1>
				<h2>Player 1</h2>
				<h2>Player 2</h2>
			</div>
		);

		let gamers = this.state.gameStarted ? this.players : this.state.players;
		debugger;
		const playerList =
			gamers.length !== 0 ? (
				gamers.map(player => {
					return (
						<PlayerListItem
							key={player.id}
							player={player}
							socket={this.socket}
							gameStarted={this.state.gameStarted}
							gameId={this.roomId}
							myTag={this.userTag}
						/>
					);
				})
			) : (
				<li>Loading...</li>
			);

		//change to this.state.round after round logic implemented ??
		if (this.state.round === 0) {
			// const canvas = document.getElementById("can1");
			// const can1Ctx = canvas.getContext("2d");
			// can1Ctx.clearRect(0, 0, 1600, 900);

			this.props.history.push({
				pathname: "/gameover",
				players: this.players
			});
		}

		return (
			<div className="gameboard-parent">
				{this.props.modal ? <Modal /> : null}

				<audio src={backSound} autoPlay loop />

				{this.props.history.location.isHost ? (
					<div className="start-game-container">
						<button onClick={this.startGame}>Start Game</button>
					</div>
				) : null}
				
				<div className="board-header">
					<img
						className="player-game-logo"
						src={require("../style/images/newLogo.png")}
						alt="logo"
						width="800"
						height="64.46"
					/>
					<div className="text">
						<h3>Timer:{this.state.time}</h3>
						<h3>Rounds Left:{this.state.round}</h3>
					</div>

				</div>

				<div className="board-container">
					<canvas
						id="can1"
						// ref={this.canvasRef}
						width="1300"
						height="750"
						style={{ position: "relative", top: 0 }}
					/>
					<canvas
						id="can2"
						// ref={this.canvasRef}
						width="1300"
						height="750"
						style={{ position: "absolute", top: 0, left: 0 }}
					/>
				</div>
				<ul className="side-bar">
					<h1>Players</h1>
					{playerList}
				</ul>
				{/* <Chatform socket={socket} roomId = {this.props.history.location.roomId}	nickname = {this.userTag} message = {'somestring'} /> */}
			</div>
		);
	}
}

export default withRouter(Canvas);
