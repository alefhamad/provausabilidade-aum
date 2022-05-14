const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const app = express();
const MongoCliet = require('mongodb').MongoClient;

const uri = "mongodb+srv://root:wQDDSSrSnCkZfC4d@cluster0.vuqgj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoCliet.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crud-nodejs') // coloque o nome do seu db
    app.listen(3000, function () {
        console.log('listening on 3000');
    });
})

app.use(bodyParser.urlencoded({ extended: true }));


//controller do fetch data from mongodb

app.get('/', (req, res) => {
    //let cursor = db.collection('data').find()
    res.render('index.ejs', { data: cursor })
});

app.get('/show', (req, res) => {
    db.collection('data').find().sort({_id:-1}).limit(1).toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('Salvo com sucesso')
        res.redirect("/show")
        db.collection('data').find().sort({_id:-1}).limit(1).toArray(function (err, result) {
            if (err) return console.log(err);
            console.log(result);
        });
    });
});

app.delete('/show', (req, res) => {
    db.collection('data').deleteOne(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('Apagado com sucesso');
        res.redirect("/")
    })
})

//arquivos estáticos 
app.use(express.static('public'));
app.use('/css', express.static(__dirname = 'public/css'));
app.use('/img', express.static(__dirname = 'public/img'));
