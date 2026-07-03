import htmlLoad from './src/htmlLoad.js'
import htmlSave from './src/htmlSave.js'
import generateName from './src/generateName.js'
import getImages from './src/getImages.js'

export const func = (url, outputDir) => {
  const baseUrl = new URL(url).origin
  return htmlLoad(url)
    .then((html) => {
      return htmlSave(html, outputDir, generateName(url))
    })
    .then((pathToHtml) => {
      return getImages(pathToHtml, baseUrl, generateName(url, 'dir'))
    })
}

func('https://vk.com/letteryu', './f')
