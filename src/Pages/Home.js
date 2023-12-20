import Header from "../Components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [allBatsman, setAllBatsman] = useState([]);
  const [allBowlers, setAllBowlers] = useState([]);
  const [allRounders, setAllRounders] = useState([]);
  const [allWicketkeepers, setAllWicketkeepers] = useState([]);
  const [selectedBatsman, setSelectedBatsman] = useState([]);
  const [selectedWicketkeepers, setSelectedWicketkeepers] = useState([]);
  const [selectedRounders, setSelectedRounders] = useState([]);
  const [selectedBowlers, setSelectedBowlers] = useState([]);
  // eslint-disable-next-line
  const navigation = useNavigate();
  useEffect(() => {
    axios
      .get(
        "https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json"
      )
      .then((response) => {
        divide(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (selectedPlayers.length !== 0) {
      navigation("/player-list", { state: { players: selectedPlayers } });
    } 
  }, [selectedPlayers,navigation]);

  const divide = (data) => {
    const bower = data.filter((data) => data.role === "Bowler");
    const batters = data.filter((data) => data.role === "Batsman");
    const wicketkeepers = data.filter((data) => data.role === "Wicket-Keeper");
    const allrounders = data.filter((data) => data.role === "All-Rounder");
    setAllBowlers(allBowlers.concat(bower));
    setAllBatsman(allBatsman.concat(batters));
    setAllWicketkeepers(allWicketkeepers.concat(wicketkeepers));
    setAllRounders(allRounders.concat(allrounders));
  };

  const batsmanselect = (data) => {
    
    if (data.is_playing === true) {
    
      const changeArr = allBatsman.map((obj) => {
        if (obj.name === data.name) {
          return { ...obj, is_playing: false };
        }
        return obj;
      });
      setSelectedBatsman((current) =>
        current.filter((player) => player.name !== data.name)
      );
      setAllBatsman(changeArr);
    } else {
      const changeArr = allBatsman.map((obj) => {
        if (obj.name === data.name) {
          return { ...obj, is_playing: true };
        }
        return obj;
      });
      setSelectedBatsman([...selectedBatsman, data]);
      setAllBatsman(changeArr);
    }
  };

  const bowlerselect = (data) => {
    if (data.is_playing === true) {
            const changeArr = allBowlers.map((obj) => {
        if (obj.name === data.name) {
          return { ...obj, is_playing: false };
        }
        return obj;
      });
      setSelectedBowlers((current) =>
        current.filter((player) => player.name !== data.name)
      );
      setAllBowlers(changeArr);
    } else {
      const changeArr = allBowlers.map((obj) => {
        if (obj.name === data.name) {
          return { ...obj, is_playing: true };
        }
        return obj;
      });
      setSelectedBowlers([...selectedBowlers, data]);
      setAllBowlers(changeArr);
    }
  };
  const wicketkeeperselect = (data) => {
    if (data.is_playing === true) {
      
      const changeArr = allWicketkeepers.map((obj) => {
        if (obj.name === data.name) {
          return { ...obj, is_playing: false };
        }
        return obj;
      });
      setSelectedWicketkeepers((current) =>
        current.filter((player) => player.name !== data.name)
      );
      setAllWicketkeepers(changeArr);
    } else {
      const changeArr = allWicketkeepers.map((obj) => {
        if (obj.name === data.name) {
          return { ...obj, is_playing: true };
        }
        return obj;
      });
      setSelectedWicketkeepers([...selectedWicketkeepers, data]);
      setAllWicketkeepers(changeArr);
    }
  };
  const allrounderselect = (data) => {
    if (data.is_playing === true) {
      
      const changeArr = allRounders.map((obj) => {
        if (obj.name === data.name) {
          return { ...obj, is_playing: false };
        }
        return obj;
      });
      setSelectedRounders((current) =>
        current.filter((player) => player.name !== data.name)
      );
      setAllRounders(changeArr);
    } else {
      const changeArr = allRounders.map((obj) => {
        if (obj.name === data.name) {
          return { ...obj, is_playing: true };
        }
        return obj;
      });
      setSelectedRounders([...selectedRounders, data]);
      setAllRounders(changeArr);
    }
  };

  const proceed = () => {
    const batlen = selectedBatsman.length;
    const bowlen = selectedBowlers.length;
    const wicketlen = selectedWicketkeepers.length;
    const roundlen = selectedRounders.length;
    if (batlen < 3 || batlen > 7) {
      alert("select 3 to 7 Batsman");
    }
    if (bowlen < 3 || bowlen > 7) {
      alert("select 3 to 7 Bowlers");
    }
    if (wicketlen < 1 || wicketlen > 3) {
      alert("select 1 to 3 Wicketkeepers");
    }
    if (roundlen > 4) {
      alert("select 0 to 4 All rounders");
    }

    if (batlen + bowlen + wicketlen + roundlen > 11) {
      alert("You can not choose more than 11");
    }
    setSelectedPlayers(
      selectedPlayers.concat(
        selectedBatsman,
        selectedBowlers,
        selectedWicketkeepers,
        selectedRounders
      )
    );
    
  };
  return (
    <div>
      <Header
        selectedBatsman={selectedBatsman}
        selectedWicketkeepers={selectedWicketkeepers}
        selectedRounders={selectedRounders}
        selectedBowlers={selectedBowlers}
      />

      <div className="playerList">
        <div className="playerList-tables">
          <div className="playerList-table">
            <span className="playerList-table-header-cell">
              Pick 3-7 Batsman
            </span>
            <div className="table">
              {allBatsman &&
                allBatsman?.map((player, index) => (
                  <div
                    key={index}
                    className={`${
                      player.is_playing ? "players-in" : "players-out"
                    }`}
                    onClick={() => {
                      batsmanselect(player);
                    }}
                  >
                    <span>{player.name}</span>
                    <div className="players-credit">
                      <span>Credit</span>
                      <span>{player.event_player_credit}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="playerList-table">
            <span className="playerList-table-header-cell">
              Pick 1-5 Wicket Keepers
            </span>
            <div className="table">
              {allWicketkeepers &&
                allWicketkeepers?.map((player, index) => (
                  <div
                    key={index}
                    className={`${
                      player.is_playing ? "players-in" : "players-out"
                    }`}
                    onClick={() => {
                      wicketkeeperselect(player);
                    }}
                  >
                    <span>{player.name}</span>
                    <div className="players-credit">
                      <span>Credit</span>
                      <span>{player.event_player_credit}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="playerList-table">
            <span className="playerList-table-header-cell">
              Pick 0-4 All Rounders All Rounders
            </span>
            <div className="table">
              {allRounders &&
                allRounders?.map((player, index) => (
                  <div
                    key={index}
                    className={`${
                      player.is_playing ? "players-in" : "players-out"
                    }`}
                    onClick={() => {
                      allrounderselect(player);
                    }}
                  >
                    <span>{player.name}</span>
                    <div className="players-credit">
                      <span>Credit</span>
                      <span>{player.event_player_credit}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="playerList-table">
            <span className="playerList-table-header-cell">
              Pick 3-7 Bowlers Bowlers
            </span>
            <div className="table">
              {allBowlers &&
                allBowlers?.map((player, index) => (
                  <div
                    key={index}
                    className={`${
                      player.is_playing ? "players-in" : "players-out"
                    }`}
                    onClick={() => {
                      bowlerselect(player);
                    }}
                  >
                    <span>{player.name}</span>
                    <div className="players-credit">
                      <span>Credit</span>
                      <span>{player.event_player_credit}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="proceed-button">
          <button
            onClick={() => {
              proceed();
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
