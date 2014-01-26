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

Pikachu.prototype = new PhysicalObject();

Pikachu.prototype.brake = function(){

	if(this.center<CONSTANTS.pikachuBoundLeft){
		this.velocity.X = CONSTANTS.pikachuMove*2
	}
	else{
		this.velocity.X = -CONSTANTS.pikachuMove;
	}
}

Pikachu.prototype.dash = function(){
	if(this.center>CONSTANTS.pikachuBoundRight){
		this.velocity.X = -CONSTANTS.pikachuMove*2
	}
	else{
		this.velocity.X = CONSTANTS.pikachuMove;
	}
}

Pikachu.prototype.normal = function(){
	if(this.center<CONSTANTS.pikachuBoundLeft){
		this.velocity.X = CONSTANTS.pikachuMove*2
	}
	else if(this.center>CONSTANTS.pikachuBoundRight){
		this.velocity.X = -CONSTANTS.pikachuMove*2
	}
	else{	
		this.velocity.X = 0;
	}
}

Pikachu.prototype.jump = function(){
	if(this.midair === false){
		this.accelerationY = -CONSTANTS.pikachuJump;
		this.midair = true;
	}
}


