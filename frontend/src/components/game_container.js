import { connect } from "react-redux";
import Game from "./game";
import MovingObject from "../classes/movingObject";

const mapSTP = state => {
    let test = new MovingObject({ x: 400, y: 400 }, { x: 25, y: 25 }, 20);
    let test2 = new MovingObject({ x: 600, y: 405 }, { x: 25, y: 25 }, 11);

	return {
		// players: state.players,
		hazards: [test, test2],
		// bullets: state.bullets,
		timeLeft: 120,
		roundsLeft: 5
	};
};

export default connect(mapSTP)(Game);
