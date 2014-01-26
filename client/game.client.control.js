/** 
 * Client-side controls. 
 */
 
/**
 * The game client control.
 */
var GameClientControl = function(/*GameClient*/ gc){
    this.gc = gc;
};

/**
 * Register event listeners for mouse and keyboard actions performed in
 * a desktop-version browser.
 */
GameClientControl.prototype.registerEventListeners = function(){
    var gc = this.gc;
	//If pikachu client
	if(gc.type === 0){
		var keydown = function(event){
			if (event.keyCode === 37 || event.keyCode === 65){ // left or a
				gc.gameState.pikachu.brake();
				gc.mainSocket.send('game input left');
			} else if (event.keyCode === 39 || event.keyCode === 68){ // right or d
				gc.gameState.pikachu.dash();
				gc.mainSocket.send('game input right');
			} else if (event.keyCode === 38 || event.keyCode === 87){ // up or w
				gc.gameState.pikachu.jump();
				gc.mainSocket.send('game input up');
			} else if (event.keyCode === 40 || event.keyCode === 83){ // down or s
				//Nothing
			}
		};
		document.addEventListener('keydown', keydown);
		
		// Event listener for releasing a key to stop moving pikachu.
		var keyup = function(event){
			gc.gameState.pikachu.normal();
			gc.mainSocket.send('game input stop');
		};
		document.addEventListener('keyup', keyup);
	}
	//If team rocket client
	else{
		
	}
}