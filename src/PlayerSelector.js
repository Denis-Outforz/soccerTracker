// PlayerSelector.js
import React, { useState, useEffect } from 'react';
import './PlayerSelector.css';

const PlayerSelector = ({
  homePlayers,
  awayPlayers,
  setSelectedPlayer,
  setSelectedTeam,
  setEventTime,
  setSelectedPlayerNumber,
  addHomePlayer,
  addAwayPlayer,
}) => {
  const [selectedPlayer, setSelectedPlayerLocal] = useState(null);
  const [eventTime, setEventTimeLocal] = useState('Half 1');
  const [newPlayerNumber, setNewPlayerNumber] = useState('');

  const handlePlayerClick = (team, playerNumber) => {
    const selectedPlayer = `${team}${playerNumber}`;
    setSelectedPlayerLocal(selectedPlayer);
    setSelectedPlayer(playerNumber);
    setSelectedTeam(team);
    setSelectedPlayerNumber(playerNumber);
  };

  const handlePlayerDoubleClick = (team, playerNumber) => {
    const newNumber = prompt(`Enter new player number for ${team} player ${playerNumber}:`, playerNumber);

    if (newNumber !== null) {
      setSelectedPlayerNumber(team, playerNumber, parseInt(newNumber, 10));
    }
  };

  const handleTimeChange = (event) => {
    setEventTimeLocal(event.target.value);
    setEventTime(event.target.value);
  };

  const handleNewPlayerChange = (event) => {
    setNewPlayerNumber(event.target.value);
  };

  const handleAddPlayer = () => {
    const team = selectedPlayer?.startsWith('Home') ? 'Home' : 'Away';
    const playerNumber = parseInt(newPlayerNumber, 10);

    if (!isNaN(playerNumber)) {
      if (team === 'Home') {
        addHomePlayer(playerNumber);
      } else {
        addAwayPlayer(playerNumber);
      }
    }

    setNewPlayerNumber('');
  };

  useEffect(() => {
    setSelectedPlayer(selectedPlayer);
    setEventTime(eventTime);
  }, [selectedPlayer, setSelectedPlayer, eventTime, setEventTime]);

  return (
    <div className="player-selector-container">
      <div className="team-container">
        <button
          className={`team-button home-button ${selectedPlayer && selectedPlayer.startsWith('Home') ? 'selected' : ''}`}
          onClick={() => handlePlayerClick('Home', 1)}
        >
          Home
        </button>
        <button
          className={`team-button away-button ${selectedPlayer && selectedPlayer.startsWith('Away') ? 'selected' : ''}`}
          onClick={() => handlePlayerClick('Away', 1)}
        >
          Away
        </button>
      </div>
      <div className="team-container">
        <div className="player-list">
          {homePlayers.map((playerNumber, index) => (
            <div
              key={`home-${index + 1}`}
              className={`player home-player ${selectedPlayer === `Home${playerNumber}` ? 'selected' : ''}`}
              onClick={() => handlePlayerClick('Home', playerNumber)}
              onDoubleClick={() => handlePlayerDoubleClick('Home', playerNumber)}
            >
              {playerNumber}
            </div>
          ))}
        </div>
        <div className="player-list">
          {awayPlayers.map((playerNumber, index) => (
            <div
              key={`away-${index + 1}`}
              className={`player away-player ${selectedPlayer === `Away${playerNumber}` ? 'selected' : ''}`}
              onClick={() => handlePlayerClick('Away', playerNumber)}
              onDoubleClick={() => handlePlayerDoubleClick('Away', playerNumber)}
            >
              {playerNumber}
            </div>
          ))}
        </div>
        <div className="time-toggle-container">
          <label>
            <input
              type="radio"
              value="Half 1"
              checked={eventTime === 'Half 1'}
              onChange={handleTimeChange}
            />
            Time 1
          </label>
          <label>
            <input
              type="radio"
              value="Half 2"
              checked={eventTime === 'Half 2'}
              onChange={handleTimeChange}
            />
            Time 2
          </label>
        </div>
        <div className="add-player-container">
          <input
            type="number"
            placeholder="New Player Number"
            value={newPlayerNumber}
            onChange={handleNewPlayerChange}
          />
          <button onClick={handleAddPlayer}>Add Player</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSelector;
