import { RECEIVE_BULLETS, REMOVE_BULLET } from '../actions/bullets';

const bulletsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_BULLETS:
            return action.bullets;
        case REMOVE_BULLET:
            const newState = state.splice();
            newState[action.bullet.id].splice();
            return newState;
        default:
            return state;
    };
};

export default bulletsReducer;