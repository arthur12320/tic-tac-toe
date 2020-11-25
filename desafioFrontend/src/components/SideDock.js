import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './SideDock.css'

export default function SideDock(props) {

    const [playerx, setPlayerx] = useState('X');
    const [playero, setPlayero] = useState('O');

    const handlePlayerx = (event) => {
        setPlayerx(event.target.value);
    };
    const handlePlayero = (event) => {
        setPlayero(event.target.value);
    };
    const handleNewGame = async(event) =>{
        axios.post('http://localhost:3131/game')
            .then(res=>{
                console.log(res)
                props.setGameId(res.data.id);
                props.setTurn(res.data.firstPlayer)
                props.setBoard('         ')
            })
    }
    return (
        <div className='sidedock'>
            <Typography style={{ marginTop: "20px" }} variant="h4" gutterBottom>
                Jogo Da Velha
            </Typography>

            <Typography style={{ marginTop: "20px" }} variant="h6" gutterBottom>
                {props.gameId !== '' ? `Vez de ${props.turn == 'X'?playerx:playero}`:'Esperando novo jogo'}
            </Typography>
            <TextField className="playerName" id="playerx" value={playerx} onChange={handlePlayerx} label="Jogador X" variant="outlined" />
            <TextField className="playerName" id="playero" value={playero} onChange={handlePlayero} label="Jogador O" variant="outlined" />
            <br />
            <br />
            <br />
            <Button className="sidebuttons" variant="contained" onClick={handleNewGame}>Novo Jogo</Button>
            <br />
            <Button className="sidebuttons" variant="contained">Jogos Passados</Button>
            <br />
            <Button className="sidebuttons" variant="contained">Regras</Button>

        </div>
    )
}
