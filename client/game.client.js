/** 
 * Client-side code. 
 */
 
/**
 * The GameClient constructor. 
 */
var GameClient = function(/*int*/type) {
	this.pikachu = new Pikachu(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY),new Point(0,0),0);
	this.pokeball = [];
	this.platforms = [];
	this.platforms[0] = new Platform(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY-30),new Point(0,0),0);
	this.type = type;
	this.gameClientUI = new GameClientUI(this);
    this.gameClientUI.initialize();
	this.gameClientControl = new GameClientControl(this);
	this.gameClientControl.registerEventListeners();
	this.gameLogic = new GameLogic(this);
	
};


GameClient.prototype.handleMessage = function(/*string*/message){
}
