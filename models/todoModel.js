const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task:{type:String, required:true},
    completed:{type:Boolean, default:false},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
})

module.exports = mongoose.model('todos', todoSchema)