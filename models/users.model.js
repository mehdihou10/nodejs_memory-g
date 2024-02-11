const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = mongoose.Schema({

    firstName: String,
    lastName: String,
    userName: String,

    email: {
        type: String,
        validate: [validator.isEmail,"feild must me an email"]
    },

    password: String,

    image: {

        type: String,
        default: "images/user.png"
    }

})

module.exports = mongoose.model('User',userSchema);