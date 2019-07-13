import React from 'react';
import logo from './logo.svg';
import './App.css';

const bodyParser = require('body-parser');
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());

//adding the highscores route
const highscores = require("./routes/api/highscores");
App.use('api/highscores', highscores)


function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        </a>
      </header>
    </div>
  );
}

export default App;
