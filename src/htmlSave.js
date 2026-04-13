import fsp from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

export const func = async (html, dir = process.cwd(), fileName = 'newFile.html') => { 
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const directory = path.resolve(__dirname, '..', `__fixtures__/forSave/${fileName}`)
  fsp.writeFile(directory, html)
  .then(() => console.log('Writing was successful'))
  .catch((e) => console.log(`An error ${e} occured while writing the file`))
}

