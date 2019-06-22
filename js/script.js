// audio
const sword1 = document.querySelector('audio[data-key="sword1"]');
const sword2 = document.querySelector('audio[data-key="sword2"]');
const sword3 = document.querySelector('audio[data-key="sword3"]');
const background = document.querySelector('audio[data-key="background"]');

// target backgrounds
const target = ['dragon', 'gold', 'lumber'];

const body = document.querySelector('.body');
const mes = document.querySelector('.mes');
const err = document.querySelector('.errors');
const score = document.querySelector('.scores');
let audio = true;
let counter = 21;
let miss = 0;
let hit = 0;
let lastBox, randomNum;

// initiate the function when the document load
window.onload = init

function init(){
  for (let x = 0; x < 9; x++) {
    body.innerHTML += `
      <div class='box'>
         <div class='inside'></div>
      </div>`
  }
  mes.innerHTML = `<h5 class='message'>Start</h5>`
  mes.addEventListener('click', start)
}

// starts the game
function start(){
  mes.removeEventListener('click', start)
  showImage()
  timeCounter()
  counter === 0 ? background.stop() : background.play()
  sword3.play()
  for (let x = 0; x < body.childElementCount; x++) {
    body.children[x].addEventListener('click', evalBox)
  }
}

// evaluate if the box has the specified class to generate point or miss
function evalBox(){
  audio = !audio
  if (this.firstElementChild.classList.contains('dragon')){
    sword3.play()
    score.innerHTML = ++hit
    const scoreboard =document.querySelector('.scores')
    scoreboard.classList.add('scoreAnim')
    removeClass(scoreboard, 'scoreAnim')
    this.firstElementChild.classList.remove('dragon')
  } else {
    audio ? sword1.play() : sword2.play()
    const errorBoard = document.querySelector('.errors')
    errorBoard.classList.add('scoreAnim')
    removeClass(errorBoard, 'scoreAnim')
    err.innerHTML = ++miss
  }
}

// remove class after 300 milisec
function removeClass(element, classname){
  setTimeout(()=>{
    element.classList.remove(classname)
  }, 300)
}

// show image from a random box
function showImage(){
  const time = randomTime(200, 1000)
  const samp = randomBox()
  const randImage = Math.floor(Math.random() * 3)
  body.children[samp].firstElementChild.classList.add('target')
  if(randImage == 0){
    body.children[samp].firstElementChild.style.background = `url('../libs/img/${target[randImage]}.png') center no-repeat`
    body.children[samp].firstElementChild.classList.add('dragon')
  }
  body.children[samp].firstElementChild.style.background = `url('../libs/img/${target[randImage]}.png') center no-repeat`

  // create a random timed loop
  setTimeout(()=> {
    body.children[samp].firstElementChild.classList.remove('target', 'dragon')
    if(counter == 0){
      clearTimeout()
    } else {
      showImage()
    }
  }, 1000)
}

// random box selector
function randomBox(){
  const randBox = Math.floor(Math.random() * 9)
  if(randBox == lastBox)randomBox()
  lastBox = randBox;
  return lastBox
}

// random number selector
function randomTime(min, max){
  return Math.floor(Math.random() * (max-min) + min)
}

// timeCounter
function timeCounter(){
  setTimeout(() => {
    --counter
    mes.innerHTML = `
      <h5>Time left:</h5>
      <p class='timeCounter'>${counter}</p>
    `
    if (counter == 0) {
      for (let x = 0; x < body.childElementCount; x++) {
        body.children[x].removeEventListener('click', evalBox)
      }
      mes.innerHTML = "<h5 class='message'>Game Over!</h5>";
      mes.addEventListener('click', reset)

      clearTimeout()
    } else {
      timeCounter()
    }
  }, 1000)
}

// resets the app back to initial state
function reset(){
  window.location.reload(true)
}