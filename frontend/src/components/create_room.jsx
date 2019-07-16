import React from 'react';
import { withRouter } from 'react-router-dom';
import backSound from "../style/sounds/InterplanetaryOdyssey.ogg";
import { createRoom } from '../utils/room_util';

class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.tag !== '') {
            this.props.closeModal();
            createRoom()
                .then((res) => {
                    this.props.history.push(`/game/${res.data.gameId}`)
                })
        };
    };

    updateType(type) {
        return (e) => {
            this.setState({ [type]: e.currentTarget.value })
        }
    }

    render() {
        const shownView = () => (
            <h1 className='enter-room'>Press enter to continue</h1>
        );

        return (
            <div className='player-form'>
                <audio src={backSound} autoPlay loop />

                <form onSubmit={this.handleSubmit} className='player-form'>
                    <img className='player-header' src={require('../style/images/logoFinal.png')} alt="logo" width='1200' height='332' />

                    <input className='room-input' type="text" value={this.state.tag} onChange={this.updateType("tag")} placeholder="nickname" />
                    <button className='player-btn' type="submit">Play</button>
                    {this.state.tag !== '' ? shownView() : null}
                </form>
            </div>
        );
    }

}

export default withRouter(CreateRoom);
