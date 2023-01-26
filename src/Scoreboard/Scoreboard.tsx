import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Participant } from './Participant';
import IconButton from '@mui/material/IconButton';

function Scoreboard() {
  const [participantCounter, setParticipantCounter] = useState<number>(0);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipantName, setNewParticipantName] = useState<string>('');
  const [totalScore, setTotalScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [nameFieldValidationIsValid, setNameFieldValidationIsValid] =
    useState(true);

  function addParticipant(name: string) {
    if (name === '') {
      setNameFieldValidationIsValid(false);
      return;
    }

    setNameFieldValidationIsValid(true);
    setParticipants([
      ...participants,
      { id: getAndIncrementParticipantCounter(), name: name, points: '1' },
    ]);

    setNewParticipantName('');
  }

  useEffect(() => {
    if (participants.length === 0) {
      setAverageScore(0);
      setTotalScore(0);
      return;
    }

    var total = 0;
    var avg = 0;

    participants.forEach((participant : Participant) => {
      total += parseFloat(participant.points);
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

  const handleResetParticipants = () => {
    setNameFieldValidationIsValid(true);
    setParticipants([]);
  };

  const handleUpdatePoints = (id: number, points: string) => {
    if (parseInt(points) > 10) {
      points = '10';
    }

    if (parseInt(points) < 1) {
      points = '1';
    }

    setParticipants((participants : Participant[]) =>
      participants.map((p) => {
        return p.id === id ? { ...p, points: points } : p;
      })
    );
  };

  const handleRemoveParticipant = (id: number) => {
    var array = [...participants];
    var index = array.findIndex((e) => e.id === id);
    if (index !== -1) {
      array.splice(index, 1);
      setParticipants(array);
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addParticipant(newParticipantName);
    }
  };

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: 16 }}>
        scoreboard
      </Typography>
      <Grid container maxWidth="sm" justifyContent="center">
        <Grid item xs={10}>
          {participants &&
            participants.map((e) => (
              <Grid
                key={e.id}
                container
                spacing={1}
                style={{ marginBottom: '15px' }}>
                <Grid item xs={8}>
                  <TextField disabled defaultValue={e.name} size="small" />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    size="small"
                    type="text"
                    onChange={(evt) =>
                      handleUpdatePoints(e.id, evt.target.value)
                    }
                    value={e.points}
                  />
                </Grid>

                <Grid item xs={1}>
                  <IconButton
                    id="removeParticipant"
                    onClick={() => handleRemoveParticipant(e.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid justifyContent="center" container maxWidth="sm">
        <Grid item xs={8}>
          <TextField
            size="small"
            label="name"
            error={!nameFieldValidationIsValid}
            type="text"
            onChange={(evt) => setNewParticipantName(evt.target.value)}
            value={newParticipantName}
            onKeyDown={handleEnter}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            color="success"
            id="addParticipant"
            onClick={() => addParticipant(newParticipantName)}>
            <PlusOneIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            color="error"
            id="resetParticipants"
            onClick={() => handleResetParticipants()}>
            {<RestartAltIcon />}
          </IconButton>
        </Grid>
      </Grid>
      <p>total/average: </p>
      {totalScore} / {averageScore.toFixed(2)}
    </>
  );
}

export default Scoreboard;
