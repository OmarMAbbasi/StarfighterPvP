<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import configureStore from './store/store';


document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById("root")
    const store = configureStore();
    
    window.store = store;

    ReactDOM.render(<Root store={store} />, root);
})

=======
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(<App />, document.getElementById("root"));
});
>>>>>>> a90e53c9ee637a61a54b92a54af82c6488693975
