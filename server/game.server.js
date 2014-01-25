/**
 * Server side we import helper objects.
 */
if( 'undefined' !== typeof global ){
    var helper = require("./shared/game.shared.helper.js");
	var Point = helper.Point;
	var CONSTANTS = helper.CONSTANTS;
}

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
