/** 
 * Client-side code. 
 */
 
/**
 * The GameClient constructor. 
 */
var GameClient = function(/*int*/type) {
	this.pikachu = new Pikachu(new PhysicalObject(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY),new Point(0,0),0));
	this.pokeball = [];
	this.platforms = [];
    console.log("created");
	this.gameClientUI = new GameClientUI();
    this.gameClientUI.loadImage();
    this.gameClientUI.initGameUI();
	this.gameClientControl = new GameClientControl(this);
	this.gameClientControl.registerEventListeners();
	this.type = type;
};


GameClient.prototype.handleMessage = function(/*string*/message){
}