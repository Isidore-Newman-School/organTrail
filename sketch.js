// all
var debugging = false;
//////////////////////
// CHARACTERS
var player;
var playerSprite;

var zombies = [];
var zombieSprite;

var numZombiekill = 0;

var llamaImg;
var llama;
var gameOver = false;
var won = false;
var level1Won = false;

//////////////////////
// SCENERY
var groundLevel = 445;
var backgrounds = [];
var poopplat;

var tumbleIMG;
var tumble = [];

var cactusImg;
var cacti = [];

var mySound

var track;
var rockImg;
var rocks = []
//////////////////////
// LEVEL
var level = 0;
var groundX = 0;
///////////////////////
// LEVEL 1
var paper;
var level1Started = false;
var westFont;
var skullImg;
// LEVEL 2
var cokeImg;
var ammoImg;
var heartImg;
var horseImg;
var paper2Img;
var clickedItem = -1;
var selected= false;
///////////////////////
// LEVEL 3
var levelStartedTime;
var currentTime;
var level3Won = false;

// LEVEL 4
var gameOverImg;
var won = false;
var purchasedTime = 0;

function preload() {
  llamaImg = loadImage("images/sprites/llama/llama_single.png");
  cactusImg = loadImage("images/cactus/cactus1.png");
  westFont = loadFont('Fonts/WEST.TTF');
  initSprites();
  paper=loadImage("images/backgrounds/level1/paper2.png");
  skullImg=loadImage("images/backgrounds/level1/skull.png");
  poopplat=loadImage("images/backgrounds/level1/poopplat.png");
  tumbleIMG=loadImage("images/tumble/tumbleweed.png");


  mySound = loadSound("audio/CahnWalk.mp3");
  healthbar = loadImage("images/healtthbar/healthbar.png");
  gameOverImg  = loadImage("images/backgrounds/gameover.png");
  win = loadImage("images/backgrounds/win.jpg");

  track = loadImage("images/backgrounds/track.png");
  rockImg = loadImage("images/sprites/rock.png");

  cokeImg = loadImage("images/Items/conck.png");
  ammoImg = loadImage("images/Items/amoe.png");
  heartImg = loadImage("images/Items/hart.png");
  horseImg = loadImage("images/Items/horse.png");
  paper2Img = loadImage("images/paper2.png");

}

function setup() {
  levelStartedTime = millis();

  for (var i = 0; i < 13; i++) {
    tumble[i] = new Tumble();
  }
  for (var i = 0; i < 13; i++) {
    cacti[i] = new Cactus();
  }
  createCanvas(windowWidth-10, windowHeight-10);
  initBackgrounds();
  initPlayer();
  initZombies();
  textFont(westFont);
  textSize(45);

  mySound.setVolume(0.1);
  mySound.play();

  button = createButton('buy');
  button.position(-1000, 120);
  button.mousePressed(selectItem);

}

function selectItem() {
  selected = true;
  button.position(-1000, 120);
  purchasedTime = millis();
}


function draw() {
  if (gameOver) {
    gameOverr();
  }
  else if (won) {
    winn();
  }
  else if (level == 0) {
    startUpScreen();

  }
  else if (level == 1) {
    level1();
  }
  else if (level == 2) {
    level2();
  }
  else if (level == 3) {
    level3();
  }
  else if (level == 4) {
    level4();
  }
}


//////////////////////////////////////////////////
// START UP
//////////////////////////////////////////////////
function startUpScreen() {
  background(0);
  fill(255);
  textSize(100);
  text("Organ Trail", (width-textWidth("Organ Trail"))/2, height/2-100);
  textSize(30);
  text("Creative Coding S2019", (width-textWidth("Creative Coding S2019"))/2, height/2);
  textSize(50);
  text("click to start", (width-textWidth("click to start"))/2, 500);
}

//////////////////////////////////////////////////
// LEVEL 1
//////////////////////////////////////////////////
function level1() {
  tileXBackground(backgrounds[1]);
  if (level1Started == false) {
    Menu();
  }
  else {

    displayWoundedBackground();
    for(i = 0; i < cacti.length; i++) {
      cacti[i].display();
      tileGround();
    }
    for(i = 0; i < tumble.length; i++) {
      tumble[i].display();
    }
    healthbarDisplay(300,100);
    playerDisplay();
    zombiesWalk();

  }
  image(skullImg, 40,200, 100,50);
  textSize(60);
  fill(255);
  stroke(255);
  text(numZombiekill,45,200);
  endlevel();
}

function level2(){
  background(backgrounds[2]);
  playerDisplay();

  if (!selected) {
    // displayWoundedBackground();
    var cokeP = [width*.8, height*.57];
    var ammoP = [width*.72, height*.57];
    var heartP = [width*.83, height*.5];
    var horseP = [width*.73, height*.5];
    image(cokeImg, width*.8, height*.57, cokeImg.width*.15, cokeImg.height*.15);
    image(ammoImg, width*.72, height*.57, ammoImg.width*.15, ammoImg.height*.15);
    image(heartImg, width*.83, height*.5, heartImg.width*.08, heartImg.height*.08);
    image(horseImg, width*.73, height*.5, horseImg.width*1.2, horseImg.height*1.2);


    // zombiesWalk();
    if (clickedItem > 0 ){
      button.position((width-50)/2, 400);
      image(paper2Img, (width-500)/2, 50, 500, 500);
    }
    if (clickedItem == 1) {
      text("A slightly used steed. It will somehow make you jump higher? Buy the Horse? ", width/2-200, 100, 400, 400);
    }
    else if (clickedItem == 2) {
      text("Want some Coke? It will fully heal you. 'Drink responsibly.' Buy the Coke?", width/2-200, 100, 400, 400);
    }
    else if (clickedItem == 3) {
      text("This Heart will partially revive you if you die. Buy the Heart?", width/2-200, 100, 400, 400);
    }
    else if (clickedItem == 4) {
      text("More ammo is better, right? With all this extra gear, you would be able to shoot faster. Buy the Ammo?", width/2-200, 100, 400, 400);
    }
  }
  if (selected) {
    image(paper2Img, (width-500)/2, 50, 500, 500);
    text("Good purchase. Click to advance to the next level.", width/2-200, 100, 400, 400);
    if (clickedItem == 1){
      image(horseImg, width*.8,50, 100, 100);
      text(clickedItem, 50, 50);
    }
    if (clickedItem == 2){
      image(cokeImg, 1100,50, 100, 100);
      text(clickedItem, 50, 50);
    }
    if (clickedItem == 3){
      image(heartImg, 1100,50, 100, 100);
      text(clickedItem, 50, 50);
    }
    if (clickedItem == 4){
      image(ammoImg, 1100,50, 100, 100);
      text(clickedItem, 50, 50);
    }
  }
}


function level3() {
  if (!level3Won) {
    tileXBackground(backgrounds[3]);
    currentTime = millis() - levelStartedTime;
    var spacing = width/4;
    image(track, spacing, 0);
    image(track, 2*spacing, 0);
    image(track, 3*spacing, 0);
    cart.display ();
    for (var i = 0; i< rocks.length; i++) {
      rocks[i].display();
      rocks[i].move();
      rocks[i].collision();
    }
    if (debugging && currentTime>1200) {
      level3Won = true;
    }
    else if (currentTime>12000) {
      level3Won = true;
    }
  }
  else {
    imageMode(CENTER);
    image(paper, width/2, height/2, 500 ,500);
    imageMode(CORNER);
    textSize(60);
    fill(0);
    stroke(0);
    text("You beat the level! Click to start the last level", width/2-200, 200, 400, 400);
  }
}


function level4(){
  background(backgrounds[4]);
  llama.display();
  llama.updateBullets();
  llama.displayBullets();
  llama.checkShotCowboy();
  llama.shoot();
  playerDisplay()
  llama.update();
  llama.healthbar(700, 100);
  player.checkShotLlama();

  healthbarDisplay(300,100);
  if (player.health <= 0){
    gameOver = true;
  }
  else if (llama.health <= 0){
    won = true;
  }
}


//////////////////////////////////////////////////
// PLAYER FUNCTIONS
//////////////////////////////////////////////////
function playerDisplay() {
  if (player.isJumping) {
    if (keyIsDown(68)) {
      player.move(3);
    }
    player.jump();
  }
  else if (keyIsDown(87)) {
    player.startJump();
  }
  else if (keyIsDown(68) && !keyIsDown(32)) {
    player.walk();
    player.move(3);
    player.direction = "forward";
  }
  else {
    player.stand();
  }

  if (keyIsDown(32)) { // space
    player.shoot();
  }
  else if (keyIsDown(65)) {
    player.direction = "backward";
    player.walk();
    player.move(-3);
  }

  player.checkCollisions();
  player.update();
  player.display();
}

function displayWoundedBackground() {
  if(player.wounded) {
    fill(255, 0, 0, 100);
    rect(0, 0, width, height);
  }
}


//////////////////////////////////////////////////
// INIT FUNCTIONS
//////////////////////////////////////////////////
function initBackgrounds() {
  for (var i = 0; i < 5; i++) {
    if (i != 2) backgrounds[i] = loadImage("images/backgrounds/" + i + ".png");
    else backgrounds[i] = loadImage("images/backgrounds/" + i + ".jpg");
  }
}

function initSprites() {
  playerSprite = new Sprite(100, groundLevel, 1.0);
  playerSprite.initAnimation("walk", "images/sprites/cowboy/walk", 160.5, 173, 16);
  playerSprite.initAnimation("shoot", "images/sprites/cowboy/shoot", 212, 203, 6);

  zombieSprite = new Sprite(3000, groundLevel, 1.5);
  zombieSprite.initAnimationFrames("walk", "images/sprites/zombie/move/move", 6);
}

function initPlayer() {
  player = {
    x: 100,
    y: groundLevel,
    bullets: [{x:-100, y:this.y},{x:-100, y:this.y},{x:-100, y:this.y},{x:-100, y:this.y},{x:-100, y:this.y}],
    direction: 'forward',
    yVelocity : 0,
    isJumping : false,
    health: 100,
    woundedTime : 0,
    wounded: false,
    currentBullet:0,
    lastBulletFired: 0,
    update: function() {
      playerSprite.y = this.y;
      // fill(255);
      // text(this.health+"%", 100, 100);
      // fill(0);
      this.updateBullets();
      this.checkShotZombies();
    },
    display: function(x, y) {
      playerSprite.display(x, y);
    },
    display: function() {
      playerSprite.display();
      this.displayBullets();
    },
    walk: function() {
      playerSprite.setAnimation('walk');
      playerSprite.nextImage();
    },
    move: function(amt) {
      this.x += amt;
      groundX++
    },
    shoot: function() {
      // this.bullets[this.currentBullet].x < 0 &&
      if ( millis() - this.lastBulletFired > 100) {
        this.currentBullet++;
        this.lastBulletFired = millis();
        if (this.currentBullet > this.bullets.length) {
          this.currentBullet = 0;
        }
        this.bullets[this.currentBullet] = {x: playerSprite.x+82, y:this.y+60};
      }
      playerSprite.setAnimation('shoot');
      playerSprite.nextImage();
    },
    checkShotZombies: function() {
      for (var i = 0; i < zombies.length; i++) {
        for (var j= 0; j < this.bullets.length; j++) {
          if (checkCollision(this.x + this.bullets[j].x - 100, this.bullets[j].y, 36, 36, zombies[i].x, zombies[i].y, 40, 140)) {
            zombies.splice(i, 1);
            numZombiekill ++
            this.bullets[j].x = -100;
            return;
          }
        }
      }

    },
    checkShotLlama : function() {
      if (checkCollision(this.x + this.bullets[0].x - 100, this.bullets[0].y, 36, 36, llama.x, llama.y, llama.w, llama.h)) {
        llama.health -=10;
        this.bullets[0].x = -100;

        console.log("llamahit");
        return;
      }
    },
    displayBullets: function() {
      fill(0);
      stroke(0);
      for (var i= 0; i < this.bullets.length; i++) {
        ellipse(this.bullets[i].x, this.bullets[i].y, 8);
      }
    },
    updateBullets: function() {
      for (var i= 0; i < this.bullets.length; i++) {
        if (this.bullets[i].x > 0 && this.bullets[i].x < width) {
          this.bullets[i].x += 10;
        }
        else if (this.bullets[i].x > width) {
          this.bullets[i].x = -100;
        }
      }
    },
    stand: function() {
      playerSprite.setAnimation('walk');
    },
    startJump: function() {
      if (this.isJumping == false) {
        this.isJumping = true;
        this.yVelocity = -20;
      }
    },
    jump: function() {
      if (this.isJumping) {
        this.yVelocity += 1;
        this.y += this.yVelocity;
        if (this.y > groundLevel) {
          this.isJumping = false;
          this.yVelocity = 0;
        }
      }
    },
    checkCollisions: function() {
      if (millis() - this.woundedTime > 2000) {
        for (var i = 0; i < zombies.length; i++) {
          if (checkCollision(this.x, this.y, 95, 106, zombies[i].x, zombies[i].y, 40, 40)) {
            this.health-=5;
            this.woundedTime = millis();
            this.wounded = true;
            return;
          }
        }
        this.wounded = false;
      }
    }
  }

  cart = {
    x: 0,

    w: 105,
    h: 150,
    y: 450,
    spacing: width/4,
    numTrack: 0,
    reset: function() {
      this.numTrack = 0;
      this.x = (this.numTrack+1) * this.spacing +26;
    },
    display: function () {
      this.x = (this.numTrack+1) * this.spacing + 26;
      fill(140);
      rect (this.x, this.y, this.w, this.h);
    }
  };

  llama = {
    x: width*.6,
    w: llamaImg.width,
    h: llamaImg.height,

    y: 0,
    bullets: [{x:-100, y:this.y}],
    direction: 'forward',
    yVelocity : 0,
    isJumping : false,
    health: 100,
    woundedTime : 0,
    wounded: false,
    update: function() {
      fill(255);
      //text(this.health+"%", 400, 100);
      fill(0);
    },
    display: function() {
      image(llamaImg, this.x, this.y);
    },
    move: function(amt) {
      this.x += amt;
    },
    shoot: function() {
      if (this.bullets[0].x > width) {
        this.bullets[0] = {x: this.x+82, y:560};
      }
    },
    displayBullets: function() {
      // console.log(this.bullets[0], "a")
      fill(0);
      stroke(0);
      ellipse(this.bullets[0].x, this.bullets[0].y, 18);
    },
    checkShotCowboy: function() {

      if (checkCollision(this.bullets[0].x, this.bullets[0].y, 36, 36, player.x, player.y, 40, 140)) {
        player.health -=10
        console.log("hit")
        this.bullets[0].x = width+100;
        return;

      }
    },
    updateBullets: function() {
      if (this.bullets[0].x < width && this.bullets[0].x > 0) {
        this.bullets[0].x -= 10;
      }
      else if (this.bullets[0].x < 0) {
        this.bullets[0].x = width+100;
      }
    },
    stand: function() {
      playerSprite.setAnimation('walk');
    },
    startJump: function() {
      if (this.isJumping == false) {
        this.isJumping = true;
        this.yVelocity = -20;

      }
    },
    healthbar : function healthbarDisplay(x,y){
      fill(255,0,0);
      rect(x+10,y+40, 125/100*this.health, 15);
      image(healthbar, x, y, 150,110);
    },
    jump: function() {
      if (this.isJumping) {
        this.yVelocity += 1;
        this.y += this.yVelocity;
        if (this.y > groundLevel) {
          this.isJumping = false;
          this.yVelocity = 0;
        }
      }
    },
    checkCollisions: function() {
      if (millis() - this.woundedTime > 2000) {
        for (var i = 0; i < player.bullets.length; i++) {
          if (checkCollision(this.x, this.y, 95, 106, player.bullets[i].x, player.bullets[i].y, 40, 40)) {
            this.health--;

            this.woundedTime = millis();
            this.wounded = true;
            return;
          }
        }
        this.wounded = false;
      }
    }
  }
}

function tileXYBackground(tileImg) {
  for (var x = 0; x < width; x+= tileImg.width) {
    for (var y = 0; y < height; y+= tileImg.height) {
      image(tileImg, x, y);
    }
  }
}

function tileXBackground(tileImg) {
  var scaleFactor = height/tileImg.height;
  for (var i = 0; i < width; i+= scaleFactor*tileImg.width) {
    image(tileImg, i, 0, scaleFactor*tileImg.width, height);
  }
}


//////////////////////////////////////////////////
// ZOMBIE OBJECT CONSTRUCTOR
//////////////////////////////////////////////////
function Zombie(x) {
  this.x = x;
  this.y = groundLevel;
  this.direction = 'forward';
  this.walk = function() {
    zombieSprite.setAnimation('walk');
    zombieSprite.nextImage();
  },
  this.move = function() {
    this.x-=2.5;
  }
  this.update = function() {
    zombieSprite.x = this.x;
    zombieSprite.y = this.y;
  }
  this.display = function() {
    push();
    translate(-player.x, 0);
    if (this.direction == 'forward') {
      zombieSprite.x = this.x;
    }
    else {
      scale(-1.0, 1.0);
      translate(-player.x, 0);
      zombieSprite.x = -this.x;
    }
    zombieSprite.display();
    pop();
  }
}

function initZombies() {
  for (var i = 0; i < 50; i++) {
    zombies[i] = new Zombie(random(500, 20000));
    zombies[i].update();
  }
}

function zombiesWalk() {
  for (var i = 0; i < zombies.length; i++) {
    zombies[i].walk();
    zombies[i].move();
    zombies[i].display();
  }
}


//////////////////////////////////////////////////
// HELPER FUNCTIONS
//////////////////////////////////////////////////
function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
  x1 += w1/2;
  y1 += h1/2;
  x2 += w2/2;
  y2 += h2/2;
  return x1 < x2 + w2 &&
  x1 + w1 > x2 &&
  y1 < y2 + h2 &&
  y1 + h1 > y2;
}


//////////////////////////////////////////////////
// MOUSE
//////////////////////////////////////////////////
function mousePressed() {
  if (level == 0) {
    level = 1;
  }
  else if (level1Started == false && level == 1) {
    level1Started = true
  }
  else if (level == 1 && level1Won) {
    level = 2;
  }
  else if (level == 2 && !selected) {
    var cokeP = [width*.8, height*.57];
    var ammoP = [width*.72, height*.57];
    var heartP = [width*.83, height*.5];
    var horseP = [width*.73, height*.5];
    if (checkCollision(mouseX, mouseY, 20, 20, horseP[0], horseP[1], horseImg.width*1.2, horseImg.height*1.2)) {
      clickedItem = 1;
    }
    if (checkCollision(mouseX, mouseY, 20, 20, cokeP[0], cokeP[1], cokeImg.width*.15, cokeImg.height*.15)) {
      clickedItem = 2;
    }
    if (checkCollision(mouseX, mouseY, 20, 20, heartP[0], heartP[1], heartImg.width*.08, heartImg.height*.08)) {
      clickedItem = 3;
    }
    if (checkCollision(mouseX, mouseY, 20, 20, ammoP[0], ammoP[1], ammoImg.width*.15, ammoImg.height*.15)) {
      clickedItem = 4;
    }
  }
  else if (selected && level == 2 && millis() - purchasedTime > 1000) {
    level = 3;
    restartLevel();
  }
  else if (level == 3 && level3Won) {
    level = 4;
    player.bullets = [{x:-100, y:player.y}];
    player.shoot = function() {
      if (this.bullets[0].x < 0) {
        this.bullets[0] = {x: playerSprite.x+82, y:this.y+60};
      }
      playerSprite.setAnimation('shoot');
      playerSprite.nextImage();
    };
    player.displayBullets = function() {
      fill(0);
      stroke(0);
      ellipse(this.bullets[0].x, this.bullets[0].y, 8);
    };
    player.updateBullets = function() {
      if (this.bullets[0].x > 0 && this.bullets[0].x < width) {
        this.bullets[0].x += 10;
      }
      else if (this.bullets[0].x > width) {
        this.bullets[0].x = -100;
      }
    }

  }
}
function Menu() {
  imageMode(CENTER);
  image(paper, width/2, height/2, 500 ,500);
  imageMode(CORNER);
  textSize(30);
  push();
  translate(0, 50);
  var w = textWidth("W to jump");
  text('W to jump', (width-w)/2, 200);
  w = textWidth("D to move foward");
  text('D to move foward', (width-w)/2,300);
  w = textWidth("A to move backwards");
  text('A to move backwards',(width-w)/2,250);
  w = textWidth("SPACE to shoot");
  text('SPACE to shoot', (width-w)/2, 350);
  pop();

  textSize(100);
  w = textWidth("Tutorial");
  text('Tutorial', (width-w)/2,180)

  player.display();

}


function Cactus() {
  this.x = random(100,2900);
  this.y = groundLevel-150;
  this.display = function () {
    push();
    translate(-player.x, 0);
    image(cactusImg, this.x, this.y,300,300);
    pop();
  }
}
function cactusWalk() {
  for (var i = 0; i < cacti.length; i++) {
    cacti[i].display();
  }
}
function tileGround() {
  for (var i = -groundX; i<= width; i+= poopplat.width) {
    image(poopplat,i,550);
  }
}
function endlevel() {
  if (debugging && numZombiekill > 3 || (!debugging && numZombiekill > 20)) {
    image(paper, (width-500)/2, 100, 500, 500);
    textSize(50);
    var w = textWidth("Level 1 Complete");
    text("Level 1 Complete",(width-w)/2,250);
    textSize(30);
    w = textWidth("Click to Advance to Level 2");
    text("Click to Advance to Level 2", (width-w)/2,400);
    level1Won = true;
  }
}
function Tumble() {
  this.x = random(100,900);
  this.y = groundLevel+75;
  this.display = function () {
    push();
    translate(-player.x, 0);
    image(tumbleIMG, this.x, this.y,50,50);
    pop();
  }
}
function tumbleWalk() {
  for (var i = 0; i < cacti.length; i++) {
    tumble[i].display();
  }
}

function healthbarDisplay(x,y){
  player.health;
  fill(255,0,0);
  rect(x+10,y+40, 125/100*player.health, 15);
  image(healthbar, x, y, 150,110);
}
function gameOverr(){
  image(gameOverImg,0,0,width,height);
}
function winn(){
  image(win, 0,0,width,height);
}

function restartLevel() {
  for (var i = 0; i < 150; i++) {
    rocks[i] = new rock(i);
  }
  cart.reset();
  gameOver = false;
  levelStartedTime = millis();
}

function keyPressed() {
  if (level == 2) {
    if (keyCode == RIGHT_ARROW) {
      if(selected) {
        level = 3
        console.log(level);
      }
    }
  }
  else if (level == 3) {
    if (keyCode == RIGHT_ARROW && cart.numTrack <2) {
      cart.numTrack++ ;
    }
    if (keyCode == LEFT_ARROW && cart.numTrack >0) {
      cart.numTrack--;
    }
  }
}


function rock(num) {
  var spacing = width/4;
  this.x = random([spacing, 2*spacing, 3*spacing]);
  this.y = -num * rockImg.height*2 -600;
  this.display = function () {
    image(rockImg, this.x, this.y);
  }
  this.move = function () {
    this.y+=5
  }
  this.collision = function () {
    if (checkCollision (cart.x, cart.y, cart.w, cart.h, this.x, this.y, rockImg.width, rockImg.height-80)) {
      gameOver = true;
    }
  }
}
