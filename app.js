const express=require('express');
require('dotenv').config();
const cookieParser=require('cookie-parser');
//const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();

app.use(cookieParser());
app.use(express.urlencoded({extended:true})); 
//app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


const port=process.env.PORT||8000;
const databaseUrl=process.env.databaseUrl;

//Database connection

mongoose.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
.then(()=>console.log("Database connected successfully"))
.catch((err)=>console.log(err))


//Creating server

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
});


//routes

const loginRoutes=require('./routes/login');
const registerRoutes=require('./routes/register');
const logoutRoutes=require('./routes/logout')


app.use('/user/register',registerRoutes);
app.use('/user/login',loginRoutes);
app.use('/user/logout',logoutRoutes);