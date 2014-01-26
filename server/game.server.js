/**
 * Server side we import helper objects.
 */
if( 'undefined' !== typeof global ){
    var helper = require("../shared/game.shared.helper.js");
	var Point = helper.Point;
	var CONSTANTS = helper.CONSTANTS;
    var GameState = require("../shared/game.shared.state.js");
    var Platform = require("../shared/game.shared.platform.js");
};

// Import UUID
var UUID = require('node-uuid');

var GameServer = function(){
    this.gameState = new GameState(this);
	this.pikachuPlayer = null;
	this.trPlayer = null;
    this.started = false;
    this.count = this.randomNumber(5*CONSTANTS.platformUnitWidth,2*CONSTANTS.platformUnitWidth);
    
	// Store game's uuid
	this.id = UUID();
    
    // this.serverTime = 0;               // Server time
    // this.localTime = 0.016;            //The local timer
    // this.dt = new Date().getTime();    //The local timer delta
    // this.dte = new Date().getTime();   //The local timer last frame time
    
    this.lastState = {};
    
    // Create a fast-paced timer for measuing time easier
    // this.createTimer();
};

// GameServer.prototype.createTimer = function(){
    // this.timerId = setInterval(function(){
        // this.dt = new Date().getTime() - this.dte;
        // this.dte = new Date().getTime();
        // this.localTime += this.dt/1000.0;
    // }.bind(this), 4);
// }

GameServer.prototype.setPikachuPlayer = function(/*client*/ player){
	this.pikachuPlayer = player;
	this.pikachuPlayer.inputs = [];
};

GameServer.prototype.setTRPlayer = function(/*client*/ player){
	this.trPlayer = player;
	this.trPlayer.inputs = [];
};

GameServer.prototype.start = function(){
	this.started = true;
    this.physicsId = setInterval(this.physicsUpdate.bind(this), 15); // update physics every 15ms
    this.networkId = setInterval(this.networkUpdate.bind(this), 15); // update clients every 15ms
}

GameServer.prototype.cleanUp = function(){
    clearInterval(this.physicsId);
    clearInterval(this.networkId);
}

GameServer.prototype.leaveGame = function(/*client*/ player){
	//TODO
};

/**
 * Send message to a recipient.
 */
GameServer.prototype.sendMsg = function(/*Player*/ recipient, /*String*/ message){
    var clientIdentity;
    if (recipient.userid === this.pikachuPlayer.userid) {
        clientIdentity = "pikachu";
    } else if (recipient.userid === this.trPlayer.userid) {
        clientIdentity = "team rocket";
    } else {
        console.log("Error! Unrecognized player " + recipient.userid.substring(0,8)  + "when sending message");
        return;
    }
	console.log(this.id.substring(0,8) + " sends a message to " + clientIdentity + " " + recipient.userid.substring(0,8) + ": " + message);
	recipient.send(message);
};

/**
 * Physics update loop.
 */
GameServer.prototype.physicsUpdate = function(){
    if(this.count == 0){
        var platFormLength = this.randomNumber(1,5);
        for (var i = 0; i < platFormLength; i++) {
            this.gameState.platforms.push(new Platform(new Point(CONSTANTS.width+(1+i)*CONSTANTS.platformUnitWidth,CONSTANTS.pikachuStartY-30), new Point(CONSTANTS.platformSpeed,0), 0));
        }
        var msg = "game platform " + platFormLength;
        this.sendMsg(this.pikachuPlayer, msg);
        this.sendMsg(this.trPlayer, msg);
        this.count = this.randomNumber(3*CONSTANTS.platformUnitWidth,2*CONSTANTS.platformUnitWidth);
	}
	this.count --;//speed can be changed

    this.gameState.pikachu.update();

	this.gameState.pokeballUpdate();
	if(this.gameState.pikachu.cooldown>0){
		this.gameState.pikachu.cooldown--;
	}
	if(this.gameState.pokeballDelay>0){
		this.gameState.pokeballDelay--;
	}
	this.gameState.pikachu.gravity();
	this.gameState.checkFloor(this.gameState.pikachu);
    for (var j = 0; j < this.gameState.pokeballs.length; j++) {
		this.gameState.checkFloorBall(this.gameState.pokeballs[j]);
	}
	
	for(var i = 0; i < this.gameState.platforms.length;){
		this.gameState.platforms[i].move();
		this.gameState.checkPlatform(this.gameState.pikachu,i);
		if(this.gameState.platforms[i].center.X+.5*CONSTANTS.platformUnitWidth < 0){
            this.gameState.platforms.splice(i, i+1);   
        } else {
        	for(var j = 0; j < this.gameState.pokeballs.length;j++){
            	this.gameState.checkPlatformBall(this.gameState.pokeballs[j],i);
        	}
        	i++;
        }
	}
};

GameServer.prototype.randomNumber = function(mac,min){
	var number = Math.floor(Math.random() * (mac - min + 1)) + min;	
	return number;
}

/**
 * Process newly received player inputs.
 */
GameServer.prototype.processInput = function(){
    var pikachuInputsLength = this.pikachuPlayer.inputs.length;
    if (pikachuInputsLength) {
        var input;
        for (input in this.pikachuPlayer.inputs) {
            if (input.action === 'left') {
                this.gameState.pikachuBrake();
            } else if (input.action === 'up') {
                this.gameState.pikachuJump();
            } else if (input.action === 'right') {
                this.gameState.pikachuDash();
            } else if (input.action === 'stop') {
                this.gameState.pikachuNormal();
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
        // pikachuLastInputSeq: this.pikachuPlayer.lastInputSeq,
        // trLastInputSeq: this.trPlayer.lastInputSeq,
        // time: this.serverTime
        scrollMeter: this.gameState.scrollMeter,
        pokeballs: this.gameState.pokeballs,
        platforms: this.gameState.platforms
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
    if (client.userid === this.pikachuPlayer.userid) {
        clientIdentity = "pikachu";
    } else if (client.userid === this.trPlayer.userid) {
        clientIdentity = "team rocket";
    } else {
        console.log("Error! " + this.userid.substring(0,8) + " received message from unrecognized player " + client.userid.substring(0,8) + ": " + message);
        console.log(client.userid + '!=' + this.pikachuPlayer.userid);
        console.log(client.userid + '!=' + this.trPlayer.userid);
        return;
    }
    console.log(this.id.substring(0,8) + " received a message from " + clientIdentity + " " + client.userid.substring(0,8) + ": " + message);
    
    switch (keywords[1]) {
    case "input":
        if (clientIdentity === "pikachu") {
            var input = {
                action: keywords[2],
                time: parseInt(keywords[3])
            };
            // this.pikachuPlayer.inputs.push(input);
            if (input.action === 'left') {
                this.gameState.pikachuBrake();
            } else if (input.action === 'up') {
                this.gameState.pikachuJump();
            } else if (input.action === 'right') {
                this.gameState.pikachuDash();
            } else if (input.action === 'stop') {
                this.gameState.pikachuNormal();
            }
            this.sendMsg(this.trPlayer, message); // TODO: change time???
        } else {
            var newPokeballPos = new Point(parseInt(keywords[2]), parseInt(keywords[3]))
            this.gameState.addPokeball(newPokeballPos);
            // var input = {
                // pos: new Point(parseInt(keywords[3]), parseInt(keywords[4]))
            // };
            // this.trPlayer.inputs.push(input);
            // TODO: do something
            this.sendMsg(this.pikachuPlayer, message); // TODO: change time???
        }
        break;
    default:
    }
}

//Export GameServer
module.exports = GameServer;