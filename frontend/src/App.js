import React from "react";
import './style/stylesheets/player_form.css';
import GameContainer from "./components/game_container";
import PlayerContainer from './components/player_container';
import JoinRoomContainer from './components/player_container_new';
import { Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path='/' component={PlayerContainer}/>
				<Route exact path='/join_room' component={JoinRoomContainer}/>
				<Route path='/game' component={GameContainer}/>
			</Switch>
		</div>
	);
}

export default App;
