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

Menu.prototype.trwin = function(){
	mainMenu.style.visibility="hidden";
	waiting.style.visibility="hidden";
	game.style.visibility="hidden";
	score.style.visibility="visible";
}

Menu.prototype.pikachuwin = function(){
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


/**
 * Sound manager setup.
 */
 
//Data structure for sound Assets.
var soundAssets = {};
 
//Load sounds
soundManager.setup({
  url: '/lib/',
  flashVersion: 8, // optional: shiny features (default = 8)
  useFlashBlock: true, // optionally, enable when you're ready to dive in
//   * read up on HTML5 audio support, if you're feeling adventurous.
//   * iPad/iPhone and devices without flash installed will always attempt to use it.
//   
  onready: function() {
    	soundAssets.menuSound = soundManager.createSound({
			  id: 'background',
			  url: './sounds/background.mp3',
			  onfinish: function(){soundAssets.background.play();},
			  volume: 30
		});
		soundAssets.menuSound.play();
  },
  ontimeout: function() {
		alert("soundManager failed to load");	
	}
});

var blurred = false;

var onBlur = function() {
	if(!blurred){
		soundManager.mute();
		blurred = true;
	}
};

var onFocus = function() {
	if(blurred){
		soundManager.unmute();
		blurred = false;
	}
};

window.onfocus = onFocus;
window.onblur = onBlur;
