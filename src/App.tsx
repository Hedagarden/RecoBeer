import React, { useState, useEffect } from 'react';
import logo from './recobeerlogo_v3.png';
import './App.css';

type Participant = {
  id: number;
  name: string;
  points: string;
};

function App() {
  const [participantCounter, setParticipantCounter] = useState<number>(0);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipantName, setNewParticipantName] = useState<string>('');
  const [totalScore, setTotalScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  function addParticipant(name: string) {
    setParticipants([
      ...participants,
      { id: getAndIncrementParticipantCounter(), name: name, points: '1' },
    ]);

    setNewParticipantName('');
  }

  useEffect(() => {
    if (participants.length === 0) return;

    var total = 0;
    var avg = 0;

    participants.forEach((participant) => {
      total += parseInt(participant.points);
    });

    avg = total / participants.length;
    setAverageScore(isNaN(avg) ? 0 : avg);
    setTotalScore(isNaN(total) ? 0 : total);
  }, [participants]);

  function getAndIncrementParticipantCounter() {
    var current = participantCounter;
    setParticipantCounter(participantCounter + 1);
    return current;
  }

  const handleUpdatePoints = (id: number, points: string) => {
    if (parseInt(points) > 10) {
      points = '10';
    }

    if (parseInt(points) < 1) {
      points = '1';
    }

    setParticipants((participants) =>
      participants.map((p) => {
        return p.id === id ? { ...p, points: points } : p;
      })
    );
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addParticipant(newParticipantName);
    }
  };

  function removeParticipant(id: number) {
    const objWithIdIndex = participants.findIndex((obj) => obj.id === id);
    var changedParticipants = participants.splice(objWithIdIndex, 1);

    setParticipants(changedParticipants);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>recobeer</p>
      </header>
      <div>
        <p>avg points</p>
        {participants &&
          participants.map((e) => (
            <p key={e.id}>
              {e.name} :
              <input
                type="text"
                onChange={(evt) => handleUpdatePoints(e.id, evt.target.value)}
                value={e.points}
              />
            </p>
          ))}
        {participants.length === 0 && <p>no participants yet..</p>}
        <input
          type="text"
          onChange={(evt) => setNewParticipantName(evt.target.value)}
          value={newParticipantName}
          onKeyDown={handleEnter}
        />
        <button
          id="addParticipant"
          onClick={() => addParticipant(newParticipantName)}>
          Add participant
        </button>
        <p>total/average: </p>
        {totalScore} / {averageScore.toFixed(2)}
      </div>
    </div>
  );
}

export default App;
