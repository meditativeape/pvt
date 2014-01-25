var canvasWidth = 800;
var canvasHeight = 600;
var background1;
var background2;

var stage = new Kinetic.Stage({
	container: 'container',
	width:canvasWidth,
	height:canvasHeight
});
var backgroundLayer = new Kinetic.Layer();

var bg = new Image();
bg.onload = function() {
	background1 = new Kinetic.Image({
	x: 0,
	y: 0,
	image: bg,
	width: bg.width,
	height: 600
	});
	background2 = new Kinetic.Image({
	x: bg.width,
	y: 0,
	image: bg,
	width: bg.width,
	height: 600
	});
	backgroundLayer.add(background1);
	backgroundLayer.add(background2);
	stage.add(backgroundLayer);
    bg_anim.start();
};
bg.src = "http://img163.imageshack.us/img163/3618/xxz3.jpg";
var bgSpeed = -3; // pixels moving/frame

var bg_anim = new Kinetic.Animation(function(frame){
	var time = frame.time,
        timeDiff = frame.timeDiff,
        frameRate = frame.frameRate;
        //assuming 16ms/f is maximum
    if((background1.getAbsolutePosition().x + background1.width()) <= 0){background1.setX(background2.getAbsolutePosition().x+background2.width());}
                                                                                        if((background2.getAbsolutePosition().x + background2.width()) <= 0){background2.setX(background1.getAbsolutePosition().x+background1.width());}
    background1.move({x: bgSpeed*(timeDiff/16), 
                      y: 0});
    background2.move({x: bgSpeed*(timeDiff/16), 
                      y: 0});
    
    
	},backgroundLayer);
