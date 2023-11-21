const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json());
// app.use(cors());
// Connect to MongoDB (replace 'your_database' with your actual database name)
mongoose.connect('mongodb://localhost:27017/hello_world', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Mongoose Schema
const helloWorldSchema = new mongoose.Schema({
    message: String,
});
const HelloWorld = mongoose.model('HelloWorld', helloWorldSchema);

// Insert data into the database
app.post('/addData', async (req, res) => {
    try {
        const newHelloWorldData = new HelloWorld({message: req.body.message});
        await newHelloWorldData.save();
        res.send('Data added successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding data to the database');
    }
});

app.post('/deleteData', async (req, res) => {
    const deltetIds = req.body.ids;
    const condition = {
        _id: { $in: deltetIds }
    };
    try {
        // Assuming you have a MongoDB model named HelloWorld
        const result = await HelloWorld.deleteMany(condition);
        res.send(`${result.deletedCount} messages deleted successfully.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting messages from the database');
    }
});

app.post('/updateData', async (req, res) => {
    const {id, message} = req.body;
    try {
        // Assuming you have a MongoDB model named HelloWorld
        const result = await HelloWorld.findOneAndUpdate({_id: id}, {message});
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating messages from the database');
    }
});

// Retrieve data from the database
app.get('/getData', async (req, res) => {
    try {
        const data = await HelloWorld.find();
        const modifiedData = data.map(({message, _id})=>{
            return {message, id:_id};
        })
        console.log(modifiedData);
        res.json(modifiedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from the database');
    }
});

app.get('/', (req, res) => {
    res.send('Hello World from Node.js!');
});

app.listen(PORT,  () => {
    console.log(`Server is running on port ${PORT}`);
});