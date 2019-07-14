import { UPDATE_GAME } from '../actions/ui';

const defaultGame = Object.freeze({
    timeLeft: 120,
    roundsLeft: 5
});

const uIReducer = (state = defaultGame, action) => {
    switch (action.type) {
        case UPDATE_GAME:
            const newState = { [action.game]: action.value }
            return Object.assign({}, state, newState)
        default:
            return state;
    };
};
 
export default uIReducer;