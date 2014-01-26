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
    this.socket.on('message', this.handleMessage.bind(this));
};

GameClient.prototype.physicsUpdate = function(){
	if(this.gameState.pikachu.cooldown>0){
		this.gameState.pikachu.cooldown--;
	}
    this.gameState.pikachu.update();
	this.gameState.pikachu.gravity();
	this.gameState.checkFloor(this.gameState.pikachu);
};

GameClient.prototype.handleMessage = function(/*string*/message){
    var keywords = message.split(" ");
    switch (keywords[1]) {
    case "input":
        if (this.type === 0) { // I am Pikachu
            this.processPikachuInput(keywords[2]);
        } else { // I am TR
            this.processTRInput(new Point(parseInt(keywords[2], keywords[3])));
        }
        break;
    case "end":
        break;
    case "platform":
        break;
    }
};

GameClient.prototype.processPikachuInput = function(/*string*/move){
    switch (move) {
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
}

GameClient.prototype.processTRInput = function(/*Point*/pokeballCenter){
    // TODO
}

GameClient.prototype.cleanUp = function(){
    clearInterval(this.physicsId);
};
