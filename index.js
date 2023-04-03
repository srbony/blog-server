const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.json());


//mongodb


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qvrwoc0.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log('Database Connected...')






async function run() {
    try {
        // Database Collections
        const postsCollection = client.db("").collection("posts");




        //create post api
        app.post("/posts", async (req, res) => {
            const posts = req.body;
            // console.log(posts)
            const result = await postsCollection.insertOne(posts);
            res.send(result);
        });
        //get all posts
        app.get("/posts", async (req, res) => {
            const query = {};
            const posts = await postsCollection.find(query).toArray();
            res.send(posts);
        });
    }
    catch {

        console.log('Database Connected...')
    }
    finally {

    }
}
run().catch(err => console.error(err))



app.get('/', (req, res) => {
    res.send('server is running')
});
app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});

