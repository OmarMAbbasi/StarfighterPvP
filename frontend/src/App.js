import React from "react";
// import logo from "./logo.svg";
// import './App.css'
import './style/stylesheets/player_form.css';
import GameContainer from "./components/game_container";
import PlayerContainer from './components/player_container';
import { Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				</header> */}
			<Switch>
				<Route exact path='/' component={PlayerContainer}/>
				<Route path='/game' component={GameContainer}/>
			</Switch>
		</div>
	);
}

export default App;
