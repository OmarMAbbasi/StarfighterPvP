import { closeModal } from '../actions/modals';
import { connect } from 'react-redux';
import NextRound from './next_round';

// const mapStateToProps = (state, ownProps) => ({
//     roundsLeft = 
// });

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(null, mapDispatchToProps)(NextRound);