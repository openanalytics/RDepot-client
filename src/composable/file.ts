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

export function useFiles() {
  function formatFilename(filename: string): string {
    if (filename.length >= 50) {
      return `${filename.slice(0, 25)}...${filename.slice(
        -21
      )}`
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

  return {
    formatFilename,
    formatCutFilename
  }
}
