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

export function useBlob() {
  function openBlob(data: Blob): void {
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('target', '_blank')
    document.body.appendChild(link)
    link.click()
  }

  function downloadBlob(
    data: Blob,
    extension: string,
    fileUrl?: string
  ): void {
    const fileName = fileUrl
      ? genFileName(fileUrl)
      : 'sourcefile'
    const url = window.URL.createObjectURL(new Blob([data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${fileName}${extension}`)
    document.body.appendChild(link)
    link.click()
  }

  function genFileName(url?: string) {
    let fileName = ''
    url?.split('/').forEach((p) => {
      switch (p) {
        case 'manual':
          fileName += p
          break
        case 'r':
          fileName += 'R'
          break
        case 'python':
          fileName += 'Python'
          break
        default:
          break
      }
    })
    return fileName
  }

  return {
    openBlob,
    downloadBlob
  }
}