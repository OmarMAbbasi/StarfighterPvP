import { closeModal } from '../actions/modals';
import { connect } from 'react-redux';
import JoinRoom from './join_room';
 

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
}); 

export default connect(null, mapDispatchToProps)(JoinRoom);