
const cursor = document.querySelector('.cursor');

// add an eventlistener for the mouse when moved 
document.addEventListener('mousemove', e => {
  cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;")
})

// event listener to expand the div size when click happens
document.addEventListener('click', () => {
  cursor.classList.add("expand");
  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 400)
})
