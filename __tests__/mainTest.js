import nock from 'nock'
import axios from 'axios'
import path from 'path'
import fs from 'fs'

nock.disableNetConnect()

beforeEach(async () => {
 const outputDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'))
})

test('page-loader', () => {

})