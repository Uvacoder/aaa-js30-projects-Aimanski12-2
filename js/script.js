let draftLists = []
let onProgressLists = []
let finishedLists = []
let deletedLists = []
let add = document.querySelector('.add')
let draft = document.querySelector('.draft')
let prog = document.querySelector('.prog')
let fin = document.querySelector('.fin')
let del = document.querySelector('.del')
let listCreated = document.querySelector('.listCreated')
let value = listCreated.value
let item, arrNum, arrGroup

let dlay = draft.parentElement;
let proglay = prog.parentElement;
let finlay = fin.parentElement;
let dellay = del.parentElement

let itemsToDrag = [dlay, proglay, finlay, dellay]

window.addEventListener('load', init)


function init(){
  // disable button
  add.disabled = true
  // set drag events when called
  addColorsWhenDrag()
}

// check if the input value is valid
listCreated.addEventListener('keyup', keyIsPress)
// add a click event
add.addEventListener('click', addList)


// function to run if any key is pressed
function keyIsPress(){
  value = listCreated.value
  if (value == ' ' || value.length <= 1 || value == undefined){
    return
  }
  add.disabled = false
}

// add a list
function addList(){
  let value = listCreated.value
  listCreated.value = ''
  add.disabled = true
  
  // we use set timeout to run the function asynchronously
  setTimeout(()=>{
    if (draft.children[0].nodeName == 'H5'){
      draft.removeChild(draft.children[0])
      return 
    } 
    if(draftLists.length > 0){
    let drafted = []
    for (x = 0; x < draftLists.length; x++) {
     drafted.push(draft.children[x])
    }
    for (x = 0; x < draftLists.length; x++) {
        draft.removeChild(drafted[x])
      }
    drafted = []
    }
  }, 5)
  setTimeout(() => {
    draftLists.push(value)
    for (x=0; x<draftLists.length; x++){
      draft.innerHTML += ` <li class="list-group-item" draggable='true'>${draftLists[x]}</li>`
    }
    
    setMouseDownForList()
  }, 10)
}


// function for dragging the items
function addColorsWhenDrag(){
  for (let itemToDrag of itemsToDrag){
    itemToDrag.addEventListener('dragover', dragOver);
    itemToDrag.addEventListener('dragenter', dragEnter);
    itemToDrag.addEventListener('dragleave', dragLeave);
    itemToDrag.addEventListener('drop', dragDrop);
  }
}

function dragOver(e){
  e.preventDefault()
}

function dragEnter() {
  this.classList.add('entered')
}

function dragLeave(){
  this.classList.remove('entered')
}

function dragDrop() {
  this.classList.remove('entered')
  let dropArea = this.childNodes[3].classList[1]

  // check if the element where the element is dropped
    if(dropArea == 'draft')  {
      draftLists.push(item)
      delOrig(draftLists, draft)
    }
    if (dropArea == 'prog') {
      onProgressLists.push(item)
      delOrig(onProgressLists, prog)
    }
    if (dropArea == 'fin') {
      finishedLists.push(item)
      delOrig(finishedLists, fin)
    }
    if (dropArea == 'del') {
      deletedLists.push(item)
      delOrig(deletedLists, del)
    }
    return
  
}

// function to run when to delete the original elements
function delOrig(arr, locArr){
  if(arrGroup == 'draft'){
    draftLists.splice(arrNum, 1)
    samp(arr, locArr, draftLists, draft)
  }
  if (arrGroup == 'prog') {
    onProgressLists.splice(arrNum, 1)
    samp(arr, locArr,  onProgressLists, prog)
  }
  if (arrGroup == 'fin') {
    finishedLists.splice(arrNum, 1)
    samp(arr, locArr, finishedLists, fin)
  }
  if (arrGroup == 'del') {
    deletedLists.splice(arrNum, 1)
    samp(arr, locArr, deletedLists, del)
  }
}



//  add and remove the new array
function samp(newArr, newLoc, oldArr, oldLoc){
  setTimeout(() => {
    let drafted = []
    let length = newLoc.children.length
    if(length > 0){
      for (x = 0; x < length; x++) {
        drafted.push(newLoc.children[x])
        }
      for (x = 0; x < length; x++) {
        newLoc.removeChild(drafted[x])
      }
      for (x = 0; x < newArr.length; x++) { 
        newLoc.innerHTML += `<li class="list-group-item" draggable='true'>${newArr[x]}</li>`
      }
        drafted = []
    } else {
      for (x = 0; x < newArr.length; x++) {
        newLoc.innerHTML += `<li class="list-group-item" draggable='true'>${newArr[x]}</li>`
      }
    }
  }, 5)

  setTimeout(() => {
    let draft = []
    let length = oldLoc.children.length
    if (length > 0) {
      for (x = 0; x < length; x++) {
        draft.push(oldLoc.children[x])
      }
      for (x = 0; x < length; x++) {
        oldLoc.removeChild(draft[x])
      }
      for (x = 0; x < oldArr.length; x++) {
        oldLoc.innerHTML += `<li class="list-group-item" draggable='true'>${oldArr[x]}</li>`
      }
      draft = []
    } else {
      for (x = 0; x < oldArr.length; x++) {
        oldLoc.innerHTML += `<li class="list-group-item" draggable='true'>${oldArr[x]}</li>`
      }
    }
  }, 10)
  
  setTimeout(setMouseDownForList, 15)
}


// set a mousedown event for the each <li> element
function setMouseDownForList(){
  if(draft.children.length > 0) addMouseDown(draft.children, 'draft')
  if(prog.children.length > 0) addMouseDown(prog.children, 'prog')
  if(fin.children.length > 0) addMouseDown(fin.children, 'fin')
  if(del.children.length > 0) addMouseDown(del.children, 'del')
}

// function called when array.children is not equal to 0
function addMouseDown(arr, val){
  for(x=0; x<arr.length; x++){
    let text = arr[x].innerHTML
    let n = x

    arr[x].addEventListener('mousedown', ()=>{
      item = text;
      arrNum = n;
      arrGroup = val
    })
  }
}