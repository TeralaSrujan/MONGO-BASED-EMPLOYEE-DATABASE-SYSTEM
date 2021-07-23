const mongoose = require('mongoose');

let employee3Scheme = new mongoose.Schema({
    name : String,
    age : Number,
    gender : String,
    designation : String,
    salary : Number,
    contact :Number
});

module.exports = mongoose.model('Employee3', employee3Scheme);