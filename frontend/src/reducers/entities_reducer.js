import { combineReducers } from 'redux';
import playersReducer from './players_reducer';

export default combineReducers({
    players: playersReducer
});