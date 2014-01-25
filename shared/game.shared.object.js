// JavaScript Document

var PhysicalObject = new function(/*Point*/ center, /*Point*/velocity, /*Point*/ acceleration){
	this.center = center;
	this.velocity = velocity;
	this.acceleration = acceleration;
}

PhysicalObject.prototype.update = new function(){
	this.center.X = this.center.X + this.velocity.X;
	this.center.Y = this.center.Y + this.velocity.Y;
	this.velocity.Y = this.velocity.Y + this.acceleration.Y;
	this.acceleration.Y = this.acceleration.Y + CONSTANTS.gravity
}



