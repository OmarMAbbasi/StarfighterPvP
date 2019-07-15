import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import SocketTest from "./components/sockettest";
import GameContainer from "./components/game_container";
import PlayerContainer from './components/player_container';
import { Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<SocketTest />
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				</header> */}
			<Switch>
				<Route to='/' component={PlayerContainer}/>
				<Route to='/game' component={GameContainer}/>
			</Switch>
		</div>
	);
}

export default App;
