const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.use(express.json());

mongoose.connect('mongodb://localhost:27017/learn', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});