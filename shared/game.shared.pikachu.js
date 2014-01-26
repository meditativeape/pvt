// JavaScript Document

var Pikachu = function(){
	this.midair = false;
}

Pikachu.prototype.brake = function(){
	this.velocity.x = -CONSTANTS.pikachuMove;
}

Pikachu.prototype.dash = function(){
	this.velocity.x = CONSTANTS.pikachuMove;
}

Pikachu.prototype.normal = function(){
	this.velocity.x = 0;
}

Pikachu.prototype.jump = function(){
	if(this.midair === false){
		this.acceleration.Y = -CONSTANTS.pikachuJump;
		this.midair = true;
	}
}

