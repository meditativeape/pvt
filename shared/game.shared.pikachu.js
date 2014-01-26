/**
 * Server side we import shared objects.
 */
if( 'undefined' !== typeof global ){
    var PhysicalObject = require("./game.shared.object.js");
    var helper = require("./game.shared.helper.js");
    var CONSTANTS = helper.CONSTANTS;
}

// Pikachu inherits Physical
var Pikachu = function(/*Point*/ center, /*Point*/velocity, /*int*/ accelerationY){
	this.midair = false;
	this.cooldown = 0;
	PhysicalObject.call(this,center,velocity,accelerationY);
}

// Pikachu inherits from PhysicalObject
Pikachu.prototype = new PhysicalObject();

// Correct the constructor pointer to Pikachu
Pikachu.prototype.constructor = Pikachu;

// Decrease velocity
Pikachu.prototype.brake = function(){
	if(this.center.X<=CONSTANTS.pikachuBoundLeft){
		this.velocity.X = 0;
		this.center.X = CONSTANTS.pikachuBoundLeft
	}
	else{
		this.velocity.X = -CONSTANTS.pikachuMove;
	}
}

// Increase velocity
Pikachu.prototype.dash = function(){
	if(this.center.X>=CONSTANTS.pikachuBoundRight){
		this.velocity.X = 0;
		this.center.X = CONSTANTS.pikachuBoundRight
	}
	else{
		this.velocity.X = CONSTANTS.pikachuMove;
	}
}

// Back to normal velocity
Pikachu.prototype.normal = function(){
		this.velocity.X = 0;
}

// Jump
Pikachu.prototype.jump = function(){
	if(this.midair === false){
        if(this.cooldown === 0){
			this.velocity.Y = -CONSTANTS.pikachuJump;
			this.midair = true;
		}
	}
}

/**
 * Server side we export Pikachu :)
 */
if( 'undefined' !== typeof global ) {
    module.exports = Pikachu;
}
