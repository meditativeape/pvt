/**
 * Server side we import shared objects.
 */
if( 'undefined' !== typeof global ){
    var PhysicalObject = require("./game.shared.object.js");
}

//define/init the platform class
var Platform = function(p, v, a ){
	this.midair = false;
	this.height = 40;
	this.width = 70;
	PhysicalObject.call(this,p,v,a);

}

// Platform inherits from PhysicalObject
Platform.prototype = new PhysicalObject();

// Correct the constructor pointer to Platform
Platform.prototype.constructor = Platform;


Platform.prototype.move = function(){
	this.velocity.X = CONSTANTS.platformSpeed;
	this.center.X = this.center.X + this.velocity.X;
	/*
	if(this.center.X+(this.width)*0.5<0){
		this.center.X = CONSTANTS.width+(this.width)*0.5;
	}
	*/
}

Platform.prototype.checkStatus = function(/*Pikachu*/ pikachu){
	//condition 1: bottom side
	if((pikachu.center.Y-CONSTANTS.pikachuRadius)<=(this.center.Y+this.height/2.0)
	&&(pikachu.center.X-CONSTANTS.pikachuRadius<=this.center.X+this.width/2.0)
	&&(pikachu.center.X+CONSTANTS.pikachuRadius>=this.center.X-this.width/2.0)
	&&(pikachu.velocity.Y<0)
	&&(pikachu.center.Y>this.center.Y)){
		pikachu.velocity.Y = -pikachu.velocity.Y;
	}
	//condition 2: head side
	else if(((this.X-pikachu.center.X)<=(CONSTANTS.pikachuRadius+this.width/2.0))&&
	(pikachu.center.Y>= this.center.Y-0.5*this.height)
	&&(pikachu.center.Y<= this.center.Y+0.5*this.height)){
		pikachu.velocity.X = this.velocity.X;
	}
	
	//condition 3: upper side
	/*
	else if((Platform.center.Y-0.5*Platform.height)-pikachu.center.Y==CONSTANTS.pikachuRadius){
		pikachu.velocity.Y = 0;
	}
	return;
	*/
}

/**
 * Server side we export Platform.
 */
if( 'undefined' !== typeof global ) {
    module.exports = Platform;
}