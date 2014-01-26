// JavaScript Document
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
	if(this.center.X<CONSTANTS.pikachuBoundLeft){
		this.velocity.X = CONSTANTS.pikachuMove*2
	}
	else if(this.center.X>CONSTANTS.pikachuBoundRight){
		this.velocity.X = -CONSTANTS.pikachuMove*2;
	}
	else{
		this.velocity.X = -CONSTANTS.pikachuMove;
	}
}

// Increase velocity
Pikachu.prototype.dash = function(){
	if(this.center.X<CONSTANTS.pikachuBoundLeft){
		this.velocity.X = CONSTANTS.pikachuMove*2;
	}
	else if(this.center.X>CONSTANTS.pikachuBoundRight){
		this.velocity.X = -CONSTANTS.pikachuMove*2;
	}
	else{
		this.velocity.X = CONSTANTS.pikachuMove;
	}
}

// Back to normal velocity
Pikachu.prototype.normal = function(){
	if(this.center.X<CONSTANTS.pikachuBoundLeft){
		this.velocity.X = CONSTANTS.pikachuMove*2;
	}
	else if(this.center.X>CONSTANTS.pikachuBoundRight){
		this.velocity.X = -CONSTANTS.pikachuMove*2;
	}
	else{	
		this.velocity.X = 0;
	}
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
    exports = Pikachu;
}
