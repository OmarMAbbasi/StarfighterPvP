import React from 'react';
import { withRouter } from 'react-router-dom';
import backSound from "../style/sounds/InterplanetaryOdyssey.ogg";

class JoinRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            room_id: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.room_id !== '') {
            this.props.closeModal()
            .then(this.props.history.push('/game'))
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
<<<<<<< HEAD
                    {/* <img className='ast-1' src={require('../style/images/asteroid1.png')} alt="ast1" width='250' height='191' />
                    <img className='ast-2' src={require('../style/images/asteroid2.png')} alt="ast2" width='250' height='191' /> */}
=======
>>>>>>> ConnecSockets

                    <input className='room-input' type="text" value={this.state.room_id} onChange={this.updateType("room_id")} placeholder="room id" />
                    <button className='player-btn' type="submit">Play</button>
                    {this.state.room_id !== '' ? shownView() : null}
                </form>
            </div>
        );
    }

}

export default withRouter(JoinRoom);
