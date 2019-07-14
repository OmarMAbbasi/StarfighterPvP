import React from 'react';
import MovingObject from '../classes/movingObject';

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = { test: new MovingObject([500, 500], [1, 1], 10),
            test2: new MovingObject([490, 490], [100, 100], 15)
        }

        this.canvasRef = React.createRef();
        this.handleMove = this.handleMove.bind(this);
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.state.test.draw(ctx);
        this.state.test2.draw(ctx);
    }



    render() {
    
        return(
        <div>
            <canvas ref={this.canvasRef} width={1600} height={900} />
        </div>  
        );
    }
}

export default Canvas;