import { connect } from 'react-redux';
import PlayerForm from './player_form';
import { createPlayer } from '../actions/players';
import { openModal } from '../actions/modals';
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
    modal: state.ui.modal
});


const mapDispatchToProps = dispatch => ({
    createPlayer: player => dispatch(createPlayer(player)),
    openModal: modal => dispatch(openModal(modal))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayerForm)); 