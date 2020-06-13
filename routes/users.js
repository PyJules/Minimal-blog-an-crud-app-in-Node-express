const express = require('express');
const session = require('express-session');
const helpers = require('../app/helpers');
const dbConnection = require('../app/connection')();

const router = express.Router();

// user routes

router.get('/register', function (req, res) { 
    res.render('register', {title:'Users registration'});
});

router.post('/register', function (req, res) { 
    const data = req.body;
    if(data.f_name !== '' && data.l_name !== '' && data.email !== '' && data.password && data.password_conf){
        let sql = "INSERT INTO users SET ?";
        let datafordb = {
            'f_name':req.body.f_name,
            'l_name':req.body.l_name,
            'email': req.body.email,
            'status':req.body.status,
            'password':req.body.password,
        }
        dbConnection.query(sql, datafordb, function (error, result) { 
            if(error) throw error;
            dbConnection.end(),
            res.redirect('/register');
         });
    }
    session.error = 'il y une erreur veillez remplir tous le champs';
    res.redirect('/register');
})


module.exports = router;