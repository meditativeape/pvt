/**
 * Server game instance.
 */

// Import UUID
var UUID = require('node-uuid');

var GameServer = function(){
	pikachuPlayer = null;
	trPlayer = null;
	// Store game's uuid
	this.id = UUID();
}

GameServer.prototype.setPikachuPlayer = function(/*client*/ player){
	pikachuPlayer = player;
}

GameServer.prototype.setTRPlayer = function(/*client*/ player){
	trPlayer = player;
}

//Export GameServer
module.exports = GameServer;