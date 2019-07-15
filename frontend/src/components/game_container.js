import { connect } from "react-redux";
import Game from "./game";
const MovingObject = require("../classes/movingObject");
// import MovingObject from "../classes/movingObject";

const mapSTP = state => {
	let test = new MovingObject({ x: 400, y: 400 }, { x: 25, y: 25 }, 15);

	return {
		// players: state.players,
		hazards: [test],
		// bullets: state.bullets,
		timeLeft: 120,
		roundsLeft: 5
	};
};

export default connect(mapSTP)(Game);
