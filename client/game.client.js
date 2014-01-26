/** 
 * Client-side code. 
 */
 
/**
 * The GameClient constructor. 
 */
var GameClient = function(/*int*/type) {
	this.pikachu = new PikachuFromPhysicalObject(new PhysicalObject(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY),new Point(0,0),0));
	this.pokeball = [];
	this.platforms = [];
	this.gameClientUI = new GameClientUI(this);
    this.gameClientUI.initialize();
	this.gameClientControl = new GameClientControl(this);
	this.gameClientControl.registerEventListeners();
	this.type = type;
};


GameClient.prototype.handleMessage = function(/*string*/message){
}
