/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { exec } = require('child_process')
import util from 'node:util'

const execPromise = util.promisify(exec)

export async function restoreData(project?: string) {
  try {
    if (project == 'firefox') {
      await execPromise(
        'sh ./src/__tests__/end-to-end/config/restore-firefox.sh'
      )
    } else if (project == 'chrome') {
      await execPromise(
        'sh ./src/__tests__/end-to-end/config/restore-chrome.sh'
      )
    }
  } catch (error) {
    console.log(error)
  }
}
