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

export function useFiles() {
  function formatFilename(filename: string): string {
    if (filename.length >= 50) {
      return `${filename.slice(0, 25)}...${filename.slice(-13)}`
    } else {
      return filename
    }
  }

  function formatCutFilename(
    filename: string,
    cutoff?: number
  ): string {
    if (filename.length >= (cutoff || 20)) {
      return `${filename.slice(0, (cutoff || 20) - 3)}...`
    } else {
      return filename
    }
  }

  function checkValidity(
    packages: {
      file: File
    }[],
    allowedFiles: { [key: string]: string }[]
  ) {
    const indexes: number[] = []
    packages.forEach((packageBag, idx) => {
      let flag = false

      allowedFiles.forEach((file) => {
        if (
          packageBag.file['name'].endsWith(
            file.extension
          ) &&
          (!packageBag.file['type'] ||
            packageBag.file['type'] === file.mimetype)
        ) {
          flag = true
        }
      })

      if (!flag) {
        indexes.push(idx)
      }
    })
    return indexes
  }

  return {
    formatFilename,
    formatCutFilename,
    checkValidity
  }
}
