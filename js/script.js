
// start function
const start = () => {
  const show = document.getElementById('show')
  const bottom = document.querySelector('.bottom')
  
  // event listener when button is clicked
  show.addEventListener('click', function(){
    const name = document.getElementById('name').value
    const ageValue = document.getElementById('age').value
    
    // name validator
    if(validator(name)){
      if(ageValue <= 25){
        gender(age[0][nGen(3)])
      } else if (ageValue <= 40) {
        gender(age[1][nGen(3)])
      } else if (ageValue <= 60) {
        gender(age[2][nGen(3)])
      } else if (ageValue <= 80) {
        gender(age[3][nGen(3)])
      } else if (ageValue <= 110) {
        gender(age[4][nGen(3)])
      } else {
        message('Please enter a valid age.')
      }
    } else {
      message('Please enter a valid name.')
    }
  })
  
  // age validator
  const gender = (age) => {
    const gender = document.getElementById('gender').value
    if (gender === 'female') {
      status(age, sex[0][nGen(3)])
    } else if (gender === 'male') {
      status(age, sex[1][nGen(3)])
    } else if (gender === 'bisexual') {
      status(age, sex[2][nGen(3)])
    } else if (gender === 'gay') {
      status(age, sex[3][nGen(3)])
    } else if (gender === 'lesbian') {
      status(age, sex[4][nGen(3)])
    } else if (gender === 'transgender') {
      status(age, sex[5][nGen(3)])
    } 
  }
  
  // marital status validator
  const status = (age, gender) => {
    const stats = document.getElementById('status').value
    if (stats === 'single') {
      display(age, gender, mStats[0][nGen(3)])
    } else if (stats === 'dating') {
      display(age, gender, mStats[1][nGen(3)])
    } else if (stats === 'married') {
      display(age, gender, mStats[2][nGen(3)])
    } else if (stats === 'divorced') {
      display(age, gender, mStats[3][nGen(3)])
    } else if (stats === 'widow') {
      display(age, gender, mStats[4][nGen(3)])
    } 
  }

  // output a display
  const display = (age, gender, stats) => {
    bottom.innerHTML = `
    <h2 class='result'></h2>
      <div class ='luckyNum'>
        <p class='numberTitle'></p>
        <p class='number'></p>
      </div>
    `

    // delay timeout for the display
    setTimeout(() => {
      const res = document.querySelector('.result')
      const nTitle = document.querySelector('.numberTitle')
      const number = document.querySelector('.number')
      let luckyN = luckyNum().sort()

      res.textContent = `${age} ${gender} ${stats}`
      nTitle.textContent = 'Your Lucky Numbers'
      number.textContent = (luckyN.join(' '))

      res.classList.add('fadeIn')
      nTitle.classList.add('fadeIn')
      number.classList.add('fadeIn')
    }, 400);

  }
  
  const nGen = (n) => {
    return Math.floor(Math.random() * n)
  }

  const luckyNum = () => {
    let numbers = new Set;
    let n = [];
    while (numbers.size < 6) numbers.add(nGen(45) + 1);
    numbers.forEach(num =>{
      n.push(num)
    })
    return n
  }

  // display message when error
  const message = (mes) => {
    bottom.innerHTML = `
      <p class='titleRes'></p>
    `
    setTimeout(() => {
      const a = document.querySelector('.titleRes')
      a.textContent = mes
      a.classList.add('fadeIn')
    }, 400);
  }

  // init message display
  message('Let me tell your future. . .')

  // validate if name is valid
  const validator = (val) => {
    const format = /^[a-zA-Z]+$/
    if (val.match(format)){
      return true
    } else {
      return false
    }
  }

}

start()


