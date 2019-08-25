class Video {

  stream(){
    const video = document.querySelector('.video')

    // access the users camera
    navigator.mediaDevices.getUserMedia({video: true})
    // return a promise local media
    .then(localMediaStream => {
      // assigns the local media to the stream
      video.srcObject = localMediaStream
      video.play()
    })
    // log any errors
    .catch(err => {
      console.log('Error', err)
    })
    this.outPut(video)
  }

  outPut(video){
    const canvas = document.querySelector('.live')
    const ctx = canvas.getContext('2d')

    // sets and interval for the canvas to display video
    setInterval(()=>{
      ctx.drawImage(video, 0, 0, 640, 480)
      ctx.font = "30px acme"
      ctx.fillStyle = 'rgb(55,55,55)'
      ctx.fillText('LIVE', 520, 50)
    }, 15)
  }

}


class Speech {

  constructor(){
    this.isFinished = false
    this.end = false
  }

  speech(){

    // call the video for streaming
    new Video().stream()
    
    // opens the interface for speech recognition
    window.SpeechRecognition = window.SpeechRecognition || 
      window.webkitSpeechRecognition
    
    // assign new speech recognintion
    const recognition = new SpeechRecognition()
    // set the speech interim results to true
    recognition.interimResults = true
    // create a new element to output the speech text
    let p = document.createElement('p')
    p.classList.add('text')

    // append the element to the parent
    const subtitle = document.querySelector('.textArea')
    subtitle.appendChild(p)
    
    // add event listener after speech result is detected
    recognition.addEventListener('result', (e) => {
      
      // set constructor to false
      this.isFinished = false

      // pass transcript to a single text constant to output in the text
      const transcript = Array.from(e.results)
        .map(result => result[0])
          .map(result => result.transcript)
            .join('')


      // find all the child nodes so that we can delete the old text speech
      const nodes = subtitle.children
        p.textContent = transcript

      if(e.results[0].isFinal){
        this.isFinished = true
        p = document.createElement('p')
        p.classList.add('text')
        // if the node has more that two text, we can delete the first child
        nodes.length == 2 ? nodes[0].remove()  : null
        subtitle.appendChild(p)
        
        // delete all text after 4 seconds of no speech
        setTimeout(()=>{
          if(this.isFinished && this.end){
            nodes[0].remove()
          }
        }, 4000)
      }
      
    })
    // restarts the speech recognition when the speech ends
    recognition.addEventListener('end', recognition.start)
    // assigns the end constructor to false when false
    recognition.addEventListener('speechstart', () => this.end = false )
    // assigns the end constructor to true when end
    recognition.addEventListener('speechend', () => this.end = true )
    // starts the speech recognition
    recognition.start()
  }  

}  

const start = new Speech().speech()