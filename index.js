const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(bodyParser.json());
app.use(cors());
const ObjectID = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9mirr.mongodb.net/electro?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });






client.connect(err => {
  const EProductCollection = client.db("electro").collection("E-product");
  const EOrderCollection = client.db("electro").collection("E-Order")
  console.log('database connection success');

// Add single product
  app.post('/addProduct',(req, res) => {
      const product = req.body;
      EProductCollection.insertOne(product)
      .then(result => console.log(result))
  })

  // product api
  app.get('/products', (req, res) => {
      EProductCollection.find({})
      .toArray((error,document) => {
          res.send(document)
      })
  })

  // Add order

  app.post('/addOrder', (req, res) => {
    const order = req.body;
    EOrderCollection.insertOne(order)
    .then(result =>{
      res.send(result.insertedCount > 0)
    })
  })

  // order api 

  app.get('/order', (req, res) => {
    EOrderCollection.find({email:req.query.email})
    .toArray((error,document) => {
      res.send(document)
    })
  })

  // delete Product

  app.delete('/deleteProduct/:id',(req, res) => {
    const id = ObjectID(req.params.id)
        console.log('delete this' , id);
        EProductCollection.findOneAndDelete({_id:id})
        .then(res.send(!!document.value))
  })

});

















app.get('/', (req, res) =>{
    res.send('hello world')
})

app.listen(process.env.PORT || 5000)