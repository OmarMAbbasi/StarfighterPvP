import { connect } from 'react-redux';
import Game from './game';

const mapSTP = state => {

    return ({
        players: state.players,
        hazards: state.hazards,
        bullets: state.bullets,
        timeLeft: state.ui.timeLeft,
        roundsLeft: state.ui.roundsLeft
    })
}

export default connect(mapSTP)(Game);