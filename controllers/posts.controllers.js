//post model
const Post = require('../models/posts.model');

//http status
const {SUCCESS,FAIL,ERROR} = require('../utils/http.status');

//async wrapper
const asyncWrapper = require('../middlewares/async.wrapper');

const getPosts = asyncWrapper(async (req,res)=>{

    const posts = await Post.find();

    res.json(posts)
    
})

const addPost = asyncWrapper(async (req,res)=>{

    const post = new Post(req.body);

    await post.save();

    res.status(201).json(post)
})

const updatePost = asyncWrapper(async (req,res)=>{

    const {postId} = req.params;

    await Post.findByIdAndUpdate(postId,{$set: {...req.body}});

    res.json({status: SUCCESS});
})

const deletePost = asyncWrapper(async (req,res)=>{

    const {postId} = req.params;

    await Post.findByIdAndDelete(postId);

    res.json({status: SUCCESS})
})




module.exports = {
    getPosts,
    addPost,
    updatePost,
    deletePost
}