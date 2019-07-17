import React from 'react';

const PlayerListItemScores = ({ tag, score, winner }) => {
    if (winner) {
        return (
            <li className='the-winner'>
                <p>{tag}</p><p id='winner-score'>{score}</p>
            </li>
        );
    } else {
        return (
            <li>
                <p>{tag}</p><p id='score'>{score}</p>
            </li>
        );
    }
};

export default PlayerListItemScores;