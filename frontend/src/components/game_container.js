import { connect } from "react-redux";
import Game from "./game";
import Player from "../classes/player";

const mapSTP = state => {
    let test = new Player({ x: 400, y: 400 }, 1, { x: 1.4, y: 0.2});
    let test2 = new Player({ x: 600, y: 405 }, 2, { x: -1.4, y: 0.2 });

	return {
		players: [test, test2],
		// hazards: [test, test2],
		// bullets: state.bullets,
		timeLeft: 120,
		roundsLeft: 5
	};
};

export default connect(mapSTP)(Game);
