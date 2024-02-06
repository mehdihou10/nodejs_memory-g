//router
const express = require('express');

const router = express.Router();

//controllers
const {getPosts,addPost,updatePost,deletePost} = require('../controllers/posts.controllers');

const multer = require('multer');
const diskStorage = multer.diskStorage({

    destination: function(req,file,cb){

       return cb(null,"uploads");

    },

    filename: function(req,file,cb){

        const ext = file.mimetype.split('/')[1];

        const fileName = `post-${Date.now()}.${ext}`;

        return cb(null,fileName);
    }
})

const fileFilter = (req,file,cb)=>{

    const fileType = file.mimetype.split('/')[0];

    if(fileType === "image"){

        return cb(null,true);

    } else{

        return cb(null,false);
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter
})

router.route('/')
.get(getPosts)
.post(upload.single("image"),addPost)

router.route('/:postId')
.put(upload.single("image"),updatePost)
.delete(deletePost);


module.exports = router;