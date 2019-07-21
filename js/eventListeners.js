minusMin.addEventListener('click', lessMin)
addMin.addEventListener('click', moreMin)
minusBrk.addEventListener('click', lessBrk)
addBrk.addEventListener('click', moreBrk)

// lessen the value of the pamodoro when clicked
function lessMin(){
  if (initialTime == 1) return
  initialTime--
  initTime = initialTime
  timer.innerHTML = `${initialTime < 10 ? '0'+initialTime : initialTime}:00`
}

// increase the value when plus is clicked
function moreMin(){
  if(initialTime == 90) return
  initialTime++
  initTime = initialTime
  timer.innerHTML = `${initialTime < 10 ? '0'+initialTime : initialTime}:00`
}

// decrease the value when click
function lessBrk(){
  if(breakTime == 1) return
  breakTime--
  breaktimer = breakTime
  brkTimer.innerText = `${breakTime} min`
}

// increase the value when clicked
function moreBrk(){
  if (breakTime == 15) return
  breakTime++
  breaktimer = breakTime
  brkTimer.innerText = `${breakTime} min`
}

// remove button eventlisteners when pamodoro has started
function removeWhenStart() {
  minusMin.removeEventListener('click', lessMin)
  addMin.removeEventListener('click', moreMin)
  minusBrk.removeEventListener('click', lessBrk)
  addBrk.removeEventListener('click', moreBrk)
}

// add the event listeners when pamodoro started
function addClickable() {
  minusMin.addEventListener('click', lessMin)
  addMin.addEventListener('click', moreMin)
  minusBrk.addEventListener('click', lessBrk)
  addBrk.addEventListener('click', moreBrk)
}

