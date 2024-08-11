import Router from 'express'
import translate from 'node-google-translate-skidz'

const translatation = Router()

translatation.post('/', async (req, res) => {
  const { text } = req.body

  try {
    translate(
      {
        text,
        source: 'en',
        target: 'es'
      },
      (result) => {
        res.json({ result: result.translation })
      }
    )
  } catch (error) {
    res.status(500).send('Failed to translate.' + error)
  }
})

export default translatation
