import React from 'react';
import { withRouter } from 'react-router-dom';

class PlayerFormNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
            score: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createRoomSubmit(e) {
        e.preventDefault();
        this.props.history.push('/game');
    };

    joinRoomSubmit(e) {
        e.preventDefault();
        this.props.history.push('/join_room') //url/game code
    };

    updateType(type) {
        return (e) => {
            this.setState({ [type]: e.currentTarget.value })
        }
    }
    render() {
        // const shownView = () => (
        //     <h1 className='enter-tag'>Press enter to continue</h1>
        // );

        return (
            <div className='player-form-parent'>
                <form className='player-form'>
                    <img className='player-header' src={require('../style/images/logoFinal.png')} alt="logo" width='1200' height='332' />
                    <img className='red-ship' src={require('../style/images/redshipfire.png')} alt="redShip" width='250' height='191' />
                    <img className='red-blast1' src={require('../style/images/redblast.png')} alt="redblast1" width='200' height='131' />
                    <img className='red-blast2' src={require('../style/images/redblast.png')} alt="redblast2" width='200' height='131' />
                    <img className='ast-1' src={require('../style/images/asteroid1.png')} alt="ast1" width='250' height='191' />
                    <img className='ast-2' src={require('../style/images/asteroid2.png')} alt="ast2" width='250' height='191' />
                    
                    <button  onClick={this.createRoomSubmit} className='create-room'>Create Room</button>
                    <button className='join-room'>Join Room</button>

{/* 
                    <input className='player-input' type="text" value={this.state.tag} onChange={this.updateType("tag")} placeholder="name" />
                    <button className='player-btn' type="submit">Play</button>
                    {this.state.tag !== '' ? shownView() : null} */}
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

export default withRouter(PlayerFormNew);
