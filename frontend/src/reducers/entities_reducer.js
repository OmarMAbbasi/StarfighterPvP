import { combineReducers } from 'redux';
import playersReducer from './players_reducer';
import hazardsReducer from './hazards_reducer';

export default combineReducers({
    players: playersReducer,
    hazards: hazardsReducer
});