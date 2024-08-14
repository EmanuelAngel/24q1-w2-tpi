document.addEventListener('DOMContentLoaded', () => {
  calculateSummary()
})

export function calculateSummary() {
  const products = document.querySelectorAll('[data-product-id]')

  const subtotal = [...products]
    .reduce((total, product) => {
      const price = Number(product.getAttribute('data-product-price'))
      return total + price
    }, 0)
    .toFixed(2)

  document.getElementById('subtotal').textContent = `$${subtotal}`

  let discountsQuantity = 0
  const discounts = [...products].reduce((discounts, product) => {
    const discount = Number(product.getAttribute('data-product-discounted'))
    if (discount) {
      discountsQuantity++
      return discounts + discount
    }
    return discounts
  }, 0)

  document.getElementById('discounts').textContent = `-$${discounts}`

  const total = (Number(subtotal) - Number(discounts)).toFixed(2)
  document.getElementById('total').textContent = `$${total}`

  const taxes = (Number(total) * 0.19).toFixed(2)
  document.getElementById('taxes').textContent = `$${taxes}`

  document.getElementById(
    'discountsQuantity'
  ).textContent = `${discountsQuantity} descuento${
    discountsQuantity > 1 ? 's' : ''
  } aplicado${discountsQuantity > 1 ? 's' : ''}`
}
