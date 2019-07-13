import { RECEIVE_ALL_SCORES, RECEIVE_SCORE  } from '../actions/scores';

const scoresReducer = (state = {}, action) => {
    Object.freeze();
    switch(action.type) {
        case RECEIVE_ALL_SCORES:
            return Object.assign({}, state, action.scores);
        case RECEIVE_SCORE:
            return Object.assign({}, state, action.score);
        default: 
            return state;
    }
}


export default scoresReducer;