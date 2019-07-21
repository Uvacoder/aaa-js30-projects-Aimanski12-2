let pamodoro = true
let initialTime = 25
let breakTime = 5
let intervals, pamTime, brkTime, sesMarker, brkMarker, pamMin, pamSec, brkMin, brkSec;
let au = false
let cssMarker = 100
let sessionMarker = 0;
let breakMarker = 0

let initTime = initialTime
let breaktimer = breakTime

play.addEventListener('click', playTimer)
audio.addEventListener('click', playAudio)
pause.addEventListener('click', pauseTimer)
stop.addEventListener('click', stopTimer)

// play when playTimer is clicked
function playTimer(){

  // add and remove the classlist
  this.classList.add('clicked')
  pause.classList.remove('clicked')
  stop.classList.remove('clicked')

  // remove event listeners when pamodoro starts
  removeWhenStart()

  // initiate pamodoro timer
  pamTime = initTime * 60
  if(brkTime){
    brkTime = breaktimer
  }

  // breaktimer
  brkTime = breaktimer * 60
  sesMarker = parseFloat((cssMarker / (initialTime*60)).toFixed(2))
  brkMarker = parseFloat((cssMarker / (breakTime*60)).toFixed(2))
  
  // call intervals every one second
  intervals = setInterval(()=>{
    if(au) tik.play()
    
    if(!pamodoro){
      title.innerHTML = 'break period'
      regBreakTime()
    } else {
      title.innerHTML = 'training session'
      regTime()
    }
  }, 1000 )
  
  // add class for the animation
  timer.classList.add('begin')
  
  play.removeEventListener('click', playTimer)
  pause.addEventListener('click', pauseTimer)
}

// pamodoro timer countdown
function regTime(){
  
  // convert pamtime to minutes
  let min = Math.floor(pamTime / 60)
  // convert pamtime to seconds
  let sec = pamTime - min * 60

  // decrement pamtime
  pamTime--
  // console.log(sessionMarker)
  
  // set a timer for the display
  pamMin = min < 10 ? '0' + min : min
  pamSec = sec < 10 ? '0' + sec : sec
  timer.innerHTML = pamMin+ ':' + pamSec
  marker.style.background = `conic-gradient(#ff5722 ${sessionMarker}% , teal ${sessionMarker}% 100%)`

  // check if the pamodoro timer has ended
  if (pamTime < 0) {
    pamodoro = false
    brkTime = breakTime * 60
    sessionMarker = 0
    breakMarker = 0
  }

  // play audio
  if(au) if(pamTime == 4) finish.play()
  sessionMarker += sesMarker
}

// breaktime timer countdown
function regBreakTime(){

  // convert brktime to minutes
  let min = Math.floor(brkTime / 60)
  let sec = brkTime - min * 60

  // decrement breaktime
  brkTime--
  
  // diplay the timer in the html
  brkMin = min < 10 ? '0' + min : min
  brkSec = sec < 10 ? '0' + sec : sec
  timer.innerHTML = brkMin + ':' + brkSec
  marker.style.background = `conic-gradient(orange ${breakMarker}% , peru ${breakMarker}% 100%)`
  
  // check if the brktime has ended
  if(brkTime < 0){
    pamodoro = true
    breakMarker = 0
    sessionMarker = 0
    pamTime = initialTime * 60
  }
  
  // play the audio
  if(au){
    if(brkTime == 3) go.play()
  }
  breakMarker += brkMarker
}

// pause the timer
function pauseTimer(){
  // clear the intervals
  clearInterval(intervals)

  // add css
  this.classList.add('clicked')
  play.classList.remove('clicked')
  stop.classList.remove('clicked')
  
  
  // assign timer value to the remaining time
  initTime = pamTime/60
  breaktimer = brkTime / 60
  
  // add play event listener
  play.addEventListener('click', playTimer)
  
  
}

// stop/reset the timer
function stopTimer() {

  // remove the css
  this.classList.add('clicked')
  play.classList.remove('clicked')
  pause.classList.remove('clicked')

  // add event listeners on the buttons
  addClickable()
  
  // clear all the time intervals
  clearInterval(intervals)
  initTime = initialTime
  play.addEventListener('click', playTimer)
  pause.removeEventListener('click', pauseTimer)
  timer.classList.remove('begin')

  breakMarker = 0
  sessionMarker = 0

  pamodoro = true

  marker.style.background = '#f7e4c8'

  if(initialTime < 10){
    title.innerHTML = 'training session'
    timer.innerHTML = `0${initialTime}:00`
  } else {
    timer.innerHTML = `${initialTime}:00`
  }
}

// mute the audio
function playAudio(){
  au = !au
  if(au) {
    audio.innerHTML = `<i class="fa fa-volume-up fa-2x"></i>`
  } else{
    audio.innerHTML = `<i class="fa fa-volume-off fa-2x"></i>`

  }
}