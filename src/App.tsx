
import React from 'react';
import './App.css';
import { AppBar, Box, Button, Grid, Toolbar, Typography, Stack, Paper } from '@mui/material';
import ApiButton from './components/ApiButton';
import ResultsView from './components/ResultsView';
import { joki } from 'jokits-react';
import SocketBlip from './components/SocketBlip';
import LoginButton from './components/LoginButton';
import ChatView from './components/ChatView';
import Chats from './components/Chats';


function App() {

  function clearRes() {
    joki.trigger({
      to: "resultsService",
      action: "clear"
    });
  }

  return (
    <div className="App">


      <Box sx={{ flexGrow: 1, marginBottom: "1rem" }} >
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyItems: "space-between" }}>
            <Typography variant="h5" component="div" sx={{ flex: 1, textAlign: "left" }}>NestJs Test App</Typography>
            <Button variant="contained" color="secondary" onClick={clearRes}>Clear Results</Button>
            <LoginButton />
          </Toolbar>
        </AppBar>
      </Box>



      <Grid container spacing={3}>

        <Grid item xs={6}>

          <SocketBlip />

          <h2>Requests</h2>
          <Stack spacing={2}>
            <ApiButton method="GET" url='obi'>Obi</ApiButton>
            <ApiButton method="GET" url='game'>Game</ApiButton>

            <ApiButton method="POST" url='auth/login' body={{"username": "john", password: "changeme"}}>Login as John</ApiButton>
            <ApiButton method="POST" url='auth/login' body={{"username": "john", password: "ihasnoidea"}}>Login failure</ApiButton>

            <ApiButton method="GET" url='profile'>User Profile</ApiButton>
          </Stack>

          <Chats />
        </Grid>

        <Grid item xs={6}>
          <ResultsView />
        </Grid>

      </Grid>




    </div>
  );
}

export default App;
