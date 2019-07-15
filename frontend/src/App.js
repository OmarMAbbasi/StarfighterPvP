import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from 'react-router-dom';
import PlayerContainer from './components/player_container';

function App() {
	return (
		<div className="App">
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a> */}
			{/* </header> */}

			<Switch>
				<Route to='/' component={PlayerContainer}/>
				{/* <Route to='/game' component={GameCntainer}/> */}
			</Switch>
		</div>
	);
}



export default App;
