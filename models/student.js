const mongoose = require('mongoose')
const validator = require('validator')

// defining schema

const userSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 2
    },

    email:{
        type: String,
        required: true,
        unique: [true, 'email already exists'],
        validate(value){
           if (!validator.isEmail(value)) {
              throw new Error ('invalid email')
           }       
        }
        
    },

    phone:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if (!validator.isMobilePhone(value)) {
                throw new Error('invalid mobile no.')
            }
        }
    },

    address:{
        type: String,
        required: true
    }
})

// creating collection

let User = mongoose.model('User', userSchema)

module.exports = User