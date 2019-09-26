
// start this function when game is ready
const gameReady = () => {
  let pScore = 0
  let cScore = 0
  const mes = document.querySelector('.messageDisplay h1')
  const score = document.querySelector('audio[data-key="score"]');
  
  // function to run when button is clicked
  const startGame = () => {
    const start = document.querySelector('.start')
    const introDisplay = document.querySelector('.first')
    const scoreDisplay = document.querySelector('.top')
    const gameDisplay = document.querySelector('.second')
    const bottom = document.querySelector('.bottom')
    const intro = document.querySelector('audio[data-key="intro"]');

    // click event
    start.addEventListener('click', function(){
      // play audio effect
      intro.play()
      introDisplay.classList.add('fadeOut')
      bottom.classList.add('fadeIn')
      scoreDisplay.classList.add('fadeIn')
      gameDisplay.classList.add('fadeIn')
      setTimeout(()=>{
        introDisplay.style.display = 'none'
      },300)
    })
  }

  const playGame = () => {
    const btn = document.querySelectorAll('.btn')
    const imgs = document.querySelectorAll('img')
    const player = document.querySelector('.player')
    const computer = document.querySelector('.computer')
    const shake = document.querySelector('audio[data-key="shake"]');

    // computer selection options
    const select = ['rock', 'paper', 'scissors']

    // remove message animation after run 
    mes.addEventListener('animationend', function(){
      this.style.animation = ''
    })
    
    // remove animation for each img elements after running animation
    imgs.forEach(img => {
      img.addEventListener('animationend', function(){
        this.style.animation = '' 
      })
    })
    

    // event listener for each btn
    btn.forEach(bt =>{
      bt.addEventListener('click', function(){

        // play audio effect
        shake.play()

        // remove the pointers to avoid double clicking
        btn.forEach(b => {
          b.style.pointerEvents = 'none'
        })

        // create a random choice for the computer
        let n = Math.floor(Math.random() * select.length)
        const playerSel = this.classList[1]
        const compSel = select[n]
        
        // set the img back to rock image
        player.src = `./libs/img/rock.png`
        computer.src = `./libs/img/rock.png`

        // set the width to 175 since not all image have same size
        player.style.width = '175px'
        computer.style.width = '175px'

        // add animation
        player.style.animation = 'shakePlayer 1s ease'
        computer.style.animation = 'shakeComputer 1s ease'
        mes.textContent = 'Shaking . . .'
        mes.style.animation = 'shaking 0.4s ease'
        
        // timer after runntion
        setTimeout(()=>{
          if(playerSel != 'rock'){
            player.style.width = '200px'
          } else {
            player.style.width = '175px'
          }
          if (compSel != 'rock') {
            computer.style.width = '200px'
          } else {
            computer.style.width = '175px'
          }

          // set the image to the selection option
          player.src = `./libs/img/${playerSel}.png`
          computer.src = `./libs/img/${compSel}.png`

          // put back the pointer events after running
          btn.forEach(b => {
            b.style.pointerEvents = 'all'
          })

          // evaluate who won the game
          evaluateResult(playerSel, compSel)
        }, 1200)
      })
    })
  }


  const evaluateResult = (player, comp) => {
    // set the evaluation after 200 mils
  setTimeout(()=>{
    // if player is rock
    if(player == 'rock') comp == 'scissors' ? win() : comp == 'paper' ? lose() : tie()
    // if player is paper
    if(player == 'paper') comp == 'rock' ? win() : comp == 'scissors' ? lose() : tie()
    // if player is scissors
    if(player == 'scissors') comp == 'paper' ? win() : comp == 'rock' ? lose() : tie()
  }, 200)
  }

  // if player wins
  const win = () => {
    const plScore = document.querySelector('.plScore')
    
    // remove animation after 
    plScore.addEventListener('animationend', function(){this.style.animation = ''})

    // play audio
    score.play()
    pScore = pScore + 1
    mes.textContent = 'You Win!'
    plScore.textContent = pScore
    plScore.style.animation = 'addScore 0.2s ease'
  }

  // if player lose
  const lose = () => {
    const comScore = document.querySelector('.comScore')

    // remove animation after
    comScore.addEventListener('animationend', function(){this.style.animation = ''})

    // play audio
    score.play()
    cScore = cScore + 1 
    mes.textContent = 'You lose!'
    comScore.textContent = cScore
    comScore.style.animation = 'addScore 0.2s ease'
  }

  // when game is tied
  const tie = () => {
    mes.textContent =  `It's a tie!`
  }

  // start game
  startGame()
  playGame()
}

gameReady()