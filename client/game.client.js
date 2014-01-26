/** 
 * Client-side code. 
 */
 
/**
 * The GameClient constructor. 
 */
var GameClient = function(/*int*/type) {
	this.platforms[0] = new Platform(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY-200),new Point(0,0),0);
	this.type = type; //0 is pikachu, 1 is tr
	this.gameClientUI = new GameClientUI(this);
    this.gameClientUI.initialize();
	this.gameClientControl = new GameClientControl(this);
	this.gameClientControl.registerEventListeners();
	this.gameState = new GameState(this);
};


GameClient.prototype.handleMessage = function(/*string*/message){
}
