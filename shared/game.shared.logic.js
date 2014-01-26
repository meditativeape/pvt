//The main update loop runs on requestAnimationFrame,
//Which falls back to a setTimeout loop on the server
//Code below is from Three.js, and sourced from links below

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

var frame_time = 60/1000; // run the local game at 16ms/ 60hz
if('undefined' != typeof(global)) frame_time = 45; //on server we run at 45ms, 22hz

( function () {

    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

    for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if ( !window.requestAnimationFrame ) {
        window.requestAnimationFrame = function ( callback, element ) {
            var currTime = Date.now(), timeToCall = Math.max( 0, frame_time - ( currTime - lastTime ) );
            var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if ( !window.cancelAnimationFrame ) {
        window.cancelAnimationFrame = function ( id ) { clearTimeout( id ); };
    }

}() );

/**
 * Server side we import helper objects.
 */
if( 'undefined' !== typeof global ){
    var helper = require("game.shared.helper.js");
	var Point = helper.Point;
	var CONSTANTS = helper.CONSTANTS;
}

/**
 * Shared game logic.
 */
var GameLogic = function(/*GameClient or GameServer*/gameInstance) {
    this.gameInstance = gameInstance;
};

// Loop to keep updating game physics
GameLogic.prototype.createPhysicsSimulation = function(){

    //Set up some physics integration values
    this._pdt = 0.0001;                 //The physics update delta time
    this._pdte = new Date().getTime();  //The physics update last delta time
    
    //A local timer for precision on server and client
    this.local_time = 0.016;            //The local timer
    this._dt = new Date().getTime();    //The local timer delta
    this._dte = new Date().getTime();   //The local timer last frame time

    // Update game physics every 15ms (about 66 updates per second)
    this.physicsUpateId = setInterval(function(){
        this._pdt = (new Date().getTime() - this._pdte)/1000.0;
        this._pdte = new Date().getTime();
        this.updatePhysics();
    }.bind(this), 15);
};

// Update game physics once
GameLogic.prototype.updatePhysics = function() {
    this.gameInstance.updatePhysics();
};

// Check if pikachu and pokeball collides
GameLogic.prototype.checkCollision = function(/*point*/ pikachu, /*Point*/ pokeball) {
    var xdiff = pikachu.X - pokeball.X;
    var ydiff = pikachu.Y - pokeball.Y;
    if (Math.sqrt(xdiff*xdiff + ydiff*ydiff) < (CONSTANTS.pikachuRadius + CONSTANTS.pokeballRadius))
        return true;
    else
        return false;
};

GameLogic.prototype.checkFloor = function(/*Pikachu*/ pikachu){
	if(pikachu.center.Y+CONSTANTS.pikachuRadius>=CONSTANTS.height-CONSTANTS.floorHeight){
		pikachu.center.Y = CONSTANTS.height-CONSTANTS.floorHeight-CONSTANTS.pikachuRadius;
		pikachu.accelerationY = 0;
		pikachu.velocity.Y = 0;
		pikachu.midair = false;
	}
	else if((pikachu.center.Y+CONSTANTS.pikachuRadius==this.gameInstance.platforms[0].center.Y-0.5*this.gameInstance.platforms[0].height)
	&&(pikachu.center.X-CONSTANTS.pikachuRadius<this.gameInstance.platforms[0].center.X+.5*this.gameInstance.platforms[0].width)
	&&(pikachu.center.X+CONSTANTS.pikachuRadius>this.gameInstance.platforms[0].center.X-.5*this.gameInstance.platforms[0].width)){
		pikachu.center.Y = this.gameInstance.platforms[0].center.Y-0.5*this.gameInstance.platforms[0].height-CONSTANTS.pikachuRadius;
		pikachu.accelerationY = 0;
		pikachu.velocity.Y = 0;
		pikachu.midair = false;
	}
	
}

// Clean up to shut down game
GameLogic.prototype.cleanUp = function() {
    clearInterval(this.physicsUpateId);
    window.cancelRequestAnimationFrame(this.networkUpdateId);
};