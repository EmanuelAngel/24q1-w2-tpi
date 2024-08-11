import { Router } from 'express'

const cart = Router()

cart.get('/', async (req, res) => {
  res.render('cart')
})

export default cart
