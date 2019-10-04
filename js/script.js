
// function runs when game start
const startGame = () => {
  let start = document.querySelector('.btn')
  let particles = document.getElementById('part')
  let color = document.getElementById('color')
  
  // click event listener
  start.addEventListener('click', function(){
    let part; 
    particles.value <= 50 ? part = 50 : 
    particles.value >= 1000 ? part = 1000 : part = particles.value
    const container = document.querySelector('.container')    
    container.classList.add('fadeOut')
  
    // give alittle effect after click event
    setTimeout(()=>{
      container.style.display = 'none'
      canvas(part, color.value)      
    }, 300)
  })
}

// canvas function is called
const canvas = (parts, colors) => {

  const body = document.querySelector('body')
  const canvas = document.createElement('canvas')
  // create a new canvas element
  body.appendChild(canvas)
  let n = Math.floor(Math.random() * 8)
  
  // assign the canvas size the same as the screen size.
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // assign event listener when the 
  window.addEventListener('resize', function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
  
  c = canvas.getContext('2d')
  
  // create a new circle according to the numbers passed by user
  let circleArr = []
  for (let i=0; i< parts; i++){
    let radius = Math.random() * 30
    let x = Math.random() * (innerWidth - radius * 2) + radius
    let y = Math.random() * (innerHeight - radius *2) + radius
    let vx = (Math.random() - 0.5) * 5
    let vy = (Math.random() - 0.5) * 5
    let color = changeColor(colors)
    circleArr.push(new Circle(x, y, vx, vy, radius, color))
  }
  
  // animate function
  function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth, innerHeight)
    for(let i=0; i<circleArr.length; i++){
      circleArr[i].draw()
      circleArr[i].update()
    }
  }
  
  // change color function when the circle bounds
  function changeColor(colors){
    if (colors == 'random'){
      let r, g, b;
      r = Math.floor(Math.random() * 255)
      g = Math.floor(Math.random() * 255)
      b = Math.floor(Math.random() * 255)
      return `rgb(${r},${g},${b})`
    } else if (colors == 'single') {
      let samples = ['red', 'green', 'pink', 'yellow', 'blue', 'orange', 'brown', 'violet']
      return samples[n]
    } else if(colors == 'palettes'){
      return `#${palette[8][Math.floor(Math.random() * 3)]}`
    } else if(colors === 'tricolors'){
      return `#${tri[n][Math.floor(Math.random() * 3)]}`
    }
  }

  // Circle object
  function Circle(x, y, vx, vy, radius, color){
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.radius = radius
    this.color = color
    
    this.draw = function(){ 
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
      c.stroke()
    }

    // updates the circle when it bounces
    this.update = function(){
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.color = changeColor(colors)
        this.vx = -this.vx
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.color = changeColor(colors)
        this.vy = -this.vy
      }
      this.x += this.vx
      this.y += this.vy
    }
  }
  
  animate()
}

// tri color samples
let tri = [[
  'ceeae6', '291b4f', 'fcd42b'
],[
  'b3b3b3', '1f1a4f', 'c82027'
],[
  '0f2043', '79cedc', 'd5a458'
],[
  '561210', 'ef9121', 'f6eb1f'
],[
  '3a1412', 'ed2d7b', 'be9275'
],[
  '3f2b2c', 'ec3047', 'aca287'
],[
  '060809', '434343', 'ee682a'
],[
  '704f50', 'f0a979', 'f9f0af'
],[
  '590a30', '90aa3c', 'ef6125'
]]

// color palette samples
let palette = [[
  'FCDFDF', 'AF4E4E', '8D0202'
  ], [
    'FFE6B5', 'BD923C', '936303'
  ], [
    'E7FECE', '8CCA49', '55A102'
  ], [
    'CBFADA', '41C66C', '02A135'
  ], [
    'CEFAFC', '38B8BE', '018F96'
  ], [
    'BDD1FD', '3760BB', '023097'
  ], [
    '023097', '643AB2', '31028A'
  ], [
    'FCCBF0', 'B83F9A', '8C0269'
  ],[
    'F9CBFE', 'AC4CB8', '790287'
  ]]


startGame()