import htmlLoad from './htmlLoad.js'
import htmlSave from './htmlSave.js'
import generateName from './generateName.js'
import getImages from './getImages.js'

export const func = (url, outputDir) => {
  // const baseUrl = new URL(url).origin
  // return htmlLoad(url)
  //   .then((html) => {
  //     return htmlSave(html, outputDir, generateName(outputDir))
  //   })
  //   .then((pathToHtml) => {
  //     return getImages(pathToHtml, baseUrl)
  //   })
}

// func('https://ru.hexlet.io/projects/4/members/50046', '/fixtures/forSave')