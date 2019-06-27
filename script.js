//player
let ship_width = 34;
let ship_height = 34;
let playerImg = new Image();
let hits = 0;
let health = 20;

// create a spaceship for the user
let spaceship = './libs/img/ship.png';
playerImg.src = spaceship;

// background audio
let background = new Audio();
background.src = './libs/audio/background.mp3'
background.volume = 0.5

// shot audio
let shot = new Audio();
shot.src = './libs/audio/boom.mp3'
shot.volume = 1
shot.playbackRate = 1.5

// collision audio
let colAudio = new Audio()
colAudio.src = './libs/audio/collide.mp3'
colAudio.playbackRate = 2

// add life audio
let powerAudio = new Audio()
powerAudio.src = './libs/audio/powerup.mp3'
powerAudio.playbackRate = 2



// initiate app when load
window.onload = function(){

let getCanvass = document.querySelector("canvas");
let canvas = document.querySelector("canvas");
getCanvass.width = innerWidth;
getCanvass.height = innerHeight;
this_canvass = getCanvass.getContext("2d");

let b = document.querySelector("canvas");
b.width = innerWidth;
b.height = innerHeight;
d = b.getContext("2d");


// handle mouse events for controls
function startGame(){
mouse = {
  x: innerWidth/2,
  y: innerHeight-33
};
touch = {
  x: innerWidth/2,
  y: innerHeight-33
};
  
//event listener for mouse object
canvas.addEventListener("mousemove", function(event){
mouse.x = event.clientX;
mouse.y = event.clientY;
});

//eventListener for touch object
canvas.addEventListener("touchmove", function(event){

  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let touch = event.changedTouches[0];
  let touchX = parseInt(touch.clientX);
  let touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
  event.preventDefault();
  mouse.x = touchX;
  mouse.y = touchY;
});

// play backgroung theme
background.play()

//bullet array
let _bullets = []; //array to hold n bullets
let bullet_width = 3;
let bullet_height = 3;
let bullet_speed = 5;

//enemy array
let _enemies = []; //array to hold n enemies
let enemy_width = 25;
let enemy_height = 25;

// generate random images for enemy
function randImg(){
  let img = ['enemy1', 'enemy2', 'enemy3', 'enemy4']
   return img[Math.floor(Math.random() * 4)]
}


//health array
let _healthkits = []; //array to hold n health kits
let healthkitImg = new Image();
healthkitImg.src = "./libs/img/blood.png"; 
let healthkit_width = 32;
let healthkit_height = 32;


// player data
function Player(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  
  // draw the player and the cursor
  this.draw = function(){
    this_canvass.beginPath();
    this_canvass.drawImage(playerImg, mouse.x-ship_width, mouse.y-ship_height); 
  };
  
  this.update = function(){
    this.draw();
  };
}


// bullets
function Bullet(x, y, width, height, speed){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;
 
  // draw the bullets
  this.draw = function(){
    d.beginPath();
    d.arc(this.x, this.y, this.width, 0.005, 0 * Math.PI);
    d.fill();
    d.stroke();
  };
  
  this.update = function(){
    this.y -= this.speed;
    this.draw();
  };
}


// enemy data
function Enemy(x, y, width, height, speed){
  var enemyImg1 = new Image();
  enemyImg1.src = `/libs/img/${randImg()}.png`
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;
  
  // draw the enemy
  this.draw = function(){
    this_canvass.beginPath();
    this_canvass.drawImage(enemyImg1, this.x, this.y);
  };
  
  this.update = function(){
    this.y += this.speed;
    this.draw();
  };
}



// life data  
function Healthkit(x, y, width, height, speed){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;
  
  // draw life image data
  this.draw = function(){
    this_canvass.beginPath();
    this_canvass.drawImage(healthkitImg, this.x, this.y);
  };
  
  this.update = function(){
    this.y += this.speed;
    this.draw();
  };
}
  

// draw Player
let __player = new Player(mouse.x, mouse.y, ship_width, ship_height);


// draw the enemy and add the data to the array
function drawEnemies(){
  // generate a random location for the enemy to appear
  for (let _ = 0; _<3; _++){  
    let x = Math.random()*(innerWidth-enemy_width);
    let y = -enemy_height; 
    let width = enemy_width;
    let height = enemy_height;
    let speed = Math.random()*2.5;
    let __enemy = new Enemy(x, y, width, height, speed);
    _enemies.push(__enemy); 
  }
}

//draw life addon
function drawHealthkits(){
  // draw the life and add the data to the array
  for (let _ = 0; _<1; _++){ 
    let x = Math.random()*(innerWidth-enemy_width);
    let y = -enemy_height; 
    let width = healthkit_width;
    let height = healthkit_height;
    let speed = Math.random()*2.6;
    let __healthkit = new Healthkit(x, y, width, height, speed);
    _healthkits.push(__healthkit); 
  }
};


// draw bullets
function fire(){ 
  for (let _ = 0; _<1; _++){
    let x = mouse.x-bullet_width/2;
    let y = mouse.y-ship_height;
    let __bullet = new Bullet(x, y, bullet_width, bullet_height, bullet_speed);
    _bullets.push(__bullet); 
    shot.play();
  }
}


// when user wants to use the click as another option for firing
// canvas.addEventListener("click", function(){
  // fire();
// });


// generate intervals for each data 
let enemyStart = setInterval(drawEnemies, 1000);
let healthStart = setInterval(drawHealthkits, 2000);
let fireStart = setInterval(fire, 75);
  

// check is objects are colliding
function collision(a,b){
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

// create initial text prop
this_canvass.fillStyle = "#054203";
this_canvass.font = "2.5em Gochi Hand";


// error handles
function stoperror() {
  return true;
}  
window.onerror = stoperror;
  
// reset the game when game over
function reset(){
  setTimeout(()=> {
    location.reload(true);
  }, 5000)
}

// loop for the game
function animate(){
  requestAnimationFrame(animate); 
  this_canvass.beginPath(); 
  this_canvass.clearRect(0,0,innerWidth,innerHeight);
  // display life text
  this_canvass.fillText("Life: " + health, 40, 55); //health
  // display hits text
  this_canvass.fillText("Hits: " + hits, innerWidth-150, 55); //score

  //update _player
  __player.update();

  // check if the healt is still more than 0
  if(health == 0){
    // reset the application
    reset()
    d.fillText("Game Over !", a.width/2-70, 85);
    clearInterval(enemyStart)
    clearInterval(healthStart)
    clearInterval(fireStart)
    background.pause()
    boom.pause()
    shot.pause()
  } else {


  // update bullets array
  for (let i=0; i < _bullets.length; i++){
    _bullets[i].update();
    if (_bullets[i].y < 0){
      _bullets.splice(i, 1);
    }
  }

  // update enemies
  for (let k=0; k < _enemies.length; k++){
    _enemies[k].update();
    // removet an object that hits belows the canvas
    if(_enemies[k].y > innerHeight){
      _enemies.splice(k, 1);
      health -= 1;
    }
  }
  
  // loop over both enemies and bullets to detect collisions
  for(let j = _enemies.length-1; j >= 0; j--){
    for(let l = _bullets.length-1; l >= 0; l--){
      if(collision(_enemies[j], _bullets[l])){
        _enemies.splice(j, 1);
        _bullets.splice(l, 1);
        hits++;
        colAudio.play()
      }
    }
  }
  
  //draw healthkits
  for(let h=0; h < _healthkits.length; h++){
    _healthkits[h].update();
  }
  

  //loop over both healthkits and bullets to detect collisions
  for(let hh = _healthkits.length-1; hh >= 0; hh--){
    for(let hhh = _bullets.length-1; hhh >= 0; hhh--){
      if(collision(_healthkits[hh], _bullets[hhh])){
        _healthkits.splice(hh, 1);
        _bullets.splice(hhh, 1);
        health += 1;
        powerAudio.play()
      }
    }
  } 

}

}


// run the animation
animate()
}

// start the game
startGame();

}; //end of onload func






