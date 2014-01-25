/** 
 * Client-side code. 
 */
 
/**
 * The GameClient constructor. 
 */
var GameClient = function() {
	this.pikachu = new Pikachu(new PhysicalObject(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY),new Point(0,0),0));
	this.pokeball = [];
	this.platforms = [];
    console.log("created");
	this.gameClientUI = new GameClientUI();
    this.gameClientUI.loadImage();
    this.gameClientUI.initGameUI();
};

