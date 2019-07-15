import { connect } from 'react-redux';
import PlayerForm from './player_form';
import { createPlayer } from '../actions/players';
import { openModal } from '../actions/modals';

const mapDispatchToProps = dispatch => ({
    createPlayer: player => dispatch(createPlayer(player)),
    openModal: modal => dispatch(openModal(modal))
});

export default connect(null, mapDispatchToProps)(PlayerForm); 