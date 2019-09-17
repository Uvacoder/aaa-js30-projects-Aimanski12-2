class BMI {
  
  constructor(){
    this.feet = 0;
    this.inches = 0
    this.weight = 0;
    this.start = this.start()
  }

  start(){
    const btn = document.querySelector('button')
    const inputs = document.querySelectorAll('input')
    const footer = document.querySelector('.footer')

    inputs.forEach(input => {
      input.addEventListener('keyup', (e)=> {
        this.setValues(input.value, input.className)
      })  
    })

    btn.addEventListener('click', ()=>{
      this.calculate()
    })

    footer.addEventListener('click', ()=>{
      const el = footer.firstElementChild
      el.setAttribute('target', '_blank')
      el.setAttribute('href', 'https://www.calculator.net/bmi-calculator.html')
    })
  }

  setValues(val, name){
    if(val == '') val = 0
    if(name == 'feet'){
      this.feet = Number(val)
    }
    if(name == 'inches'){
      this.inches = Number(val)
    }
    if(name == 'pounds'){
      this.weight = Number(val)
    }
  }

  calculate(){
    const result = document.querySelector('.result')
    if(isNaN(this.feet) || isNaN(this.inches) || isNaN(this.weight)){
      this.animate('Please enter a valid number!', result, 'error')
      return
    }

    if (this.feet == 0 || this.inches == 0 || this.weight == 0) {
      this.animate('Please enter your weight and height!', result, 'error')
      return
    }

    const height = this.feet * 12 + this.inches
    const weight = this.weight * 703

    const total = weight / (height*height)
    this.animate(this.textResult(total.toFixed(2)), result, 'res')
  }


  textResult(res){
    let bmi = ''
    if(res > 40){
      bmi = 'Obese Class III'
    } else if (res >= 35){
      bmi = 'Obese Class II'
    } else if(res >=30){
      bmi = 'Obese Class I'
    } else if(res >= 25){
      bmi = 'Overweight'
    } else if(res >= 18.5){
      bmi = 'Normal'
    } else if (res >= 17){
      bmi = 'Mild Thinness'
    } else if (res >= 16){
      bmi = 'Moderate Thinness'
    } else if (res <= 16) {
      bmi = 'Severe Thinness'
    }

    return `Your Body Mass Index is ${res} and your Index Value is in ${bmi}.` 

  }

  animate(text, res, highlight){
    let n = 1
    let m = setInterval(a, 200)
    
    function a(){
      if(n == 0){
        clearInterval(m)
        res.classList.remove(highlight, 'anim')
      } else {
        res.textContent = text
        res.classList.add(highlight, 'anim')
        n--
      }
    }
  }

}

const start = new BMI()