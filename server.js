var express = require('express');
var app = express();
let http = require('http').Server(app);
var port = process.env.PORT || 8090;
var Peers = require('./models/peer_discovery');  

app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

var routes = express.Router(); 

routes.get('/getPeers', function(req, res) {
   
    Peers.get(function(data) {
        res.status(200).send({ 
            data: data
        });
    })
});

app.use('/api', routes);

// start the server
http.listen(port);
console.log('Magic happens at http://localhost:' + port);