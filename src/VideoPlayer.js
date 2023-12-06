import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useKeyPress } from 'react-use';
import './VideoPlayer.css';
import PlayerSelector from './PlayerSelector';
import FootballEventController from './FootballEventController';
import TableComponent from './TableComponent';

const VideoPlayer = () => {
  const [url, setUrl] = useState(localStorage.getItem('videoUrl') || '');
  const [file, setFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const playerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [point, setPoint] = useState(null);
  const [homePlayers, setHomePlayers] = useState([21, 18, 7, 13, 23, 15, 2, 40, 35, 17, 31, 19, 25, 9, 24]);
  const [awayPlayers, setAwayPlayers] = useState([1, 2, 5, 22, 20, 8, 31, 19, 18, 27, 11, 9, 10, 29, 23, 15]);
  const [selectedPlayerNumber, setSelectedPlayerNumber] = useState(null);
  const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem('tableData')) || []);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedSubEvent, setSelectedSubEvent] = useState('');
  const [selectedSubSubEvent, setSelectedSubSubEvent] = useState('');
  const [isFieldVisible, setIsFieldVisible] = useState(true);
  const [lastSeekTime, setLastSeekTime] = useState(0);
  const [eventtime,setEventTime] = useState('');
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  const addHomePlayer = (playerNumber) => {
    setHomePlayers((prevPlayers) => [...prevPlayers, playerNumber]);
  };
  
  const addAwayPlayer = (playerNumber) => {
    setAwayPlayers((prevPlayers) => [...prevPlayers, playerNumber]);
  };

  useEffect(() => {
    localStorage.setItem('videoUrl', url);
  }, [url]);

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  const handleTableRowClick = (time) => {
    playerRef.current.seekTo(time, 'seconds');
  };

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    setMouseCoords({ x, y });
  };

  const handleFieldClick = () => {
    const newData = {
      id: tableData.length + 1,
      half: eventtime,
      team: selectedTeam,
      playerNumber: selectedPlayer,
      time: playerRef.current.getCurrentTime(),
      x: mouseCoords.x * 100,
      y: mouseCoords.y * 100,
      event: selectedEvent || '',
      typeEvent: selectedSubEvent || '',
      subType: selectedSubSubEvent || '',
    };

    if (selectedEvent === 'Goal') {
      newData.typeEvent = '';
      newData.subType = '';
    }

    setTableData((prevData) => [...prevData, newData]);

    setSelectedEvent(null);
    setSelectedSubEvent(null);
    setSelectedSubSubEvent(null);
    

    setPoint({
      x: mouseCoords.x * 100,
      y: mouseCoords.y * 100,
      team: selectedTeam,
      playerNumber: selectedPlayer,
    });
  };

  const handlePlay = () => {
    setIsPlaying(true);
    const footballField = document.querySelector('.football-field');
    const footballFieldSecondary = document.querySelector('.football-field-secondary');
    const footballFieldThird = document.querySelector('.football-field-third');
    const seek = document.querySelector('.seek');
    
    if (footballField) {
      footballField.classList.add('hide');
    }
    if (footballFieldSecondary) {
      footballFieldSecondary.classList.add('hide');
    }
    if (footballFieldThird) {
      footballFieldThird.classList.add('hide');
    }
    if (seek) {
      seek.classList.add('hide');
    }
  };
  
  const handlePause = () => {
    setIsPlaying(false);
    const footballField = document.querySelector('.football-field');
    const footballFieldSecondary = document.querySelector('.football-field-secondary');
    const footballFieldThird = document.querySelector('.football-field-third');
    const seek = document.querySelector('.seek');
    
    if (footballField) {
      footballField.classList.remove('hide');
    }
    if (footballFieldSecondary) {
      footballFieldSecondary.classList.remove('hide');
    }
    if (footballFieldThird) {
      footballFieldThird.classList.remove('hide');
    }
    if (seek) {
      seek.classList.remove('hide');
    }
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setFile(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setUrl('');
    }
  };

  const spaceKeyPressed = useKeyPress('Space');
  const qKeyPressed = useKeyPress('KeyQ');
  const wKeyPressed = useKeyPress('KeyW');
  const eKeyPressed = useKeyPress('KeyE');
  const rKeyPressed = useKeyPress('KeyR');
  const tKeyPressed = useKeyPress('KeyT');
  const yKeyPressed = useKeyPress('KeyY');
  const uKeyPressed = useKeyPress('KeyU');

  const aKeyPressed = useKeyPress('KeyA');
  const sKeyPressed = useKeyPress('KeyS');
  const dKeyPressed = useKeyPress('KeyD');
  const fKeyPressed = useKeyPress('KeyF');
  const gKeyPressed = useKeyPress('KeyG');
  const hKeyPressed = useKeyPress('KeyH');

  const zKeyPressed = useKeyPress('KeyZ');
  const xKeyPressed = useKeyPress('KeyX');
  const cKeyPressed = useKeyPress('KeyC');
  const vKeyPressed = useKeyPress('KeyV');
  const bKeyPressed = useKeyPress('KeyB');

  useEffect(() => {
    if (spaceKeyPressed) {
      setIsPlaying(!isPlaying);
    }

    if (qKeyPressed) {
      // Проверка на зажатый Shift
      if (qKeyPressed.shiftKey) {
        handleSelectEvent('Regular Pass', 'Throw in', 'Failed Trajectory');
      } else {
        // Обычное событие для Q без Shift
        handleSelectEvent('Regular Pass', 'Throw in', 'Successful');
      }
    }

    if (wKeyPressed) {
      handleSelectEvent('Non-game', 'Ball out');
    }

    if (eKeyPressed) {
      // Проверка на зажатый Shift
      if (eKeyPressed.shiftKey) {
        handleSelectEvent('Interception', 'First Third', 'Unsuccessful');
      } else {
        // Обычное событие для E без Shift
        handleSelectEvent('Interception', 'First Third', 'Successful');
      }
    }

    if (rKeyPressed) {
      handleSelectEvent('Duel', 'Ground Duel', 'Win');
    }

    if (tKeyPressed) {
      handleSelectEvent('Duel', 'Aerial duel ', 'Win');
    }

    if (yKeyPressed) {
      handleSelectEvent('Fouls', 'Regular', 'Win');
    }

    if (uKeyPressed) {
      handleSelectEvent('Fouls', 'Regular', 'Lose');
    }

    if (aKeyPressed) {
      handleSelectEvent('Possession', 'Recovery');
    }
    if (sKeyPressed) {
    if (sKeyPressed.shiftKey) {
      handleSelectEvent('Regular Pass', 'Pass', 'Failed Trajectory');
    } else {
      // Обычное событие для S без Shift
      handleSelectEvent('Regular Pass', 'Pass', 'Successful');
    }
    }

    if (dKeyPressed) {
    if (dKeyPressed.shiftKey) {
      handleSelectEvent('Reception', 'Open play', 'Missed Reception');
    } else {
      // Обычное событие для D без Shift
      handleSelectEvent('Reception', 'Open play', 'Succesfull Reception');
    }
  }
  if (fKeyPressed) {
    if (fKeyPressed.shiftKey) {
      handleSelectEvent('Reception', 'Under pressure', 'Missed Reception');
    } else {
      // Обычное событие для F без Shift
      handleSelectEvent('Reception', 'Under pressure', 'Succesfull Reception');
    }
  }

    if (gKeyPressed) {
      handleSelectEvent('Duel', 'Ground Duel', 'Lose');
    }
    if (hKeyPressed) {
      handleSelectEvent('Duel', 'Aerial Duel', 'Lose');
    }
    if (zKeyPressed) {
      handleSelectEvent('Possession', 'Loss ball ');
    }
    
    if (xKeyPressed) {
    if (xKeyPressed.shiftKey) {
      handleSelectEvent('Regular Pass', 'Progressive', 'Failed Trajectory');
    } else {
      // Обычное событие для X без Shift
      handleSelectEvent('Regular Pass', 'Progressive', 'Successful');
    }
  }

  if (cKeyPressed) {
    if (cKeyPressed.shiftKey) {
      handleSelectEvent('Attack Pass', 'Cross', 'Failed Trajectory');
    } else {
      // Обычное событие для C без Shift
      handleSelectEvent('Attack Pass', 'Cross', 'Successful');
    }
  }

    if (vKeyPressed) {
      handleSelectEvent('Tackling', 'First Third', 'Succesful');
    }
    
    if (bKeyPressed) {
    if (bKeyPressed.shiftKey) {
      handleSelectEvent('Possession', 'Dribble', 'Unsuccessful');
    } else {
      // Обычное событие для B без Shift
      handleSelectEvent('Possession', 'Dribble', 'Successful');
    }
  }
    
  }, [spaceKeyPressed, qKeyPressed, vKeyPressed, yKeyPressed, uKeyPressed, gKeyPressed, hKeyPressed, bKeyPressed, wKeyPressed, eKeyPressed, rKeyPressed, tKeyPressed, aKeyPressed, sKeyPressed, dKeyPressed, fKeyPressed, zKeyPressed, xKeyPressed, cKeyPressed]);


  const handleSelectEvent = (event, subEvent, subSubEvent) => {
    setSelectedEvent(event);
    setSelectedSubEvent(subEvent);
    setSelectedSubSubEvent(subSubEvent);
  };

  const handleKeyPress = (event) => {
    if (event.code === 'Space') {
      setIsPlaying(!isPlaying);
      event.preventDefault();

    } else if (event.code === 'KeyQ') {
      // Проверка на зажатый Shift
      if (event.shiftKey) {
        handleSelectEvent('Regular Pass', 'Throw in', 'Failed Trajectory');
      } else {
        // Обычное событие для Q без Shift
        handleSelectEvent('Regular Pass', 'Throw in', 'Successful');
      }

    } else if (event.code === 'KeyW') {
      handleSelectEvent('Non-game', 'Ball out');
      event.preventDefault();
    
    } else if (event.code === 'KeyE') {
      // Проверка на зажатый Shift
      if (event.shiftKey) {
        handleSelectEvent('Interception', 'First Third', 'Unsuccessful');
      } else {
        // Обычное событие для E без Shift
        handleSelectEvent('Interception', 'First Third', 'Successful');
      }  

    } else if (event.code === 'KeyR') {
      handleSelectEvent('Duel', 'Ground Duel', 'Win');
      event.preventDefault();
    } else if (event.code === 'KeyT') {
      handleSelectEvent('Duel', 'Aerial duel ', 'Win');
      event.preventDefault();
    } else if (event.code === 'KeyY') {
      handleSelectEvent('Fouls', 'Regular', 'Win');
      event.preventDefault();
    } else if (event.code === 'KeyU') {
      handleSelectEvent('Fouls', 'Regular', 'Lose');
      event.preventDefault();
    } else if (event.code === 'KeyA') {
      handleSelectEvent('Possession', 'Recovery');
      event.preventDefault();
    
    } else if (event.code === 'KeyS') {
      // Проверка на зажатый Shift
      if (event.shiftKey) {
        handleSelectEvent('Regular Pass', 'Pass', 'Failed Trajectory');
      } else {
        // Обычное событие для S без Shift
        handleSelectEvent('Regular Pass', 'Pass', 'Successful');
      }

    } else if (event.code === 'KeyD') {
      // Проверка на зажатый Shift
      if (event.shiftKey) {
        handleSelectEvent('Reception', 'Open play', 'Missed Reception');
      } else {
        // Обычное событие для D без Shift
        handleSelectEvent('Reception', 'Open play', 'Succesfull Reception');
      }

    } else if (event.code === 'KeyF') {
      // Проверка на зажатый Shift
      if (event.shiftKey) {
        handleSelectEvent('Reception', 'Under pressure', 'Missed Reception');
      } else {
        // Обычное событие для F без Shift
        handleSelectEvent('Reception', 'Under pressure', 'Succesfull Reception');
      }

    } else if (event.code === 'KeyG') {
      handleSelectEvent('Duel', 'Ground Duel', 'Lose');
      event.preventDefault();
    } else if (event.code === 'KeyH') {
      handleSelectEvent('Duel', 'Aerial Duel', 'Lose');
      event.preventDefault();
    } else if (event.code === 'KeyZ') {
      handleSelectEvent('Possession', 'Loss ball ');
      event.preventDefault();

    } else if (event.code === 'KeyX') {
      // Проверка на зажатый Shift
      if (event.shiftKey) {
        handleSelectEvent('Regular Pass', 'Progressive', 'Failed Trajectory');
      } else {
        // Обычное событие для X без Shift
        handleSelectEvent('Regular Pass', 'Progressive', 'Successful');
      }
      
    } else if (event.code === 'KeyC') {
      // Проверка на зажатый Shift
      if (event.shiftKey) {
        handleSelectEvent('Attack Pass', 'Cross', 'Failed Trajectory');
      } else {
        // Обычное событие для X без Shift
        handleSelectEvent('Attack Pass', 'Cross', 'Successful');
      }
      
    } else if (event.code === 'KeyV') {
      handleSelectEvent('Tackling', 'First Third', 'Succesful');
      event.preventDefault();


    } else if (event.code === 'KeyB') {
      // Проверка на зажатый Shift
      if (event.shiftKey) {
        handleSelectEvent('Possession', 'Dribble', 'Unsuccessful');
      } else {
        // Обычное событие для B без Shift
        handleSelectEvent('Possession', 'Dribble', 'Successful');
      }



    } else if (event.code === 'ArrowRight') {
      handleSeek(1);
    } else if (event.code === 'ArrowLeft') {
      handleSeek(-1);
    }
  };

  const [playing, setPlaying] = useState(false);

  const handleSpacePress = (event) => {
    if (event.code === 'Space' && !playing) {
      setPlaying(true);
      playerRef.current.getInternalPlayer().play();
      event.preventDefault(); 
      event.stopPropagation(); 
    }
  };

  const handleSpaceRelease = (event) => {
    if (event.code === 'Space' && playing) {
      setPlaying(false);
      playerRef.current.getInternalPlayer().pause();
      event.preventDefault(); 
      event.stopPropagation(); 
    }
  };

  const handleSpeedChange = (event) => {
    if (event.code === 'Digit1') {
      setPlaybackRate(0.5);
    } else if (event.code === 'Digit2') {
      setPlaybackRate(1);
    } else if (event.code === 'Digit3') {
      setPlaybackRate(2);
    } else if (event.code === 'Digit4') {
      setPlaybackRate(4);
    } else if (event.code === 'Digit5') {
      setPlaybackRate(6);
    }
  };

  const handleSeek = (seconds) => {
    if (playerRef.current && playerRef.current.getInternalPlayer()) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + seconds, 'seconds');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keydown', handleSpacePress);
    document.addEventListener('keyup', handleSpaceRelease);
    document.addEventListener('keydown', handleSpeedChange);
    document.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowRight' && Date.now() - lastSeekTime > 1) {
        handleSeek(1);
        setLastSeekTime(Date.now());
      } else if (event.code === 'ArrowLeft' && Date.now() - lastSeekTime > 1) {
        handleSeek(-1);
        setLastSeekTime(Date.now());
      }
    });

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keydown', handleSpacePress);
      document.removeEventListener('keyup', handleSpaceRelease);
      document.removeEventListener('keydown', handleSpeedChange);
      document.removeEventListener('keydown', handleSeek);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Control') {
        setIsCtrlPressed(true);
      }
    };
  
    const handleKeyUp = (event) => {
      if (event.key === 'Control') {
        setIsCtrlPressed(false);
      }
    };

  }, [playing]);
  return (
    <div className="video-player-container">
      <div className={`video-player ${isPlayerReady ? '' : 'hide'}`}>
        <ReactPlayer
          ref={playerRef}
          url={url || file}
          width="100%"
          height="100%"
          controls={false}
          playing={isPlaying}
          playbackRate={playbackRate}
          onPlay={handlePlay}
          onPause={handlePause}
          onReady={() => setIsPlayerReady(true)}
          onError={() => setIsPlayerReady(false)}
        />
        <div>
          <label>
            Вставьте URL:
            <input type="text" value={url} onChange={handleUrlChange} />
          </label>
        </div>
        <div>
          <label>
            Или выберите файл:
            <input type="file" accept="video/*" onChange={handleFileChange} />
          </label>
        </div>
        <div>
</div>
      </div>
      {isPlayerReady && (
        <>
      <div className={`football-field ${isFieldVisible && !isCtrlPressed ? 'show' : ''}`} onMouseMove={handleMouseMove} onClick={handleFieldClick}>
        
        <div className="football-pitch">
        <div className="outline marking"></div>
        <div className="box left marking"></div>
        <div className="box-d left marking"></div>
        <div className="box left small marking"></div>
        <div className="box right marking"></div>
        <div className="box-d right marking"></div>
        <div className="box right small marking"></div>
        <div className="spot left marking"></div>
        <div className="spot right marking"></div>
        <div className="spot center marking"></div>
        <div className="football-center-line marking"></div>
        <div className="football-line-first"></div>
        <div className="football-line-second"></div>
        <div className="football-center-circle marking"></div>
        <div className="corner top left marking"></div>
        <div className="corner top right marking"></div>
        <div className="corner bottom left marking"></div>
        <div className="corner bottom right marking"></div>
        <div className="grass"></div>
  <div id="hover-marker1" class="hover-marker"></div>
  <div id="hover-marker2" class="hover-marker"></div>
  {point && (
        <div className="point" style={{ left: `${point.x}%`, top: `${point.y}%` }}>
          {`${point.x.toFixed(2)}, ${point.y.toFixed(2)}`}
        </div>
      )}
    </div>
      </div>
      <div className={`overlay-block ${isPlaying || isCtrlPressed ? 'hide' : 'show'}`}>
      <PlayerSelector
        homePlayers={homePlayers}
        awayPlayers={awayPlayers}
        addHomePlayer={addHomePlayer}
        addAwayPlayer={addAwayPlayer}
        setSelectedPlayer={setSelectedPlayer}
        setSelectedTeam={setSelectedTeam}
        setEventTime={setEventTime}
        setSelectedPlayerNumber={setSelectedPlayerNumber}
      />
      </div>
      <div className={`football-field-secondary ${isFieldVisible && !isCtrlPressed ? 'show' : ''}`}>
        {/* Добавляем компонент FootballEventController и передаем ему функцию обработки выбранных событий */}
        <FootballEventController
        onEventSelected={(selectedEvent, selectedSubEvent, selectedSubSubEvent) => {
          setSelectedEvent(selectedEvent);
          setSelectedSubEvent(selectedSubEvent);
          setSelectedSubSubEvent(selectedSubSubEvent);
        }}
        />
      </div>
      
      <div className={`seek ${isFieldVisible ? 'show' : ''}`}>
  <style>
    {`
      .seek {
        display: flex;
        max-width: 350px;
        height: 40px;
        margin: 0 auto;
      }
      .seek button {
        flex: 1;
        margin: 0;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: rgb(201, 230, 15);
        font-weight: bold;
      }
    `}
  </style>
  <button onClick={() => handleSeek(-10)}>-10 сек</button>
  <button onClick={() => handleSeek(-5)}>-5 сек</button>
  <button onClick={() => handleSeek(-1)}>-1 сек</button>
  <button onClick={() => handleSeek(1)}>+1 сек</button>
  <button onClick={() => handleSeek(5)}>+5 сек</button>
  <button onClick={() => handleSeek(10)}>+10 сек</button>
</div>


<div className={`football-field-third ${isFieldVisible && !isCtrlPressed ? 'show' : ''}`}>
      <TableComponent
        tableData={tableData}
        setTableData={setTableData}
        onRowClick={handleTableRowClick}
        className={isPlaying ? 'table-container visible' : 'table-container'}
      />
</div>
    </>
  )}
</div>
);
};

export default VideoPlayer;
