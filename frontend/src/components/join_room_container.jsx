import { closeModal, openModal } from "../actions/modals";
import { connect } from "react-redux";
import JoinRoom from "./join_room";

const mapDispatchToProps = dispatch => ({
	closeModal: () => dispatch(closeModal()),
	openModal: modal => dispatch(openModal(modal))
});

export default connect(
	null,
	mapDispatchToProps
)(JoinRoom);
