/**
 * Server side we import helper objects.
 */
if( 'undefined' !== typeof global ){
    var helper = require("../shared/game.shared.helper.js");
	var Point = helper.Point;
	var CONSTANTS = helper.CONSTANTS;
};

// Import UUID
var UUID = require('node-uuid');

var GameServer = function(){
	this.pikachuPlayer = null;
	this.trPlayer = null;
    
	// Store game's uuid
	this.id = UUID();
};

GameServer.prototype.setPikachuPlayer = function(/*client*/ player){
	this.pikachuPlayer = player;
};

GameServer.prototype.setTRPlayer = function(/*client*/ player){
	this.trPlayer = player;
};

GameServer.prototype.leaveGame = function(/*client*/ player){
	//TODO
};

GameServer.prototype.physicsUpdate = function(){
    
};

GameServer.prototype.processInput = function(){
    var pikachuInputsLength = this.pikachuPlayer.inputs.length;
    if (pikachuInputsLength) {
        var input;
        for (input in this.pikachuPlayer.inputs) {
            if (input.action === 'left') {
                // do something
            } else if (input.action === 'up') {
                // do something
            } else if (input.action === 'right') {
                // do something
            }
        }
        this.pikachuPlayer.lastInputTime = input.time;
        this.pikachuPlayer.lastInputSeq = input.seq;
    }
    
    var trInputsLength = this.trPlayer.inputs.length;
    if (trInputsLength) {
        var input;
        for (input in this.trInputsLength.inputs) {
            // do something
        }
        this.trPlayer.lastInputTime = input.time;
        this.trPlayer.lastInputSeq = input.seq;
    }
};

//Export GameServer
module.exports = GameServer;