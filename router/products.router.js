import mysql from 'mysql2/promise'
import DB_CONFIG from '../config/database.config.js'
import axios from 'axios'
import { Router } from 'express'
import { fakestoreapiURL } from '../config/fakestoreapiURL.js'
import { translateText } from '../utils/translateText.js'

const products = Router()

products.get('/', async (req, res) => {
  let con

  try {
    con = await mysql.createConnection(DB_CONFIG)

    const [rows] = await con.execute('SELECT * FROM products')

    const response = await axios.get(fakestoreapiURL)
    const { data } = response

    const updatedProducts = await Promise.all(
      data.map(async (fakeProduct) => {
        const dbProduct = rows.find(
          (dbProd) => fakeProduct.id === dbProd.product_id
        )

        const [translatedTitle, translatedDescription, translatedCategory] =
          await Promise.all([
            translateText(fakeProduct.title),
            translateText(fakeProduct.description),
            translateText(fakeProduct.category)
          ])

        const productData = {
          ...fakeProduct,
          title: translatedTitle,
          description: translatedDescription,
          category: translatedCategory
        }

        if (dbProduct) {
          const discount = dbProduct.discount
          const amountDiscounted = Number(
            (fakeProduct.price * (discount / 100)).toFixed(2)
          )
          const finalPrice = Number(
            (fakeProduct.price - amountDiscounted).toFixed(2)
          )

          productData.offer = {
            discount,
            amountDiscounted,
            finalPrice
          }
        }

        return productData
      })
    )

    console.log(updatedProducts)

    res.render('products', { products: updatedProducts })
  } catch (error) {
    res.status(500).json({ error: error.message })
  } finally {
    if (con) {
      await con.end()
    }
  }
})

export default products
