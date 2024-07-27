const express = require('express')
const app = express()
require('./db/connection')
let User = require('../models/student')
let port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req,res) =>{
    res.send('helllo brother!!!!!!')
})

app.post('/student', async (req, res) =>{
        try {
            const user1 = new User(req.body)
            const userCreation = await user1.save()
            console.log('saved via async method');
            console.log(userCreation);
            res.status(201).send('done')
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
 })

 app.get('/student', async (req, res) =>{
    try {
        let readData = await User.find()
        console.log(readData);
        res.status(200).send(readData)
    } catch (error) {
        console.log(error);
        res.send(error)

    }
 })

 //finding data by id

//  app.get('/student/:id', async (req, res) =>{
//     let _id = req.params.id
//     try {
//         let dataById = await User.findById(_id)
//         console.log(dataById);
//         res.status(200).send(dataById)
//     } catch (error) {
//         console.log(error);
//     }
//  })

// finding data by title

app.get('/student/:title', async (req, res) =>{
    const title = req.params.title
    try {
        let data = await User.find({title})
        console.log(data);
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send('something is wrong')
    }
})

// updating data partially

app.patch('/student/:id', async (req, res) =>{

    let _id = req.params.id
    try {
        let updateData = await User.findByIdAndUpdate(_id, req.body, {new: true})

        if (!updateData) {
            console.log('errrrrrrr');
            res.status(404).send({error: "student not found"})
        }
        console.log(updateData, 'updated successfully');
        res.status(200).send(updateData)
    } catch (error) {
        console.log(error);
        res.status(500).send({eroor: 'internal server error'})
    }
})

// updating data completely

app.put('/student/:id', async (req, res) =>{
    try {
        let id = req.params.id
        let data = await User.findByIdAndUpdate(id, req.body, {new: true})
        if (!data) {
            console.log("can't find data");
            res.status(404).send("can't find data")
        }
        console.log(data, 'updated successfully');
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

// deleting data

app.delete('/student/:title', async (req, res) =>{
    let title = req.params.title
    try {
        let deleteData = await User.findOneAndDelete({title})
        console.log(deleteData, 'deleted successfully');
        res.status(200).send('deleted data successfully!')
    } catch (error) {
        res.status(500).send('server errror')
    }
})

app.listen(port, () =>{
    console.log(`running on ${port} `);
})