//Add directions here

/* VARIABLES */
let catcher, catcherImg,fallingObject, bottle, bonk, kaching, pants, treasure, womp, font, green, green2, recycleImg, recycle, treasurebox, song;
let playButton;
let score = 0;
let screen = 0;

/* PRELOAD LOADS FILES */
function preload(){
  bottle = loadImage("assets/bottle.png");
  catcherImg = loadImage("assets/chest.png");
  metal = loadImage('assets/metal.png');
  bonk = loadSound('assets/bonk.mp3');
  kaching = loadSound('assets/kaching.mp3');
  pants = loadImage('assets/pants.png');
  womp = loadSound('assets/womp.mp3');
  font = loadFont('assets/coiny.ttf');
  green = loadImage('assets/green.jpg');
  green2 = loadImage('assets/green2.jpg');
  recycleImg = loadImage('assets/recycle.png');
  song = loadSound('assets/nature.mp3');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  homeScreenAssets();
  bottle.resize(50,50);
  catcherImg.resize(70,50);
  metal.resize(50,50);
  pants.resize(50,50)
  recycleImg.resize(50,50);
}

/* DRAW LOOP REPEATS */
function draw() {
  if (playButton.mouse.presses()) {
      //screen 1 is play screen 
      screen = 1;
      playScreenAssets();
    }

  if (screen == 1) {
    background(green2,209,237,242);
    
    //If fallingObject reaches bottom, move back to random position at top
    if (fallingObject.y >= height) {
      fallingObject.y = 0;
      fallingObject.x = random(50,350);
      fallingObject.vel.y = (3,5);

      if (metal1.y >= 270) {
        metal1.y = 0;
        metal1.x = random(width);
        metal1.vel.y = random(1,5);
      }
      if (metal2.y >= 270) {
        metal2.y = 0;
        metal2.x = random(width);
        metal2.vel.y = random(1,5);
      }
      if (metal3.y >= 270) {
        metal3.y = 0;
        metal3.x = random(width);
        metal3.vel.y = random(1,5);
      }
      //Mild 
      score = score - 1;
    }
    
    //Move catcher
    if (kb.pressing("left")) {
      catcher.vel.x = -3;
    } else if (kb.pressing("right")) {
      catcher.vel.x = 3;
    } else {
      catcher.vel.x = 0;
    }
  
    //Stop catcher at edges of screen
    if (catcher.x < 50) {
      catcher.x = 50;
    } else if (catcher.x > 350) {
      catcher.x = 350;
    }
  
      // If fallingObject collides with catcher, move back to random position at top
    if (fallingObject.collides(catcher)) {
      treasure.x = fallingObject.x;
      treasure.y = fallingObject.y;
      treasure.vel.y = 2;
      fallingObject.y = 0;
      fallingObject.x = random(width);
      fallingObject.vel.y = random(3,5);
      fallingObject.direction = 'down';
      score += 1;
      play(kaching);
    }
    if (metal1.collides(catcher)) {
      eatmetal(metal1);
    }
    if (metal2.collides(catcher)) {
      eatmetal(metal2);
    }
    if (metal3.collides(catcher)) {
      eatmetal(metal3);
    }
    if (score < -3) {
      background('red');
      rectMode('center');
      fill('black');
      textFont(font);
      text(
        "You didn't recycle enough \nand got hit by too many \nmetal bottles! Game over",
        width/2 - 130 , height/2 - 30
      );;
      metal1.pos = { x: -200, y: -200 };
      metal2.pos = { x: -200, y: -200 };
      metal3.pos = { x: -200, y: -200 };
      catcher.pos = { x: -200, y: -200 };
      fallingObject.pos = { x: -200, y: -200 };
    }
    // Draw the score to screen
    fill(44,75,90);
    textSize(20);
    text("Score = " + score, 10, 30);

    if (score == 5) {
      endScreenAssets();
    }   
  }

  //allSprites.debug = mouse.pressing();
}

/* FUNCTIONS */
function homeScreenAssets() {
  background(green,208,240,192);
  song.play();
  //Create title
  fill(0);
  textSize(35);
  textFont(font);
  stroke('white')
  text("Trash to Treasure", 40, 50);

  //Create message
  fill('white');
  textSize(20);
  stroke('black');
  text("Recycle the falling plastic \n     bottles into clothes, \nturning trash into treasure!", width/2 - 140, height/2 - 100); 
   textSize(25)
  fill('black');
  stroke('white');
  text("Instructions", width/2 - 80, height/2 +10); 
    textSize(12)
  fill('white');
  stroke('black');
       text("Use the left and right arrow keys to move \n the catcher to recycle the falling plastic!",width/2 - 130, height/2 + 30);
  //Create graphics
  recycle = new Sprite(recycleImg, 65,320,100,20, "k");
  treasurebox = new Sprite(catcherImg, 340,320,100,20, "k");
  //Create play button
  playButton = new Sprite(200,320,100,70, 'k');
  playButton.color = "white";
  playButton.textColor = "black";
  playButton.textSize = 20;
  playButton.text = "Play";
}

function playScreenAssets() {
  background(green2,224,224,224);
  song.stop();
  playButton.pos = { x: -200, y: -100 };
  recycle.pos = { x: -200, y: -100 };
  treasurebox.pos = { x: -200, y: -100 };
  //Create catcher 
  catcher = new Sprite(catcherImg,200,270,100,20, "k");

  //Create falling object
  fallingObject = new Sprite(bottle,100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.velocity.y = 2;
  fallingObject.rotationLock = true; 
  fallingObject.textSize = 12;

  //create falling metal bottles
  metal1 = new Sprite(metal,50,0,20);
  metal1.vel.y = 3;

  metal2 = new Sprite(metal,120,0,20);
  metal2.vel.y = 3;

  metal3 = new Sprite(metal,170,0,20);
  metal3.vel.y = 3;
  // create treasure
  treasure = new Sprite(pants,100,-100,-110);
}

function endScreenAssets() {
  background(208,240,192);

  //Draw sprites off of screen
  catcher.pos = { x: 600, y: -300 };
  fallingObject.pos = { x: -100, y: 0 };

  fill(0);
  textSize(20);
  text("Thanks for playing!", width/2 - 125, height/2 - 30); 
}
function eatmetal(metal) {
  score -= 1;
  metal.y = 0;
  metal.x = random(width);
  metal.vel.y = random(1,5);
  metal.direction = 'down';
  play(bonk);
}