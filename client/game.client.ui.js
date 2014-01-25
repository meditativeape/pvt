// Game Client UI

var GameClientUI = function(/*GameClient*/ client){
    this.client = client;
    
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
    this.platform = null;
    this.grassHalf = null;
    this.grassHalfLeft = null;
    this.grassHalfMid = null;
    this.grassHalfRight = null;
};

/**
 * Function to load all sprite images.
 */
GameClientUI.prototype.loadImage = function(){

    var loadImage = function(url) {
        var img = new Image();
        img.src = url;
        return img;
    };
    
    this.background = loadImage("..\\sprites\\background.png");
    this.floor = loadImage("..\\sprites\\floor.png");
    this.grassHalf = loadImage("..\\sprites\\grassHalf.png");
    this.grassHalfLeft = loadImage("..\\sprites\\grassHalfLeft.png");
    this.grassHalfMid = loadImage("..\\sprites\\grassHalfMid.png");
    this.grassHalfRight = loadImage("..\\sprites\\grassHalfRight.png");
};

/**
 * Initialize game UI.
 */
GameClientUI.prototype.initGameUI = function(){

    // Create two Kinetic image objects for the scrolling background
    bg1 = new Kinetic.Image({
        x: 0,
        y: 0,
        image: this.background,
        width: this.background.width,
        height: this.background.height
	});
	bg2 = new Kinetic.Image({
        x: this.background.width,
        y: 0,
        image: this.background,
        width: this.background.width,
        height: this.background.height
	});
	backLayer.add(bg1);
	backLayer.add(bg2);
    
    // Kinetic animation to scroll the background
    

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
    // frontLayer.add(centerMsg);
    
    // A Kinetic animation to change the text message at the center of canvas.
    //this.msgLayerAnim = new Kinetic.Animation(function(frame) {}, frontLayer);
    //this.msgLayerAnim.start();
};

GameClientUI.cleanUp = function(){
    
};