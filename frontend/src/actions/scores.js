import * as scoreAPIUtils from  '../utils/score_utils';

export const RECEIVE_ALL_SCORES = "RECEIVE_ALL_SCORES";
export const RECEIVE_SCORE = "RECEIVE_PLAYER";

export const receiveAllScores= scores => ({
    type: RECEIVE_ALL_SCORES,
    scores
});

export const receiveScore = score => ({
    type: RECEIVE_SCORE,
    score
});

export const fetchScores = () => dispatch => (
    scoreAPIUtils.fetchScores()
        .then(scores => dispatch(receiveAllScores(scores)))
);

export const createScore = () => dispatch => (
    scoreAPIUtils.createScore()
        .then(score => dispatch(receiveScore(score)))
);