import axios from 'axios'

export default (url) => {
    return  axios
    .get(url, {  responseType: 'text', })
    .then(response => response.data)
    .catch((e) => {
      console.log(`Downloading HTML went wrong: ${e}`)
      return null
  })
}