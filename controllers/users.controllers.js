const User = require('../models/users.model');

const bcrypt = require('bcryptjs');

const asyncWrapper = require('../middlewares/async.wrapper');

const httpStatus = require('../utils/http.status');

const generateToken = require('../utils/generate.token');

const createError = require('../utils/create.error');


const getUsers = asyncWrapper(async (req,res)=>{

    const users = await User.find();

    res.json(users);

})


const register = asyncWrapper(async (req,res,next)=>{


    const user = await User.findOne({email: req.body.email});

    if(user){

        const error = createError(httpStatus.FAIL,400,"user already signed");
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

    const requestBody = req.body;

    const user = await User.findOne({email: requestBody.email});

    if(!user){

        const error = createError(httpStatus.FAIL,404,"user not found");
        return next(error);
    }

    const token = generateToken({email: user.email, username: user.userName, image: user.image});

    if(!requestBody.password){

        return res.json({status: httpStatus.SUCCESS,token});

    } else{

        const isPasswordTrue = await bcrypt.compare(requestBody.password, user.password);

        if(!isPasswordTrue){

            const error = createError(httpStatus.FAIL,400,"incorrect password");
            return next(error);
        }

        return res.json({status: httpStatus.SUCCESS,token});
    }

})

module.exports = {

    getUsers,
    register,
    login
}