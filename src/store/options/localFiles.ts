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

import { EntityModelSubmissionDto } from '@/openapi'
import { defineStore } from 'pinia'
import { validatedData } from '@/services/openApiAccess'
import { useConfigStore } from './config'
import { useSubmissionStore } from './submission'
import { Technologies } from '@/enum/Technologies'

export type PackagePromise = {
  promise: Promise<validatedData<EntityModelSubmissionDto>>
  packageBag: File
  state: string
  error: string[]
  response?: validatedData<EntityModelSubmissionDto>
}

interface State {
  files: File[]
  fieldsError: object
}

export const useFilesListStore = defineStore('filesStore', {
  state: (): State => {
    return {
      files: [],
      fieldsError: {}
    }
  },
  actions: {
    checkValidity(
      file: File,
      format: string,
      fileExtension: string
    ) {
      return (
        file['name'].endsWith(fileExtension) ||
        file['type'] === format
      )
    },
    removeFile(file: File) {
      this.files.forEach((fileLocal: File, i: number) => {
        if (fileLocal == file) {
          this.files.splice(i, 1)
        }
      })
    },
    updateFilesAddNew(files: FileList | null) {
      this.files = [
        ...this.files,
        ...Array.from(files || [])
      ]
      if (files) {
        Array.from(files).forEach((file) => {
          ;(this.fieldsError as any)[`${file.name}`] = {
            rversion: '',
            architecture: '',
            distribution: ''
          }
        })
      }
      const submissionsStore = useSubmissionStore()
      if (
        submissionsStore.repository?.technology !=
          Technologies.enum.Python &&
        useConfigStore().generateManuals &&
        files != null
      ) {
        Array.from(files).forEach((file) => {
          submissionsStore.addGenerateManualOptionForPackage(
            file
          )
        })
      }
    }
  }
})
