import axios from 'axios';

export const fetchScores = () => {
    return axios.get('/api/scores')
};

export const createScore = data => {
    return axios.post('/api/scores', data)
}