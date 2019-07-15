import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import Root from "./Root";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root");
	const store = configureStore();

	window.store = store;

	ReactDOM.render(<Root store={store} />, root);
});
