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
Menu.prototype.join = function(){
	var scenarioMenu = document.getElementById('scenario');
	var scenarioName = scenarioMenu.options[scenarioMenu.selectedIndex].value;
	//Setup lobby client.
	this.lobby.joinGame(scenarioName);
	mainMenu.style.visibility="hidden";
	waiting.style.visibility="visible";
	game.style.visibility="hidden";
	score.style.visibility="hidden";
}

Menu.prototype.start = function(){
	mainMenu.style.visibility="hidden";
	waiting.style.visibility="hidden";
	game.style.visibility="visible";
	score.style.visibility="hidden";
}

Menu.prototype.score = function(/*int*/type, /*int*/score){
	mainMenu.style.visibility="hidden";
	waiting.style.visibility="hidden";
	game.style.visibility="hidden";
	score.style.visibility="visible";
}

Menu.prototype.back = function(){
	mainMenu.style.visibility="visible";
	waiting.style.visibility="hidden";
	game.style.visibility="hidden";
	score.style.visibility="hidden";
}

var menu = new Menu();
