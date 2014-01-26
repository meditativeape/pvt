/**
 * Server side we import shared objects.
 */
if( 'undefined' !== typeof global ){
    var PhysicalObject = require("./game.shared.object.js");
    var helper = require("./game.shared.helper.js");
    var CONSTANTS = helper.CONSTANTS;
    var Point = helper.Point;
}

// Pokeball inherits Physical
var Pokeball = function(/*Point*/ center){
	this.midair = true;
	this.cooldown = CONSTANTS.pokeballCD;
	PhysicalObject.call(this,center,new Point(0,0),0);
}

// Pikachu inherits from PhysicalObject
Pokeball.prototype = new PhysicalObject();

// Correct the constructor pointer to Pikachu
Pokeball.prototype.constructor = Pokeball;

/**
 * Server side we export Pokeball
 */
if( 'undefined' !== typeof global ) {
    module.exports = Pokeball;
}