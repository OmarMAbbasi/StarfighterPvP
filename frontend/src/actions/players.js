export const RECEIVE_ALL_PLAYERS = "RECEIVE_ALL_PLAYERS";
export const RECEIVE_PLAYER = "RECEIVE_PLAYER";
export const REMOVE_PLAYER = "REMOVE_PLAYER";


export const receiveAllPlayers = players => ({
    type: RECEIVE_ALL_PLAYERS,
    players
});

export const receivePlayer = player => ({
    type: RECEIVE_ALL_PLAYERS,
    player
});

export const removePlayer = player => ({
    type: RECEIVE_ALL_PLAYERS,
    player
});

//gonna look at api utils
// export const fetchPlayers = players => ({

// })


// export const fetchPlayer = playerId => ({

// });

// export const createPlayer = player => ({

// });


// export const destroyPlayer = playerId => ({
// });



