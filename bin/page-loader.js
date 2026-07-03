#!/usr/bin/env node
import { program } from 'commander'
import process from 'process'
import pageLoader from '../index.js'

program
  .name('page-loader')
  .description('Downloads a page from the internet')
  .version('1.0.0')
  .option('-o, --output <path>', 'output path', process.cwd())
  .argument('<url>')
  .action((url, options) => {
    const outputDir = options.output

    pageLoader(url, outputDir)
      .then((resultPath) => {
        console.log(`Page was downloaded to: ${resultPath}`)
      })
      .catch((err) => {
        console.error('Error:', err.message)
        process.exit(1)
      })
  })

program.parse()
