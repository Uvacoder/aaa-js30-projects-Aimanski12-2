let s, r, g, b, food
let scl = 25
let randCol = []

// crash audio
let crash = new Audio();
crash.src = './libs/audio/crash.mp3'
crash.volume = 0.7

function setup(e) {

  // create a new canvas
  createCanvas(800, 800)

  // set margin for the canvas
  canvas.style.marginLeft = '-400px'
  canvas.style.marginTop = '-400px'

  // create a new snake
  s = new Snake();

  // speed of the snake
  frameRate(12)

  // create random food around the canvas 
  // food = createVector(random(width), random(height))
  randomLocation()
}


// generate random number for the food color
function rand() {
  const num = 255
  return (Math.floor(Math.random() * num))
}


function randomLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl)

  // create vector for the food
  food = createVector(floor(random(cols)), floor(random(rows)))
  food.mult(scl)

  r = rand()
  g = rand()
  b = rand()
  // random food color
  randCol.push({
    r,
    g,
    b
  })
}

// global p5 function
function draw() {

  // create background color for the food
  background('rgb(110,110,110)')

  // generate a new food when food is eaten
  if (s.eat(food)) {
    randomLocation()
  }


  // update snake vectors
  s.update();
  s.show();

  // generate random food
  fill(r, g, b)
  rect(food.x, food.y, scl, scl)


  // check if the snake is dead
  s.death()
}

// snake controls
function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1)
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1)
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0)
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0)
  }
}


function stopGame(tail) {
  crash.play()
  frameRate(0.00000000000000)
  fill(255, 255, 255)
  textSize(25)
  text('Game over!', width / 2 - 65, height / 2 - 10)
  text('Your score is ' + tail * 10 + '!', width / 2 - 90, height / 2 + 20)
}


