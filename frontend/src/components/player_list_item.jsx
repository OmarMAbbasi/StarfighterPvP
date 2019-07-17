import React from 'react';

const PlayerListItem = ({ player, socket, gameStarted, gameId, myTag }) => (
    <li>
        <h2>{player.playerTag}</h2>
        {
            (!gameStarted) ?
                ((player.playerTag === myTag) ?
                    <button className='readyButton' onClick={
                        e => socket.emit('playerReady', { roomId: gameId })
                    }>
                        {(player.ready) ? 'Ready' : 'Not Ready'}
                    </button> :
                    <p className='readyText'>{(player.ready) ? 'Ready' : 'Not Ready'}</p>)
                :
                <div>
                    <h3>{player.totalScore}</h3>
                    {player.health > 100 ?
                        <div className="progressParent"
                            style={{
                                width: "200px",
                                backgroundColor: `grey`, height: `20px`, color: "white", display: "flex", justifyContent: "center", verticalAlign: "center",
                                borderRadius: "2px"
                            }}>
                            <div style={{
                                width: `${player.health}%`,
                                backgroundColor: `#3500fa`, height: `20px`, color: "white",
                                fontSize: "14px", display: "flex", justifyContent: "center", verticalAlign: "center",
                                borderRadius: "2px", alignItems: "center"
                            }}><i className="fas fa-shield-alt">&#160;&#160;{player.health}%</i></div>
                        </div>
                        :
                        <div className="progressParent"
                            style={{
                                width: "200px",
                                backgroundColor: `grey`, height: `20px`, color: "white", display: "flex", justifyContent: "center", verticalAlign: "center",
                                borderRadius: "2px"
                            }}>
                            <div style={{
                                width: `${player.health}%`, backgroundColor: `red`,
                                height: `20px`, color: "white", fontSize: "14px", display: "flex",
                                justifyContent: "center", verticalAlign: "center", borderRadius: "2px", alignItems: "center"
                            }}><i className="fas fa-plus">&#160;&#160;{player.health}%</i></div>
                        </div>
                    }
                </div>
        }

    </li>
);

export default PlayerListItem;