import { RECEIVE_HAZARDS, DESTROY_HAZARD } from '../actions/hazards';

const hazardsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_HAZARDS:
            return action.hazards;
        case DESTROY_HAZARD:
            const newState = state.splice();
            newState[action.hazard.id].splice();
            return newState;
        default:
            return state;
    };
};

export default hazardsReducer;