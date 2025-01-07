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

export function useBlob() {
  async function openBlob(data: Blob, type: string) {
    if (type === 'html') {
      const innerHtml = await data.text()
      const newWindow = window.open()
      newWindow?.document.write(innerHtml)
    } else if (type === 'pdf') {
      const fileURL = URL.createObjectURL(data)
      window.open(fileURL, '_blank')
    }
  }

  function downloadBlob(
    data: Blob,
    extension: string,
    fileUrl?: string,
    name?: string
  ): void {
    let fileName
    if (name) {
      fileName = name
    } else if (fileUrl) {
      fileName = genFileName(fileUrl, extension)
    } else {
      fileName = 'sourcefile'
    }
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${fileName}${extension}`)
    document.body.appendChild(link)
    link.click()
  }

  function genFileName(url?: string, extension?: string) {
    let fileName = ''
    if (extension === '.tar.gz') {
      const urlArray = url?.split('/').pop()
      fileName += urlArray
        ? urlArray.replace('.tar.gz', '')
        : 'sourcefile'
    } else if (extension === '.html') {
      const urlArray = url?.split('/').pop()
      fileName += urlArray
        ? urlArray.replace('.html', '')
        : 'sourcefile'
    } else if (
      extension === '.pdf' &&
      url?.includes('vignettes')
    ) {
      const urlArray = url?.split('/').pop()
      fileName += urlArray
        ? urlArray.replace('.pdf', '')
        : 'sourcefile'
    } else {
      url?.split('/').forEach((p) => {
        switch (p) {
          case 'manual':
            fileName += p + '_'
            break
          case 'r':
            fileName += 'R_'
            break
          case 'python':
            fileName += 'Python_'
            break
          default:
            break
        }
      })
    }
    return fileName
  }

  return {
    openBlob,
    downloadBlob
  }
}
