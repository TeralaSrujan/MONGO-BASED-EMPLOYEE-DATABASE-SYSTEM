const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const { kStringMaxLength } = require('buffer');

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://srujan256:19962@cluster0.joshv.mongodb.net/test');

const employeeScheme = {
  
        name : String,
        age : Number,
        gender : String,
        designation : String,
        salary : Number,
        contact :Number
}

const employee3 = mongoose.model('employee3', moviesSchema);

app.get('/', (req, res) => {
    Movie.find({}, function(err, movies) {
        res.render('index', {
        employee3: employee3
        })
    })
})

app.listen(4000, function() {
    console.log('server is running');
})