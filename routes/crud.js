const express = require('express');
const multer = require('multer');
const session = require('express-session');
const helpers = require('../app/helpers');
const dbConnection = require('../app/connection')();

const router = express.Router()

    var storage = helpers.storage;
    var upload = multer({storage:storage});

    router.get('/crud', function (req, res) { 
        
        let sql = "SELECT * FROM products ORDER BY id DESC";
        let query = dbConnection.query(sql, (error, results)=>{
            if(error) throw error;
            res.render('index', {results:results})
        })
    }); 
    
    // route form insert data
    router.post('/crud/save',upload.single('product_image'),function(req, res) {
        let data = {
            product_name:req.body.product_name, 
            product_price:req.body.product_price,
            product_image:req.file.filename,
        };
        
        let sql = 'INSERT INTO products SET ?';
        let query = dbConnection.query(sql, data, function (error, results) { 
            if(error) throw error;
            res.redirect('/crud');
         });
    });

    // route update data
    router.post('/crud/update', function(req, res) {
        let sql = `UPDATE products SET product_name="${req.body.product_name}",
                   product_price="${req.body.product_price}" 
                   WHERE id="${req.body.product_id}"`;
        let query = dbConnection.query(sql, function(error, results) {
            if(error) throw error;
            res.redirect('/crud');
        });
    });

    //delete product 
    router.post('/crud/delete', function (req, res) { 
        let sql = `DELETE FROM products WHERE id="${req.body.product_id}"`;
        let query = dbConnection.query(sql, function (error, result) { 
            if(error) throw error;
            res.redirect('/crud');
         });
     });
//Blog router
     router.get('/blog', function (req, res) { 
        res.render('blog');
    });

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