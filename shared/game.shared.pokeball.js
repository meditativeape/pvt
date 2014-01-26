// JavaScript Document

// Pikachu inherits Physical
var Pikachu = function(/*Point*/ center){
	this.midair = false;
	this.cooldown = CONSTANTS.pokeballCD;
	PhysicalObject.call(this,center,new Point(0,0),a0);
}

// Pikachu inherits from PhysicalObject
Pikachu.prototype = new PhysicalObject();

// Correct the constructor pointer to Pikachu
Pikachu.prototype.constructor = Pikachu;