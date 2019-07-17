import React from "react";
import { withRouter } from "react-router-dom";
import { createRoom } from "../utils/room_util";
import backSound from "../style/sounds/InterplanetaryOdyssey.ogg";

class DemoRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userTag: "Demo"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let roomId = "";
        if (this.state.userTag !== "") {
            let userTag = this.state.userTag;
            this.props.closeModal();
            createRoom().then(res => {
                roomId = res.data.gameId;
                this.props.history.push({
                    pathname: `/game/${roomId}`,
                    type: "createRoom",
                    userTag: userTag,
                    roomId: roomId
                });
            });
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

        window.addEventListener("keydown", (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                this.handleSubmit(e);
            }
        });
        return (
            <div className="player-form">
                <audio src={backSound} autoPlay loop />
                <form id="form" onSubmit={this.handleSubmit} className="player-form">
                    <img
                        className="player-header"
                        src={require("../style/images/logoFinal.png")}
                        alt="logo"
                        width="1200"
                        height="332"
                    />
                    {/* <img className='ast-1' src={require('../style/images/asteroid1.png')} alt="ast1" width='250' height='191' />
                    <img className='ast-2' src={require('../style/images/asteroid2.png')} alt="ast2" width='250' height='191' /> */}

                    <input
                        className="room-input"
                        type="text"
                        value={this.state.userTag}
                        onChange={this.updateType("userTag")}
                        placeholder="nickname"
                    />
                    <button className="player-btn" type="submit">
                        Play
					</button>
                    {this.state.userTag !== "" ? shownView() : null}
                </form>
            </div>
        );
    }
}

export default withRouter(DemoRoom);
