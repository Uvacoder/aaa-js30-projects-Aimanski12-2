// background audio
let eat = new Audio();
eat.src = './libs/audio/eat.mp3'
eat.volume = 0.7

// snake constructor function
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = 1;
  this.ySpeed = 0;
  this.total = 1;
  this.tail = []
  this.vect = []
  this.dead = false

  // check if snaked crashed to the wall or
  // eats itself
  this.death = function (i) {
    if (i === 'crashed') {
      stopGame(this.tail.length)
    }

    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y)

      // if the snake hits the wall or crashed,
      // game is over.
      if (d < 1) {
        stopGame(this.tail.length)
      }
    }
  }

  // we can immediately call the update function
  this.update = function () {
    if (!this.dead) {
      if (this.total === this.tail.length) {
        for (var i = 0; i < this.total - 1; i++) {
          this.tail[i] = this.tail[i + 1]
        }
      }

      // this allow the current snake body to move on its
      // previous location of the body
      this.tail[this.total - 1] = createVector(this.x, this.y)

      // creates the movement of the snake
      this.x = this.x + this.xSpeed * scl;
      this.y = this.y + this.ySpeed * scl;

      // allows the snake NOT to go outside the canvas
      if (this.x === 800 || this.y === 800 || this.x < 0 || this.y < 0) {
        this.y = constrain(this.y, 0, height - scl)
        this.x = constrain(this.x, 0, width - scl)
        this.death('crashed')
      }
    }
  }

  // we can immediately call the show function
  this.show = function () {
    if (!this.dead) {

      fill(255)
      for (var i = 0; i < this.tail.length; i++) {
        for (var x = 0; x < randCol.length; x++) {
          if (i === x) {
            fill(randCol[x].r, randCol[x].g, randCol[x].b)
            rect(this.tail[i].x, this.tail[i].y, scl, scl)
          }
        }
      }

      fill(255)
      rect(this.x, this.y, scl, scl)
    }
  }

  // direct the snake where to go when the key is pressed
  this.dir = function (x, y) {
    if (!this.dead) {
      this.xSpeed = x;
      this.ySpeed = y
    }
  }

  // increase the snake body when food is eaten
  this.eat = function (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y)
    if (d < 1) {
      eat.play()
      this.total++
      return true
    } else {
      return false
    }
  }

}