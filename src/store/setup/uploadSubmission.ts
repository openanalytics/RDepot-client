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
import {
  addPythonSubmission,
  addRSubmission,
  getRConfigurationService
} from '@/services/submissionServices'
import { validatedData } from '@/services/openApiAccess'
import { useToast } from '@/composable/toasts'
import { i18n } from '@/plugins/i18n'
import { ref } from 'vue'
import { useSubmissionValidationSchema } from '@/composable/submissions/submissionSchema'
import z from 'zod'
import { Technologies } from '@/enum/Technologies'

export type PackagePromise = {
  promise: Promise<validatedData<EntityModelSubmissionDto>>
  packageBag?: File
  generateManual?: boolean
  entity?: EntityModelSubmissionDto
  state: string
  error: string[]
  response?: validatedData<EntityModelSubmissionDto>
  messageCode?: string
}

export const useUploadSubmissionStore = defineStore(
  'uploadSubmission',
  () => {
    type SubmissionSchemaType = z.infer<
      ReturnType<
        typeof useSubmissionValidationSchema
      >['submissionSchema']
    >
    const promises = ref<PackagePromise[]>([])
    const resolved = ref(false)
    const allowedRVersions = ref<string[]>([])
    const allowedDistributions = ref<string[]>([])
    const allowedArchitectures = ref<string[]>([])

    async function getRConfiguration() {
      await getRConfigurationService().then((response) => {
        allowedRVersions.value =
          response[0].allowedRVersions ?? []
        allowedDistributions.value =
          response[0].allowedDistributions ?? []
        allowedArchitectures.value =
          response[0].allowedArchitectures ?? []
      })
    }

    async function addSubmissionRequests(
      values: SubmissionSchemaType
    ) {
      const toasts = useToast()
      let warnings = 0

      if (values.technology == Technologies.enum.Python) {
        promises.value = values.packages.map(
          (packageBag) => {
            return {
              promise: addPythonSubmission(
                values.repository?.title!,
                packageBag.file,
                packageBag.replace,
                packageBag.binary,
                packageBag.notes
              ),
              packageBag: packageBag.file,
              generateManual: false,
              state: 'pending',
              error: [],
              response: undefined
            }
          }
        )
      } else if (values.technology == Technologies.enum.R) {
        promises.value = values.packages.map(
          (packageBag) => {
            if (packageBag.binary) {
              return {
                promise: addRSubmission(
                  values.repository?.title!,
                  packageBag.file,
                  packageBag.generateManual,
                  packageBag.replace,
                  packageBag.binary,
                  packageBag.rversion,
                  packageBag.architecture,
                  packageBag.distribution,
                  packageBag.notes
                ),
                packageBag: packageBag.file,
                generateManual: false,
                state: 'pending',
                error: [],
                response: undefined
              }
            } else {
              return {
                promise: addRSubmission(
                  values.repository?.title!,
                  packageBag.file,
                  packageBag.generateManual,
                  packageBag.replace,
                  packageBag.binary,
                  undefined,
                  undefined,
                  undefined,
                  packageBag.notes
                ),
                packageBag: packageBag.file,
                generateManual: packageBag.generateManual,
                state: 'pending',
                error: [],
                response: undefined
              }
            }
          }
        )
      }

      let fulfilled = 0
      promises.value.forEach(async (promise) => {
        await promise.promise
          .then((response) => {
            promise.response = response
            promise.state =
              response[3] == 'SUCCESS'
                ? 'success'
                : 'warning'
            promise.messageCode =
              response[4] !== 'undefined' ? response[4] : ''
            if (promise.state == 'warning') {
              warnings++
            }
          })
          .catch((err) => {
            promise.state = 'error'
            if (err.response?.data.data) {
              promise.error = err.response.data.data
            } else if (err.response?.data) {
              promise.error = err.response.data
            }
          })
          .finally(() => {
            if (++fulfilled == promises.value.length) {
              resolved.value = true
              if (warnings > 0) {
                toasts.warning(
                  i18n.t('submissions.upload.warning')
                )
              }
            }
          })
      })
    }

    return {
      addSubmissionRequests,
      promises,
      resolved,
      getRConfiguration,
      allowedDistributions,
      allowedArchitectures,
      allowedRVersions
    }
  }
)
