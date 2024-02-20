//router
const express = require('express');

const router = express.Router();

//controllers
const {getPosts,getPostById,addPost,updatePost,deletePost,countPosts, getPostsBySearch, getCategory} = require('../controllers/posts.controllers');


router.route('/')
.get(getPosts)
.post(addPost);

router.get('/count',countPosts)
router.get('/search',getPostsBySearch);

router.route('/:postId')
.put(updatePost)
.delete(deletePost)
.get(getPostById);

router.post('/categories/:categoryId',getCategory);




module.exports = router;