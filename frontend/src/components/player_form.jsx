import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from './components/modal';

class PlayerForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateRoom = this.handleCreateRoom.bind(this)
    }

    handleCreateRoom(e) {
        e.preventDefault();
        this.props.history.push("/game")
    };

    render() {
        return (
            <div className='player-form-parent'>
                <Modal/>
                <form className='player-form'>
                    <img className='player-header' src={require('../style/images/logoFinal.png')} alt="logo" width='1200' height='332' />
                    <img className='red-ship' src={require('../style/images/redshipfire.png')} alt="redShip" width='250' height='191' />
                    <img className='red-blast1' src={require('../style/images/redblast.png')} alt="redblast1" width='200' height='131' />
                    <img className='red-blast2' src={require('../style/images/redblast.png')} alt="redblast2" width='200' height='131' />
                    <img className='ast-1' src={require('../style/images/asteroid1.png')} alt="ast1" width='250' height='191' />  
                    <img className='ast-2' src={require('../style/images/asteroid2.png')} alt="ast2" width='250' height='191'  />  
                    
                    <button onClick={this.handleCreateRoom} className='room-btn'>Create Room</button>
                    <button onClick={this.props.openModal("joinRoom")} className='room-btn'>Join Room</button>

                </form>
                <img className='star1' src={require('../style/images/star1.png')} alt="star1" width='250' height='191' />
                <img className='star2' src={require('../style/images/star2.png')} alt="star2" width='250' height='191' />
                <img className='star3' src={require('../style/images/star3.png')} alt="star3" width='250' height='191' />
                <img className='blue-ship' src={require('../style/images/fireshipURL.png')} alt="blueShip" width='250' height='191' />
                <img className='blue-blast1' src={require('../style/images/blueblast.png')} alt="blueblast1" width='200' height='131' />
                <img className='blue-blast2' src={require('../style/images/blueblast.png')} alt="blueblast2" width='200' height='131' />
            </div>
        );
    }

}

export default withRouter(PlayerForm);
