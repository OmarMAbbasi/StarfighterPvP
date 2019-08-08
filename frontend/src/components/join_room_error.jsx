import React from "react";
import { withRouter } from "react-router-dom";
import backSound from "../style/sounds/InterplanetaryOdyssey.ogg";
const redShip = require("../style/images/redshipfire.png");
const blueShip = require("../style/images/fireshipURL.png");


class JoinRoomError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: "",
            userTag: ""
        };
        this.canvasRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.homeRedirect = this.homeRedirect.bind(this);
    }

    homeRedirect(e) {
        e.preventDefault();
        this.setState({ roomId: "", userTag: "" })
        this.props.history.push({
            pathname: "/",
            action: "createRoom",
            });
    };

    componentDidMount() {
        let canvas = this.canvasRef.current;
        let ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let width = canvas.width;
        let height = canvas.height;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
        let img = new Image();
        let xPos = 0;
        let yPos = Math.floor(height * 0.35);
        img.onload = () => {
            let img2 = new Image();
            let xPos2 = 1500;
            let yPos2 = 800;
            img2.onload = () => {
                setInterval(() => {
                    ctx.save();
                    ctx.clearRect(0, 0, width, height);
                    ctx.fillRect(0, 0, width, height);
                    xPos += 12;
                    xPos2 -= 12;
                    ctx.drawImage(img, xPos, yPos, 80, 61);
                    ctx.drawImage(img2, xPos2, yPos2, 80, 61);

                    ctx.restore();
                    if (xPos > width || yPos > height) {
                        xPos = 0;
                        yPos = Math.floor(height * 0.35);
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
    }


    handleSubmit(e) {
        e.preventDefault();
        let roomId = this.state.roomId;
        if (roomId !== "" && this.state.userTag !== "") {
            this.props.history.push({
                pathname: `/game/${roomId}`,
                type: "joinRoom",
                userTag: this.state.userTag,
                roomId: roomId
            })
        }
    }

    updateType(type) {
        return e => {
            this.setState({ [type]: e.currentTarget.value });
        };
    }

    render() {
        const shownView = () => (
            <h1 className="enter-room">Press enter to continue</h1>
        );

        const errorView = () => (
            <h1 className="error">Room does not exist</h1>
        )

        return (
            <div className="player-form">
                <audio src={backSound} autoPlay loop />
                <canvas
                    ref={this.canvasRef}
                    id="my-canvas"
                ></canvas>

                <form onSubmit={this.handleSubmit} className="player-form">
                    <img
                        className="player-header"
                        src={require("../style/images/logoFinal.png")}
                        alt="logo"
                    />

                    <input
                        className="room-input"
                        type="text"
                        value={this.state.userTag}
                        onChange={this.updateType("userTag")}
                        placeholder="User Tag"
                    />
                    <input
                        className="room-input"
                        type="text"
                        value={this.state.room_id}
                        onChange={this.updateType("roomId")}
                        placeholder="Room ID"
                    />
                    <button className="player-btn" type="submit">
                        Play
					</button>
                    {this.state.roomId && this.state.userTag !== "" ? shownView() : errorView()}
                </form>
                <button id="back-home" onClick={this.homeRedirect}>Create Room Instead?</button>
            </div>
        );
    }
}

export default withRouter(JoinRoomError);
