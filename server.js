const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
dotenv = require('dotenv').config();




app.use(express.json());
app.use(cors());

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
