import { RECEIVE_ALL_PLAYERS, RECEIVE_PLAYER , REMOVE_PLAYER  } from '../actions/players';

const playersReducer = (state = {}, action) => {
    Object.freeze();
    switch(action.type) {
        case RECEIVE_ALL_PLAYERS:
            return action.players;
        case RECEIVE_PLAYER:
            const nextState = Object.assign({}, state);
            nextState[action.player.id] = action.player;
            return nextState;
        case REMOVE_PLAYER:
            const newState = Object.assign({}, state);
            delete newState[action.player.id]
            return newState;
        default: 
            return state;
    }
}

export default playersReducer;