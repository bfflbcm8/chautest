const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

const PORT = process.env.PORT || 3000;

const app = express();

// This tells Express we’re using EJS as the template engine.
app.set('view engine', 'ejs')

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

const connectionString = "mongodb+srv://chautest:abc123456@clustertest.onztxwx.mongodb.net/?retryWrites=true&w=majority"

// server -> connect -> MongoDB
MongoClient.connect(connectionString, (err, client) => {

    if (err) return console.error(err)

    console.log('Connected to Database')

    // server -> create -> database -> 'star-wars-quotes' 
    const db = client.db('ATNShop')

    // server -> create -> collection -> 'quotes'
    const quotesCollection = db.createCollection('Product')

    // client -> button -> submit -> request -> post -> '/quotes' 
    app.post('/Product', (req, res) => {

        // server -> insert -> data -> from client 
        quotesCollection.insertOne(req.body)
            .then(result => {
                
                // server -> result -> console 
                console.log(result)

                res.redirect('/')
            })
            .catch(error => console.error(error))

    })

    // We normally abbreviate `request` to `req` and `response` to `res`.
    // client -> request -> localhost:3000 -> server -> response -> index.html
    // server -> find -> database -> collection -> quotes -> documents
    app.get('/', (req, res) => {
        db.collection('Product').find().toArray()
        .then(results => {
        
            //console.log(results)
            // server -> index.ejs -> client 
            res.render('index.ejs', { quotes: results })
        
        })
        .catch(error => console.error(error))
        
    })


    // server -> listen -> port -> PORT
    app.listen(PORT, function() {
        console.log('listening on ' + PORT)
    })

})