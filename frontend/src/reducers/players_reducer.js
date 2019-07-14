import { RECEIVE_ALL_PLAYERS, RECEIVE_PLAYER , REMOVE_PLAYER  } from '../actions/players';

const playersReducer = (state = [], action) => {
    Object.freeze();
    switch(action.type) {
        case RECEIVE_ALL_PLAYERS:
            return action.players;
        case RECEIVE_PLAYER:
            const nextState = state.slice();
            nextState.push(action.player);
            return nextState;
        case REMOVE_PLAYER:
            const newState = state.slice();
            const favIdx = newState.indexOf(action.player.id);
            newState.splice(favIdx);
            return newState;
        default: 
            return state;
    }
}

export default playersReducer;