var Pool = require('bitcore-p2p').Pool;
var Peer = require('bitcore-p2p').Peer;
var Networks = require('bitcore-lib').Networks;
var bitcoin = require("bitcoinjs-lib")

let iBitcoin = { 
	
	getPeers(success) {
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
	},
	
	connectPeer(ip, success) {
        var peer = new Peer({ host: ip });

        peer.on('ready', function() {
            console.log(peer.version, peer.subversion, peer.bestHeight);
            //conencted_peers.push(peer);

            if(success) {
                success(peer);
            }
        });

        peer.on('disconnect', function() {
            console.log('connection closed');
        });

        peer.connect();
	},
	
	disconnectPeer(success) {
        //peer.disconnect();
    },
    
    generateWallet(success) {
        var keyPair = bitcoin.ECPair.makeRandom();
        var address = keyPair.getAddress();
        var pkey = keyPair.toWIF();

        if(success) {
            success({
                address: address,
                pkey: pkey
            });
        }
    }
};

module.exports = iBitcoin;