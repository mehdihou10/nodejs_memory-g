const {body} = require('express-validator');

const registerVerification = [
    body('firstName')
    .notEmpty().withMessage('add Your first name'),

    body('lastName')
    .notEmpty().withMessage('add Your last name'),

    body('userName')
    .notEmpty().withMessage('add Your username'),

    body('email')
    .notEmpty().withMessage('add Your email')
    .isEmail().withMessage('write a valid email'),

]

const loginVerfication = [

    body('email')
    .notEmpty().withMessage('add an email')
    .isEmail().withMessage('write a correct email syntax')

]

module.exports = {

    registerVer: registerVerification,
    loginVer: loginVerfication
}