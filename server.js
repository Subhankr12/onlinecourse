const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const uri = "mongodb+srv://subhankr12:hogrider123@courses.f0h70.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Successfully connected to MongoDB');
})

app.use('/courses', require('./routes/courses'));
app.use('/topics', require('./routes/topics'));

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
})