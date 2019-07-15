import React from "react";
import './style/stylesheets/player_form.css';
import GameContainer from "./components/game_container";
import PlayerContainerNew from './components/player_container_new';
import JoinRoomContainer from './components/player_container_new';
import { Switch, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path='/' component={PlayerContainerNew}/>
				<Route exact path='/join_room' component={JoinRoomContainer}/>
				<Route path='/game' component={GameContainer}/>
			</Switch>
		</div>
	);
}

export default App;
