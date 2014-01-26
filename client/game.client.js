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
	this.gameState.pokeballUpdate();
	
	if(this.gameState.pikachu.cooldown>0){
		this.gameState.pikachu.cooldown--;
	}
	if(this.gameState.pokeballDelay>0){
		this.gameState.pokeballDelay--;
	}
	this.gameState.pikachu.gravity();
	this.gameState.checkFloor(this.gameState.pikachu);
	
	for(var i = 0; i < this.gameState.platforms.length; i++){
		this.gameState.platforms[i].move();
		this.gameState.checkPlatform(this.gameState.pikachu,i);
		if(this.gameState.platforms[i].center.X+.5*this.gameState.platforms[i].width < 0){
            this.gameState.platforms.splice(0, 1);
            for(var j = 0; j < this.gameState.pokeballs.length;j++){
                this.gameState.checkFloorBall(this.gameState.pokeballs[j],i);
            }
        }	
	}
	
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
    case "platform":
        var platFormLength = parseInt(keywords[2]);
        for (var i = 0; i < platFormLength; i++) {
            this.gameState.platforms.push(new Platform(new Point(CONSTANTS.width+(1+i)*CONSTANTS.platformUnitWidth,CONSTANTS.pikachuStartY-30), new Point(CONSTANTS.platformSpeed,0), 0));
        }
    }
};

GameClient.prototype.processPikachuInput = function(/*String*/ action){
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
    this.gameState.addPokeball(pokeballPos);
};

GameClient.prototype.handleServerUpdate = function(/*object*/ update){
    this.gameState.scrollMeter = update.scrollMeter;
    // TODO: naive approach. add interpolation!
    this.gameState.pikachu.center = update.pikachuPos;
    this.gameState.scrollMeter = update.scrollMeter;
    // for (var i = 0; i < this.gameState.pokeballs.length; i++) {
        // this.gameState.pokeballs[i].center = update.pokeballs[i].center;
        // this.gameState.pokeballs[i].cooldown = update.pokeballs[i].cooldown;
        // this.gameState.pokeballs[i].velocity = update.pokeballs[i].velocity;
        // this.gameState.pokeballs[i].accelerationY = update.pokeballs[i].accelerationY;
    // }
    // for (var i = 0; i < this.gameState.platforms.length; i++) {
        // this.gameState.platforms[i].center = update.platforms[i].center;
        // this.gameState.platforms[i].cooldown = update.platforms[i].cooldown;
        // this.gameState.platforms[i].velocity = update.platforms[i].velocity;
        // this.gameState.platforms[i].accelerationY = update.platforms[i].accelerationY;
    // }
};

GameClient.prototype.cleanUp = function(){
    clearInterval(this.physicsId);
};
