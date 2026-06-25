import * as cheerio from 'cheerio'
import fsp from 'fs/promises'
import path from 'path'
import axios from 'axios'

const isLocal = (resourceUrl, baseUrl) => {
  const resourceHost = new URL(resourceUrl, baseUrl).hostname
  const baseHost = new URL(baseUrl).hostname

  return (
    resourceHost === baseHost ||
    resourceHost.endsWith(`.${baseHost}`)
  )
}

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
            const value = $(el).attr(attr)

            if (!value) {
              return Promise.resolve()
            }

            const url = new URL(value, baseUrl)

            if (!isLocal(url.href, baseUrl)) {
              return Promise.resolve()
            }

            const fileName = path.basename(url.pathname)

            if (!fileName) {
              return Promise.resolve()
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
        .then(() => fsp.writeFile(htmlPath, $.html()))
    })
}

