/**
 * Menu controls for interfacting with the index.html HTML document.
 */
 
/**
 * Setup menu controls
 */
var Menu = function(){
	//Setup lobby client.
	this.lobby = new LobbyClient(this);
	//Setup lobby socket io.
	this.lobby.newSocket();
};

/**
 * Code to execute when player enters game lobby.
 */
Menu.prototype.play = function(){
	var scenarioName = document.getElementById('scenario');
	//Setup lobby client.
	this.lobby.joinGame(scenarioName);
	game.style.visibility="visible";
}

var menu = new Menu();
