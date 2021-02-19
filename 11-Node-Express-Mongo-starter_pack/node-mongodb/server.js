const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = 3000

app.set('views engine', 'index.pug')
app.use(express.static('public'))
app.use(bodyParser.json())

const connectionString = "mongodb+srv://maysaorash:nHrAg2sVrtv69AT@cluster0.nmkzg.mongodb.net/quotes?retryWrites=true&w=majority"
MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
    const db = client.db('quotes')
    const quotesCollection = db.collection('quotes')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.get('/', (req, res) => {
    db.collection('quotes').find().toArray()
    .then(result => {
        res.render('index.pug', { quotes: result })
        })
    .catch(error => console.error(error))
    })
    app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
     .then(result => {
        res.redirect('/')
    })
    .catch(error => console.error(error))
    })
    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
        { name: 'Maysa' }, // write it manually from your quotes
        {
        $set: {
        name: req.body.name,
        address: req.body.address
         }
        },
        {
         upsert: true
        }
        )
        .then(result => {
         res.json('Success')
        })
        .catch(error => console.error(error))
        })
        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
              { name: "Zerrin"}

            )          
                .then(result => {if (result.deletedCount === 0) {
                    return res.json('No quote to delete')
                  }
            })
                .catch(error => console.error(error))
          })
          
    app.listen(port, () => console.log(`Example app listening on port port!`))
    })
    .catch(console.error)
  
