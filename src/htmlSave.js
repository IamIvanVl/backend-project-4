import fsp from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

export default (html, dir = process.cwd(), fileName) => {
  const targetDirectory = path.resolve(dir)
  const filePath = path.join(targetDirectory, fileName)

  return fsp.mkdir(targetDirectory, { recursive: true })
    .then(() => fsp.writeFile(filePath, html))
    .then(() => {
      console.log('Writing was successful')
      return filePath
    })
    .catch((e) => {
      console.log(`An error ${e} occurred while writing the file`)
      throw e
    })
}

