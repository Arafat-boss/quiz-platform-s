const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ybjyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect(); // MongoDB কানেক্ট করো
    console.log('✅ Connected to MongoDB!');

    // Database & Collection
    const database = client.db('quizDB'); 
    const quizzesCollection = database.collection('quizzes'); 
    const scoresCollection = database.collection('scores');

    // ✅ **GET API for Quizzes**
    app.get('/api/quizzes', async (req, res) => {
      try {
        const quizzes = await quizzesCollection.find({}).toArray();
        if (quizzes.length === 0) {
          return res.status(404).send({ error: 'No quizzes found!' });
        }
        res.status(200).send(quizzes);
      } catch (error) {
        console.error('❌ Error fetching quizzes:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });

    // ✅ **POST API to Add a New Quiz**
    app.post('/api/quizzes', async (req, res) => {
      try {
        const newQuiz = req.body;
        const result = await quizzesCollection.insertOne(newQuiz);
        res.status(201).send(result);
      } catch (error) {
        console.error('❌ Error adding quiz:', error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });

    // ✅ **GET Scores by User Email**
    app.get('/api/scores/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const query = { email };
        const scores = await scoresCollection.find(query).sort({ date: -1 }).toArray();
        res.status(200).send(scores);
      } catch (error) {
        console.error('❌ Error fetching scores:', error);
        res.status(500).send({ error: 'Failed to fetch scores' });
      }
    });

    // ✅ **POST API to Save a Score**
    app.post('/api/scores', async (req, res) => {
      try {
        console.log(req.body);
        const { score, email, total } = req.body;
        const newScore = { score, email, total, date: new Date().toISOString() };
        const result = await scoresCollection.insertOne(newScore);
        res.status(201).send(result);
      } catch (error) {
        console.error('❌ Error saving score:', error);
        res.status(500).send({ error: 'Failed to save score' });
      }
    });

    // ✅ **Basic API Route**
    app.get('/', (req, res) => {
      res.send('🎉 Quiz Platform API is running!');
    });

    // ✅ **Start Server after MongoDB Connection**
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
  }
}

run().catch(console.dir);
