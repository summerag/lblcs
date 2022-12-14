import React, { useState, useEffect } from "react";
import PlayerForm from "./playersForm";
import networkService from "../../services/network";
import ListItem from "../base/listItem";

const Players = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    lolname: "",
    discordtag: "",
    team: "",
  });

  useEffect(() => {
    networkService
      .getAll("http://localhost:3001/players")
      .then((initialplayers) => setPlayers(initialplayers));
  }, []);

  const closeForm = () => setFormOpen(false);

  const addPlayer = (event) => {
    event.preventDefault();
    networkService
      .create(newPlayer, "http://localhost:3001/players")
      .then((response) => {
        setFormOpen(false);
        setPlayers(players.concat(response));
        setNewPlayer({
          lolname: "",
          discordtag: "",
          team: "",
        });
      });
  };
  const trackChange = (event) => {
    const { name, value } = event.target;
    setNewPlayer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Players Page</h1>
      <button onClick={() => setFormOpen(true)}>New Player</button>
      {formOpen && (
        <PlayerForm
          onClick={closeForm}
          onSubmit={addPlayer}
          onChange={trackChange}
        />
      )}
      {players.map((player) => (
        <ListItem key={player.id} player={player} />
      ))}
    </div>
  );
};
export default Players;
