const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

module.exports = mongoose.model('User', new mongoose.Schema({
    name: String,
    username: { 
        type: String,
        minLength: 3,
        unique: true
    },
    passwordHash: String,
    blogs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Blog'
    }
}).set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.passwordHash
        }
    }))

