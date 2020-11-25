import React from 'react'
import './MainBoard.css'
import axios from 'axios';

export default function MainBoard(props) {

    function handleCellClick(cell) {
        console.log({
            x: cell % 3,
            y: Math.floor(cell / 3)
        })
        if (props.gameId !== '') {
            console.log(cell);
            let newboard = props.board.substring(0, cell) + props.turn + props.board.substring(cell + 1);

            axios.post(`http://localhost:3131/game/${props.gameId}/movement`, {
                id: props.gameid,
                player: props.turn,
                position: {
                    x: cell % 3,
                    y: Math.floor(cell / 3)
                }
            })
                .then(res => {
                    console.log(res);
                    if (typeof res.data.winner !== 'undefined') {
                        props.setOpen(true);
                        props.setSeverity('success');
                        props.setMessage(`ganhador ${res.data.winner}`)
                    }
                    console.log(newboard)
                    props.setBoard(newboard);
                    props.setTurn(props.turn === 'X' ? 'O' : 'X')
                })
                .catch(err => {
                    console.log(err.response.data);
                    props.setOpen(true);
                    props.setSeverity('error');
                    props.setMessage(err.response.data.msg)
                })
        }
    }

    return (
        <div className='board'>
            <table>
                <tr>
                    <td className={props.board.charAt(6)===' '?'cell':props.board.charAt(6)==='X'?'cellx cell':'cello cell'} onClick={() => { handleCellClick(6) }}></td>
                    <td className={props.board.charAt(7)===' '?'cell':props.board.charAt(7)==='X'?'cellx cell':'cello cell'} onClick={() => { handleCellClick(7) }}></td>
                    <td className={props.board.charAt(8)===' '?'cell':props.board.charAt(8)==='X'?'cellx cell':'cello cell'} onClick={() => { handleCellClick(8) }}></td>
                </tr>
                <tr>
                    <td className={props.board.charAt(3)===' '?'cell':props.board.charAt(3)==='X'?'cellx cell':'cello cell'} onClick={() => { handleCellClick(3) }}></td>
                    <td className={props.board.charAt(4)===' '?'cell':props.board.charAt(4)==='X'?'cellx cell':'cello cell'} onClick={() => { handleCellClick(4) }}></td>
                    <td className={props.board.charAt(5)===' '?'cell':props.board.charAt(5)==='X'?'cellx cell':'cello cell'} onClick={() => { handleCellClick(5) }}></td>
                </tr>
                <tr>
                    <td className={props.board.charAt(0)===' '?'cell':props.board.charAt(0)==='X'?'cellx cell':'cello cell'} onClick={() => { handleCellClick(0) }}></td>
                    <td className={props.board.charAt(1)===' '?'cell':props.board.charAt(1)==='X'?'cellx cell':'cello cell'} onClick={() => { handleCellClick(1) }}></td>
                    <td className={props.board.charAt(2)===' '?'cell':props.board.charAt(2)==='X'?'cellx cell':'cello cell'} onClick={() => { handleCellClick(2) }}></td>
                </tr>
            </table>
        </div>
    )
}
