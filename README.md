# [StarfighterPvP](https://starfight-staging.herokuapp.com/)

![logo](https://github.com/OmarMAbbasi/StarfighterPvP/blob/master/frontend/src/style/images/newLogo.png)

Attention all pilots, man your battlestations! Grab a spaceship and get ready for battle in StarfighterPvp. Challenge your friends, dodge 
asteroids, collect powerups, and find out if you have what it takes to become an ace pilot in this arcade-style game!

## Features
StarfighterPvP comes equipped with everything you will need for an exciting, action-packed, multiplayer space adventure.

* #### Web sockets, which allow for the creation of rooms, where you can invite your friends to play or join a friend's room
* #### Live chat allows for spaceship to spaceship transmission
* #### Powerups, wich players can select at the end of each round, which can help (or hurt) themselves and opponents
* #### Arcade aesthetics, from the graphics to the music. Game music is Interplanetary Odyssey by [Patrick de Arteaga](https://patrickdearteaga.com/arcade-music/) and game images from [Master484](http://m484games.ucoz.com/)
* #### High score list shown at the end of a game. Do you have what it takes to get to the top?

## Requirements
* Node.js
* Express.js
* Axios
* MongoDb

## Run StarfighterPvP locally:
1. Clone github repo

2. Install the dependencies and packages (note: you will need to do npm install in both the root and frontend directories):
  ```
  npm install
  ```
   
 3. Activate the server:
 ```
 npm run dev
 ```
 
 4. Navigate to localhost:3000 in your browser
 
 5. Start using StarfighterPvP
 
## About the Project
An eageer group of four software engineers designed and built StarfighterPvP over five days. A proposal was drafted, which included a 
database schema, a sample-state, timeline, and frontend and backend routes. The work was equally divided and the timeline was 
systematically followed from start to finish, to create an exciting and playable game.

![starfighter](https://github.com/OmarMAbbasi/StarfighterPvP/blob/master/frontend/src/style/images/redshipfire.png)

## The Technology
### Backend
StarfighterPvP is a MERN stack game. The backend is built with MongoDb and Express.js. Backend-frontend integration is achieved through 
axios. We used Socket.io to create web sockets that allow for multiplayer.

#### Session Management
Creating or joining a game is as easy as a mouse click. Gamers have the option to join a demo room and test the game out themselves, or 
they can create a room or join a friends room. The database stores player nicknames and scores to create a high score list shown at the end 
of games.

Here is a snipped from the Player model:

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    tag: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
```

We built web sockets, allowing for multiplayer functionality, with the following code on the backend:

```javascript
	socket.on("joinRoom", data => {
		console.log(data);
		socket.id = Math.random();
		let game = null;
		if (data.type === "createRoom") {
			game = ROOM_LIST[data.roomId] = new Game(data.roomId, socket.id);
			game.startGame();
		} else {
			game = ROOM_LIST[data.roomId];
		}
		let player = game.addPlayer(socket.id, socket, data.userTag, data.roomId);
		if (player) {
			PLAYER_LIST[socket.id] = player;
		} else {
			socket.emit("roomFull", false);
		}
	});

	socket.on("playerInput", data => {
		player = PLAYER_LIST[socket.id];
		player.setInputs(data);
	});
```

This code allows for the creation of rooms, which players can invite their friends to join, as well as the joining of rooms. The game can 
manage multiple multiplayer games at once.

### Frontend

![game](https://github.com/OmarMAbbasi/StarfighterPvP/blob/master/frontend/src/style/images/board.png)

StarfighterPvP's frontend was built using React-Redux. These choices allowed for a unidirectional dataflow, single-source of truth, and 
dynamic state management. Multiplayer was implemented using Socket.io. HTML canvas was used to render the board, game pieces, and 
animations, while CSS was used for styling.

#### Frontend Dependencies
Node package manager (npm) was used to install and save frontend dependencies. Axios was used to interact with the backend API. Other 
frontend dependencies include React-DOM, React DOM-Router, Provider, and Babel.

#### Game
Upon creating or joining a room, the user is brought to the game page, where they have the abililty to dodge and destroy asteroids, 
while battling their friends to get the highest score possible. A single round is two minutes. The player with the highest score 

![splash](https://github.com/OmarMAbbasi/StarfighterPvP/blob/master/frontend/src/style/images/splash.png)

The game class is resonsibile for bringing together all of the states, objects, and elements of the frontend. For example, the following 
function, the ```joinRoom()``` function, manages the creation and joining of rooms:

```javascript
joinRoom() {
		let socket = this.socket;
		const payload = {
			type: this.props.history.location.type,
			userTag: this.props.history.location.userTag,
			roomId: this.props.history.location.roomId
		};
		socket.emit("joinRoom", payload);
	}

```

The above code, which receieves its information from the forms, sends the type to the Socket manager allowing for the proper function to 
be carried out. 

As for rendering our game canvas, we use the following code: 

```javascript
     	drawObj() {
		const can1 = document.getElementById("can1");
		const can1Ctx = can1.getContext("2d");
		const can2 = document.getElementById("can2");
		const can2Ctx = can2.getContext("2d");
		can1Ctx.clearRect(0, 0, 1600, 900);
		can1Ctx.rect(0, 0, 1600, 900);
		can1Ctx.fillStyle = "black";
		can1Ctx.fill();
		let objects = this.players.concat(this.hazards).concat(this.bullets);
		objects.forEach(object => {
			object.draw(can1Ctx, can1);
		});
		// can2Ctx.drawImage(can1, 0, 0);
		requestAnimationFrame(this.drawObj);
	}

```

A problem we encountered early on was that we would get flashing effects on the gamepieces when the canvas was re-drawn. We mitigated 
this problem with the creation of a second overlaying canvas.

Finally, we broadcast player name, score and health live with a sidebar, the code is shown here:
```javascript
		let gamers = this.players;
		const playerList =
			gamers.length !== 0 ? (
				this.players.map(player => {
					return <PlayerListItem key={player.id} player={player} />
				})
			)
```
Score can be negative, as there is a penalty for one's ship blowing up. The healthbar can also change color and style if a player has a 
certain powerup.

#### Hazards

![asteroid](https://github.com/OmarMAbbasi/StarfighterPvP/blob/master/frontend/src/style/images/asteroid1.png)

Dodging and blowing up hazards is necessary for a high score, we created collision logic and hazard movement with the following code:

```javascript
	checkCollision(other) {
		const ctrPointDist = Util.dist(this.pos, other.pos);
		return ctrPointDist < this.radius + other.radius;
	}
	move(deltaTime) {
		this.pos.x += this.vel.x * deltaTime;
		this.pos.y += this.vel.y * deltaTime;

		this.screenWrap();
	}
```

We also gave the hazards random behavior, speed, rotation, spawning location, and size:

```javascript
	randomPosition(radius) {
		let x, y;
		if (this.randomDirection === 1) {
			if (this.vel.x > 0) {
				x = -radius;
			} else {
				x = WIDTH + radius;
			}
			y = Math.floor(Math.random() * HEIGHT);
		} else {
			if (this.vel.y > 0) {
				y = -radius;
			} else {
				y = HEIGHT + radius;
			}
			x = Math.floor(Math.random() * WIDTH);
		}

		return { x, y };
	}

	randomVelocity(min, max) {
		const x =
			Math.floor(Math.random() * (max - min) + min) * this.randomDirection();
		const y =
			Math.floor(Math.random() * (max - min) + min) * this.randomDirection();
		return { x, y };
	}
	
	randomDirection() {
		return Math.random() * 2 > 1 ? 1 : -1;
	}
	
	randomRadius(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}

	randomRotation() {
		let rads = Math.random() * Math.PI * 2;
		return { x: Math.cos(rads), y: Math.sin(rads) };
	}

```

With the above code, asteroids are generated on demand, which can make (or break) a player's score.

## Future Directions
While we are proud of our work thus far, we want to add MANY more features to the game:
* More hazards, including UFOs that shoot, stars, and comets.
* In-game temporary powerups, like the Super Star in Nintendo's Super Mario Bros.
* Coop-mode






# StarfighterPvP

## Background and Overview
Calling all astronauts! Step into a spaceship and play StarfighterPvP, an arcade-style game, which one can play with up to three friends. Pilot a spaceship dodging moving hazards, from asteroids to Sputnik 1, all while trying to destroy each other's ships. The game will be played over several rounds, and points will be rewarded for each ship you destroy. Crash your spaceship? You will respawn, but it will cost you points.

Between rounds, players will be able to choose from a list of powerups that can affect players and hazards alike, from faster space objects to reversed controls! The player with the most points at the end of all of the rounds will be declared the winner, and enshrine his or her status as a first-class spaceship pilot.

Finally, the top all-time scores will be displayed for anyone playing the game to see. Do you have what it takes to crack the top ten?

## Functionality & MVP
* Models: From a backend perspective, we do not have much except for a player model. We do not have user authentication, but we will have a player model, which is used to keep track of the best scores. It stores both the tag of the player, which does not need to be unique, as well as their score. It will be queried at the end of every game so as to display the top all-time scores.
* Routes: For the reasons mentioned above, we do not have many backend routes, except for ones that create and store players in the database for the purposes of getting the top all-time high scores. Most of our game functionality is managed on the frontend.
* Axios api calls: Used to integrate the backend and frontend so we can query the database for the top all-time scores every time a game ends. They will be limited to the player model.
* Redux and State Management: Redux is used to build out and manage our state, a sample of which is shown here:
```javascript
{
  "entities": {
    "players": [
      {
        "id": 1,
        "pos": [x, y],
        "score": 1000,
        "image": "ship.svg",
        "color": "red"
      }
    ],
    "hazards": [
      {
        "pos": [x, y],
        "image": "hazard.png"
      }
    ],
    "bullets": [
      {
        "pos": [x, y],
        "image": "bullet.svg",
        "color": "red"
      }
    ]
  },
  "ui": {
    "timeLeft": 120,
    "roundsLeft": 5
  }
}
```
Within entities, players, hazards, and bullets are stored in arrays, allowing for faster and easier indexing, removal, and addition operations As for the ui slice of state, its goal is to manage the game's logistics. Each round is timed at 120 seconds, and each game is five rounds total. We manage our state with the full redux cycle, featuring actions, reducers, middleware, and the store.
* Components: We use an index file as our entrypoint, a Root component with Provider and Hashrouter, an App component. Within the App component is our frontend routes and containers for components, which integrate React and Canvas to create the gameboard. We have one major component, a canvas-drawn gameboard, and functions to draw the board and manage gameplay. 
* Socket.io: Multiple multiplayer games can occur simultaneously. Along those lines, we are using web sockets to allow for this functionality.
* Game logic: Our game logic will be on the frontend, and will actively manage player movement, health, and score, current powerups, object behavior, collision logic, and overall game rules.

## Technologies and Technological Challenges
We primarily used the full MERN stack to construct this game. On the backend, we use MongoDB to store player tags and scores and Node.js to develop it. Routing was accomplished using Express.js. API calls were made using Axios, allowing for interaction between our frontend and backend database. State was managed through Redux, and the frontend was created using a combination of React and Canvas. We added multiplayer functionality using web sockets with Socket.io.

## Technological Challenges:
* Allowing for simultaneous multiplayer games using Socket.io.
* Creating powerups that can affect players and game rules separately and function for single rounds
* Using Canvas to draw and create an immersive, interactive, and engaging game experience
* Figuring out how to tailor the collision logic to work for triangular spaceshipsand other non-circular objects

## Things Accomplished Over the Weekend
* Created the Player model and routes, and testing and confirming that functionality in Postman
* Connect the backend and the frontend with Axios api calls
* Built out the entire Redux Cycle so we could see our state on the window and use it in our components
* Get web sockets up and running
* Draw out the game board with Canvas and integrate it into a React component
* Write this readMe proposal
* create a splash page

## Group Members and Work Breakdown (tasks in chronological from the start to the end of the project)
* Sam Walker: player model/components with canvas (weekend), game logic/game component (mon, tues), readMe (tues)
* Michael Du: web sockets/game logic (weekend), web sockets/components (mon tues), styling (tues)
* Matt DeShaw: routes/redux/splash component (weekend), game over component/styling/canvas (mon, tues), readMe (tues)
* Omar Abassi: version control/configuration (friday), game logic/web sockets (weekend), web sockets-canvas integration (mon, tues)
