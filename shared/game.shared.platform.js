//define/init the platform class
var Platform = function(/*PhysicalObject*/ object){
	this.prototype = object;
	this.height = 35;
	this.width = 70;
}

Platform.prototype.checkStatus = function(/*PhysicalObject*/ Pikachu){
	//condition 1: bottom side
	if((Pikachu.center.y-CONSTANTS.pikachuRadius)==(Platform.center.y+Platform.height/2.0)
	&&(Pikachu.center.x<=Platform.center.x+Platform.width/2.0)
	&&(Pikachu.center.x>=Platform.center.x-Platform.width/2.0)){
		Pikachu.velocity.y = Pikachu.velocity.y*(-1);
	}
	//condition 2: head side
	else if(((Platform.x-Pikachu.center.x)<=(CONSTANTS.pikachuRadius+Platform.width/2.0))&&
	(Pikachu.center.y>= Platform.center.y-0.5*Platform.height)
	&&(Pikachu.center.y<= Platform.center.y+0.5*Platform.height)){
		Pikachu.velocity.x = Platform.velocity.x;
	}
	
	//condition 3: upper side
	/*
	else if((Platform.center.y-0.5*Platform.height)-Pikachu.center.y==CONSTANTS.pikachuRadius){
		Pikachu.velocity.y = 0;
	}
	return;
	*/

}

