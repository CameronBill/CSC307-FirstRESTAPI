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

const cors = require('cors');

app.use(cors());

//process incoming data in json format
app.use(express.json());

//sets endpoint to accept http GET requests
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/users', (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	
	if (name != undefined){
		let result1 = findUserByName(name);
		result1 = {users_list: result1};
		if (job != undefined) {
			let result2 = findUserByJob(job);
			result2 = {users_list: result2};
			let result = result1['users_list'].filter( (user) => result2['users_list'].includes(user));
			result = {users_list: result};
			res.send(result);
		}
		else 
			res.send(result1);
	}

	else if (job != undefined){
		result = findUserByJob(job);
		result = {users_list: result};
		res.send(result);
	}
	
	else
		res.send(users);

});

const findUserByName = (name) => {
	return users['users_list'].filter( (user) => user['name'] === name);
}

const findUserByJob = (job) => {
	return users['users_list'].filter( (user) => user['job'] === job);
}

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


app.post('/users', (req, res) => {
	const userToAdd = req.body;
	addUser(userToAdd);
	res.status(200).end();
});

function addUser(user){
	users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
	const id = req.params['id']; //or req.params.id
	let result = findUserById(id);
	users['users_list'].splice(users['users_list'].indexOf(result), 1);
	res.status(204).end();
})

//backend server listens to http requests on defined port #
app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
});