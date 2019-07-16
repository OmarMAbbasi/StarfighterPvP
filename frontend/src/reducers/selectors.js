export const selectBestPlayers = (state) => {
    const topPlayers = state.entities.players.data;
    return topPlayers;
};
