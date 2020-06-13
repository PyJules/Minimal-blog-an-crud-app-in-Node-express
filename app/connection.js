const mysql = require('mysql');

var mysqlConnection = () => mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'blog'
});

var dbConnection = () => mysqlConnection.connect((err) => {
    if(err){
        console.log('DB connection failed'+JSON.stringify(err, undefined, 2));
    }
    console.log("DB connection success");
}); 

module.exports = mysqlConnection;
