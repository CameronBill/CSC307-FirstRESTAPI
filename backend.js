//import express
const express = require('express');

//create instance of express
const app = express();

//port # constant
const port = 5000;

const users = { 
	users_list :
	[
		{ 
			id : 'xyz789',
			name : 'Charlie',
			job: 'Janitor',
		},
		{
			id : 'abc123', 
			name: 'Mac',
			job: 'Bouncer',
		},
		{
			id : 'ppp222', 
			name: 'Mac',
			job: 'Professor',
		}, 
		{
			id: 'yat999', 
			name: 'Dee',
			job: 'Aspring actress',
		},
		{
			id: 'zap555', 
			name: 'Dennis',
			job: 'Bartender',
		}
	]
};

//process incoming data in json format
app.use(express.json());

//sets endpoint to accept http GET requests
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/users', (req, res) => {
	res.send(users);
});

//backend server listens to http requests on defined port #
app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
});