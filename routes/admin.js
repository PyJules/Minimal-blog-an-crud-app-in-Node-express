const express = require('express');
const multer = require('multer');
const session = require("express-session");
const helpers = require('./../app/helpers');
const dbConnection  = require('./../app/connection')();
const router = express.Router();


// local variable for upload file

var storage = helpers.storage;
var upload = multer({storage:storage});

// routes
router.get('/admin', function (req, res) { 
    res.render('admin');
});

router.post('/post', upload.single('img')  ,function(req,res) {
    // upload image
    const sql = 'INSERT INTO posts SET ?';
    const data = {
        'title': req.body.title,
        'description':req.body.content,
        'image': req.file.filename,
        'status':0,
    };
    dbConnection.query(sql, data, function(error, results) {
        if(error) throw error;
        req.flash("success", "Your post is allready posted");
        res.redirect('/admin');
    });
    
});


module.exports = router;