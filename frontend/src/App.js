import React from "react";
import './style/stylesheets/player_form.css';
import './style/stylesheets/game_over.css';
import GameContainer from "./components/game_container";
import GameOverContainer from "./components/game_over_container";
import PlayerContainer from './components/player_container';
import { Switch, Route } from 'react-router-dom';

function App() {
	return (
		
		<div className="App">
			<Switch>
				<Route exact path='/' component={PlayerContainer}/>
				<Route exact path='/gameover' component={GameOverContainer}/>
				<Route path='/game/:gameId' component={GameContainer} />
			</Switch>
		</div>
	);
}

export default App;
