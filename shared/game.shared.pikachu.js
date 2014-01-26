// JavaScript Document

var Pikachu = function(){
	this.midair = false;
}

Pikachu.prototype.brake = function(){
	if(this.center<CONSTANTS.pikachuBoundLeft){
		this.velocity.x = CONSTANTS.pikachuMove*2
	}
	else{
		this.velocity.x = -CONSTANTS.pikachuMove;
	}
}

Pikachu.prototype.dash = function(){
	if(this.center>CONSTANTS.pikachuBoundRight){
		this.velocity.x = -CONSTANTS.pikachuMove*2
	}
	else{
		this.velocity.x = CONSTANTS.pikachuMove;
	}
}

Pikachu.prototype.normal = function(){
	if(this.center<CONSTANTS.pikachuBoundLeft){
		this.velocity.x = CONSTANTS.pikachuMove*2
	}
	else if(this.center>CONSTANTS.pikachuBoundRight){
		this.velocity.x = -CONSTANTS.pikachuMove*2
	}
	else{	
		this.velocity.x = 0;
	}
}

Pikachu.prototype.jump = function(){
	if(this.midair === false){
		this.acceleration.Y = -CONSTANTS.pikachuJump;
		this.midair = true;
	}
}

