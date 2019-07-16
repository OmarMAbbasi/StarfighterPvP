import { closeModal } from "../actions/modals";
import { connect } from "react-redux";
import CreateRoom from "./create_room";

const mapDispatchToProps = dispatch => ({
	closeModal: () => dispatch(closeModal())
});

export default connect(
	null,
	mapDispatchToProps
)(CreateRoom);
