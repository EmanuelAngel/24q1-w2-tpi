document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button[data-product]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productData = JSON.parse(button.getAttribute('data-product'))

      fetch('/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productData })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    })
  })
})
