import { connect } from "react-redux";
import Game from "./game";
import Player from "../classes/player";
// import Hazard from "../classes/hazard";
import Bullet from "../classes/bullet";
import { closeModal, openModal } from '../actions/modals';

const mapSTP = state => {
	let player1 = new Player({ x: 400, y: 400 }, 1, { x: 0.6, y: 0.2 });
	let player2 = new Player({ x: 600, y: 405 }, 2, { x: 0, y: 1 });
	let bullet1 = new Bullet({ x: 700, y: 400 }, { x: 0, y: 0 }, 5, 1, 10);
	return {
		players: [player1, player2],
		bullets: [bullet1],
		hazards: [],
		timeLeft: 120,
		roundsLeft: 5,
		modal: state.ui.modal
	};
}

const mapDTP = dispatch => ({
	openModal: modal => dispatch(openModal(modal)),
	closeModal: () => dispatch(closeModal())
});


export default connect(mapSTP, mapDTP)(Game);
