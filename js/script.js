const ready = () => {
  setInterval(()=>{
    const time = new Date().toLocaleTimeString()
    let tArr = time.split(':') 
    let s = tArr[2].split(' ')
    let tm = [n(tArr[0]), n(tArr[1]), s[1]]
    filterTime(tm)  
  }, 1000)
}

const filterTime = (time) => {

  if(time[1] < 10){
    minute(0, time[1])
  } else if(time[1] < 20){
    minute(time[1])
  } else if(time[1] < 60){
    let tens = Math.floor(time[1] / 10) * 10
    let ones = time[1] % 10
    minute(tens, ones >= 1 ? ones : null)
  }

  hr(time[0])
  amPm(time[2])

}

const hr = (hr) => {
  const h = document.querySelectorAll('.hr')
  h.forEach(r => {
    if(n(r.classList[1]) == hr){
      r.classList.add('now')
    }
    if (n(r.classList[1]) != hr){
      r.classList.remove('now')
    }
  })
}

const minute = (min1, min2) => {

  const minD = document.querySelectorAll('.min')
  minD.forEach(m => {
    if (n(m.classList[1]) == min1 || n(m.classList[1]) == min2){
      m.classList.add('now')
    } else {
      m.classList.remove('now')
    }
  })
}

const amPm = (a) => {
  const merD = document.querySelectorAll('.merD')
  merD.forEach(m => {
    if(m.classList[1].toUpperCase() == a){
      m.classList.add('now')
    } else {
      m.classList.remove('now')
    }
  })
}



const n = (num) => {
  return Number(num)
}

ready()