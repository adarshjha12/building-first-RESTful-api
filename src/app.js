const express = require('express')
const app = express()
let port = process.env.port || 3000

app.get('/', (req,res) =>{
    res.send('helllo brother!!!!!!')
})



app.listen(port, () =>{
    console.log(`running on ${port} `);
})