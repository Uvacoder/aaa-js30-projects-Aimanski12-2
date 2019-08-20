

class Video {

  constructor(){
    this.renderType = 'normal'
    this.colors = [128, 128, 128]
  }
  
  static ready(){
    return new Video().stream()
  }

  // stream video
  stream(){
    const video = document.querySelector('.video')
    // navigator media device detector
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    // returns a promise
    .then(localMediaStream => {
      // assign localMedia stream as a source video
      video.srcObject = localMediaStream
      video.play()
    })
    .catch(err => {
      // if camera is not setup, JS will render a default image
      // of no camera image
      console.error('Error', err)
    })
    this.output(video)
  }


  // render which output to show
  output(video){
    const btns = document.querySelectorAll('.btn')
    const inputs = document.querySelectorAll('.input')
    const photo = new Photo()

    // loop through each btn
    btns.forEach(btn => {
      btn.addEventListener('click', ()=>{
        this.renderType = btn.classList[1]
        this.render(video, this.renderType)
      })
    })

    // loop through each input range
    inputs.forEach((input, i) => { 
      input.addEventListener('input', () => {
        this.renderType = 'custom'
        this.colors[i] = input.value
      })
    })

    // call the output to render the image
    this.render(video, photo)

  }

  // output the desired image style
  render(video, photo) {
    const canvas = document.querySelector('.canvas')
    const ctx = canvas.getContext('2d')
    const shot = document.querySelector('.takePhoto')
    
    // create interval to render the selected image
    setInterval(()=>{
      ctx.drawImage(video, 0, 0, 640, 480)
      let pixels = ctx.getImageData(0, 0, 640, 480)
      // render normal image
      if(this.renderType == 'normal') pixels = normal(pixels) 
      // render sephia image
      if(this.renderType == 'sephia') pixels = convertToSephia(pixels)
      // render negative image
      if(this.renderType == 'negative') pixels = negative(pixels)
      // render black and white
      if(this.renderType == 'blackNwhite') pixels = convertToBlack(pixels)
      // render custom
      if(this.renderType == 'custom') pixels = custom(pixels, this.colors)

      ctx.putImageData(pixels, 0, 0)
    }, 16)

    shot.addEventListener('click', ()=> {
      photo.newImage(canvas.toDataURL('image/jpeg'))
    })

  }


}


class Photo {
  constructor(){
    this.photos = []
  }
  // creates a new image
  newImage(image){
    const images = document.querySelectorAll('.image')
    const snap = document.querySelector('.snap')
    // play audio when shot is clicked
    snap.currentTime = 0
    snap.play()

    // add the image base64 data to the photos array
    this.photos.unshift(image)
    // render image
    this.photos.forEach((img, i) =>{
      images[i].innerHTML = `
        <a href=${img} download>
          <img src="${img}" alt="image ${i+1}">
        </a>
      `
    })
  }
}


// normal image rendering
const normal = (pixels) => {
  return pixels
}

const convertToBlack = (pixels) => {
  // loop through the array of pixel data
  // and convert each pixel value to black and white
  for (let x = 0; x < pixels.data.length; x = x + 4) {
    let tr = pixels.data[x + 0] * .3 +
    pixels.data[x + 1] * .49 +
    pixels.data[x + 2] * .11
    
    pixels.data[x + 0] = tr
    pixels.data[x + 1] = tr
    pixels.data[x + 2] = tr
  }
  return pixels
  
}

// convert image to sephia
const convertToSephia = (pixels) => {
  // loop through the pixels and convert each
  // pixels to sephia color
  for (let x = 0; x < pixels.data.length; x = x + 4) {
    let tr = 0.393 * (pixels.data[x + 0]) +
    0.769 * (pixels.data[x + 1]) +
    0.189 * (pixels.data[x + 2])
    
    let tg = 0.349 * (pixels.data[x + 0]) +
    0.686 * (pixels.data[x + 1]) +
    0.168 * (pixels.data[x + 2])
    
    let tb = 0.272 * (pixels.data[x + 0]) +
    0.534 * (pixels.data[x + 1]) +
    0.131 * (pixels.data[x + 2])
    
    // assign the value to each pixel color
    pixels.data[x + 0] = tr
    pixels.data[x + 1] = tg
    pixels.data[x + 2] = tb
    
  }
  return pixels
  
}

const negative = (pixels) => {
  // convert each pixels to appear black and white
  for (let x = 0; x < pixels.data.length; x = x + 4) {
    pixels.data[x + 0] = 255 - pixels.data[x + 0]
    pixels.data[x + 1] = 255 - pixels.data[x + 1]
    pixels.data[x + 2] = 255 - pixels.data[x + 2]
  }
  return pixels
  
}

const custom = (pixels, colors) => {
  // convert pixels to its custom color
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + colors[0] / 2
    pixels.data[i + 1] = pixels.data[i + 1] + colors[1] / 2
    pixels.data[i + 2] = pixels.data[i + 2] + colors[2] / 2
  }
  return pixels
}
  
// start the app
const start = Video.ready()
  
  
  
  