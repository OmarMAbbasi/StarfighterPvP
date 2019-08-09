import { closeModal } from "../actions/modals";
import { connect } from "react-redux";
import JoinRoomError from "./join_room_error";

const mapDispatchToProps = dispatch => ({
	closeModal: () => dispatch(closeModal())
});

export default connect(
	null,
	mapDispatchToProps
)(JoinRoomError);
