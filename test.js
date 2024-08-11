import translate from 'node-google-translate-skidz'

translate(
  {
    text: 'qué verga hacer',
    source: 'es',
    target: 'en'
  },
  (result) => {
    console.log(result.translation)
  }
)
