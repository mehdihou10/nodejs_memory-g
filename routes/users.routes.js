
const express = require('express');

const router = express.Router();

const {getUsers,register,login, loginAuth, getUserById} = require('../controllers/users.controllers');
const {registerVer,loginVer} = require('../middlewares/verify.input');
const verifyToken = require('../middlewares/verify.token');


router.get('/',getUsers)
router.get('/:userId',getUserById)

router.post('/register',registerVer,register);
router.post('/login',loginVer,login);
router.post('/googleAuth/login',loginAuth);


module.exports = router;