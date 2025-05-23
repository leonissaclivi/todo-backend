const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {type: String, required: true},
    password: {type:String, required:true, min:8}
})

module.exports = mongoose.model('Users', userSchema)