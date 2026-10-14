const button = document.getElementById('counter')
let count = 0
button.addEventListener('click', () => {
  count++
  button.textContent = `Clicked ${count} time${count === 1 ? '' : 's'}`
})
