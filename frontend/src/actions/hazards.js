// import * as HazardUtils from '../utils/hazards';
export const RECEIVE_HAZARDS = 'RECEIVE_HAZARDS';
// export const RECEIVE_HAZARD = 'RECEIVE_HAZARD';
export const REMOVE_HAZARD = 'REMOVE_HAZARD';

export const receiveHazards = hazards => ({
    type: RECEIVE_HAZARDS,
    hazards
});

// export const receiveHazard = hazard => ({
//     type: RECEIVE_HAZARD,
//     hazard
// })

export const destroyHazard = hazard => ({
    type: REMOVE_HAZARD,
    hazard
});

// export const createHazard = hazard => dispatch => (
//     HazardUtils.createHazard(hazard)
//         .then(hazard => dispatch(receiveHazard(hazard)))
// );

