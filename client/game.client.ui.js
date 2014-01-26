/** 
 * Game Client UI.
 */

var GameClientUI = function(/*GameState*/ gameState){
    this.gameState = gameState;
    
    this.stage = new Kinetic.Stage({
        container: 'game',
        id: 'gameCanvas',
        width: CONSTANTS.width,
        height: CONSTANTS.height
    });
    this.backLayer = new Kinetic.Layer();
    this.platformLayer = new Kinetic.Layer();
    this.frontLayer = new Kinetic.Layer();
    
    // sprites
    this.background = null;
    this.floor = null;
    this.pokeball = null;
    this.pokeballGray = null;
    this.platformLeft = null;
    this.platformMid = null;
    this.platformRight = null;
    this.platformSingle = null;
    this.pikachus = [null, null, null, null];
    
    // Kinetic objects
    this.pikachuToDraw = [];
    this.pokeballsToDraw = [];
};

/**
 * Function to load all sprite images and draw UI.
 */
GameClientUI.prototype.initialize = function(){

    var filesLoaded = 0;
    var me = this;
    
    var incrementCounter = function() {
        filesLoaded++;
        if (filesLoaded >= 12) {
            me.draw();
        }
    };
    
    var loadImage = function(url) {
        var img = new Image();
        img.onload = incrementCounter;
        img.src = url;
        return img;
    };
     
    this.background = loadImage("..\\sprites\\background.png");
    this.floor = loadImage("..\\sprites\\floor.png");
    this.platformLeft = loadImage("..\\sprites\\platformLeft.png");
    this.platformMid = loadImage("..\\sprites\\platformMid.png");
    this.platformRight = loadImage("..\\sprites\\platformRight.png");
    this.platformSingle = loadImage("..\\sprites\\platformSingle.png");
    this.pokeball = loadImage("..\\sprites\\pokeball.png");
    this.pokeballGray = loadImage("..\\sprites\\pokeballGray.png");
    this.pikachus[0] = loadImage("..\\sprites\\pika1.png");
    this.pikachus[1] = loadImage("..\\sprites\\pika2.png");
    this.pikachus[2] = loadImage("..\\sprites\\pika3.png");
    this.pikachus[3] = loadImage("..\\sprites\\pika4.png");
};

/**
 * Draw game UI.
 */
GameClientUI.prototype.draw = function(){
	var me = this;
    
    // Create two Kinetic image objects for the scrolling background
    var bg1 = new Kinetic.Image({
        x: 0,
        y: 0,
        image: this.background,
        width: this.background.width,
        height: CONSTANTS.height
	});
	var bg2 = new Kinetic.Image({
        x: this.background.width,
        y: 0,
        image: this.background,
        width: this.background.width,
        height: CONSTANTS.height
	});
	this.backLayer.add(bg1);
	this.backLayer.add(bg2);
    
    // Kinetic animation to scroll the background
    this.bgAnim = new Kinetic.Animation(function(frame){
        var timeDiff = frame.timeDiff;
        //assuming 16ms/f is maximum
        if((bg1.getAbsolutePosition().x + bg1.width()) <= 0){ 
            bg1.setX(bg2.getAbsolutePosition().x + bg2.width());
        }
        if((bg2.getAbsolutePosition().x + bg2.width()) <= 0){
            bg2.setX(bg1.getAbsolutePosition().x + bg1.width());
        }
        bg1.move({x: CONSTANTS.backgroundScrollSpeed * (timeDiff / 16), 
                  y: 0});
        bg2.move({x: CONSTANTS.backgroundScrollSpeed * (timeDiff / 16), 
                  y: 0});
	}, this.backLayer);
    this.bgAnim.start();
    
    this.platformsToDraw = [];
    

    
    /*
    	this.platformImage[0] = new Kinetic.Image({
    	image: this.platformMid,
        x: this.gameState.platforms[i].center.X-.5*this.gameState.platforms[i].width,
        y: this.gameState.platforms[i].center.Y-.5*this.gameState.platforms[i].height,
        width: this.gameState.platforms[i].width,
        height: this.gameState.platforms[i].height
        });
        console.log(i);
    this.platformLayer.add(this.platformImage);
    
    */
    for(var i=0;i<this.gameState.platforms.length;i++){
	console.log(this.gameState.platforms[i]);}
	console.log(this.gameState.platforms.length);
    this.platAnim = new Kinetic.Animation(function(frame){
    	console.log(me.gameState.platforms.length);
    	while(me.platformsToDraw.length < me.gameState.platforms.length){
    		var pfLen = me.gameState.platforms.length-1;
    		//console.log(me.gameState.platforms);
    		var temp=new Kinetic.Image({
 	   		image: me.platformMid,
 	       	x: me.gameState.platforms[pfLen].center.X+.5*me.gameState.platforms[pfLen].width,
        	y: me.gameState.platforms[pfLen].center.Y+.5*me.gameState.platforms[pfLen].height,
        	width: me.gameState.platforms[pfLen].width,
        	height: me.gameState.platforms[pfLen].height});
        	//console.log(pfLen);
    		me.platformsToDraw.push(temp);
    		me.platformLayer.add(temp);
    		}
    	while(me.platformsToDraw.length > me.gameState.platforms.length){
    		me.platformsToDraw[0].destroy();
    		me.platformsToDraw.splice(0,1);
    	}
    
    	for(var i= 0; i< me.platformsToDraw.length; i++){
    	var timeDiff = frame.timeDiff;
    	me.platformsToDraw[i].setAbsolutePosition({x:me.gameState.platforms[i].center.X - 0.5*me.gameState.platforms[i].width,
        y:me.gameState.platforms[i].center.Y - 0.5*me.gameState.platforms[i].height});}

	}, this.platformLayer);
	this.platAnim.start();
  
    
    // Create two Kinetic image objects for the scrolling floor
    var floor1 = new Kinetic.Image({
        x: 0,
        y: CONSTANTS.height - CONSTANTS.floorHeight,
        image: this.floor,
        width: this.floor.width,
        height: this.floor.height
    });
    var floor2 = new Kinetic.Image({
        x: this.floor.width,
        y: CONSTANTS.height - CONSTANTS.floorHeight,
        image: this.floor,
        width: this.floor.width,
        height: this.floor.height
    });
    this.platformLayer.add(floor1);
    this.platformLayer.add(floor2);
	
    // Kinetic animation to scroll the floor and the platform
    this.platformLayerAnim = new Kinetic.Animation(function(frame){	
        var timeDiff = frame.timeDiff;
        //assuming 16ms/f is maximum
        if((floor1.getAbsolutePosition().x + floor1.width()) <= 0){ 
            floor1.setX(floor2.getAbsolutePosition().x + floor2.width());
        }
        if((floor2.getAbsolutePosition().x + floor2.width()) <= 0){
            floor2.setX(floor1.getAbsolutePosition().x + floor1.width());
        }
        floor1.move({x: CONSTANTS.platformScrollSpeed * (timeDiff / 16), 
                    y: 0});
        floor2.move({x: CONSTANTS.platformScrollSpeed * (timeDiff / 16), 
                    y: 0});
	}, this.platformLayer);
    this.platformLayerAnim.start();
    
    // Create a Pikachu
    this.pikachuToDraw = new Kinetic.Image({
        image: this.pikachus[0],
        x: this.gameState.pikachu.center.X - 0.5*this.pikachus[0].width,
        y: this.gameState.pikachu.center.Y - 0.5*this.pikachus[0].height,
        width: this.pikachus[0].width,
        height: this.pikachus[0].height,
    });    	
    
    
    
    this.pikachuToDraw.counter = 0;
    this.frontLayer.add(this.pikachuToDraw);
	
    // Create a Kinetic animation to update Pikachu and pokeballs
    this.frontLayerAnim = new Kinetic.Animation(function(frame){
		
        if (!me.gameState.pikachu.midair) {
            me.pikachuToDraw.counter = (me.pikachuToDraw.counter + 1) % 24;
            me.pikachuToDraw.setImage(me.pikachus[Math.floor(me.pikachuToDraw.counter / 6)]);
			me.pikachuToDraw.rotation(0);
        } else {
            me.pikachuToDraw.setImage(me.pikachus[2]);
			me.pikachuToDraw.rotation(CONSTANTS.pikachuRotation);
        }
        me.pikachuToDraw.setAbsolutePosition({x:me.gameState.pikachu.center.X - 0.5*me.pikachus[0].width,
                                              y:me.gameState.pikachu.center.Y - 0.5*me.pikachus[0].height});                               
        while (me.gameState.pokeballs.length > me.pokeballsToDraw.length) {
            me.pokeballsToDraw.push(new Kinetic.Image({
                image: this.pokeball,
                x: 0,
                y: 0,
                width: this.pokeball.width,
                height: this.pokeball.height
            }));
        }
		
        while (me.gameState.pokeballs.length < me.pokeballsToDraw.length) {
            me.pokeballsToDraw[0].destory;
            me.pokeballsToDraw.splice(0, 1);
        }
        for (var i = 0; i < me.pokeballsToDraw.length; i++) {
            me.pokeballsToDraw[i].setAbsolutePosition({
                x: me.gameState.pokeballs[i].center.X - 0.5 * me.pokeball.width,
                y: me.gameState.pokeballs[i].center.Y - 0.5 * me.pokeball.height
            });
            if (me.gameState.pokeballs[i].cooldown > 0) {
                me.pokeballsToDraw[i].setImage(this.pokeballGray);
                me.pokeballsToDraw[i].rotation(CONSTANT.pokeballRotation);
            } else {
                me.pokeballsToDraw[i].setImage(this.pokeball);
                me.pokeballsToDraw[i].rotation(0);
            }
        }
    }, this.frontLayer);
	this.frontLayerAnim.start();

    // A Kinetic text to show text message at the center of canvas.
    // var centerMsg = new Kinetic.Text({
        // text: "Placeholder",
        // x: 80,
        // y: 260,
        // fill: 'rgba(127, 155, 0, 0.5)',
        // fontFamily: 'Calibri',
        // fontSize: 60,
        // fontStyle: 'italic'
    // });
    // this.frontLayer.add(centerMsg);
    
    // A Kinetic animation to change the text message at the center of canvas.
    //this.msgAnim = new Kinetic.Animation(function(frame) {}, frontLayer);
    //this.msgAnim.start();
    
    // add layers to stage (add at last so that we donot to redraw layers after adding objects to them)
    this.stage.add(this.backLayer);
    this.stage.add(this.platformLayer);
    this.stage.add(this.frontLayer);
};

/**
 * Clean up all animations and objects.
 */
GameClientUI.prototype.cleanUp = function(){

    // stop all animations
    this.bgAnim.stop();
    this.platformLayerAnim.stop();
    this.rectAnim.stop();
    // this.msgAnim.stop();
    
    // destroy all layers and the stage
    this.backLayer.destroy();
    this.platformLayer.destroy();
    this.frontLayer.destroy();
    this.stage.destroy();
};