import { connect } from "react-redux";
import HighScore from "./high_score";
import { selectBestPlayers } from "../reducers/selectors";
import { fetchPlayers, createPlayer } from "../actions/players";

const mapSTP = (state, ownProps) => {
	const bestPlayers = selectBestPlayers(state) || [];
	return {
		players: bestPlayers
	};
};

const mapDTP = dispatch => ({
	fetchPlayers: () => dispatch(fetchPlayers()),
	createPlayer: player => dispatch(createPlayer(player))
});

export default connect(
	mapSTP,
	mapDTP
)(HighScore);
