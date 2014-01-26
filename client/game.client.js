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

    this.gameState.platforms[0] = new Platform(new Point(CONSTANTS.pikachuStartX,CONSTANTS.pikachuStartY-30),new Point(-5,0),0);
	this.gameState.start();
    
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
	if(this.gameState.pikachu.cooldown>0){
		this.gameState.pikachu.cooldown--;
	}

	this.gameState.pikachu.gravity();
	this.gameState.checkFloor(this.gameState.pikachu);
	this.gameState.platforms[0].move();
};

GameClient.prototype.handleMessage = function(/*string*/message){
    var keywords = message.split(" ");
    switch (keywords[1]) {
    case "input":
        if (this.type == 0) { // pikachu handles pokeball
            var pokeballPos = new Point(parseInt(keywords[3]), parseInt(keywords[4]));
            this.processTRInput(pokeballPos);
        } else { // tr handles pikachu
            this.processPikachuInput(keywords[2]);
        }
        break;
    }
};

GameClient.prototype.processPikachuInput = function(/*String*/ action){
    console.log(action);
    switch(action) {
    case "left":
        this.gameState.pikachuBrake();
        break;
    case "right":
        this.gameState.pikachuDash();
        break;
    case "up":
        this.gameState.pikachuJump();
        break;
    case "stop":
        this.gameState.pikachuNormal();
        break;
    default:
    }
};

GameClient.prototype.processTRInput = function(/*Point*/ pokeballPos){
    // TODO
};

GameClient.prototype.cleanUp = function(){
    clearInterval(this.physicsId);
};
