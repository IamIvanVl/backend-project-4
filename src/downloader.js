import axios from 'axios'

const func = async (url) => {
    return  axios
    .get(url, {  responseType: 'text', })
    .then(response => console.log(response.data))
    .catch((e) => {
      console.log(`Downloading HTML went wrong: ${e}`)
  })
}

await func('https://ru.hexlet.io/courses')
