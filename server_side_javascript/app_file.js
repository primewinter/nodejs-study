const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');


app.get('/topic/new',(req,res)=>{
    fs.readdir('data',(err, files)=>{
        if(err) {
            console.log(err);
            res.status(500).send('Internal Sever Error');
        }
        res.render('new', {topics: files});
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
    fs.readdir('data',(err, files)=>{
        if(err) {
            console.log(err);
            res.status(500).send('Internal Sever Error');
        }
        var id = req.params.id;
        if(id) {
            // id값이 있을 때
            fs.readFile('data/'+id, 'utf8', (err, data)=>{
                if(err) {
                    console.log(err);
                    res.status(500).send('Internal Sever Error');
                }
                res.render('view', {title:id, topics: files, description: data});
            });
        } else {
            // id값이 없을 때
            res.render('view', {topics:files, title:'welcome', description:'Hello, Javascript for server.'});
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