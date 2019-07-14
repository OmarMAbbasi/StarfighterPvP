import React, { Component } from "react";
import io from "socket.io-client";

const socketURL = "http://localhost:5000";

class SocketTest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			socket: null,
			SOCKET_LIST: {}
		};
	}

	componentWillMount() {
		this.openSocket();
	}

	emitPayload = payload => {
		const { socket } = this.state;
		socket.emit("msg", { msg: "hello" });
	};

	openSocket = () => {
		const socket = io(socketURL);
		socket.on("connect", () => {
			// socket.on("msg", () => console.log("msg"));

			// socket.id = Math.random();
			// socket.x = 0;
			// socket.y = 0;
			console.log("Ayyy! Websockets!");
		});

		this.setState({ socket: { socket } });
	};

	render() {
		return <div></div>;
	}
}

export default SocketTest;
