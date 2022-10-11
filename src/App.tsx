import logo from './recobeerlogo_v3.png';
import './App.css';

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Scoreboard from './Scoreboard/Scoreboard';
import Link from '@mui/material/Link';

function App() {
  let theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ marginTop: 8, marginBottom: 40 }}
          />

          <Typography variant="h2" style={{ marginBottom: 16 }}>
            recobeer
          </Typography>

          <Link
            href="https://github.com/richardsanborn/recobeer/raw/main/recoBeer.xlsx"
            download
            style={{ marginBottom: 16 }}>
            recobeer.xlsx
          </Link>

          <Scoreboard />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
