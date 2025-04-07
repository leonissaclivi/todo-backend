const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task:{type:String, required:true},
    completed:{type:Boolean, default:false},
    user:{type: mongoose.Schema.Types.ObjectId, ref:"User"}
})

module.exports = mongoose.model('todos', todoSchema)