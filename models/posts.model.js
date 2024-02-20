const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    title: String,
    message: String,
    creator: String,
    tags: String,
    image: String,
    category: String,
    comments:{
        type: [Object],
        default: []
    },
    likeCount: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})


module.exports = mongoose.model("Post",postSchema);