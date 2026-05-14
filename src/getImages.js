import * as cheerio from 'cheerio'
import fsp from 'fs/promises'
import path from 'path'
import axios from 'axios'

export default async (pathToHtml, baseUrl) => {
  const html = await fsp.readFile(pathToHtml, 'utf-8')

  const $ = cheerio.load(html)

  const images = $('img')

  const promises = []

  images.each((i, img) => {
    const src = $(img).attr('src')

    if (!src) {
      return
    }

    const absoluteUrl = new URL(src, baseUrl).href

    promises.push(
      axios.get(absoluteUrl, { responseType: 'arraybuffer' })
        .then((response) => {
          const fileName = path.basename(new URL(absoluteUrl).pathname)

          return fsp.writeFile(fileName, response.data)
        })
    )
  })

  await Promise.all(promises)
}



