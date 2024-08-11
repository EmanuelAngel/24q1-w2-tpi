import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { setUpMiddlewares } from './middlewares/setup.js'
import productsRouter from './router/products.router.js'
import translateRouter from './router/translate.router.js'
import cartRouter from './router/cart.router.js'

export const createApp = () => {
  const app = express()

  corsMiddleware(app)
  setUpMiddlewares(app)

  app.use('/', productsRouter)
  app.use('/translate', translateRouter)
  app.use('/cart', cartRouter)
  app.use((req, res) => {
    res.render('./errors/404', { title: '404' })
  })

  return app
}
