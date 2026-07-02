import * as cheerio from 'cheerio'
import fsp from 'fs/promises'
import path from 'path'
import axios from 'axios'

const isLocal = (resourceUrl, baseUrl) => {
  const resourceHost = new URL(resourceUrl, baseUrl).hostname
  const baseHost = new URL(baseUrl).hostname

  return (
    resourceHost === baseHost
    || resourceHost.endsWith(`.${baseHost}`)
  )
}

const updateLinks = ($, htmlPath) => fsp.writeFile(htmlPath, $.html())

export default (htmlPath, baseUrl, outputDir) => {
  return fsp.readFile(htmlPath, 'utf-8')
    .then((html) => {
      const $ = cheerio.load(html)

      const resources = [
        ...$('img').toArray().map(el => ({ el, attr: 'src' })),
        ...$('script').toArray().map(el => ({ el, attr: 'src' })),
        ...$('link').toArray().map(el => ({ el, attr: 'href' })),
      ]

      return fsp.mkdir(outputDir, { recursive: true })
        .then(() => Promise.all(
          resources.map(({ el, attr }) => {
            const resourcePath = $(el).attr(attr)

            if (!resourcePath) {
              return
            }

            const url = new URL(resourcePath, baseUrl)
            const fileName = path.basename(url.pathname)

            if (!isLocal(url.href, baseUrl) || !fileName) {
              return
            }

            const localPath = `${path.basename(outputDir)}/${fileName}`

            return axios.get(url.href, {
              responseType: 'arraybuffer',
            })
              .then(({ data }) => fsp.writeFile(
                path.join(outputDir, fileName),
                data,
              ))
              .then(() => {
                $(el).attr(attr, localPath)
              })
          }),
        ))
        .then(() => updateLinks($, htmlPath))
    })
}
