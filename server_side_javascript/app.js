const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.locals.pretty = true;
app.set('views', './views'); // views, 템플릿이 있는 디렉토리(기본값이어서 생략해도 views 폴더를 찾는다.)
app.set('view engine', 'jade'); // view engine, 사용할 템플릿 엔진
app.use(express.static('public')); // 정적인 파일 사용
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// router
app.get('/form',(req,res)=>{
    res.render('form');
});

app.get('/form_receiver',(req,res)=>{
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);
});

app.post('/form_receiver', (req,res)=>{
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+','+description);
});

// topic?key1=value : QueryString -> req.query.key1
// topic/:key1/:key2 : Semantic Url -> req.params.key1
app.get('/topic', (req, res)=>{
    var topics = [
        'Javascript',
        'NodeJs',
        'Express'
    ];
    var output = `
        <a href="/topic?id=0">Javascript</a><br>
        <a href="/topic?id=1">NodeJs</a><br>
        <a href="/topic?id=2">Express</a><br><br>
        ${topics[req.query.id]+' is...'}
    `
    res.send(output);
});
app.get('/topic/:id/:mode', (req, res)=>{
    res.send(req.params.id+','+req.params.mode);
})

app.get('/template', (req, res)=>{
    // res.render() : 템플릿 엔진의 코드에 따라서 만들어진 template 파일을 읽어온다.
    res.render('temp',{time: Date(), _title:'Jade Template'}); // temp라는 이름의 템플릿 파일을 렌더링한다.
    // time의 변수는 jade안에서 하는 것이 아니라 jade바깥에서 변수를 주입해줘야 한다.
})
app.get('/', (req, res)=>{
    res.send('안녕ㅋㅋ');
});

app.get('/dynamic', (req, res)=>{
    var lis = '';
    for(var i=0;i<5;i++) {
        lis += '<li>Coding</li>';
    }
    var time = new Date();
    var output = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        Hello Dynamic Html!
        <ul>
            ${lis}
        </ul>
        ${time}
    </body>
    </html>`;
    res.send(output);
})

app.get('/route', (req, res)=>{
    res.send('Hello router! <img src="/sample.jpg" style="width:30%">');
})

app.get('/login', (req, res)=>{
    res.send('<h1>login please!</h1>');
});


// server
app.listen(3000, ()=>{
    console.log('Connected 3000 port!');
});