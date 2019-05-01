const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const port = process.env.PORT || 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'messageBoard';
let db;

app.use(bodyParser.text());
app.use(cors());

app.post('/api/message', (req, res) => { 
  // console.log(req.body);
  db.collection('messages').insertOne({
    msg: req.body
  });  
  res.status(200).send();
});

app.get('/api/message', async (req, res) => { 
  const docs = await db.collection('messages').find({}).toArray();  
  if (!docs) {
    return res.json({ error: 'error getting messages.' });
  }
  res.json(docs);
});

MongoClient.connect(url, (err, client) => { 
  if (err) {
    return console.log('mongodb error', err);
  }
  console.log('connected successfully to db server');
  db = client.db(dbName);
  // getMessages();
});

async function getMessages() {
  const docs = await db.collection('messages').find({}).toArray();  
  console.log(docs);
}

app.listen(port, () => {
  console.log('App running on port: ', port);
});
