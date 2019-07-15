import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SocketTest from "./components/sockettest";
import GameContainer from "./components/game_container";

function App() {
	return (
		<div className="App">
			<SocketTest />
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<GameContainer />
				{/* <a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a> */}
			</header>
		</div>
	);
}

export default App;
