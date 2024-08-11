import { Router } from 'express'
import { fakestoreapiURL } from '../config/fakestoreapiURL.js'
import mysql from 'mysql2'
import DB_CONFIG from '../config/database.config.js'

const con = mysql.createConnection(DB_CONFIG)

const products = Router()

products.get('/', (req, res) => {
  con.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Failed to fetch products from database')
    }

    fetch(fakestoreapiURL)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((fakeProduct) => {
          results.forEach((dbProduct) => {
            if (fakeProduct.id === dbProduct.product_id) {
              fakeProduct.offer = {}
              fakeProduct.offer.discount = dbProduct.discount
              fakeProduct.offer.amountDiscounted = (
                fakeProduct.price *
                (fakeProduct.offer.discount / 100)
              ).toFixed(2)
              fakeProduct.offer.finalPrice = (
                fakeProduct.price - fakeProduct.offer.amountDiscounted
              ).toFixed(2)
            }
          })
        })

        console.log(data[1])

        res.render('products', { title: 'Productos', products: data })
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Failed to fetch products.' + error)
      })
  })
})

export default products
