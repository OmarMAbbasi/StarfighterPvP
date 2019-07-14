import axios from 'axios';

export const fetchPlayers = () => {
    return axios.get('/api/players')
};

export const createPlayer = player => {
    return axios.post('/api/players', player)
}

export const deletePlayer = playerId => {
    return axios.delete('/api/players', playerId)
}