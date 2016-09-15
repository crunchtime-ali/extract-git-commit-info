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

// 1. Get commit message
let commitMsg = fs.readFileSync(path.join(gitPath, 'COMMIT_EDITMSG'), 'utf-8')

// 2. Get current Head ref
let commitHead = fs.readFileSync(path.join(gitPath, 'HEAD'), 'utf-8')

commitMsg = commitMsg.split('\n')[0]
commitHead = commitHead.split('\n')[0].split(' ')[1]

// 3. Get commit ID from Head ref
let commitId = fs.readFileSync(path.join(gitPath, commitHead), 'utf-8')
commitId = commitId.substr(0, 7)

// 4. Current date time
const commitDateTime = new Date().toJSON()

const outputPath = path.join(program.output, program.filename)
const outputObj = {
  commitId,
  commitMsg,
  commitDateTime
}

jsonfile.writeFileSync(outputPath, outputObj)
console.log(colors.green(`Output written to ${outputPath}`))
