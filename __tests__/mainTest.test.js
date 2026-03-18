import nock from 'nock'
import axios from 'axios'
import path from 'path'
import fsp from 'fs/promises'
import os from 'os'
import { fileURLToPath } from 'url'
import {
  test,
  expect,
  beforeAll,
  beforeEach,
  describe,
} from 'vitest'

nock.disableNetConnect()

beforeEach(async () => {
 const outputDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'page-loader-'))
 const scope = nock('https://api.github.com')
  .get('/repos/atom/atom/license')
  .reply(200, fixture) 
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = fileName => path.resolve(__dirname, '..', '__fixtures__', fileName)
const readFixture = fixtureName => fsp.readFile(getFixturePath(fixtureName), 'utf-8')

const fixture = await readFixture('ru-hexlet-io-courses.html')

test('page-loader', async () => {

await page-loader('https://api.github.com/repos/atom/atom/license')
expect(await fsp.readFile(path.join(process.cwd(), 'api-github-com-repos-atom-license.html')), 'utf-8').toEqual(fixture)

})