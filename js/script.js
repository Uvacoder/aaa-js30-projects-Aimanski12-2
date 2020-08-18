let gameBoard = ['', '', '', '', '', '', '', '', '']
let myScore = 0
let aiScore = 0
let gameOver = false
const sign = document.querySelector('.sign')
const stamp = document.querySelector('audio[data-key="stamp"]');


const start = () => {
  const box = document.querySelector('.board')
  const reset = document.querySelector('.reset')

  // create nine boxes with empty text
  box.innerHTML = gameBoard.map((game, i) =>
    `<div class='a${i} box'>
      <div></div>
    </div>`
  ).join('')

  // add event listener to every box
  const boxChildren = document.querySelector('.board').children
  for (var x = 0; x < boxChildren.length; x++) {
    boxChildren[x].addEventListener('click', (e) => move(e, boxChildren))
  }

  // restarts the game
  reset.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', '']
    gameOver = false
    sign.style.display = 'none'
    start()
  })
}

const move = (e, box) => {
  const element = e.target
  const n = element.classList.value.split('')

  // dont allow any clicks to happen if game is over
  if (gameOver) return

  // do not allow the element to be clickable if clicked
  if (gameBoard[n[1]] !== '') return

  stamp.play()
  // mark the box when clicked
  markTheBoxMove(n[1], element.firstElementChild, box)
}

// function for marking the box
const markTheBoxMove = (i, element, box) => {
  let n = 2
  let m = setInterval(run, 200)

  // function for the interval
  function run() {
    if (n === 0) {
      clearInterval(m)
    } else if (n === 1) {
      n--
      let empty = gameBoard.map((g, i) => {
        if (g !== 'X' && g !== 'O') return i
      })

      // select the array that is empty and return that index
      empty = empty.filter(e => e !== undefined)
      let z = Math.floor(Math.random() * empty.length)

      // if there is still a box that is empty
      if (empty.length !== 0) {
        if (!gameOver) {
          gameBoard[empty[z]] = 'O'
          box[empty[z]].firstElementChild.classList.add('ai', 'click')
          box[empty[z]].firstElementChild.textContent = 'O'
          evalGame('O')
        }
      } else if (empty.length === 0 && gameOver == false) {
        // if the box is empty and the game is not yet over
        gameDraw()
      }

    } else {
      // expter the users move
      gameBoard[i] = 'X'
      element.classList.add('me', 'click')
      element.textContent = 'X'
      n--
      evalGame('X')
    }

  }
}

// evaluate if the game is over
const evalGame = (winner) => {
  const fail = document.querySelector('audio[data-key="fail"]');
  const win = document.querySelector('audio[data-key="win"]');
  let game = false
  // vertical
  if (evaluate(gameBoard[0], gameBoard[3], gameBoard[6], winner)) game = true
  if (evaluate(gameBoard[1], gameBoard[4], gameBoard[7], winner)) game = true
  if (evaluate(gameBoard[2], gameBoard[5], gameBoard[8], winner)) game = true
  // horizontal
  if (evaluate(gameBoard[0], gameBoard[1], gameBoard[2], winner)) game = true
  if (evaluate(gameBoard[3], gameBoard[4], gameBoard[5], winner)) game = true
  if (evaluate(gameBoard[6], gameBoard[7], gameBoard[8], winner)) game = true
  // diagonal
  if (evaluate(gameBoard[2], gameBoard[4], gameBoard[6], winner)) game = true
  if (evaluate(gameBoard[0], gameBoard[4], gameBoard[8], winner)) game = true

  // if there is one column that is match
  if (game) {
    const mine = document.querySelector('.myScore')
    const ai = document.querySelector('.aiScore')
    setTimeout(() => {
      if (winner === 'X') {
        myScore = myScore + 1
        sign.firstElementChild.textContent = 'You Win!'
        win.play()
        mine.textContent = myScore
      } else {
        aiScore = aiScore + 1
        ai.textContent = aiScore
        sign.firstElementChild.textContent = 'You Loose!'
        fail.play()
      }
      sign.style.display = 'block'
    }, 1000)
    gameOver = true
    return
  }
}

// game is draw
const gameDraw = () => {

  const fail = document.querySelector('audio[data-key="fail"]');
  fail.play()
  sign.firstElementChild.textContent = 'Draw!'
  sign.style.display = 'block'
  gameOver = true
}

// evaluate if the all values are the same and is not empty
const evaluate = (a, b, c, d) => {
  if (a == b && b == c && c == a && a !== '' && a == d) return true
}

start();
