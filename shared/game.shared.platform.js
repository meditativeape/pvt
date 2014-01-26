//define/init the platform class
var Platform = function(p, v, a ){
	this.midair = false;
	this.height = 35;
	this.width = 70;
	PhysicalObject.call(this,p,v,a);
}

// Platform inherits from PhysicalObject
Platform.prototype = new PhysicalObject();

// Correct the constructor pointer to Platform
Platform.prototype.constructor = Platform;

Platform.prototype.checkStatus = function(/*PhysicalObject*/ pikachu){
	//condition 1: bottom side
	if((pikachu.center.y-CONSTANTS.pikachuRadius)==(Platform.center.y+Platform.height/2.0)
	&&(pikachu.center.x<=Platform.center.x+Platform.width/2.0)
	&&(pikachu.center.x>=Platform.center.x-Platform.width/2.0)){
		pikachu.velocity.y = pikachu.velocity.y*(-1);
	}
	//condition 2: head side
	else if(((Platform.x-pikachu.center.x)<=(CONSTANTS.pikachuRadius+Platform.width/2.0))&&
	(pikachu.center.y>= Platform.center.y-0.5*Platform.height)
	&&(pikachu.center.y<= Platform.center.y+0.5*Platform.height)){
		pikachu.velocity.x = Platform.velocity.x;
	}
	
	//condition 3: upper side
	/*
	else if((Platform.center.y-0.5*Platform.height)-pikachu.center.y==CONSTANTS.pikachuRadius){
		pikachu.velocity.y = 0;
	}
	return;
	*/
}

/**
 * Server side we export Platform.
 */
if( 'undefined' !== typeof global ) {
    exports = Platform;
}