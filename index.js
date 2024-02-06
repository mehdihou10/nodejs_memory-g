//dependensies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


//app
const app = express();


//settings
require('dotenv').config();

app.use(cors());

app.use(express.json());

const path = require('path');
app.use("/uploads",express.static(path.join(__dirname,"uploads")));


//connect server to mongodb and start the server
mongoose.connect(process.env.MONGO_URL)
.then(()=>app.listen(process.env.PORT,()=>console.log('welcome to mehdi empire')))
.catch((error)=>console.log(error.message))


//routes
app.get('/',(req,res)=>res.send('<h1>Welcome to Mehdi Empire</h1>'))

const postsRouter = require('./routes/posts.routes');
app.use('/api/posts',postsRouter);


//error handler
const {ERROR} = require('./utils/http.status');

app.use((err,req,res,next)=>{

    res.json({status: ERROR || err.status, code: 500 || err.code, message: err.message})
})