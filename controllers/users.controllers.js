const User = require('../models/users.model');

const bcrypt = require('bcryptjs');

const asyncWrapper = require('../middlewares/async.wrapper');

const httpStatus = require('../utils/http.status');

const generateToken = require('../utils/generate.token');

const createError = require('../utils/create.error');

const {validationResult} = require('express-validator');


const getUsers = asyncWrapper(async (req,res)=>{

    const users = await User.find();

    res.json(users);

})

const getUserById = asyncWrapper(async (req,res,next)=>{

    const {userId} = req.params;

    const user = await User.findById(userId,{password: false});

    if(!user){

        const error = createError(httpStatus.FAIL,404,'user not found')
        return next(error);
    }

    res.json({status: httpStatus.SUCCESS,user})
})


const register = asyncWrapper(async (req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        const error = createError(httpStatus.FAIL,400,errors.array())
        return next(error);
    }


    const user = await User.findOne({email: req.body.email});

    if(user){

        const error = createError(httpStatus.FAIL,400,"user already registered");
        return next(error);

    }

    
    const newUser = new User(req.body);
    
    if(req.body.password){

        const hashedPassword = await bcrypt.hash(req.body.password,10);
        newUser.password = hashedPassword;

    }
    
    await newUser.save();
    
    const token = generateToken({username: newUser.userName, email: newUser.email, image: newUser.image});

    res.status(201).json({status: httpStatus.SUCCESS, token})

})


const login = asyncWrapper(async (req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){

        const error = createError(httpStatus.FAIL,400,errors.array())
        return next(error);
    }

    const requestBody = req.body;

    const user = await User.findOne({email: requestBody.email});

    if(!user){

        const error = createError(httpStatus.FAIL,404,"user not found");
        return next(error);
    }

    const token = generateToken({email: user.email, username: user.userName, image: user.image});

    if(!user.password){

        const error = createError(httpStatus.FAIL,400,"you must sign in the box");
        return next(error)
    }

    if(requestBody.password.trim() === ""){

        const error = createError(httpStatus.FAIL,400,"you must add your password");
        return next(error);
    }

        const isPasswordTrue = await bcrypt.compare(requestBody.password, user.password);

        if(!isPasswordTrue){

            const error = createError(httpStatus.FAIL,400,"incorrect password");
            return next(error);
        }

        return res.json({status: httpStatus.SUCCESS,token});
    

})

const loginAuth = asyncWrapper(async(req,res,next)=>{

    const {email} = req.body;

    const user = await User.findOne({email: email})

    if(!user){

        const error = createError(httpStatus.FAIL,400,"user not found");
        return next(error);
    }

    const token = generateToken({email: user.email, username: user.userName, image: user.image})

    res.json({status: httpStatus.SUCCESS, token})


})

module.exports = {

    getUsers,
    getUserById,
    register,
    login,
    loginAuth
}