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
We used many technologies to construct this game, the full MERN Stack. On the backend, we use MongoDB to store player tags and scores and Node.js to develop it. Routing was accomplished using Express.js. API calls were made using Axios, allowing for interaction between our frontend and backend database. State was managed through Redux, and the frontend was created using a combination of React and Canvas. We added multiplayer functionality using web sockets with Socket.io.

Technological Challenges:
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
* Write this readMe

## Group Members and Work Breakdown
* Sam Walker: Model, readMe, Canvas, components
* Michael Du: Game logic, web sockets, sample state
* Matt DeShaw: Routes, Redux, Axios, readMe
* Omar Abassi: Web sockets, version control, configuration
