const express = require('express');
const router = express.Router();


const {newGame,move} = require('../controllers/gameController');

router.post('/',(req,res)=>{  //POST - /game
    const response = newGame();
    res.status(200).json(response);
})

router.post('/:id/movement',(req,res)=>{  //POST - /game
    const gameid = req.params.id;
    const {player,position} = req.body;
    const response = move(gameid,player,position);

    if(typeof response.error !== 'undefined'){
        return res.status(400).json({
            msg:response.error
        })
    }

    if(typeof response.winner !== 'undefined'){
        return res.status(200).json({
            msg:"Partida finalizada",
            winner:response.winner
        })
    }


    res.status(200).send();
})



module.exports = router;