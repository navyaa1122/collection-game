//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject;
let score = 0;
let backgroundImg;
let catcherImg;
let fallingObjectImg;
let gameActive = true;


/* PRELOAD LOADS FILES */
function preload(){
  backgroundImg = loadImage('assets/background.png');
  fallingObjectImg = loadImage('assets/heart.png');
  catcherImg = loadImage('assets/girl.png');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(600,600);
  //canvas.parent('canvas-container');  // Attach the canvas to the #canvas-container div
  textFont("VT323");
  textSize(40);
 
  
  //Create catcher 
  catcher = new Sprite(300,520,20,"k");
  catcher.image = 'assets/girl.png';
  catcher.color = color(95,158,160);
  catcherImg.resize(150,0);
  
  
  //Create falling object
  fallingObject = new Sprite( 100,0,10);
  fallingObjectImg.resize(50,50);
  fallingObject.image = 'assets/heart.png';
  fallingObject.vel.y = 2;
}

/* UPDATE SCORE FUNCTION */
function updateScore(caught) {
  if (caught) {
    score += 1;
  } else {
    score -= 1;
  }
  // Check for win/lose conditions
  if (score >= 10) {
    gameActive = false;
  
  } else if (score <= -1) {
    gameActive = false;
    
  }
}
/* DRAW LOOP REPEATS */
function draw() {
   if (!gameActive) {
     background(224, 224, 224);

     // Draw background Image
     image(backgroundImg, 0, 0, width, height);

     fill("#FF4500");
     textFont('VT323'); // Use the imported font for the message
     textSize(32);
     textAlign(CENTER, CENTER); // Center the text
     text("You lose!", width / 2, height / 2);
       return;  // Stop the game if inactive
     }

  
  // //Draw background Image
  image(backgroundImg, 0, 0);
  
  // Draw directions to screen
  fill("black");
  textSize(18);
  text("Move the girl with \nthe left and right \narrow keys to catch \nthe falling hearts!", width-150, 30);
  

  // //If fallingObject reaches bottom, move back to random position at top
  if (fallingObject.y >= height) {
    fallingObject.y = 0;
     fallingObject.x = random(width);
    fallingObject.vel.y = random(1,3);

    // Update score negatively if not caught
    updateScore(false);
       }
  
  // move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3; 
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3; 
} else {
    catcher.vel.x = 0;
}
  
// stop catcher at edges of screen
if (catcher.x < catcherImg.width / 2) {
  catcher.x = catcherImg.width / 2;
} else if (catcher.x > width - catcherImg.width / 2) {
  catcher.x = width - catcherImg.width / 2;
}

  //If fallingObject collides with catcher, move back to random position at top.
 if (fallingObject.collides(catcher)) {
  fallingObject.y = 0;
  fallingObject.x = random(width);
  fallingObject.vel.y = random(1,5);
  fallingObject.direction = "down";
  updateScore(true);  // Update score positively if caught
  }  

  // Draw the score to screen
  fill("#FF4500");
  textFont('VT323');
   textSize(24);
  text("Score: " + score, 10, 30);
}
