import React, { useState, useEffect } from 'react';
import logo from './recobeerlogo_v3.png';
import './App.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

type Participant = {
  id: number;
  name: string;
  points: string;
};

function App() {
  let theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  theme = responsiveFontSizes(theme);

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

  const handleResetParticipants = () => {
    setParticipants([]);
  };

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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ marginTop: '10px' }}
          />
          <Typography variant="h2" gutterBottom>
            recobeer
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              {participants &&
                participants.map((e) => (
                  <Grid key={e.id} container spacing={2}>
                    <Grid item xs={12} md={4}>
                      {e.name}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        size="small"
                        type="text"
                        onChange={(evt) =>
                          handleUpdatePoints(e.id, evt.target.value)
                        }
                        value={e.points}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Button
                        startIcon={<DeleteIcon />}
                        variant="contained"
                        id="removeParticipant"
                        onClick={() => handleRemoveParticipant(e.id)}>
                        remove
                      </Button>
                    </Grid>
                  </Grid>
                ))}

              {participants.length === 0 && <p>no participants yet..</p>}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                size="small"
                placeholder="name"
                type="text"
                onChange={(evt) => setNewParticipantName(evt.target.value)}
                value={newParticipantName}
                onKeyDown={handleEnter}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                id="addParticipant"
                onClick={() => addParticipant(newParticipantName)}>
                add participant
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                id="resetParticipants"
                onClick={() => handleResetParticipants()}>
                reset
              </Button>
            </Grid>
          </Grid>
          <p>total/average: </p>
          {totalScore} / {averageScore.toFixed(2)}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
