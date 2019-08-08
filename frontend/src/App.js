import React from "react";
import './style/stylesheets/css-reset.css';
import './style/stylesheets/player_form.css';
import './style/stylesheets/game_over.css';
import './style/stylesheets/game.css';
import GameContainer from "./components/game_container";
import GameOverContainer from "./components/game_over_container";
import PlayerContainer from './components/player_container';
import JoinRoomErrorContainer from './join_room_error_container';
import { Switch, Route } from 'react-router-dom';


function App() {
	return (
		<div className="App">
			<Switch>
				<Route exact path='/' component={PlayerContainer}/>
				<Route path='/gameover' component={GameOverContainer} />
				<Route exact path='/game/:gameId' component={GameContainer} />
				<Route exact path='/game/error' component={JoinRoomErrorContainer} />
			</Switch>
		</div>
	);
}

export default App;
