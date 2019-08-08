import React from "react";
import { withRouter } from "react-router-dom";
import Modal from "./modal";
import backSound from "../style/sounds/InterplanetaryOdyssey.ogg";

const redShip = require("../style/images/redshipfire.png");
const blueShip = require("../style/images/fireshipURL.png");

class PlayerForm extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		let canvas = this.canvasRef.current;
		let ctx = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		let width = canvas.width;
		let height = canvas.height;

		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, width, height);
		let img = new Image();
		let xPos = 0;
		let yPos = Math.floor(height * 0.35);
		img.onload = () => {
			let img2 = new Image();
			let xPos2 = 1500;
			let yPos2 = 800;
			img2.onload = () => {
				setInterval(() => {
					ctx.save();
					ctx.clearRect(0, 0, width, height);
					ctx.fillRect(0, 0, width, height);
					xPos += 12;
					xPos2 -= 12;
					ctx.drawImage(img, xPos, yPos, 80, 61);
					ctx.drawImage(img2, xPos2, yPos2, 80, 61);

					ctx.restore();
					if (xPos > width || yPos > height) {
						xPos = 0;
						yPos = Math.floor(height * 0.35);
					}

					if (xPos2 < 0) {
						xPos2 = 1500;
					}

					if (yPos2 < 0) {
						yPos2 = 800;
					}
				}, 100 / 3);
			};
			img2.src = blueShip;
		};
		img.src = redShip;
	}


	render() {
		return (
			<div className="player-form-parent">
				<audio src={backSound} autoPlay loop controls />
				<canvas
					ref={this.canvasRef}
					id="my-canvas"
				></canvas>

				{this.props.modal ? (

					<Modal />
				) : (
					<div className="player-form">

						<img
							className="player-header"
							src={require("../style/images/logoFinal.png")}
							alt="logo-another"
						/>
						<div className="btns">
							<button
								onClick={() => this.props.openModal("createRoom")}
								className="room-btn"
							>Create Room
							</button>
							<button
								onClick={() => this.props.openModal("joinRoom")}
								className="room-btn"
							>Join Room
							</button>
							<button
								onClick={() => this.props.openModal("joinDemoRoom")}
								className="room-btn"
								id="demo-btn"
							>Demo Room
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default withRouter(PlayerForm);
