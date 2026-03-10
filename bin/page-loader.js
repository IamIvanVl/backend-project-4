#!/usr/bin/env node
import { program } from 'commander'
import process from 'process'

program
  .name('page-loader')
  .description('Downloads a page from the internet')
  .version('1.0.0')
  .option('-o, --output [path]', 'output path', `${process.cwd()}`)
  .argument('<filepath1>')