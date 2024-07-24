let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/student-Database')
.then( () =>{
    console.log('db connection successful');
})
.catch( (err) =>{
    console.log('no connection');
})