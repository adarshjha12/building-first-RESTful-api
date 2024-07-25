const express = require('express')
const app = express()
require('./db/connection')
let User = require('../models/student')
let port = process.env.port || 3000

app.use(express.json())

app.get('/', (req,res) =>{
    res.send('helllo brother!!!!!!')
})

app.post('/student', (req, res) =>{

    let user1 = new User(req.body)
    user1.save().then( () =>{
        console.log('data saved success');
        res.status(201).send(user1)

    }).catch( (err) =>{
        console.log(err);
        res.status(400).send(err)

    })

    console.log(user1);

})


app.listen(port, () =>{
    console.log(`running on ${port} `);
})