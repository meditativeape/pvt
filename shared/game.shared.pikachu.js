// JavaScript Document

var Pikachu = function(/*PhysicalObject*/ object){
	this.prototype = object;
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
	this.acceleration.Y = -CONSTANTS.pikachuJump;
}