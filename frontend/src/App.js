import React from "react";
import './style/stylesheets/css-reset.css';
import './style/stylesheets/player_form.css';
import './style/stylesheets/game_over.css';
import './style/stylesheets/game.css';
import GameContainer from "./components/game_container";
import GameOverContainer from "./components/game_over_container";
import PlayerContainer from './components/player_container';
import JoinRoomErrorContainer from './components/join_room_error_container';
import { Switch, Route } from 'react-router-dom';


function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path='/' component={PlayerContainer} />
				<Route exact path='/game/error' component={JoinRoomErrorContainer} />
				<Route path='/gameover' component={GameOverContainer} />
				<Route path='/join/:gameId' component={PlayerContainer} />
				<Route exact path='/game/:gameId' component={GameContainer} />
			</Switch>
		</div>
	);
}

export default App;
