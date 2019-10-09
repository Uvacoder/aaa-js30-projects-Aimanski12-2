
// color palette samples
const colors = [
  ['801515', 'd46a6a', 'aa3939', '550000'],
  ['803f15', 'd4946a', 'aa6539', '552100'],
  ['805d15', 'd4b26a', 'aa8539', '553900'],
  ['806e15', 'd4c36a', 'aa9739', '554700'],
  ['808015', 'd4d46a', 'aaaa39', '555500'],
  ['577714', 'a7c763', '7d9f35', '365000'],
  ['256b12', '6cb359', '448f30', '0f4800'],
  ['0d4d4d', '407f7f', '226666', '003333'],
  ['142e54', '4c668c', '2c4870', '051a38'],
  ['261758', '605292', '403075', '12073b'],
  ['3d1255', '764b8e', '582a72', '260339'],
  ['621046', 'a45287', '832c65', '42002b'],
]


const quote = document.querySelector('.quote')
const body = document.querySelector('body')
const author = document.querySelector('.author')
const btn = document.querySelector('.btn')

// start function
const start = () => {
  
  // fetch data
  fetch('https://api.quotable.io/random')
  // parse data
  .then(response => response.json())
  .then(data => {

    // generate random colors
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    // use the data to the element content
    quote.textContent = `"${data.content}"`
    quote.style.color = `#${color[3]}`
    body.style.backgroundImage = `linear-gradient(#${color[0]}, #${color[1]}, #${color[2]})`
    author.textContent = `- ${data.author} -`
    author.style.color = `#${color[3]}`
    btn.style.color = `#${color[0]}`
    btn.textContent = 'Another quote!'

    // add event listeners (mouseover)
    btn.addEventListener('mouseover', function(){
      btn.style.color = `#${color[3]}`
      btn.style.cursor = 'pointer'
    })

    // add event listeners (mouseout)
    btn.addEventListener('mouseout', function () {
      btn.style.color = `#${color[0]}`
    })

    setTimeout(() => {
      quote.classList.remove('fadeOut')
      author.classList.remove('fadeOut')
      btn.classList.remove('fadeOut')

      quote.classList.add('fadeIn')
      author.classList.add('fadeIn')
      btn.classList.add('fadeIn')
    }, 300)
    
  })
  // handle errors
  .catch(err => {
    if(err){
      author.textContent = 'Sorry, our server is not available as of this time.'
      const color = colors[Math.floor(Math.random() * colors.length)]
      body.style.backgroundImage = `linear-gradient(#${color[0]}, #${color[1]}, #${color[2]})`
      author.style.color = `#${color[3]}`
    }
  })


}

// renders the function again to generate new quote
btn.addEventListener('click', function() {
  setTimeout(() => {
    quote.classList.remove('fadeIn')
    author.classList.remove('fadeIn')
    btn.classList.remove('fadeIn')

    quote.classList.add('fadeOut')
    author.classList.add('fadeOut')
    btn.classList.add('fadeOut')
    start()
  }, 300)
})


start()