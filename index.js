const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 9000

const app = express()
const corsOptions ={
    origin:['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors({corsOptions}))
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.96corz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
     const jobsCollection = client.db('soloSphereDB').collection('jobs')
     const bidsCollection = client.db('soloSphereDB').collection('bids')

     
      
    //  get all jobs data from db
    app.get('/jobs', async(req, res) =>{
      const result = await jobsCollection.find().toArray()
      res.send(result)
    })

    //get a single job data from db using id
    app.get('/job/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await jobsCollection.findOne(query)
      res.send(result)
    })
     
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      
      
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello from SoloSphere server...')
})

app.listen(port, () => console.log(`Server running on port ${port}`))