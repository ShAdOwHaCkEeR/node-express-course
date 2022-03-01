const express = require('express');
const bodyParser = require('body-parser');
const tokenGen = require('./token');

const app = express();

app.use(bodyParser.json());

const mockUserData=[
    {name: 'Mark'},
    {name: 'Jill'}
]

app.get('/users',function(req,res){
	res.json({
		success: true,
		message: 'successfully got users. Nice!',
		users: mockUserData
	})
})
// colons are used as variables that be viewed in the params
app.get('/users/:id', function(req, res) {
    res.json({
        success: true,
        message: 'got one user',
        user: req.params.id
    })
})

app.post('/login', function(req, res){
    // Typically passwords are encrypted using something like bcrypt before sending to database
    const username = req.body.username;
    const password = req.body.password;

    // This should come from the database
    const mockUsername="billyTheKid";
 	const mockPassword="superSecret";

    let AUTH = new tokenGen.TokenGenerator(password);

    if (username===mockUsername && password===mockPassword){
        // In practice, use JSON web token sign method here to make an encrypted token
        AUTH.createToken();
        res.json({
            success: true,
            message: 'password and username match !',
            token: AUTH.token
        })
    } else {

        res.json({
            success: false,
            message: 'password and username do not match !',
            data: [username, password]
        })
    }
})


app.listen(8000,function(){
    console.log("Server Is UP 👌 .")
})