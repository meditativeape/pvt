/**
 * Server side we import shared objects.
 */
if( 'undefined' !== typeof global ){
    var helper = require("./game.shared.helper.js");
	var Point = helper.Point;
	var CONSTANTS = helper.CONSTANTS;
    var Pikachu = require("./game.shared.pikachu.js");
    var Platform = require("./game.shared.platform.js");
}

/**
 * Shared game state.
 */
var GameState = function(/*GameClient or GameServer*/gameInstance) {
    this.gameInstance = gameInstance;
    this.pikachu = new Pikachu(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY),new Point(0,0),0);
    this.pokeballs = [];
	this.platforms = [];
    this.platforms[0] = new Platform(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY-30),new Point(-5,0),0);
    this.end = false;
    this.winner = null;
    this.scrollMeter = 0.0;
    this.prevTime = 0.0;
	this.pokeballDelay = CONSTANTS.pokeballDelay;
	this.currentDelay = CONSTANTS.pokeballDelay;
};

GameState.prototype.start = function(){
    this.prevTime = new Date().getTime();
    this.startScrollMeter();
};

GameState.prototype.startScrollMeter = function(){
    this.meterId = setInterval(function(){
        var tDiff = new Date().getTime() - this.prevTime;
        this.scrollMeter += tDiff / 16 * CONSTANTS.platformScrollSpeed;
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


// Throw pokeball
GameState.prototype.addPokeball = function(/*point*/ center){
	var pokeball = new Pokeball(center);
	this.pokeballs.push(pokeball);
}

// Update pokeball position
GameState.prototype.pokeballUpdate = function(){
    for(var pokeballID in this.pokeballs){
		var pokeball = this.pokeballs[pokeballID];
		pokeball.update();
		if(pokeball.cooldown>0){
					
			pokeball.cooldown--;
		}
		else{
			pokeball.gravity();
		}
		this.checkFloorBall(pokeball);
		
	}
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
		if(pikachu.midair === true){
			pikachu.cooldown = CONSTANTS.pikachuJumpCooldown;
			pikachu.midair = false;
		}
	}
	else if((pikachu.center.Y+CONSTANTS.pikachuRadius>=this.gameInstance.gameState.platforms[0].center.Y-0.5*this.gameInstance.gameState.platforms[0].height)
	&&(pikachu.center.X-CONSTANTS.pikachuRadius<this.gameInstance.gameState.platforms[0].center.X+.5*this.gameInstance.gameState.platforms[0].width)
	&&(pikachu.center.X+CONSTANTS.pikachuRadius>this.gameInstance.gameState.platforms[0].center.X-.5*this.gameInstance.gameState.platforms[0].width)
	&&(pikachu.center.Y<this.gameInstance.gameState.platforms[0].center.Y)){
		pikachu.center.Y = this.gameInstance.gameState.platforms[0].center.Y-0.5*this.gameInstance.gameState.platforms[0].height-CONSTANTS.pikachuRadius;
		pikachu.accelerationY = 0;
		pikachu.velocity.Y = 0;
		if(pikachu.midair === true){
			pikachu.cooldown = CONSTANTS.pikachuJumpCooldown;
			pikachu.midair = false;
		}
	}
	this.gameInstance.gameState.platforms[0].checkStatus(pikachu);
}

GameState.prototype.checkFloorBall = function(/*pokeball*/ pokeball){
	if(pokeball.center.Y+CONSTANTS.pokeballRadius>=CONSTANTS.height-CONSTANTS.floorHeight){
		pokeball.center.Y = CONSTANTS.height-CONSTANTS.floorHeight-CONSTANTS.pokeballRadius;
		pokeball.accelerationY = 0;
		pokeball.velocity.Y = 0;
		if(pokeball.midair === true){
			pokeball.midair = false;
		}
	}
	else if((pokeball.center.Y+CONSTANTS.pokeballRadius>=this.gameInstance.gameState.platforms[0].center.Y-0.5*this.gameInstance.gameState.platforms[0].height)
	&&(pokeball.center.X-CONSTANTS.pokeballRadius<this.gameInstance.gameState.platforms[0].center.X+.5*this.gameInstance.gameState.platforms[0].width)
	&&(pokeball.center.X+CONSTANTS.pokeballRadius>this.gameInstance.gameState.platforms[0].center.X-.5*this.gameInstance.gameState.platforms[0].width)
	&&(pokeball.center.Y<this.gameInstance.gameState.platforms[0].center.Y)){
		pokeball.center.Y = this.gameInstance.gameState.platforms[0].center.Y-0.5*this.gameInstance.gameState.platforms[0].height-CONSTANTS.pokeballRadius;
		pokeball.accelerationY = 0;
		pokeball.velocity.Y = 0;
		if(pokeball.midair === true){
			pokeball.midair = false;
		}
	}
	this.gameInstance.gameState.platforms[0].checkStatusPokeball(pokeball);
}


// Clean up to shut down game
GameState.prototype.cleanUp = function() {
    clearInterval(this.meterId);
};

/**
 * Server side we export GameState.
 */
if( 'undefined' !== typeof global ) {
    module.exports = GameState;
}