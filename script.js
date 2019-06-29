const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d')
let width, height;
let isDrawing = false
let lastX = 0;
let lastY = 0;
let hue = 0

window.addEventListener('load', canvasSetter)
window.addEventListener('resize', canvasSetter)

function canvasSetter(){
  width = window.innerWidth * 0.75
  height = window.innerHeight * 0.7
  canvas.width = width;
  canvas.height = height

  let left = width / 2 * -1
  let top = height / 1.8 * -1
  canvas.style.marginLeft = left.toString() + 'px'
  canvas.style.marginTop = top.toString() + 'px'



  ctx.fillStyle = 'rgba(150,150,150, 0.6)';
  ctx.font = "3.2em sans serif";
  ctx.fillText(Math.floor(width) + ' x ' + Math.floor(height) , width/2 - 90, height/2 +10); //health
}

function draw(e) {
  ctx.strokeStyle = '#bada55'
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.lineWidth = 25

  if (!isDrawing) return // stops the function from running
  // console.log('asdfasdf')

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
  // ctx.lineWidth = hue

  ctx.beginPath()
  // start from
  ctx.moveTo(lastX, lastY)
  // go to
  ctx.lineTo(e.offsetX, e.offsetY)

  ctx.stroke()

  lastX = e.offsetX
  lastY = e.offsetY
  hue == 360 ? hue = 0 : hue++

}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true
  lastX = e.offsetX
  lastY = e.offsetY
})

canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => isDrawing = false)
canvas.addEventListener('mouseout', () => isDrawing = false)


function to_image() {
  document.getElementById("downloader").download = "image.png";
  document.getElementById("downloader").href = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}

function refresh(){
  location.reload(true)
}