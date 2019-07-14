import { connect } from 'react-redux';
import Game from './game';
import MovingObject from '../classes/movingObject';

const mapSTP = state => {
    let test = new MovingObject([400, 400], [25, 25], 15)
    
    return ({
        // players: state.players,
        hazards: [test],
        // bullets: state.bullets,
        timeLeft: 120,
        roundsLeft: 5
    })
}

export default connect(mapSTP)(Game);