const jwt = require('jsonwebtoken');
const createError = require('../utils/create.error');
const httpStatus = require('../utils/http.status');

const verifyToken = async (req,res,next)=>{

    const header = req.headers['authorization'];

    if(!header){

        const error = createError(httpStatus.FAIL,401,"token required");
        return next(error);
    }

    const token = header.split(" ")[1];

    try{

        const decoded = jwt.verify(token,process.env.JWT_KEY);

        next();

    } catch(err){

        const error = createError(httpStatus.FAIL,401,"invalid token");
        return next(error);
    }

    

}

module.exports = verifyToken;