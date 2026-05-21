import htmlLoad from './htmlLoad.js'
import htmlSave from './htmlSave.js'
import generateName from './generateName.js'
import getImages from './getImages.js'

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

func('https://daniel-ivanov.ru/', './f')