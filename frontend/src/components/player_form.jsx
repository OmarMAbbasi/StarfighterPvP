import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from './modal';
const redShip = require('../style/images/redshipfire.png');
const blueShip = require('../style/images/fireshipURL.png');

class PlayerForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        let canvas = this.canvasRef.current;
        let ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 1600, 900);
        let img = new Image();
        let xPos = 0;
        let yPos = 0;
            img.onload = () => {
                setInterval(() => {
                    ctx.save();
                    ctx.clearRect(0, 0, 1600, 900);
                    ctx.fillRect(0, 0, 1600, 900);
                    xPos += 10;
                    yPos += 10;
                    ctx.rotate(0.25);
                    ctx.drawImage(img, xPos, yPos, 80, 61);
                    ctx.restore();
                    if (xPos > 1600 || yPos > 900) {
                        xPos = 0;
                        yPos = 0;
                    };
                }, 100 / 3)
            };
            img.src = redShip;
    }



    handleCreateRoom(e) {
        e.preventDefault();
        this.props.history.push("/game")
    };
    
    render() {
        return (
            <div className='player-form-parent'>
                <canvas ref={this.canvasRef} id="my-canvas" width='1600' height='900' ></canvas>

                { this.props.modal ? <Modal /> :      
                <form className='player-form'>
                    <img className='player-header' src={require('../style/images/logoFinal.png')} alt="logo" width='1200' height='332' />
                    {/* <img className='red-ship' src={require('../style/images/redshipfire.png')} alt="redShip" width='250' height='191' /> */}
                    <img className='red-blast1' src={require('../style/images/redblast.png')} alt="redblast1" width='200' height='131' />
                    <img className='red-blast2' src={require('../style/images/redblast.png')} alt="redblast2" width='200' height='131' />
                    <img className='ast-1' src={require('../style/images/asteroid1.png')} alt="ast1" width='250' height='191' />  
                    <img className='ast-2' src={require('../style/images/asteroid2.png')} alt="ast2" width='250' height='191'  />  
                    
                    <button onClick={this.handleCreateRoom} className='room-btn'>Create Room</button>
                    <button onClick={() => this.props.openModal("joinRoom")} className='room-btn'>Join Room</button>
                    
                </form>
                }
                <img className='star1' src={require('../style/images/star1.png')} alt="star1" width='250' height='191' />
                <img className='star2' src={require('../style/images/star2.png')} alt="star2" width='250' height='191' />
                <img className='star3' src={require('../style/images/star3.png')} alt="star3" width='250' height='191' />
                {/* <img id='blue-ship' src={require('../style/images/blueship.png')} onMouseOver={this.animateScript} alt="blueShip" width='250' height='191' /> */}
                <img className='blue-blast1' src={require('../style/images/blueblast.png')} alt="blueblast1" width='200' height='131' />
                <img className='blue-blast2' src={require('../style/images/blueblast.png')} alt="blueblast2" width='200' height='131' />
                </div>
        );
    }

}

export default withRouter(PlayerForm);
