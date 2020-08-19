const introaudio = document.querySelector('audio[data-key="intro"]');
const movaudio = document.querySelector('audio[data-key="move"]');


let time = 0
let moves = 0
let solved = false
let gameLoaded = true

// start the game
const startGame = () => {

  let arr = [];
  let newArr = []

  // generate an array and then regroup the array 5 x 5
  arr = regroupArray(generateArray(arr))

  // generate the array, then shuffle, then regroup to 5 x 5
  newArr = regroupArray(shuffleArrays(generateArray(newArr)))

  // start counting the time
  timer()

  // render all element to the screen
  render(arr, newArr)
}


// create an array of 25 numbers
const generateArray = (arr) => {
  for (var x=0; x <= 25; x++){
    if(x !== 0){
      arr.push(x)  
    }
    
  }
  return arr
}

// shuffle the arrays
const shuffleArrays = (arr) => {
  arr.sort(() => Math.random() - 0.5);
  return arr
}

// regroup the arrays into 5 x 5
const regroupArray = (arr) => {
  let newArr = []
  for (var x=0; x<5; x++){
    newArr.push(arr.splice(0, 5))
  }
  return newArr

}


// render the array to the puzzle when called
const render = (original, btnArr) => {
  const boxContainer = document.querySelector('.boxContainer')
  
  // create a brand new div element
  const newDiv = document.createElement('div')
    newDiv.className = 'boxContainer'
  
  // loop through the array to generate btns
  for(var x=0; x < btnArr.length; x++){
    for (var y=0; y < btnArr[x].length; y++) {

      // create a new button element
      const btn = document.createElement('button')
        btn.setAttribute('data-x', x)
        btn.setAttribute('data-y', y)
  
        btn.addEventListener('click', btnListener)
  
        btn.textContent = btnArr[x][y] === 25 ? '' : btnArr[x][y]
        newDiv.appendChild(btn)
    }
  }

  function btnListener() {
    let x = n(this.dataset.x)
    let y = n(this.dataset.y)
    btnIsClicked(original, btnArr, x, y)
  }

  // display the new elements to the screen
  boxContainer.replaceWith(newDiv)
  
}

// timer function
const timer = () =>{
  const display = document.querySelector('#time')
  
  let counter = () => {
    if(solved){
      clearInterval(counter)
    } else {
      if(solved) clearInterval(counter)
      time++
      // conver time to seconds
      let sec = time % 60 < 10 ? '0' + time % 60 : time % 60
      
      // convert time to minutes
      let min = Math.floor(time / 60)
      
      // display time
      display.textContent = `Time:  ${min}:${sec}`
    }
  }

  if (!gameLoaded) {
    time = 0
  } else if(solved){
    clearInterval(counter)
  } else if(gameLoaded){
    setInterval(counter, 1000)

  }

}


// convert string to number
const n = (x) => {
  return Number(x)
}

const btnIsClicked = (original, btnArr, x, y) => {

  // check the value of the top box
  const top = () =>{
    let t = []
    if(x === 0) return null
    t.push(x - 1, y)
    return t
  }
  
  // check the value of the bottom box
  const right = () => {
    let r = []
    if (y === 4) return null
    r.push(x, y + 1)
    return r
  }
  
  // check the value of the bottom box
  const bottom = () => {
    let b = []
    if (x === 4) return null
    b.push(x + 1, y)
    return b
  }
  
  // check the value of the left box
  const left = () => {
    let l = []
    if (y === 0) return null
    l.push(x, y - 1)
    return l
  }
  
  // collect all the boxes and check if on is null
  let sideBtnValue = [
    top(),
    right(),
    bottom(),
    left()
  ].filter(btn => btn !== null)

  // swap the boxes to one of the empty box
  swapBtn(original, sideBtnValue, btnArr, x, y)

}


// swap the btn value if one is the same
function swapBtn(original, sideBtnVal, btnArr, x, y){

  // loop through the sideBtnValue
  for(var n=0; n<sideBtnVal.length; n++)  {
    
    // evaluate if on of them is 25
    if (btnArr[sideBtnVal[n][0]][sideBtnVal[n][1]] === 25) {

      // increment move counter
      incrementMoveCounter()
      
      // store the clicked box value to a variable
      let tempArr = btnArr[x][y]

      // swap the value
      btnArr[x][y] = btnArr[sideBtnVal[n][0]][sideBtnVal[n][1]]

      // swap the value
      btnArr[sideBtnVal[n][0]][sideBtnVal[n][1]] = tempArr

      render(original, btnArr)
      movaudio.play()

      evaluateIfTheSame(original, btnArr)
    }
  }

}

// evaluate if one of the box is zero.
const evaluateIfTheSame = (orig, btn) => {

  // this variable is an increment place to check how many boxes are correct
  let right = 0
  // loop through the array and compare if they have the same value
  for(var x=0; x < orig.length; x++){
    for (var y = 0; y < orig[x].length; y++) {
      if(orig[x][y] === btn[x][y]){
        right++
      }
    }
  }

  //  if all are correct, end the game
  if(right === 25) {
    solved = true
    gameLoaded = true
    play.textContent = 'Play'
    play.style.background = '#524646'
    play.addEventListener('click', playGame)
    mes.textContent = 'You Win!'
    
  }
}




// create move counter

const move = document.querySelector('#move')
const incrementMoveCounter = () => {

  // increment moves
  if(solved === true){
    move.innerHTML = `Moves: ${moves}`  
  } else {
    moves++
    // render text to the screen
    move.innerHTML = `Moves: ${moves}`
  }
}


const play = document.querySelector('.play')
const mes = document.querySelector('.mes')
const intro = document.querySelector('.intro')
const cont = document.querySelector('.intro button')
const board = document.querySelector('.board')


window.addEventListener('load', () => {
  intro.classList.add('show')
  // mes.textContent = 'Arange the numbers according to its order.'
  
})

cont.addEventListener('click', continuePlay)

function continuePlay() {
  introaudio.play()
  intro.classList.remove('show')
  setTimeout(()=>{
    intro.style.display = 'none'
    board.style.display = 'block'
    setTimeout(()=>{
      mes.textContent = 'Arange the numbers according to its order.'
      board.classList.add('show')
    }, 100)
  },300)
}



play.addEventListener('click', playGame)

function playGame(){

  play.style.background = 'teal'
  play.textContent = 'Reset'
  mes.textContent = 'Arange the numbers according to its order.'
  move.textContent = `Moves: 0`

  if(gameLoaded){
    startGame()
    moves = 0
    time = 0
    solved = false
    gameLoaded = false
    
  } else {
    startGame()
  }

}



