const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
dotenv = require('dotenv').config();



app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const allowedOrigins = [
  'https://todo-frontend-eta-seven.vercel.app',
  'https://todo-frontend-eta-seven.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

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
