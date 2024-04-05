/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

const path = require('path')
const fs = require('fs')

const RE_GET_EXTENSION = /(?:\.([^.]+))?$/
const EXTENSIONS_WITH_LICENSE = [
  'html',
  'vue',
  'ts',
  'js',
  'css'
]
const EXTENSION_WITHOUT_LICENSE = [
  'md',
  'sh',
  'gz',
  'env',
  'ico',
  'yml',
  'jar',
  'war',
  'png',
  'svg',
  'sql',
  'mdb',
  'ldif',
  'yaml',
  'conf',
  'json',
  'local',
  'eslintrc',
  'gitignore',
  'properties',
  'prettierrc',
  'dockerignore',
  'browserslistrc',
  'prettierignore',
  'gitattributes',
  'eslintoutputrc',
  'eslintignore'
]

const DIRS_WITHOUT_LICENSE_CHECKING = [
  'node_modules',
  'dist',
  '.vscode',
  '.git',
  '.husky',
  '.scannerwork',
  'mockData',
  'itestGenerated',
  'itestNewFiles',
  'itestServer',
  'itestSourceFiles',
  'itestPdf',
  'itestPackages',
  'reports'
]

const license_header = fs.readFileSync('LICENSE').toString()

var newExtensions = []
var wrongLicense = []

let numberOfFilesChecked = checkLicenseInAllFiles()
printLicenseResults(numberOfFilesChecked)
printNewExtensions()

if (
  wrongLicense.length !== 0 ||
  newExtensions.length !== 0
) {
  process.exit(1)
}

process.exit()

function checkLicenseInAllFiles() {
  let numberOfFilesChecked = 0
  for (const file of readAllFiles('./')) {
    var filename = file.toString()
    const content = fs.readFileSync(file.toString())
    var comment
    if (
      filename.includes('.vue') ||
      filename.includes('.html')
    ) {
      comment = getFirstComment(content, '<!--', '-->', '')
      numberOfFilesChecked += 1
    } else if (
      filename.includes('.ts') ||
      filename.includes('.js') ||
      filename.includes('.css')
    ) {
      comment = getFirstComment(content, '/*', '*/', '*')
      numberOfFilesChecked += 1
    }

    if (!checkIfLicenseIsCorrect(comment)) {
      wrongLicense.push(filename)
    }
  }
  return numberOfFilesChecked
}

function* readAllFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    if (file.isDirectory()) {
      if (
        !DIRS_WITHOUT_LICENSE_CHECKING.includes(file.name)
      ) {
        yield* readAllFiles(path.join(dir, file.name))
      }
    } else {
      var extension = RE_GET_EXTENSION.exec(file.name)[1]
      if (EXTENSIONS_WITH_LICENSE.includes(extension)) {
        yield path.join(dir, file.name)
      } else {
        if (
          extension &&
          !EXTENSION_WITHOUT_LICENSE.includes(extension)
        ) {
          newExtensions.push(extension)
        }
      }
    }
  }
}

function getFirstComment(
  content,
  startChar,
  endChar,
  middleChar
) {
  const startComment = content.indexOf(startChar)
  const lastComment = content.indexOf(endChar)
  if (startComment !== -1 && lastComment !== -1) {
    var commentContent = content
      .toString()
      .substring(startComment + 4, lastComment)
    commentContent = commentContent.replaceAll(
      middleChar,
      ''
    )
    return commentContent.toString().replace(/^ +/gm, '')
  }
  return ''
}

function checkIfLicenseIsCorrect(fileHeader) {
  if (
    fileHeader.replace(/\s/g, '') ==
    license_header.replace(/\s/g, '')
  ) {
    return true
  }
  return false
}

function printLicenseResults(numberOfFilesChecked) {
  console.log(
    `--------------------------------\n\n🎯 ${numberOfFilesChecked} files were checked`
  )
  if (wrongLicense.length > 0) {
    console.error(
      '❗ no license / not actual license in files:  \n\n\t- ' +
        wrongLicense.toString().replaceAll(',', '\n\t- ') +
        '\n\n--------------------------------\n'
    )
  } else {
    console.log(
      '✅ all files contain the license\n\n--------------------------------'
    )
  }
}

function printNewExtensions() {
  if (newExtensions.length > 0) {
    console.log('\n\nnew not supported extensions:\n\n')
    new Set(newExtensions).forEach((extension) => {
      console.log(extension + '\n')
    })
    console.log('--------------------------------\n\n')
  }
}
