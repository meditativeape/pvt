/**
 * Game helper structs, functions, and constants.
 */

/**
 * Constructs a point. This represents a position on the canvas. 
 * @constructor
 */
function Point(/*float*/ x, /*float*/ y) {
	this.X = x;
	this.Y = y;
};

/**
 * Constants.
 */
var CONSTANTS = {
    pikachuRadius: 30,
    pokeballRadius: 25,
    pokeballCD: 500,
    pokeballDelay: 1000,
	floorHeight: 70,
	height: 600,
	width: 800
};

/**
 * Server side we export Point,Coordinate and constants.
 */
if( 'undefined' !== typeof global ) {
    exports.Point = Point;
	exports.CONSTANTS = CONSTANTS;
}