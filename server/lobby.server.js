/**
 * Lobby for matchmaking.
 * Setups message handler, handles matchmaking, relays messages to correct game instance.
 */

// Import GameServer
var GameServer = require('./game.server.js');

// Import socket io and UUID
var io = require('socket.io');
var UUID = require('node-uuid');

/**
 * Set up LobbyServer.
 */
var LobbyServer = function(){
	this.gamesThatNeedPikachu = [];
	this.numberOfGamesThatNeedPikachu = 0;
	this.gamesThatNeedTR = [];
	this.numberOfGamesThatNeedTR = 0;	
}

/**
 *A wrapper for logging.
 */
LobbyServer.prototype.log = function() {
	console.log.apply(this,arguments);
}

/**
 * Message Handler set up.
 * The message handler listens to messages from the client.
 */
LobbyServer.prototype.messageHandler = function(/*ExpressServer*/ expressServer){
	//Create a socket.io instance using our express server
	var sio = io.listen(expressServer);
	//Configure the socket.io connection settings.
	//See http://socket.io/
	sio.configure(function (){
		sio.set('log level', 0);
		sio.set('authorization', function (handshakeData, callback) {
		  callback(null, true); // error first callback style
		});
	});
	//Socket.io will call this function when a client connects
	//Assign each client a unique ID to use so we can maintain the list of players.
    var me = this;
	sio.sockets.on('connection', function (client) {    
		//Generate a new UUID, looks something like
		//5b2ca132-64bd-4513-99da-90e838ca47d1
		//and store this on their socket/connection
		client.id = UUID();
		//Tell the player they connected, giving them their id to store on their socket/connection.
		client.emit('onconnected', { id: client.id } );
		//Log player connections
		console.log(':: socket.io :: player ' + client.id.substring(0,8) + ' connected');
		//Send messages to the lobby to handle
		client.on('message', function(m) {
			me.onMessage(client, m);
		}); 
		//Let lobby handle player disconnection
		client.on('disconnect', function () {    
			me.onDisconnect(client);
		}); 
	}); 
};

/**
 * Handle messages from the client
 */
LobbyServer.prototype.onMessage = function(client,message) {
	//If client isn't in a game, the lobby handles the message
	if(client && !client.game){
		this.handleMessage(client, message);
	}
	//If client is in a game, we relay the message to the game instance it is in.
	else if (client && client.game) {
    	client.game.handleMessage(client, message);
    }
};

//Handles client disconection
LobbyServer.prototype.onDisconnect = function(client) {		
	//If player is in game.
	if(client.game) {
		//Log event
		console.log(':: socket.io:: client ' + client.id.substring(0,8) + ' disconnected from game '
				+ client.game.id.substring(0, 8));
		//Tell game instance that player has left game.
		client.game.leaveGame(client);
	}
	//If player is not in game
	else{
		console.log(':: socket.io :: client ' + client.id.substring(0,8) + ' disconnected');
	}
	//TODO Lobby
};

/**
 * Handle message from client.
 */
LobbyServer.prototype.handleMessage = function(client,message){
	console.log(":: server :: received a message: " + message);
	var type = null;
	var keywords = message.split(" ");
	if(keywords[0].valueOf()===new String("lobby").valueOf()){
		if(keywords[1].valueOf()===new String("join").valueOf()){
			if(keywords[2].valueOf()===new String("pikachu").valueOf()){
				type = 0;
			}else if(keywords[2].valueOf()===new String("tr").valueOf()){
				type = 1;
			}else{
				type = 2;
			}
		}
	};
	//TODO
	this.findGame(client,type);
	
}

/**
 * Find a game for player to join.
 */
LobbyServer.prototype.findGame = function(player, type) {
	if(type===0 || type===2){
		if(this.numberOfGamesThatNeedPikachu>0){
			
			var gameThatNeedsPikachu = this.gamesThatNeedPikachu[0]
			this.gamesThatNeedPikachu.splice(0, 1);
			this.numberOfGamesThatNeedPikachu--;
			gameThatNeedsPikachu.setPikachuPlayer(player);
			// Tell the player that he joins the game
			player.send('lobby start pikachu');
			player.game = gameThatNeedsPikachu;
			
			// Tell the player that he joins the game
			gameThatNeedsPikachu.trPlayer.send('lobby start tr');
			
			gameThatNeedsPikachu.start();
			
			//Log the event
			this.log(':: server :: Player ' + player.id.substring(0,8) + ' Joined a game with id '
			+ player.game.id.substring(0,8));
			return;
		}
		else if(type===0){
			this.createGame(player,0);
		}
	}
	if(type===1 || type===2){
		if(this.numberOfGamesThatNeedTR>0){
			var gameThatNeedsTR = this.gamesThatNeedTR[0]
			this.gamesThatNeedTR.splice(0, 1);
			this.numberOfGamesThatNeedTR--;
			gameThatNeedsTR.setTRPlayer(player);
			// Tell the player that he joins the game
			player.send('lobby start tr');
			player.game = gameThatNeedsTR;
			
			// Tell the player that he joins the game
	 		gameThatNeedsTR.pikachuPlayer.send('lobby start pikachu');
			
			gameThatNeedsTR.start();
			
			//Log the event
			this.log(':: server :: Player ' + player.id.substring(0,8) + ' Joined a game with id '
			+ player.game.id.substring(0,8));
			return;
		}
		else{
			this.createGame(player,1);
		}
	}
	
	
};    

// Define some required functions
LobbyServer.prototype.createGame = function(player, type) {
	// Create a new game instance
	var newGame = new GameServer();
	
	if(type === 0){
		newGame.setPikachuPlayer(player); 
		// Store it in the list of game
	   this.gamesThatNeedTR.push(newGame);
	  // Keep track of #games
	  this.numberOfGamesThatNeedTR++;
	
	  
	  player.game = newGame;
	  
	  //Log the event
	  this.log(':: server :: Player ' + player.id.substring(0,8) + ' created a game with id '
	  + player.game.id.substring(0,8));

	}
	if(type === 1){
		newGame.setTRPlayer(player); 
		// Store it in the list of game
	   this.gamesThatNeedPikachu.push(newGame);
	  // Keep track of #games
	  this.numberOfGamesThatNeedPikachu++;
	
	  
	  player.game = newGame;
	  
	  //Log the event
	  this.log(':: server :: Player ' + player.id.substring(0,8) + ' created a game with id '
	  + player.game.id.substring(0,8));
	}
	
	
	

	

}; 

//Export Lobby
module.exports = LobbyServer;
