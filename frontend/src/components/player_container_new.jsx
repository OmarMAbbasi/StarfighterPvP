import { connect } from 'react-redux';
import PlayerFormNew from './player_form';
import { createPlayer } from '../actions/players';

const mapDispatchToProps = dispatch => ({
    createPlayer: player => dispatch(createPlayer(player)),
});

export default connect(null, mapDispatchToProps)(PlayerFormNew); 