// JavaScript Document
// Pikachu inherits Physical

var Pikachu = function(/*Point*/ center, /*Point*/velocity, /*int*/ accelerationY){
	this.midair = false;
	PhysicalObject.call(this,center,velocity,accelerationY);
}

// Pikachu inherits from PhysicalObject
Pikachu.prototype = new PhysicalObject();

// Correct the constructor pointer to Pikachu
Pikachu.prototype.constructor = Pikachu;

Pikachu.prototype.brake = function(){
	if(this.center.X<CONSTANTS.pikachuBoundLeft){
		this.velocity.X = CONSTANTS.pikachuMove*2;
	}
	else if(this.center.X>CONSTANTS.pikachuBoundRight){
		this.velocity.X = -CONSTANTS.pikachuMove*2;
	}
	else{
		this.velocity.X = -CONSTANTS.pikachuMove;
	}
}

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

Pikachu.prototype.jump = function(){
	if(this.midair === false){
		this.center.Y = CONSTANTS.height-CONSTANTS.floorHeight-CONSTANTS.pikachuRadius -1;
		this.velocity.Y = -CONSTANTS.pikachuJump;
		this.midair = true;
	}
}