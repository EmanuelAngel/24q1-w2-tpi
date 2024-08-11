document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  const prefersDarkScheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  const colorMode = localStorage.getItem('color-mode')

  function setColorMode(mode) {
    if (mode === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  setColorMode(colorMode || (prefersDarkScheme ? 'dark' : 'light'))

  const colorModeBtn = document.getElementById('colorModeBtn')
  colorModeBtn.addEventListener('click', () => {
    const currentMode = html.classList.contains('dark') ? 'dark' : 'light'
    const newMode = currentMode === 'dark' ? 'light' : 'dark'
    localStorage.setItem('color-mode', newMode)
    setColorMode(newMode)
  })
})
