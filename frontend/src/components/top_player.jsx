import React from 'react';

const TopPlayer = ({ player }) => (
    <li className='player-list-item'>  
        <p>{player.tag}..............................</p><p id='score'>{player.score}</p>
    </li>
)

export default TopPlayer;