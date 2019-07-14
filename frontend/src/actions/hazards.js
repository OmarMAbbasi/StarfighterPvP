export const RECEIVE_HAZARDS = 'RECEIVE_HAZARDS';
export const DESTROY_HAZARD = 'DESTROY_HAZARD';


export const receiveHazards = hazards => ({
    type: RECEIVE_HAZARDS,
    hazards
});

export const destroyHazard = hazard => ({
    type: DESTROY_HAZARD,
    hazard
});