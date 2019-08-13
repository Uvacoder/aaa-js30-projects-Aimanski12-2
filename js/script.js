

class Words {
  constructor(){
    this.words = words;
    this.matchedWords = []
  }

  // generate random words
  randomWordGenerator(){
    let word = this.words
    word.sort(()=> Math.random() - 0.5)
    return word
  }

  // add the matched words to the list
  wordsAreMatched(word){
    this.matchedWords.unshift(word)
    return this.matchedWords
  }

}

// State class
class State {
  constructor(words, nextWord, score, typedWords, time, totalTime, chars, highScore){
    this.words = words;
    this.nextWord = nextWord;
    this.score = score;
    this.typedWords = typedWords;
    this.time = time;
    this.totalTime = totalTime;
    this.correctChars = chars;
    this.highScore = highScore
  }

  // generates a new and shuffled words from the Word class
  static generate(){
    return new Words().randomWordGenerator()
  }

  // initiates the game with a new fresh state
  static ready(){
    return new State(this.generate(), 0, 0, [], 5, 0, 0, 0)
  }

}


// Game class
class Game {
  constructor(state){
    this.state = state
    this.gameStatus = false;
    this.render()
  }
  
  // sets the new value for the current state
  setState(newState){
    this.state = {...this.state, ...newState}
  }

  // starts the game when called
  static start(){
    return new Game(State.ready())
  }

  // decrement the time by second
  counter(i) {
    // call a decrement function for the seconds
    this.count()
    // check if seconds is = 0
    this.checkIfTimeIsZero(i)
  }
  


  // check for the input result if it matched the actual word
  checkInputResult(result, wordDisplay, input){

    // saves the individually correct letters  by percent to the state
    this.setState({correctChars: result.percent})

    // if the gameover, set the timer back to 5 and the score to zero
    if(!this.gameStatus){
      this.setState({
        time : 5,
        score : 0
      })   
    }
    
    // check the characters percent and pass it to the slider
    this.state.correctChars == 95 ?
      slider(this.state.correctChars, false) : 
        slider(this.state.correctChars, true)

    const typedWordDisplay = document.querySelector('.typedWords')
    const score = document.querySelector('.score')
      score.textContent = this.state.score

    // if the input value are the same with the given word
    if(result.same){
      let text = this.state.typedWords
      text.unshift(result.word)

      // set the values to the new state
      this.setState({
        time : 5,
        nextWord : this.state.nextWord + 1,
        score : this.state.score + 1,
        typedWords: text
      })
      
      // clear the input area
      input.value = ''
      // display the next word to the screen
      wordDisplay.textContent = this.state.words[this.state.nextWord]
      // flicker the score for effects
      flickNumber(score, this.state.score)    
    }

    let samp = this.state.typedWords.join(' ')
    // console.log(this.state.typedWords)
    typedWordDisplay.textContent = samp
  }
  

  // decrement the time
  count(){
    const timer = document.querySelector('.timer')

    // time interval
    const c = setInterval(()=>{
      
      if(this.state.time <= 1){
        // end the game
        this.gameStatus = false
        // effects
        flickNumber(timer, 0)
        // clear the interval when end
        clearInterval(c)
      } else {
        // set new state
        this.setState({
          time : this.state.time - 1,
          totalTime : this.state.totalTime + 1
        })
        // effects
        flickNumber(timer, this.state.time)
      }
    }, 1000)    
  }
  
  // check if the time is = 0
  checkIfTimeIsZero(i) {
    const mes = document.querySelector('.mes')
    const wordDisplay = document.querySelector('.word')

    // interval every 50 mils
    let y = setInterval(() => {
      // if time = = zero and game stats is false
      if (this.state.time <= 1 && this.gameStatus === false) {
        // output Game over
        mes.textContent = 'Game Over!'
        // check if the current score is higher than the current highscore
        this.state.score > this.state.highScore ? setLocalStorage(this.state) : null

        this.gameStatus = false
        // animate the slider
        slider(this.state.correctChars, false)
        // pass a new value to the state
        this.setState({
          words: State.generate(),
          nextWord : 0,
          score : 0,
          typedWords : [],
          time : 0,
          totalTime : 0,
          correctChars : 0
        })

        // clear the input field
        i.value = ''
        // blur the inpur field
        i.blur()
        // output the next word
        wordDisplay.textContent = this.state.words[this.state.nextWord]
        clearInterval(y)
        
      } else {
        this.gameStatus = true
      }
    }, 50)
  }

  // display 
  render(){
    const wordDisplay = document.querySelector('.word')
    wordDisplay.textContent = this.state.words[this.state.nextWord]
    
    const input = document.querySelector('.input')
    
    // add event listener 'keyup' to the input area
    input.addEventListener('keyup', ()=>{
      // evaluate if the values are the same
      let inputResult = evaluateInput(
        this.state.words[this.state.nextWord], input.value.toLowerCase()
      )
      // check if the values are the same
      this.checkInputResult(inputResult, wordDisplay, input)  
        // decrement the time by second
      !this.gameStatus ? this.counter(input) :  null
    })

    // check if there is a currently saved highscore
    checkHighScore() ? this.setState({highScore: checkHighScore()}) : null
  }

}
  
// set the local storage with one hour expiry
const setLocalStorage = (state) => {
    let ave = state.typedWords.length == 0 ?
        0 : state.totalTime / state.typedWords.length

    // store values
    let store = {
      score: state.score,
      typedWords: state.typedWords,
      totalTime: state.totalTime,
      average: Math.floor(ave),
      expires: (new Date().getTime()) + 3600000
    }
    // save to the local storage
    localStorage.setItem('store', JSON.stringify(store))
    checkHighScore()
}

//  check high score
const checkHighScore = () => {
  let highScore = localStorage.getItem('store')
  
  // do not pass pass anything if highscore is null
  if(highScore == null){
    highScoreDisplay(false)
    return false
  } 
  
  let present = new Date().getTime()
  let record = JSON.parse(highScore)
  // check if the highscore already expires
  if(present > record.expires) {
    highScoreDisplay(false)
    localStorage.clear()
    return false
  }
  
  // return if the highscore is still value
  highScoreDisplay(true, record)
  return record.score

}

// display highest score
const highScoreDisplay = (isHighScore, result) => {
  const highScoreTitle = document.querySelector('.highScoreTitle')
  const highScore = document.querySelector('.highScore')
  const highWords = document.querySelector('.highWords')
  const highTime = document.querySelector('.highTime')
  const highAve = document.querySelector('.highAve')

  if(isHighScore){
    // filter for time and seconds
    let min = Math.floor(result.totalTime / 60)
    let sec = result.totalTime % 60

    // output
    highScore.textContent = result.score
    highWords.textContent = result.typedWords.length
    highTime.textContent = `${min}:${sec}`
    highAve.textContent = `${(result.totalTime/result.score).toFixed(2)} s/w`

    // effect
    flickNumber(highScoreTitle, 'High Score')
  }
}

// function for the bar slider (forward or backward)
const slider = (width, slideForward) => {
  const barSlider = document.querySelector('.bar')

  // assign values if the slider if moving forward
  let start = slideForward ? 0 : width
  let duration = slideForward ? 1 : 5
  let finish = slideForward ? width : 0

  // start the interval
  let slide = setInterval(sliding, duration)

  function sliding(){

    if(start == finish){
      // clear the interval
      clearInterval(slide)
    } else {
      // increment or decrement the value
      slideForward ? start++ : start--
      // output the number
      barSlider.style.width = start.toString() + '%'
    }
  }
}


// function for flickering the number 
const flickNumber = (element, value) => {
  let timing = 1
  let a = setInterval(flick, 100)
  
  // flick the number
  function flick(){
    element.textContent = value
    if(timing == 0){
      // if the timing is finished remove the class
      element.classList.remove('flick')
      clearInterval(a)
    } else {
      // animate the flicker by adding the class
      timing--
      element.classList.add('flick')
    }
  }

}


// evaluate if the input is the same
const evaluateInput = (word, input) => {
  let mes = document.querySelector('.mes')
  let same = word === input ? true : false

  // check if the value of the percent
  let percent = evaluateTextPercent(word.split(''), input.split(''))

  // output a text basing on the percentage
  // 33% less is 'careful'
  // 67% less is 'almost'
  // 100% is 'good'
  percent <= 33 ? 
    mes.textContent = 'Careful!' : percent <= 67 ? 
      mes.textContent = 'Almost!' : mes.textContent = 'Good!'
    
  // return the result
  return {same, percent, word}
}


// evalue for percentage of the input for the slider
const evaluateTextPercent = (word, input) => {
  let total = 0

  // loop through the array to check if the input is same with the given word
  for(var x=0; x < word.length; x++){
    if(word[x] == input[x]){
      total++
    }
  }
  // 95% is the actual width of the element from its parents width
  return Math.ceil( ( (total / word.length)*(95/100) ) * 100)
}


// initialize the game
const game = Game.start()