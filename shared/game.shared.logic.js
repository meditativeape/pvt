/**
 * Server side we import helper objects and scenarios.
 */
if( 'undefined' !== typeof global ){
    var helper = require("game.shared.helper.js");
	var Point = helper.Point;
	var CONSTANTS = helper.CONSTANTS;
}

/**
 * Shared game logic.
 */
var GameLogic = function() {

};

// Check if pikachu and pokeball collides
GameLogic.prototype.checkCollision = function(/*Point*/ pikachu, /*Point*/ pokeball) {
    var xdiff = pikachu.X - pokeball.X;
    var ydiff = pikachu.Y - pokeball.Y;
    if (Math.sqrt(xdiff*xdiff + ydiff*ydiff) < (CONSTANTS.pikachuRadius + CONSTANTS.pokeballRadius))
        return true;
    else
        return false;
};

