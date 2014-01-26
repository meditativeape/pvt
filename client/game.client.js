/** 
 * Client-side code. 
 */
 
/**
 * The GameClient constructor. 
 */
var GameClient = function(/*int*/type, /*socketIO*/ mainSocket) {
	this.mainSocket = mainSocket;
	this.type = type; //0 is pikachu, 1 is tr
	this.gameState = new GameState(this);
    this.gameState.platforms[0] = new Platform(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY-200),new Point(0,0),0);
	this.gameClientUI = new GameClientUI(this.gameState);
    this.gameClientUI.initialize();
	this.gameClientControl = new GameClientControl(this);
	this.gameClientControl.registerEventListeners();
};


GameClient.prototype.handleMessage = function(/*string*/message){
}
