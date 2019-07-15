import React from "react";
// import logo from "./logo.svg";
import "./App.css";
<<<<<<< HEAD
import { Route, Switch } from 'react-router-dom';
import PlayerContainer from './components/player_container';
=======
import SocketTest from "./components/sockettest";
import GameContainer from "./components/game_container";
>>>>>>> 4d133652e6012d45f9aaff3904f445a2b174ab88

function App() {
	return (
		<div className="App">
<<<<<<< HEAD
			{/* <header className="App-header">
=======
			<SocketTest />
			<header className="App-header">
>>>>>>> 4d133652e6012d45f9aaff3904f445a2b174ab88
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
<<<<<<< HEAD
			{/* </header> */}

			<Switch>
				<Route to='/' component={PlayerContainer}/>
				{/* <Route to='/game' component={GameCntainer}/> */}
			</Switch>
=======
			</header>
>>>>>>> 4d133652e6012d45f9aaff3904f445a2b174ab88
		</div>
	);
}

export default App;
