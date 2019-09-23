
// run function when loaded
const ready = () => {
  let red = 130
  let green = 130
  let blue = 130
  const input = document.querySelectorAll("input");
  const display = document.querySelector(".display");
  
  // loop through the input range 
  for (var i = 0; i < input.length; i++) {
    input[i].addEventListener("input", function () {
      
      //assign value
      red = document.getElementById("red").value
      green = document.getElementById("green").value
      blue = document.getElementById("blue").value;
      
      // assign style background
      display.style.background = "rgb(" + red + ", " + green + ", " + blue + ")";
      
      // assign value to the colors
      outputValue(Number(red), Number(green), Number(blue))

    });
  }
  
  // output value when range is selected
  const outputValue = (r, g, b) => {
    red = r
    green = g
    blue = b
    const hex = document.querySelector('.hex')
    const rgb = document.querySelector('.rgb')
    hex.textContent = convertToHex(r, g, b)
    rgb.textContent = `(${r},${g},${b})`
    return hex
  }
  
  // rgb to hex converter
  const convertToHex = (r, g, b) => {
    let result = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return result
  }
  
  // add color palettes
  const addPalette = () => {
    const btn = document.querySelector('.save')
    const palette = document.querySelector('.palettes')
    btn.addEventListener('click', ()=>{
      const newEl = document.createElement('div')
      newEl.classList.add('placer')
      newEl.innerHTML = `
        <div class="pick">
          <div class='close'>x</div>
          <div class="col" style='background:${convertToHex(red, green, blue)}'></div>
          <div class="colstamp">
            <p>Hex: ${convertToHex(red, green, blue)}</p>
            <p>RGB: (${red},${green},${blue})</p>
          </div>
        </div>`
      
      // newEl.classList.add('fadeIn')
      palette.appendChild(newEl)
      setTimeout(()=>{
        newEl.classList.add('fadeIn')
      },300)
      
      const collections = document.querySelectorAll('.placer')

      // mouseover and moouse out for the close button
      collections.forEach(col =>{
        col.addEventListener('mouseover', ()=>{
          col.firstElementChild.firstElementChild.style.display = 'block'
        })
        col.addEventListener('mouseout', () => {
          col.firstElementChild.firstElementChild.style.display = 'none'
        })
      })
      removePalettes(collections)
    })
  }
  
  // remove palettes
  const removePalettes = (cols) => {
    cols.forEach((col, i )=> {
      col.addEventListener('click', (e)=> {
        col.classList.add('fadeOut')
        remove(col)
      })
    })  
    // remove element after 300milisec
    function remove(item){
      setTimeout(() => {
        item.parentNode.removeChild(item)
      }, 300)
    }
  }
  addPalette()
}
  
ready()


