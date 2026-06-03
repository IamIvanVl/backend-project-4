import * as cheerio from 'cheerio'
import fsp from 'fs/promises'
import path from 'path'
import axios from 'axios'

export default async (htmlPath, baseUrl, outputDir) => {
  const html = await fsp.readFile(htmlPath, 'utf8')
  const $ = cheerio.load(html)

  await fsp.mkdir(outputDir, { recursive: true })

  const promises = $('img')
    .toArray()
    .map(async (img) => {
      const src = $(img).attr('src')

      if (!src) {
        return
      }

      const url = new URL(src, baseUrl)
      const fileName = path.basename(url.pathname)

      const { data } = await axios.get(url.href, {
        responseType: 'arraybuffer',
      })

      await fsp.writeFile(
        path.join(outputDir, fileName),
        data,
      )
    })

  await Promise.all(promises)
}


