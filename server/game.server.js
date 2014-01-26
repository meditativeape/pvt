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

var GameServer = function(/*GameState*/ gameState){
    this.gameState = gameState;
	this.pikachuPlayer = null;
	this.trPlayer = null;
    
	// Store game's uuid
	this.id = UUID();
    
    this.serverTime = 0;               // Server time
    this.localTime = 0.016;            //The local timer
    this.dt = new Date().getTime();    //The local timer delta
    this.dte = new Date().getTime();   //The local timer last frame time
    
    this.lastState = {};
    
    // Create a fast-paced timer for measuing time easier
    this.createTimer();
};

GameServer.prototype.createTimer = function(){
    this.timerId = this.timersetInterval(function(){
        this.dt = new Date().getTime() - this.dte;
        this.dte = new Date().getTime();
        this.localTime += this.dt/1000.0;
    }.bind(this), 4);
}

GameServer.prototype.setPikachuPlayer = function(/*client*/ player){
	this.pikachuPlayer = player;
};

GameServer.prototype.setTRPlayer = function(/*client*/ player){
	this.trPlayer = player;
};

GameServer.prototype.leaveGame = function(/*client*/ player){
	//TODO
};

/**
 * Send message to a recipient.
 */
GameServer.prototype.sendMsg = function(/*Player*/ recipient, /*String*/ message){
    var clientIdentity;
    if (recipient.id === this.pikachuPlayer.id) {
        clientIdentity = "pikachu";
    } else if (client.id === this.trPlayer.id) {
        clientIdentity = "team rocket";
    } else {
        console.log("Error! Unrecognized player " + client.id + "when sending message");
        return;
    }
	console.log(this.id.substring(0,8) + " sends a message to " + clientIdentity + " " + recipient.player + ": " + message);
	recipient.send(message);
};

/**
 * Physics update loop.
 */
GameServer.prototype.physicsUpdate = function(){
    this.processInput();
    
    this.pikachuPlayer.inputs = [];
    this.trPlayer.inputs = [];
};

/**
 * Process newly received player inputs.
 */
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
            } else if (input.action === 'stop') {
                // do something
            }
        }
        this.pikachuPlayer.lastInputTime = input.time;
        //this.pikachuPlayer.lastInputSeq = input.seq;
    }
    
    var trInputsLength = this.trPlayer.inputs.length;
    if (trInputsLength) {
        var input;
        for (input in this.trInputsLength.inputs) {
            // do something
        }
        this.trPlayer.lastInputTime = input.time;
        //this.trPlayer.lastInputSeq = input.seq;
    }
};

/**
 * Network update loop.
 */
GameServer.prototype.networkUpdate = function(){
    this.serverTime = this.localTime;
    
    // make a snapshot of current state
    this.lastState = {
        pikachuPos: this.gameState.pikachu.center,
        pikachuLastInputSeq: this.pikachuPlayer.lastInputSeq,
        trLastInputSeq: this.trPlayer.lastInputSeq,
        time: this.serverTime
    };
    
    // send the snapshot to both states
    this.pikachuPlayer.emit('onserverupdate', this.lastState);
    this.trPlayer.emit('onserverupdate', this.lastState);
};

/**
 * The function that handles client message.
 */
GameServer.prototype.handleMessage = function(client, message){
    var keywords = message.split(" ");
    var clientIdentity;
    if (client.id === this.pikachuPlayer.id) {
        clientIdentity = "pikachu";
    } else if (client.id === this.trPlayer.id) {
        clientIdentity = "team rocket";
    } else {
        console.log("Error! " + this.id.substring(0,8) + " received message from unrecognized player " + client.id + ": " + message);
        return;
    }
    console.log(this.id.substring(0,8) + " received a message from " + clientIdentity + ": " + message);
    
    switch (keywords[1]) {
    case "input":
        if (clientIdentity === "pikachu") {
            var input = {
                action: keywords[2],
                time: parseInt(keywords[3])
            };
            this.pikachuPlayer.inputs.push(input);
            this.sendMsg(this.trPlayer, message); // TODO: change time???
        } else {
            var newPokeballPos = new Point(parseInt(keywords[3]), parseInt(keywords[4]))
            var input = {
                pos: new Point(parseInt(keywords[3]), parseInt(keywords[4]))
            };
            this.trPlayer.inputs.push(input);
            this.sendMsg(this.pikachuPlayer, message); // TODO: change time???
        }
        break;
    default:
    }
}

//Export GameServer
module.exports = GameServer;