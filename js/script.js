class Speech {

  constructor(state){
    this.state = state
    this.voice = ''
  }

  setState(name, val){
    this.state[name] = val
  }

  ready(){
    const voice = window.speechSynthesis
    const options = document.querySelector('.options')    
    let voiceOptions;

    voice.addEventListener('voiceschanged', ()=> {
      voiceOptions = voice.getVoices()
      this.voice = voiceOptions[0]

      options.innerHTML = voiceOptions.map(voice =>
        `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`
      ).join('')
    })
      
    options.addEventListener('change', ()=>{
      const selectedVoice = voiceOptions.find(opt => {
        return opt.name === options.value
      })
      
      this.voice = selectedVoice
    })
      
    this.setter()
    this.setAudio()
    this.speech()
  }

  speech(){
    const start = document.querySelector('#start')
    const stop = document.querySelector('#stop')
    const text = document.querySelector('textarea')

    start.addEventListener('click', ()=>{
      this.state.voice = this.voice
      this.state.text = text.value
      console.log(this.state)
      speechSynthesis.speak(this.state)
      
    })
    stop.addEventListener('click', ()=>{
      speechSynthesis.cancel()
    })
  }


  setter(){
    const set = ['rate', 'pitch', 'volume']
    const vals = [1, 1, 0.5]
    for(let x = 0; x < 3; x++){
      this.setState(set[x], vals[x])
    }
  }

  setAudio(){
    const ranges = document.querySelectorAll('[type="range"]')
    ranges.forEach(range => {
      range.addEventListener('change', ()=>{
      const name = range.name
      const val = range.value

      name == 'rate' ? this.setState(name, Number((val * 0.1).toFixed(2))) :
      name == 'pitch' ? this.setState(name, Number((val / 10).toFixed(2))) :
      name == 'volume' ? this.setState(name, Number((val / 10).toFixed(2))) : null
      })
    })
  }
  
}

const start1 = new Speech(new SpeechSynthesisUtterance()).ready()


