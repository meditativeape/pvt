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
<<<<<<< HEAD
    this.gameState.platforms[0] = new Platform(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY-30),new Point(-5,0),0);
=======
    this.gameState.platforms[0] = new Platform(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY-200),new Point(0,0),0);
    this.gameState.start();
    
>>>>>>> a9dc8b37ac107f7892612e58eb5ba8fc6dedac1a
	this.gameClientUI = new GameClientUI(this.gameState);
    this.gameClientUI.initialize();
    
	this.gameClientControl = new GameClientControl(this);
	this.gameClientControl.registerEventListeners();
};

GameClient.prototype.start = function(){
    this.physicsId = setInterval(this.physicsUpdate.bind(this), 15);  // update physics every 15ms
};

GameClient.prototype.physicsUpdate = function(){
    this.gameState.pikachu.update();
	this.gameState.pikachu.gravity();
	this.gameState.checkFloor(this.gameState.pikachu);
};

GameClient.prototype.handleMessage = function(/*string*/message){
};

GameClient.prototype.cleanUp = function(){
    clearInterval(this.physicsId);
};
