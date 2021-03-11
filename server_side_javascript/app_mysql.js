const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const dev = require('./config/dev');
var mysql = require('mysql');
const { connect } = require('http2');
var conn = mysql.createConnection({
   host     : dev.mysql.host,
   port     : dev.mysql.port,
   user     : dev.mysql.user,
   password : dev.mysql.password,
   database : dev.mysql.database
});
conn.connect();
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
//jade views
app.set('views', './views_mysql');
app.set('view engine', 'jade');


app.get('/topic/add',(req,res)=>{
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, (err, topics, fields)=>{
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('add', {topics: topics});
    })
});

app.post('/topic/add', (req,res)=>{
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) VALUES(?,?,?)';
    conn.query(sql, [title, description, author], (err, result, fields)=>{
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+result.insertId);
    });
});



/*
app.get('/topic',(req,res)=>{
    fs.readdir('data',(err, files)=>{
        if(err) {
            console.log(err);
            res.status(500).send('Internal Sever Error');
        }
        res.render('view', {topics:files});
    });
});

app.get('/topic/:id',(req,res)=>{
    var id = req.params.id;
    fs.readFile('data/'+id, 'utf8', (err, data)=>{
        if(err) {
            console.log(err);
            res.status(500).send('Internal Sever Error');
        }
        fs.readdir('data',(err, files)=>{
            if(err) {
                console.log(err);
                res.status(500).send('Internal Sever Error');
            }
            res.render('view', {title:id, topics: files, description: data});
        });
    });
});
*/
// refactored
app.get(['/topic', '/topic/:id'],(req,res)=>{
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, (err, topics, fields)=>{
        var id = req.params.id;
        if(id) {
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], (err, topic, fields) =>{
                if(err) {
                    console.log(err);
                    res.status(500).send('Internal Sever Error');
                } else {
                    res.render('view', {topics: topics, topic:topic[0]})
                }
            });
        } else {
            res.render('view', {topics: topics});
        }
    });
});

app.post('/topic', (req,res)=>{
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, (err)=>{
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });
});

app.listen(3000,()=>{
    console.log('Connected 3000 port!');
});