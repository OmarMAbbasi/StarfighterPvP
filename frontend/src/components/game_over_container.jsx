import { connect } from "react-redux";
import GameOver from "./game_over";
import { selectBestPlayers } from '../reducers/selectors';
import { fetchPlayers, createPlayer } from '../actions/players';

const mapSTP = (state, ownProps) => {
    const bestPlayers = selectBestPlayers(state) || [];
    return ({
        players: bestPlayers
    });
}

const mapDTP = dispatch => ({
    fetchPlayers: () => dispatch(fetchPlayers()),
    createPlayer: (player) => dispatch(createPlayer(player))
});

export default connect(mapSTP, mapDTP)(GameOver);
