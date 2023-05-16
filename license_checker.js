/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
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

var re_get_extension = /(?:\.([^.]+))?$/
const allowed_extensions = [
  'html',
  'vue',
  'ts',
  'js',
  'css'
]

var new_extension = []
wrong_license = []

license_header = fs.readFileSync('LICENSE').toString()

function* readAllFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true })

  for (const file of files) {
    if (file.isDirectory()) {
      if (
        file.name != 'node_modules' &&
        file.name != 'dist'
      ) {
        yield* readAllFiles(path.join(dir, file.name))
      }
    } else {
      var extension = re_get_extension.exec(file.name)[1]
      if (allowed_extensions.includes(extension)) {
        yield path.join(dir, file.name)
      } else {
        new_extension.push(extension)
      }
    }
  }
}

function get_first_comment(
  content,
  start_char,
  end_char,
  middle_char
) {
  const start_comment = content.indexOf(start_char)
  const last_comment = content.indexOf(end_char)
  if (start_comment !== -1 && last_comment !== -1) {
    var comment_content = content
      .toString()
      .substring(start_comment + 4, last_comment)
    comment_content = comment_content.replaceAll(
      middle_char,
      ''
    )
    return comment_content.toString().replace(/^ +/gm, '')
  }
  return ''
}

function check_if_license_is_correct(file_header) {
  if (
    file_header.replace(/\s/g, '') ==
    license_header.replace(/\s/g, '')
  ) {
    return true
  }
  return false
}

for (const file of readAllFiles('./')) {
  var filename = file.toString()
  const content = fs.readFileSync(file.toString())
  var comment
  if (
    filename.includes('.vue') ||
    filename.includes('.html')
  ) {
    comment = get_first_comment(content, '<!--', '-->', '')
  } else if (
    filename.includes('.ts') ||
    filename.includes('.js') ||
    filename.includes('.css')
  ) {
    comment = get_first_comment(content, '/*', '*/', '*')
  }
  if (!check_if_license_is_correct(comment)) {
    wrong_license.push(filename)
  }
}

if (wrong_license.length > 0) {
  throw (
    '--------------------------------\n\nno license / not actual license in files:  \n\n' +
    wrong_license.toString().replaceAll(',', '\n') +
    '\n\n--------------------------------\n'
  )
} else {
  console.log(
    '--------------------------------\n\nall files contain the license\n\n--------------------------------'
  )
}
