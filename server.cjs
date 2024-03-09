const express = require('express');
const { MongoClient } = require('mongodb');

const cors = require('cors');

const app = express();
const port = 3000;

// Use the cors middleware
app.use(cors());

app.use(express.json());



// Replace the uri string with your MongoDB connection string.
const uri = "mongodb+srv://CryptoNiceDB:BoT8pLph3Yogj7Em@cryptonicedb.6u9gmdm.mongodb.net/?retryWrites=true&w=majority&appName=CryptoNiceDB";

const client = new MongoClient(uri, {
  useNewUrlParser: true, // Remove this line, as it's deprecated
  useUnifiedTopology: true, // Remove this line, as it's deprecated
});

app.get('/News', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("CryptoNice");
    const collection = database.collection("News");
    const data = await collection.find({}).toArray();
    res.json(data);
    console.log("News request")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
});


// Handle insertion to "CryptoInfo" collection
app.post('/CryptoInfo', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await client.connect();
    const database = client.db("CryptoNice");
    const collection = database.collection("CryptoInfo");

    // Insert data into "CryptoInfo" collection
    await collection.insertOne({
      name: name,
      email: email,
      message: message,
    });

    res.status(201).json({ message: 'Data inserted successfully' });
    console.log("CryptoInfo insertion request");
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
