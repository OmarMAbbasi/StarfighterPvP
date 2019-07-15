import { combineReducers } from 'redux';
import gameReducer from './game_reducer';
import modalReducer from './modal_reducer';

export default combineReducers({
    game: gameReducer,
    modal: modalReducer
});