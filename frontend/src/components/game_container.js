import { connect } from "react-redux";
import Game from "./game";
// import MovingObject from "../classes/movingObject";
import Player from "../classes/player";
import Hazard from "../classes/hazard";
import Bullet from "../classes/bullet";

const mapSTP = state => {
	let player1 = new Player({ x: 400, y: 400 }, 1, { x: 0.6, y: 0.2 });
	let player2 = new Player({ x: 600, y: 405 }, 2, { x: 0, y: 1 });
	let hazard1 = new Hazard({ x: 300, y: 300 }, 40);
	let bullet1 = new Bullet({ x: 700, y: 400 }, { x: 0, y: 0 }, 5, 1, 10);

	return {
		players: [player1, player2],
		hazards: [hazard1],
		bullets: [bullet1],
		timeLeft: 120,
		roundsLeft: 5
	};
};

export default connect(mapSTP)(Game);
