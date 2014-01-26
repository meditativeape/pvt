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
	platformSpeed: -3,
    pikachuRadius: 40,
    pokeballRadius: 25,
    pokeballCD: 50,
    pokeballDelay: 50,
	floorHeight: 70,
	height: 600,
	width: 800,
	pikachuStartX: 400,
	pikachuStartY: 400,
	gravity: 0.2,
	pikachuJump: 22,
	pikachuMove: 7,
	backgroundScrollSpeed: -0.5,
	platformScrollSpeed: -2,
	pikachuBoundLeft:100,
	pikachuBoundRight:700,
	pikachuJumpCooldown: 24,
	pikachuRotation: -15,
	platformUnitWidth: 70,

	pokeballRotateSpeed: 30
};

/**
 * Server side we export Point and constants.
 */
if( 'undefined' !== typeof global ) {
    exports.Point = Point;
	exports.CONSTANTS = CONSTANTS;
}