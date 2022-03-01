const express = require('express');
const app = express();

const mockUserData=[
    {name: 'Makr'},
    {name: 'Jill'}
]

app.get('/users/:id', function(req, res) {
    res.json({
        success: true,
        message: 'got one user',
        user: req.params.id
    })
})





app.listen(8000,function(){
    console.log("Server Is UP 👌 .")
})