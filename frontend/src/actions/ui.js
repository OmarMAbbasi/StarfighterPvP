export const UPDATE_GAME = "UPDATE_GAME";

export const updateGameInfo = (game, value) => ({
    type: UPDATE_GAME,
    game,
    value
})