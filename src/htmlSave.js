import fsp from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

export default async (html, dir = process.cwd(), fileName = 'newFile.html') => { 
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const targetDirectory = path.resolve(__dirname, '..', `__fixtures__/${dir}/${fileName}`)
  return fsp.writeFile(targetDirectory, html)
  .then(() => {
    console.log('Writing was successful')
    return targetDirectory
  })
  .catch((e) => console.log(`An error ${e} occured while writing the file`))
}

