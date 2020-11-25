import React, { useState } from 'react';
import './App.css';
import SideDock from './components/SideDock';
import MainBoard from './components/MainBoard';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function App() {

  const [turn, setTurn] = useState('O');
  const [gameId, setGameId] = useState('');
  const [board, setBoard] = useState('         ');
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('error');
  const [message, setMessage] = useState('bla');


  const handleClose = (event) => {
    setOpen(false);
  };

  return (
    <div className="App">
      <SideDock turn={turn} setTurn={setTurn} gameId={gameId}  setGameId={setGameId} setBoard={setBoard}/>
      <MainBoard board={board} setBoard={setBoard} turn={turn} setTurn={setTurn} gameId={gameId} setOpen={setOpen} setSeverity={setSeverity} setMessage={setMessage}/>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
