import React, { useState, useEffect } from "react";
import "./PlayerList.css";
import { useLocation } from "react-router-dom";

const PlayerList = () => {
  const state = useLocation();
  const [players, setplayers] = useState([]);
  useEffect(() => {
    setplayers(players.concat(state.state.players));
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h2 className="" style={{ textAlign: "center" }}>
        Picked Player
      </h2>
      <div className="container">
        {players.map((player, i) => {
          return (
            <div key={i} className="players">
              <p>{player.name}</p>
              <div>
                <h6>Credit</h6>
                <p>{player.event_player_credit}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PlayerList;
