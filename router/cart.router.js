import { Router } from 'express'
import fs from 'node:fs/promises'

const cart = Router()

cart.get('/', async (req, res) => {
  try {
    const cart = JSON.parse(await fs.readFile('./data/cart.json', 'utf8'))

    res.render('cart', { cart })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

cart.post('/add', async (req, res) => {
  const { productData } = req.body

  try {
    const cart = JSON.parse(await fs.readFile('./data/cart.json', 'utf8'))
    cart.push(productData)
    await fs.writeFile('./data/cart.json', JSON.stringify(cart), 'utf8')

    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

cart.delete('/remove', async (req, res) => {
  const { productId } = req.body

  try {
    const cart = JSON.parse(await fs.readFile('./data/cart.json', 'utf8'))

    const index = cart.findIndex((product) => product.id === Number(productId))

    if (index !== -1) {
      cart.splice(index, 1)
      await fs.writeFile('./data/cart.json', JSON.stringify(cart), 'utf8')

      res.json({ success: true })
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default cart
