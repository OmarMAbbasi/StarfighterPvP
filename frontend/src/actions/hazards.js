export const RECEIVE_HAZARDS = 'RECEIVE_HAZARDS';
export const REMOVE_HAZARD = 'REMOVE_HAZARD';


export const receiveHazards = hazards => ({
    type: RECEIVE_HAZARDS,
    hazards
});

export const destroyHazard = hazard => ({
    type: REMOVE_HAZARD,
    hazard
});