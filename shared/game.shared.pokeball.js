// JavaScript Document

// Pokeball inherits Physical
var Pokeball = function(/*Point*/ center){
	this.midair = false;
	this.cooldown = CONSTANTS.pokeballCD;
	PhysicalObject.call(this,center,new Point(0,0),a0);
}

// Pikachu inherits from PhysicalObject
Pokeball.prototype = new PhysicalObject();

// Correct the constructor pointer to Pikachu
Pokeball.prototype.constructor = Pokeball;