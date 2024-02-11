//dependensies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//app
const app = express();


//settings

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:100000}));
app.use(bodyParser.text({ limit: '200mb' }));


require('dotenv').config();

app.use(cors());

app.use(express.json());



//connect server to mongodb and start the server
mongoose.connect(process.env.MONGO_URL)
.then(()=>app.listen(process.env.PORT,()=>console.log('welcome to mehdi empire')))
.catch((error)=>console.log(error.message))


//routes
app.get('/',(req,res)=>res.send('<h1>Welcome to Mehdi Empire</h1>'))

const postsRouter = require('./routes/posts.routes');
const usersRouter = require('./routes/users.routes');

app.use('/api/posts',postsRouter);
app.use('/api/users',usersRouter);


//error handler
const {ERROR} = require('./utils/http.status');

app.use((err,req,res,next)=>{

    res.json({status: err.status || ERROR, code: err.code || 500, message: err.message})
})


//404 page
app.use('*',(req,res)=>{

    res.status(404).json({message: "404 route not found"})
})