const { v4: uuidv4 } = require('uuid');
const games = {};


//X = 1
//O = -1
//empty = 0


module.exports = {
    newGame: ()=>{
        const gameid = uuidv4();
        const starter = (Math.floor(Math.random()*2))==0?'X':'O';
        games[gameid] = {
            currentPlayer:starter,
            board:[[0,0,0],[0,0,0],[0,0,0]],
            plays: 0
        }
        return {
            id:gameid,
            firstPlayer:starter
        }
    },
    move: (gameid,player,position)=>{

        //check for valid gameid
        if(typeof games[gameid] ==='undefined'){
            return {
                error:"Partida não encontrada"
            }
        }
        
        //check for correct player turn
        if(player !== games[gameid].currentPlayer){
            return {
                error:"Não é turno do jogador"
            }
        }

        //check for valid play
        if(games[gameid].board[position.x][position.y] !== 0){
            return {
                error:"Posição invalida"
            }
        }
        

        //make play
        games[gameid].board[position.x][position.y] = player=='X'?1:-1
        games[gameid].plays++;
        games[gameid].currentPlayer = games[gameid].currentPlayer==='X'?'O':'X';


        let board = games[gameid].board;
        //test cols
        for(let i=0;i<3;i++){
            let sum = board[i][0] + board[i][1] + board[i][2] ;
            if(sum === 3){
                return{
                    winner: 'X'
                }
            }
            else if(sum === -3){
                return{
                    winner: 'O'
                }
            }
        }
        //test lines
        for(let i=0;i<3;i++){
            let sum = board[0][i] + board[1][i] + board[2][i] ;
            if(sum === 3){
                return{
                    winner: 'X'
                }
            }
            else if(sum === -3){
                return{
                    winner: 'O'
                }
            }
        }

        //test diag
        let sumdiag1 = board[0][0] + board[1][1] + board[2][2];
        let sumdiag2 = board[0][2] + board[1][1] + board[2][0];
        if(sumdiag1 === 3 || sumdiag2 === 3){
            return{
                winner: 'X'
            }
        }
        else if(sumdiag1 === -3||sumdiag2 === -3){
            return{
                winner: 'O'
            }
        }

        //test draw
        if(games[gameid].plays >= 9){
            return {
                winner: 'Draw'
            }
        }

        return {};
    }
}