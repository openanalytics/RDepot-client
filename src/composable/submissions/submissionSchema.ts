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

import z from 'zod'
import { Technologies } from '@/enum/Technologies'
import { i18n } from '@/plugins/i18n'
import { useFiles } from '@/composable/file'

export function useSubmissionValidationSchema() {
  const rPackagePropertiesBaseFieldsSchema = {
    rversion: z.string({
      required_error: i18n.t('messages.errors.required')
    }),
    distribution: z.string({
      required_error: i18n.t('messages.errors.required')
    }),
    architecture: z.string({
      required_error: i18n.t('messages.errors.required')
    })
  }

  function packagePropertiesBaseFields() {
    return {
      file: z.instanceof(File),
      showNotes: z.boolean(),
      notes: z.string().optional(),
      replace: z.boolean(),
      generateManual: z.boolean()
    }
  }

  const repositorySchema = z
    .object({
      title: z
        .string()
        .min(1, i18n.t('messages.errors.required')),
      value: z.number(),
      props: z.object({
        technology: z.string(),
        allowedFiles: z.array(
          z.object({
            mimetype: z.string(),
            extension: z.string()
          })
        )
      })
    })
    .nullable()
    .refine(
      (val) => val !== null,
      i18n.t('messages.errors.required')
    )

  const submissionSchema = z
    .discriminatedUnion('technology', [
      z.object({
        technology: z.literal(undefined),
        repository: repositorySchema,
        packages: z
          .array(
            z.object({
              ...packagePropertiesBaseFields()
            })
          )
          .min(
            1,
            i18n.t('messages.general.chooseOneToContinue', {
              resource_type: i18n
                .t('resources.file', 2)
                .toLowerCase()
            })
          )
          .default([])
      }),
      z.object({
        technology: z.literal(Technologies.enum.R),
        repository: repositorySchema,
        packages: z
          .array(
            z.discriminatedUnion('binary', [
              z.object({
                binary: z.literal(true),
                ...packagePropertiesBaseFields(),
                ...rPackagePropertiesBaseFieldsSchema
              }),
              z.object({
                binary: z.literal(false),
                ...packagePropertiesBaseFields()
              }),
              z.object({
                binary: z.literal(undefined),
                ...packagePropertiesBaseFields()
              })
            ])
          )
          .min(
            1,
            i18n.t('messages.general.chooseOneToContinue', {
              resource_type: i18n
                .t('resources.file', 2)
                .toLowerCase()
            })
          )
          .default([])
      }),
      z.object({
        technology: z.literal(Technologies.enum.Python),
        repository: repositorySchema,
        packages: z
          .array(
            z.object({
              binary: z.boolean(),
              ...packagePropertiesBaseFields()
            })
          )
          .min(
            1,
            i18n.t('messages.general.chooseOneToContinue', {
              resource_type: i18n
                .t('resources.file', 2)
                .toLowerCase()
            })
          )
          .default([])
      })
    ])
    .superRefine((values, ctx) => {
      const { checkValidity } = useFiles()
      const indexes = checkValidity(
        values.packages,
        values.repository?.props.allowedFiles
      )
      const errorMessage = i18n.t(
        `messages.submissions.wrongExtension-${values.technology}`
      )
      indexes.forEach((idx) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['packages'],
          message: `${idx}.file: ${errorMessage}`
        })
      })
    })

  return { submissionSchema }
}
