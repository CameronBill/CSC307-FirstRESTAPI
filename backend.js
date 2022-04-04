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
	const name = req.query.name;
	if (name != undefined){
		let result = findUserByName(name);
		result = {users_list: result};
		res.send(result);
	}
	else{
		res.send(users);
	}
});

app.get('/users/:id', (req, res) => {
	const id = req.params['id']; //or req.params.id
	let result = findUserById(id);
	if (result === undefined || result.length == 0)
		res.status(404).send('Resource not found.');
	else {
		result = {users_list: result};
		res.send(result);
	}
});

function findUserById(id) {
	return users['users_list'].find( (user) => user['id'] === id);
	// OR return users['users_list'].filter( (user) => user['id'] === id);
	//.find returns first occurence only, since we are assuming unique ids, this is fine
}
const findUserByName = (name) => {
	return users['users_list'].filter( (user) =>user['name'] === name);
}

//backend server listens to http requests on defined port #
app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
});