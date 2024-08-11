import axios from 'axios'

const translateURL = 'http://localhost:8080/translate' // Make sure this URL is correct

export const translateText = async (text) => {
  try {
    const response = await axios.post(translateURL, { text })
    return response.data.result // Adjust based on actual response structure
  } catch (error) {
    console.error(
      'Translation failed:',
      error.response ? error.response.data : error.message
    )
    throw new Error('Failed to translate text.')
  }
}
