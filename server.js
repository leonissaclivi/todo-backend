const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
dotenv = require('dotenv').config();



app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: [
    'https://todo-frontend-eta-seven.vercel.app/login',
    'https://todo-frontend-leon-issac-livis-projects.vercel.app/login',
    'http://localhost:5173'
  ],
    credentials: true, 
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'] 
  };
app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://leonissaclivi:ICin4FiLbdoAiuwM@cluster0.fgyjcml.mongodb.net/fullstacktrialTodo')
.then(()=>console.log('connected to MongoDB')
)
.catch(err => console.log(err)
)

const userRouter = require('./routes/userRoutes');
app.use('/api/auth',userRouter);

const todoRouter = require('./routes/todoRoutes')
app.use('/api/todos', todoRouter)


const port = process.env.PORT;


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
    
})
