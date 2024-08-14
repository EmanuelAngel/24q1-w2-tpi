import { calculateSummary } from './cartSummary.js'

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('button[data-product-id-delete]')
    .forEach((button) => {
      button.addEventListener('click', (event) => {
        const productId = button.getAttribute('data-product-id-delete')

        console.log(productId)

        const confirmDelete = window.confirm(
          '¿Estás seguro de que quieres eliminar el artículo?'
        )
        if (!confirmDelete) return

        fetch('/cart/remove', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId })
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              const product = document.querySelector(
                `[data-product-id="${productId}"]`
              )
              product.remove()
              calculateSummary()
            } else {
              alert('Error al eliminar el producto')
            }
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      })
    })
})
