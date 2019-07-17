import React from 'react';

const PlayerListItem = ({ player }) => (
    <li>
        <h2>{player.playerTag}</h2>
        <h3>{player.totalScore}</h3>
        { player.health > 100 ?
        <div className="progressParent">
                <div style={{ width: `${player.health}%`, 
            backgroundColor: `#3500fa`, height: `100%`, color: "white", 
            fontSize: "14px", display: "flex", justifyContent: "center", verticalAlign: "center",
                    borderRadius: "2px", paddingTop: "4px"
                }}><i className="fas fa-shield-alt">&#160;&#160;{player.health}%</i></div>
        </div>
			    :
        <div className="progressParent">
                <div style={{ width: `${player.health}%`, backgroundColor: `red`, 
                    height: `100%`, color: "white", fontSize: "14px", display: "flex", 
                    justifyContent: "center", verticalAlign: "center", borderRadius: "2px", paddingTop: "4px"
                }}><i class="fas fa-plus">&#160;&#160;{player.health}%</i></div>
		</div>
				}
	</li>
);

export default PlayerListItem;