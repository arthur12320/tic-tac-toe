const express = require('express');
const cors = require('cors')

const app = express();

//middlewares 
app.use(express.json());
app.use(cors())
 

//routes
app.use('/game',require('./routers/gameRouter'));


const port = process.env.PORT||3131;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})