var express = require('express');
var app = express();
let http = require('http').Server(app);
var port = process.env.PORT || 8090;
var iBitcoin = require('./models/iBitcoin');  

app.get('/', function(req, res) {
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

var routes = express.Router(); 

routes.get('/getPeers', function(req, res) {
   
    iBitcoin.getPeers(function(data) {
        if(data.length > 0) {
            iBitcoin.connectPeer(data[0], function() {
                res.status(200).send({
                    status: 'peer_connected',
                    data: data[0]
                });
            });
        }
    })
});

routes.get('/createWallet', function(req, res) {
   
    iBitcoin.generateWallet(function(data) {
        res.status(200).send({
            data: data
        });
    })
});



app.use('/api', routes);

// start the server
http.listen(port);
console.log('Magic happens at http://localhost:' + port);