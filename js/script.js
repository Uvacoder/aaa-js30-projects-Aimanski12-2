

const canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

c = canvas.getContext('2d')

let circleArr = []
for (let i = 0; i < 1800; i++) {
  let radius = Math.random() * 5 + 1

  let x = Math.random() * (innerWidth - radius * 2) + radius
  let y = Math.random() * (innerHeight - radius * 2) + radius

  let vx = (Math.random() - 0.5) * 2
  let vy = (Math.random() - 0.5) * 2
  let color = changeColor()
  circleArr.push(new Circle(x, y, vx, vy, radius, color))
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)
  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].draw()
    circleArr[i].update()
  }
}

function rand() {
  var n = Math.floor(Math.random() * 255)
  return n
}

function changeColor(){
  return { 
    r: rand(),
    g: rand(),
    b: rand()
  }
}

let mouse = {
  x: undefined,
  y: undefined
}

window.addEventListener('mousemove', function (e) {
  mouse.x = e.x
  mouse.y = e.y
})

window.addEventListener('resize', function(){
  canvas.width = innerWidth
  canvas.height = this.innerHeight
})

let maxRadius = 40
let minRadius = 15

function Circle(x, y, vx, vy, radius, color) {
  this.x = x
  this.y = y
  this.vx = vx
  this.vy = vy
  this.radius = radius
  this.minRadius = radius
  this.color = color

  this.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`
    c.fill()
    c.stroke()
  }
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
      this.color = changeColor()
      this.vx = -this.vx
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.color = changeColor()
      this.vy = -this.vy
    }

    // interactivity
    if(mouse.x - this.x < 30 && mouse.x -this.x > -30 && mouse.y - this.y < 30 && mouse.y - this.y > -30){
      if(this.radius < maxRadius){
        this.radius += 2
      }
    } else if(this.radius > this.minRadius){
      this.radius -= 0.2
    }

    this.x += this.vx
    this.y += this.vy
  }
}

animate()