//import express
const express = require('express');

//create instance of express
const app = express();

//port # constant
const port = 5000;

//process incoming data in json format
app.use(express.json());

//sets endpoint to accept http GET requests
app.get('/', (req, res) => {
	res.send('Hello World!');
});

//backend server listens to http requests on defined port #
app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
});