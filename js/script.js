
// start function to run when game starts
const start = () => {
  let previous = ''
  let typed = ''
  let ope = ''
  const btns = document.querySelectorAll('button')
  
  const windowClicked = () => {
    btns.forEach(btn => {
      btn.addEventListener('click', function(){
        blinkBtn(this)
        if(this.dataset.btn == 'num') typing(this.innerHTML)
        if(this.dataset.btn == 'fn') runFunc(this.innerHTML)
        if(this.dataset.btn == 'op') runOperation(this.dataset.typed)
        if(this.dataset.btn == 'total') total()
      })
    })
  }
  
  const keyboardPressed = () => {
    const keys = ['Escape', 'c', 'Backspace', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '_', '0', '.', 'Enter',]
    window.addEventListener('keydown', function(e){
      let code = e.key
      btns.forEach((btn, i)=> {
        if(keys[i] == code){
          blinkBtn(btn)
          if(btn.dataset.btn == 'num') typing(btn.innerHTML)
          if(btn.dataset.btn == 'fn') runFunc(btn.innerHTML)
          if(btn.dataset.btn == 'op') runOperation(btn.dataset.typed)
          if(btn.dataset.btn == 'total') total()
        }
      })
    })
  }

  // total
  const total = () => {
    let num = typed
    if(previous !== '' && typed !== ''){
      if (ope == '+') {
        num = Number(previous) + Number(num)
      } else if (ope == '-') {
        num = Number(previous) - Number(num)
      } else if (ope == '*') {
        num = Number(previous) * Number(num)
      } else if (ope == '/') {
        num = Number(previous) / Number(num)
      }
      if (num == Infinity) { infinite() }
      ope = '='
      result(num)
    }
  }

  const infinite = () => {
    output(Infinity, 3)
    ope = ''
    typed = ''
    previous = ''
    typedOpe(false)
    return
  }

  // run operation 
  const runOperation = (el) => {
    let num = typed
    if(previous == ''){
      ope = el
      previous = num
    } else {
      if(typed == '' && previous !== '') {
        ope = el
        typedOpe()
        return
      }
      if (ope == '+' && typed !== ''){
        num = Number(previous) + Number(num)
      } else if (ope == '-' && typed !== ''){
        num = Number(previous) - Number(num)
      } else if (ope == '*' && typed !== ''){
        num = Number(previous) * Number(num)
      } else if (ope == '/' && typed !== ''){
        num = Number(previous) / Number(num)
      }
      ope = el
    }
      
    if(num == Infinity){
      infinite()
    }
    result(num)
  }

  // output the result
  const result = (num) => {
    typedOpe()
    previous = num.toString()
    typed = ''
    output(previous, previous.length)
  }

  // display the typed operator on the top screen
  const typedOpe = (err) =>{
    const typed = document.querySelector('.typed')
    if(err){
      typed.textContent = ''
      return
    }
    typed.textContent = ope
  }



  // function for clear backspace and clear entry button
  const runFunc = (el) => {
    let num = typed
    if(previous !== '' && typed == ''){
      num = previous
    }
    // assign the editable number and make it editable
    if(ope !== '' && typed == '') {
      num = previous
    }
    if(el == 'C'){
      num = ''
      previous = '0'
      ope = ''
    } else if (el == 'CE') {
      num = ''
      previous = '0'
      ope = ''
    } else if (el == '←'){
      let y;

      if(previous !== '' && typed == ''){
        const result = document.querySelector('.result').innerHTML
        let x = result.split('.')
        if(x.length == 2){
          let y = x[1].toString()
          y = y.substring(0, y.length - 1)
          let a = parseFloat(x[0].replace(/,/g, ''))
          num = (a.toString() + '.' + y)
        } else {
          let y = parseFloat(result.replace(/,/g, ''))
          y = y.toString()
          y = y.substring(0, y.length - 1)
          num = y
        }
      } else {
        if(num < 0) {
          y = num.toString()
          y = y.substring(0, y.length - 1)
          num = y
        } else {
          y = num.toString()
          let x = y.slice(0, - 1)
          num = x
        }
      }
    } else if ('±'){
      if (num == 0) return
      num = num * -1
      num = num.toString()
    }
      
    
    typed = num
    
    typedOpe()
    output(num, num.length)
  }

  // when the btn is pressed for clicked
  const typing = (el) => {
    let num = typed
    
    if(el === '.'){
      let x = num.split('.')
      if(x.length == 2) {
        return
      }
    }
    num = typed.concat(el)
    if(num.length == 23) return 
    typed = num
    
    output(num, num.length)
  }
  
  // blink th btn when pressed or cliked
  const blinkBtn = (el) =>{
    el.classList.add('blink')
    setTimeout(()=>{
      el.classList.remove('blink')
    }, 120)
  }

  // output the text
  const output = (n, length) => {
    let b = new Intl.NumberFormat('en', {maximumSignificantDigits: 21})
    
    const result = document.querySelector('.result')
    if(n == Infinity){
      result.textContent = 'E r r.'
      return
    } else {
      if(length >= 22) {
        result.style.fontSize = '1.35em'
      } else if (length >= 21) {
        result.style.fontSize = '1.35em'
      } else if (length >= 20) {
        result.style.fontSize = '1.55em'
      } else if (length >= 19) {
        result.style.fontSize = '1.55em'
      } else if (length >= 18) {
        result.style.fontSize = '1.65em'
      } else if (length >= 17) {
        result.style.fontSize = '1.7em'
      } else if (length >= 16) {
        result.style.fontSize = '1.8em'
      } else if (length >= 15) {
        result.style.fontSize = '1.9em'
      } else if(length >= 14){
        result.style.fontSize = '2.1em'
      } else if(length >= 13){
        result.style.fontSize = '2.2em'
      } else if (length >= 12){
        result.style.fontSize = '2.3em'
      } else {
        result.style.fontSize = '2.6em'
      }
      

      
      let x;
      if (Number(n) < 0){
        x = b.format(n)
      } else if (Number(n) < 1 && Number(n) > 0){
        x = n
        previous = x
      } else if (Number(n) >= 1){
        x = b.format(Number(n))
      } else if(Number(n) === 0 || n === '' || n === '0'){
        x = '0'
      }
      
      result.textContent = x === '0' ? '0.' : x

    }
  }
  keyboardPressed()
  windowClicked()
}

// start Game
start()


