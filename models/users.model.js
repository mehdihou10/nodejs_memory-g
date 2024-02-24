const mongoose = require('mongoose');


const userSchema = mongoose.Schema({

    firstName: String,
    lastName: String,
    userName: String,

    email: String,

    password: String,

    image: {

        type: String,
        default: "images/user.png"
    },

    isGoogleAuth: {

        type: Boolean,
        default: false
    },

    isEmail: {

        type: Boolean,
        default: false
    },


})

module.exports = mongoose.model('User',userSchema);