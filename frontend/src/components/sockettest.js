import React, { Component } from "react";
import io from "socket.io-client";

const socketURL = "http://192.168.2.52:2000";

export default class SocketTest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			socket: null,
			SOCKET_LIST: {}
		};
	}

	openSocket = () => {
		const socket = io(socketURL);
		SocketTest.on("connect", () => {
			console.log("Connected");
		});

		this.setstate({ socket: { socket } });
	};

	render() {
		return <div></div>;
	}
}
