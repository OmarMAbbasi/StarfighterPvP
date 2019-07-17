import React from 'react';
import { withRouter } from 'react-router-dom';
import backSound from "../style/sounds/InterplanetaryOdyssey.ogg";
import TopPlayer from './top_player';
import PlayerListItemScores from './player_list_item_scores'

const redShip = require('../style/images/redshipfire.png');
const blueShip = require('../style/images/fireshipURL.png');

class GameOver extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.winningPlayer = this.getWinner();
    }

    getWinner() {
        let scores = [];
        this.props.location.players.forEach(player => {
            scores.push(player.totalScore)
        });
        let topScore = Math.max(...scores);
        let idx = scores.indexOf(topScore);
        return this.props.location.players[idx].id
    };

    componentDidMount() {
        this.props.fetchPlayers()
            let canvas = this.canvasRef.current;
            let ctx = canvas.getContext("2d");
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, 1600, 900);
            let img = new Image();
            let xPos = 0;
            let yPos = 210;
            img.onload = () => {
                let img2 = new Image();
                let xPos2 = 1500;
                let yPos2 = 800;
                img2.onload = () => {
                    setInterval(() => {
                        ctx.save();
                        ctx.clearRect(0, 0, 1600, 900);
                        ctx.fillRect(0, 0, 1600, 900);
                        xPos += 12;
                        xPos2 -= 12;
                        ctx.drawImage(img, xPos, yPos, 80, 61);
                        ctx.drawImage(img2, xPos2, yPos2, 80, 61);

                        ctx.restore();
                        if (xPos > 1600 || yPos > 900) {
                            xPos = 0;
                            yPos = 210;
                        }

                        if (xPos2 < 0) {
                            xPos2 = 1500;
                        }

                        if (yPos2 < 0) {
                            yPos2 = 800;
                        }
                    }, 100 / 3);
                };
                img2.src = blueShip;
            };
            img.src = redShip;
        this.getWinner()

        }


    render() {
        if (!this.props.players) {
            return <div>Loading...</div>
        }

        const topPlayers = this.props.players;
        const playerList = topPlayers.length !== 0 ?
            topPlayers.slice(0, 10).map(player => {
                return(
                    <TopPlayer
                    key={player.id}
                    player={player}
                    />
                );
            })
            : null;

        const currentPlayers = this.props.location.players.map(player => {
            let victor;
            if (this.winningPlayer === player.id) {
                victor = true
            } else {
                victor = false
            }
            return(
                <PlayerListItemScores
                    key={player.id}
                    tag={player.playerTag}
                    score={player.totalScore}
                    winner={victor}
                />
            );
        })

        return (
            <div className='game_over'>
                <canvas ref={this.canvasRef} id="my-canvas" width='1600' height='900' ></canvas>
                    <audio src={backSound} autoPlay loop />
                <div className='other-ele'>
                    <div className='winner-announcement'>
                        {currentPlayers}
                    </div>
                    <ul className='high-scorers'>
                        <h2>Astronaut Hall of Fame</h2>
                        {playerList}
                    </ul>
                    </div>
            </div>
        );
    }

}

export default withRouter(GameOver);
