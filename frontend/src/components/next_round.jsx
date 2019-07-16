import React from 'react';
import backSound from "../style/sounds/InterplanetaryOdyssey.ogg";

class NextRound extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    };

    componentDidMount() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#069304"
        ctx.stroke();
    }
    

    render() {
        return (
            <div className='player-form'>
                <canvas ref={this.canvasRef} width='1600' height='900' />
                <audio src={backSound} autoPlay loop />
                <h1 className='round-over'>Round Over</h1>
                <h2 className='player score'>Player 1: </h2>
                <h2 className='player score'>Player 2: </h2>
            </div>
        );
    }

}

export default NextRound;
