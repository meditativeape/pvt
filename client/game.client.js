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
	this.gameState.start();
    
	this.gameClientUI = new GameClientUI(this.gameState);
    this.gameClientUI.initialize();
    
	this.gameClientControl = new GameClientControl(this);
	this.gameClientControl.registerEventListeners();
};

GameClient.prototype.start = function(){
    this.physicsId = setInterval(this.physicsUpdate.bind(this), 15);  // update physics every 15ms
    this.mainSocket.on('onserverupdate', this.handleServerUpdate.bind(this))
};

GameClient.prototype.physicsUpdate = function(){
    this.gameState.pikachu.update();
	if(this.gameState.pikachu.cooldown>0){
		this.gameState.pikachu.cooldown--;
	}
	this.gameState.pikachu.gravity();
	this.gameState.checkFloor(this.gameState.pikachu);
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

GameClient.prototype.handleServerUpdate = function(/*object*/ update){
    console.log("update!");
    // TODO: naive approach. add interpolation!
    this.gameState.pikachu.center = update.pikachuPos;
};

GameClient.prototype.cleanUp = function(){
    clearInterval(this.physicsId);
};
