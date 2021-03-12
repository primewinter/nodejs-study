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

app.get(['/topic/:id/edit'],(req,res)=>{
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, (err, topics, fields)=>{
        var id = req.params.id;
        if(id) {
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], (err, topic, fields) =>{
                if(err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('edit', {topics: topics, topic:topic[0]})
                }
            });
        } else {
            console.log('There is no Id.');
            res.status(500).send('Internal Sever Error');
        }
    });
});

app.post(['/topic/:id/edit'],(req,res)=>{
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;
    var sql = 'UPDATE topic SET title=?, description=?, author=?\
    WHERE id=?';
    conn.query(sql,[title, description, author, id], (err, result, fields)=>{
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic/'+id);
        }
    });
});

app.get('/topic/:id/delete', (req, res)=>{
    var sql = 'SELECT id, title FROM topic';
    var id = req.params.id;
    conn.query(sql, [id], (err, topics, fields)=> {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], (err, topic)=> {
                if(err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    if(topic.length === 0) {
                        console.log('There is no record.');
                        res.status(500).send('Internal Server Error');
                    }
                    res.render('delete', {topics:topics, topic:topic[0]});
                }
            });
        }
    });
});

app.post('/topic/:id/delete', (req, res)=> {
    var id = req.params.id;
    var sql = 'DELETE FROM topic WHERE id=?';
    conn.query(sql, [id], (err, result)=> {
        res.redirect('/topic');
    });
});

app.post('/topic/add', (req,res)=>{
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
    conn.query(sql, [title, description, author], (err, topics, fields)=> {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic');            
        }
    })
});

app.listen(3000,()=>{
    console.log('Connected 3000 port!');
});