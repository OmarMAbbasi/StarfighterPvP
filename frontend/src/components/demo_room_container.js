import { closeModal } from '../actions/modals';
import { connect } from 'react-redux';
import DemoRoom from './demo_room';


const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(null, mapDispatchToProps)(DemoRoom);