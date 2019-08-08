import { closeModal, openModal } from "../actions/modals";
import { connect } from "react-redux";
import CreateRoom from "./create_room";

const mapDispatchToProps = dispatch => ({
	closeModal: () => dispatch(closeModal()),
	openModal: modal => dispatch(openModal(modal))
});

export default connect(
	null,
	mapDispatchToProps
)(CreateRoom);
