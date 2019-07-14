import * as playerAPIUtils from  '../utils/player_utils';

export const RECEIVE_ALL_PLAYERS = "RECEIVE_ALL_PLAYERS";
export const RECEIVE_PLAYER = "RECEIVE_PLAYER";
export const REMOVE_PLAYER = "RECEIVE_PLAYER";

export const receiveAllPlayers= players => ({
    type: RECEIVE_ALL_PLAYERS,
    players
});

export const receivePlayer = player => ({
    type: RECEIVE_PLAYER,
    player
});

export const removePlayer = player => ({
    type: REMOVE_PLAYER,
    player
});

export const fetchPlayers = () => dispatch => (
    playerAPIUtils.fetchPlayers()
        .then(players => dispatch(receiveAllPlayers(players)))
);

export const createPlayer = player => dispatch => (
    playerAPIUtils.createPlayer(player)
        .then(player => dispatch(receivePlayer(player)))
);

export const deletePlayer = playerId => dispatch => (
    playerAPIUtils.deletePlayer(playerId)
        .then(player => dispatch(removePlayer(player)))
);