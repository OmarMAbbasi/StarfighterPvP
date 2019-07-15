import React from 'react';
import { closeModal } from '../actions/modals';
import { connect } from 'react-redux';
import JoinRoomContainer from './join_room_container';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }

    let component;
    switch (modal) {
        case 'joinRoom':
            component = <JoinRoomContainer />;
            break;
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
