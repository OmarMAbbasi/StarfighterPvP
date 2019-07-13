import { combineReducers } from 'redux';
import scoresReducer from './scores_reducer';

export default combineReducers({
    scores: scoresReducer
});