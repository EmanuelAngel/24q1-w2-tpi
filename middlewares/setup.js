import express from 'express'

export const setUpMiddlewares = (app) => {
  app.use(express.static('./public'))

  app.use(express.json())

  app.set('view engine', 'pug')
  app.set('views', './views')

  return app
}
