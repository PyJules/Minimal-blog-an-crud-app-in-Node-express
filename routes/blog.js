const express = require('express');
const dbConnection = require('../app/connection')();
const router = express.Router();

router.get('/', function (req, res) { 
    let sql = `SELECT * FROM posts`;
    dbConnection.query(sql, function (error, results) { 
        console.log(results);
        res.render('blog', {results:results});
    });
    
});

// detail of posts
router.get('/posts/:id', function (req, res) { 
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    dbConnection.query(sql, function(error, result){
        if(error) throw error;
        res.render('detail', {result:result});
    });
});



module.exports = router;