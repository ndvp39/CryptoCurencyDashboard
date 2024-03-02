//const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Replace the uri string with your MongoDB connection string.
const uri = "mongodb+srv://CryptoNiceDB:BoT8pLph3Yogj7Em@cryptonicedb.6u9gmdm.mongodb.net/?retryWrites=true&w=majority&appName=CryptoNiceDB";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/cryptoInfo', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("CryptoNice");
    const collection = database.collection("CryptoInfo");
    const cryptoInfo = await collection.find({}).toArray();
    res.json(cryptoInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});