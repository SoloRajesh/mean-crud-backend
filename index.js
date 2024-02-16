const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/route');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors')

const PORT = 5000 ;

const mongoDbURL = 'mongodb+srv://rajesh:crudproject@cluster0.jukvujx.mongodb.net/?retryWrites=true&w=majority' ;

mongoose.connect(mongoDbURL);

const connection = mongoose.connection ;

app.listen(PORT,()=>{
    console.log('Server running port is '+ PORT);
});

connection.once('open',()=>{
    console.log('MongoDB is started...');
});

app.use(cors());
app.use(bodyParser.json());
app.use(router);

