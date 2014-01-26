/**
 * Server side we import shared objects.
 */
if( 'undefined' !== typeof global ){
    var helper = require("game.shared.helper.js");
	var Point = helper.Point;
	var CONSTANTS = helper.CONSTANTS;
    var Pikachu = require("game.shared.pikachu.js");
    var Platform = require("game.shared.platform.js");
}

/**
 * Shared game state.
 */
var GameState = function(/*GameClient or GameServer*/gameInstance) {
    this.gameInstance = gameInstance;
    this.pikachu = new Pikachu(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY),new Point(0,0),0);
    this.pokeballs = [];
	this.platforms = [];
    this.end = false;
    this.winner = null;
    this.scrollMeter = 0.0;
    this.tOld = 0.0;
};

GameState.prototype.start = function(){
    this.tOld = new Date().getTime();
    this.createTimer();
};

GameServer.prototype.createTimer = function(){
    this.timerId = setInterval(function(){
        var dt = new Date().getTime() - this.tOld;
        this.scrollMeter = -dt/16 * CONSTANTS.platformScrollSpeed;
        this.tOld = new Date().getTime();
    }.bind(this), 4);
};

GameState.prototype.pikachuBrake = function(){
    this.pikachu.brake();
};

GameState.prototype.pikachuDash = function(){
    this.pikachu.dash();
};

GameState.prototype.pikachuJump = function(){
    this.pikachu.jump();
};

GameState.prototype.pikachuNormal = function(){
    this.pikachu.normal();
};

// Update pikachu position
GameState.prototype.pikachuUpdate = function(){
    this.pikachu.update();
    this.checkFloor();
};

// Check if pikachu is caught by any pokeball
GameState.prototype.checkGameState = function(){
    for (var pokeball in this.pokeballs)
        if (this.checkCollision(this.pikachu, pokeball)) {
            this.end = true;
            this.winner = "tr";
            break;
        }
};

// Check if pikachu and pokeball collides
GameState.prototype.checkCollision = function(/*point*/ pikachu, /*Point*/ pokeball) {
    var xdiff = pikachu.X - pokeball.X;
    var ydiff = pikachu.Y - pokeball.Y;
    if (Math.sqrt(xdiff*xdiff + ydiff*ydiff) < (CONSTANTS.pikachuRadius + CONSTANTS.pokeballRadius))
        return true;
    else
        return false;
};

GameState.prototype.checkFloor = function(/*Pikachu*/ pikachu){
	if(pikachu.center.Y+CONSTANTS.pikachuRadius>=CONSTANTS.height-CONSTANTS.floorHeight){
		pikachu.center.Y = CONSTANTS.height-CONSTANTS.floorHeight-CONSTANTS.pikachuRadius;
		pikachu.accelerationY = 0;
		pikachu.velocity.Y = 0;
		pikachu.midair = false;
	}
	else if(pikachu.center.Y+CONSTANTS.pikachuRadius<=this.gameInstance.platforms[0].center.Y-0.5*this.gameInstance.platforms[0].height){
		pikachu.center.Y = this.gameInstance.platforms[0].center.Y-0.5*this.gameInstance.platforms[0].height-CONSTANTS.pikachuRadius;
		pikachu.accelerationY = 0;
		pikachu.velocity.Y = 0;
		pikachu.midair = false;
	}
}

// Clean up to shut down game
GameState.prototype.cleanUp = function() {
    clearInterval(this.physicsUpateId);
    clearInterval(this.timerId);
    window.cancelRequestAnimationFrame(this.networkUpdateId);
};

/**
 * Server side we export GameState.
 */
if( 'undefined' !== typeof global ) {
    exports = GameState;
}