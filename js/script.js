
// color palette samples
const colors = [
  ['E7A0A0', 'C37272', 'A04545', '811D1D', '610909'],
  ['DCBB92', 'B28C5D', '916734', '794E1A', '613909'],
  ['E6DF94', 'C2BA68', '9B9237', '81781C', '615909'],
  ['C8E69C', '9CBF69', '79A23C', '59811D', '3E6109'],
  ['A0E2A1', '67B968', '3C9A3D', '1C811D', '09610A'],
  ['A7E8CC', '3B9E74', '3B9E74', '1C7F55', '09613C'],
  ['ACE9EB', '74BFC1', '409EA1', '207F82', '095E61'],
  ['B3D6EB', '7DAAC6', '4B7E9E', '275F83', '093E61'],
  ['B3B9EE', '7C84C7', '49529F', '262F84', '091161'],
  ['CAAEE9', '683F97', '683F97', '4C217E', '320961'],
  ['ECACEB', 'C67CC5', 'A349A2', '822381', '610960']
]


const quote = document.querySelector('.quote')
const body = document.querySelector('body')
const author = document.querySelector('.author')
const btn = document.querySelector('.btn')
const cp = document.querySelector('.copyright')
const code = document.querySelector('.sourcecode')

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
      quote.style.color = `#${color[4]}`
      body.style.backgroundImage = `linear-gradient(#${color[2]}, #${color[0]}, #${color[2]})`
      author.textContent = `- ${data.author} -`
      author.style.color = `#${color[3]}`
      btn.style.color = `#${color[3]}`
      cp.style.color = `#${color[0]}`
      code.style.color = `#${color[0]}`
      btn.textContent = 'Next quote!'

      // add event listeners (mouseover)
      btn.addEventListener('mouseover', function () {
        btn.style.color = `#${color[0]}`
        btn.style.cursor = 'pointer'
      })

      // add event listeners (mouseout)
      btn.addEventListener('mouseout', function () {
        btn.style.color = `#${color[3]}`
      })

      setTimeout(() => {
        quote.classList.remove('fadeOut')
        author.classList.remove('fadeOut')
        btn.classList.remove('fadeOut')
        cp.classList.remove('fadeOut')
        code.classList.remove('fadeOut')

        quote.classList.add('fadeIn')
        author.classList.add('fadeIn')
        btn.classList.add('fadeIn')
        cp.classList.add('fadeIn')
        code.classList.add('fadeIn')
      }, 300)

    })
    // handle errors
    .catch(err => {
      if (err) {
        author.textContent = 'Sorry, our server is not available as of this time.'
        const color = colors[Math.floor(Math.random() * colors.length)]
        body.style.backgroundImage = `linear-gradient(#${color[0]}, #${color[1]}, #${color[2]})`
        author.style.color = `#${color[3]}`
      }
    })


}

// renders the function again to generate new quote
btn.addEventListener('click', function () {
  quote.classList.remove('fadeIn')
  author.classList.remove('fadeIn')
  btn.classList.remove('fadeIn')
  cp.classList.remove('fadeIn')
  code.classList.remove('fadeIn')
  
  quote.classList.add('fadeOut')
  author.classList.add('fadeOut')
  btn.classList.add('fadeOut')
  cp.classList.add('fadeOut')
  code.classList.add('fadeOut')
  setTimeout(() => {
    start()
  }, 200)
})


start()