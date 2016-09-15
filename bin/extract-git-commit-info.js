#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const { version } = require('../package.json')

const program = require('commander')
const colors = require('colors')
const jsonfile = require('jsonfile')

program
  .version(version)
  .usage('[options]')
  .option('-d, --directory [projectroot]', 'project root', process.cwd())
  .option('-o, --output [outputPath]', 'output path', process.cwd())
  .option('-f --filename [outputFilename]', 'output filename, Default: commit.json', 'commit.json')
  .parse(process.argv)

// Turn relative paths into absolute ones
if (!path.isAbsolute(program.directory)) {
  program.directory = path.join(process.cwd(), program.directory)
}
if (!path.isAbsolute(program.output)) {
  program.output = path.join(process.cwd(), program.output)
}

const gitPath = path.join(program.directory, '.git')

// Check whether the path is a repo
try {
  fs.accessSync(gitPath, fs.F_OK)
} catch (e) {
  program.help((text) => {
    return `${colors.red(`Error: ${program.directory} is not a git repository`)}
    ${text}`
  })
}

let commitMessages = fs.readFileSync(path.join(gitPath, 'logs', 'HEAD'), 'utf-8')
commitMessages = commitMessages.split('\n')

let commitData = commitMessages[commitMessages.length - 2]
let matches = commitData.match(/\w*\s(\w{7})\w*\s(\S*\s\S*)\s(\d*).{15}(.*)/)

const commitId = matches[1]
const commitAuthor = matches[2]
const commitDateTime = new Date(matches[3] * 1000).toJSON()
const commitMsg = matches[4]

const outputPath = path.join(program.output, program.filename)
const outputObj = {
  commitId,
  commitAuthor,
  commitMsg,
  commitDateTime
}

jsonfile.writeFileSync(outputPath, outputObj)
console.log(colors.green(`Output written to ${outputPath}`))
