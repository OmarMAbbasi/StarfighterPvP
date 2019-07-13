import axios from 'axios';

export const getScores = () => {
    return axios.get('/api/scores')
};

export const createHighScore = data => {
    return axios.post('/api/scores', data)
}