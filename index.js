const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

const MongoClient = require('mongodb').MongoClient;

const url  ='mongodb+srv://kolimayurs:29031991@cluster0-onizc.mongodb.net';

app.use(cors());

const port = Number(process.env.PORT || 4000);

app.get('/', (req, res) =>{
	res.send('goto /users')
})

app.get('/users', verifyToken, (req, res) => {
	jwt.verify(req.token, 'key', (err, authData) =>{
		if(err){
			res.sendStatus(403);
		}
		else{
			MongoClient.connect(url,{ useNewUrlParser: true }, (err, db) => {
		if(err){
			return res.send(err);
		}
		var dbo = db.db("myDB");
		dbo.collection("Users").find({}).toArray((err, result) => {
			if(err){
				res.send(err);
			}
			if(result){
				res.json({
					result
				})
			}
		})
	})
		}
	})
	
})

app.get('/login', (req,res) => {
	const user = {
		id:1,
		username:'Mayur',
		email: 'mayur@mayurkoli.com'
	}
	jwt.sign({user}, 'key', (err, token) => {
		res.json({
			token
		})
	});
})

function verifyToken(req, res, next){
	const bearerHeadr = req.headers.auth;
	if(typeof bearerHeadr !== 'undefined'){
		const bearer = bearerHeadr.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	}
	else{
		res.sendStatus(403);
	}
}

app.listen(port, () => {
	console.log('App listen at ' + port);
})