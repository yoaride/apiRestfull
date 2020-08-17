const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yoaride123',
    database: 'datapersons'
});

mysqlConnection.connect((err) => {
    if(err) {
        console.log(err);
        return
    } else {
        console.log('Db is connected')
    }
});

module.exports = mysqlConnection;