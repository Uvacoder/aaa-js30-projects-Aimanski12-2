
const start = () => {

  let canvas = document.querySelector('canvas')
  c = canvas.getContext('2d')
  let friction = 0.89

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  let location = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
  
  window.addEventListener('mousemove', function(e){
    location.x = e.clientX
    location.y = e.clientY
  })


  function Ball(x, y, dx, dy, radius, color, dropPoint){
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
    this.dropPoint = dropPoint
    this.draw = function(){
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`
      c.fill()
      c.stroke()
      c.closePath()
    }

    this.drop = function(){
      if(this.y + this.radius + this.dy > canvas.height){
        this.dy = -this.dy * friction
      } else { this.dy += 2 }
      
      if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx
      }
      
      this.dropPoint.push(this.y + this.radius + this.dy)

      if(this.dropPoint.length == 3){
        if (Math.floor(this.dropPoint[0]) == Math.floor(this.dropPoint[1]) &&     Math.floor(this.dropPoint[1]) == Math.floor(dropPoint[2])){
          if(this.x - this.radius < canvas.width / 2 + 100 && this.x + this.radius > canvas.width / 2 - 100){
            this.dy += 50
          }
        }
        this.dropPoint.shift()
      }

      this.x += this.dx
      this.y += this.dy
      this.draw()
    }
  }
  
  let ballsArray = []
  window.addEventListener('click', function(e){
    let ball = new Ball(location.x, location.y, rand(2), rand(2), rand(25), colors(250), [])
    ballsArray.push(ball)
  })  
  
  const rand = (n) => {
    return Math.floor(Math.random() * n) + 5
  }
  
  const colors = (n) => {
    return {
      r: rand(n),
      g: rand(n),
      b: rand(n)
    }
  }

  function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    for (let x = 0; x < ballsArray.length; x++) {
      ballsArray[x].drop()
    }
  }

  animate()
}

start()

