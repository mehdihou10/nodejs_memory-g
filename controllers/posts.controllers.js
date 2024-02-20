//post model
const Post = require('../models/posts.model');

//http status
const {SUCCESS,FAIL,ERROR} = require('../utils/http.status');

//async wrapper
const asyncWrapper = require('../middlewares/async.wrapper');
const httpStatus = require('../utils/http.status');

//error handler
const createError = require('../utils/create.error');


const getPosts = asyncWrapper(async (req,res)=>{

    const query = req.query;

    let posts;

    if(Object.keys(query).length === 0){

        posts = await Post.find();

    } else{

        const limit = 4;
        const page = query.page;
        const skip = (page - 1) * limit;

        posts = await Post.find().limit(limit).skip(skip);

    }


    res.json(posts)
    
})

const getPostById = asyncWrapper(async (req,res)=>{

    const {postId} = req.params;

    const post = await Post.findById(postId);

    res.json({status: httpStatus.SUCCESS,post});
})

const getPostsBySearch = asyncWrapper(async (req,res)=>{

    const {search,tags} = req.query;

    const title = new RegExp(search,"i");
    const tagsCon = new RegExp(tags,'i');

    const posts = await Post.find({$and: [{title},{tags: tagsCon}]})

    res.json(posts);
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


const countPosts = asyncWrapper(async (req,res)=>{

    const posts = await Post.countDocuments({});

    res.json(posts);
})

const getCategory = asyncWrapper(async (req,res,next)=>{

    const {categoryId} = req.params;

    const {postId} = req.body;


    const posts = await Post.find({category: categoryId, _id: {$ne: postId}})



    if(posts.length === 0){

        const error = createError(httpStatus.FAIL,400,"add a valid category")

        return next(error)
    }

    res.json({status: httpStatus.SUCCESS,posts: posts})
})


module.exports = {
    getPosts,
    getPostById,
    getPostsBySearch,
    addPost,
    updatePost,
    deletePost,
    countPosts,
    getCategory
}