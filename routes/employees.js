const express = require('express');
const router = express.Router();

const Employee3 = require('../models/employee3');


//get routes starts here
router.get('/', (req, res)=> {
    Employee3.find({})
        .then(employees => {
            res.render('index', {employees : employees});
        })
        .catch(err=> {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        })
    
});

router.get('/employee3/new', (req,res)=> {
    res.render('new');
});

router.get('/employee3/search', (req,res)=> {
    res.render('search', {employee3:""});
});

router.get('/employee3/home', (req,res)=> {
    res.render('home');
});
router.get('/employee3/analytics', (req,res)=> {
    res.render('analytics', {employee3:""});
});

router.get('/employee3', (req,res)=> {
    let searchQuery = {name : req.query.name};

    Employee3.findOne(searchQuery)
        .then(employee3=> {
            res.render('search', {employee3:employee3});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});

router.get('/employee3/analytics', (req,res)=> {
    let searchQuery = {_id : req.params.id};

    Employee3.aggregate(searchQuery,([{$group: {_id:"avg", sal: {$avg:req.body.salary} } }]))
        .then(employee3=> {
            res.render('analytics', {employee3:employee3});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});

router.get('/edit/:id', (req, res)=> {

    let searchQuery = {_id : req.params.id};
    Employee3.findOne(searchQuery)
        .then(employee3 => {
            res.render('edit', {employee3:employee3});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});

//get routes ends here


//post routes starts here
router.post('/employee3/new', (req,res)=> {
    let newEmployee3 = {
        name : req.body.name,
        age : req.body.age,
        gender:req.body.gender,
        designation : req.body.designation,
        salary : req.body.salary,
        contact:req.body.contact
    };

    Employee3.create(newEmployee3)
        .then(employee3 => {
            req.flash('success_msg', 'Employee data added to database successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});

//post routes end here

//put routes starts here

router.put('/edit/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    Employee3.updateOne(searchQuery, {$set: {
        name : req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        designation : req.body.designation,
        salary : req.body.salary,
        contact : req.body.contact
    }})
    .then(employee3 => {
        req.flash('success_msg', 'Employee data updated successfully.')
        res.redirect('/');
    })
    .catch(err => {
        req.flash('error_msg', 'ERROR: '+err)
        res.redirect('/');
    });
});

//put routes ends here


//delete routes starts here
router.delete('/delete/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    Employee3.deleteOne(searchQuery)
        .then(employee3=>{
            req.flash('success_msg', 'Employee deleted successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});

//delete routes ends here
module.exports = router;