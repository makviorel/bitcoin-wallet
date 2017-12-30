
var Pool = require('bitcore-p2p').Pool;
var Networks = require('bitcore-lib').Networks;

let Peers = { 
	
	get(success) {
		var pool = new Pool({network: Networks.livenet});
        pool.connect();

        var nodes = [];
        var maxNodes = 3;
        var count = 0;
        
        pool.on('peerinv', function(peer, message) {
            nodes.push(peer.host);
            count++;
            if (count > maxNodes) {
                pool.disconnect();

                if(success) {
                    success(nodes)
                }
            }
        });
	}
};

module.exports = Peers;