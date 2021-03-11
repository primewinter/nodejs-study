const dev = require('./config/dev');
var mysql = require('mysql');
var conn = mysql.createConnection({
   host     : dev.mysql.host,
   port     : dev.mysql.port,
   user     : dev.mysql.user,
   password : dev.mysql.password,
   database : dev.mysql.database
});
 
conn.connect();

/*
//SELECT SQL
var sql = 'SELECT * FROM topic';
conn.query(sql, (err, rows, fields) => {
    if(err) {
        console.log(err);
    } else {
        for(var i=0; i<rows.length; i++) {
            console.log(rows[i].title, rows[i].author);
        }

        // console.log('rows', rows); 
        // console.log('fields', fields); // 컬럼에 대한 상세 정보
    }
});
*/

/*
//INSERT SQL
//var sql1 = 'INSERT INTO topic (title, description, author) \
//VALUES("Nodejs", "Server side javascript", "egoing")';
var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
var params = ['Supervisor', 'Watcher', 'graphittie'];
//conn.query(sql1, (err, rows, fields)=> {
conn.query(sql, params, (err, rows, fields)=> {
    if(err) {
        console.log(err);
    } else {
        console.log(rows);
        ///* rows
        OkPacket {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 3,
            serverStatus: 2,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0
        }
        //*
    }
})
*/


/*
// UPDATE SQL
var sql = 'UPDATE topic SET title=? WHERE id=?';
var params = ['NPM', '2'];
conn.query(sql, params, (err, rows, fields)=> {
    if(err) {
        console.log(err);
    } else {
        console.log('rows',rows);
        // OkPacket {
        //     fieldCount: 0,
        //     affectedRows: 1,
        //     insertId: 0,
        //     serverStatus: 2,
        //     warningCount: 0,
        //     message: '(Rows matched: 1  Changed: 1  Warnings: 0',
        //     protocol41: true,
        //     changedRows: 1
        // }
        console.log('fields', fields);
        // fields : undefined
    }
})
*/

// DELETE SQL
var sql = 'DELETE FROM topic WHERE id=?';
var params = ['1'];
conn.query(sql, params, (err, rows, fields)=> {
    if(err) {
        console.log(err);
    } else {
        console.log('rows',rows);
        // rows OkPacket {    
        //     fieldCount: 0,   
        //     affectedRows: 1, 
        //     insertId: 0,     
        //     serverStatus: 2, 
        //     warningCount: 0, 
        //     message: '',     
        //     protocol41: true,
        //     changedRows: 0   
        //   }
        console.log('fields', fields);
        // fields : undefined
    }
})

conn.end();
