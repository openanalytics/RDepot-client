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

  function packagePropertiesBaseFields(
    technology?: Technologies
  ) {
    return {
      file: z.instanceof(File).superRefine((value, ctx) => {
        const { checkValidity } = useFiles()
        const isValid =
          checkValidity(
            value,
            'application/gzip',
            '.tar.gz'
          ) ||
          checkValidity(
            value,
            'application/x-gzip',
            '.tar.gz'
          ) ||
          (technology == Technologies.enum.Python &&
            checkValidity(
              value,
              'application/octet-stream',
              '.whl'
            ))
        if (!isValid) {
          let errorMessage = i18n.t(
            'messages.submissions.wrongExtension'
          )
          if (technology) {
            errorMessage = i18n.t(
              `messages.submissions.wrongExtension-${technology}`
            )
          }

          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${ctx.path.join('.')}: ${errorMessage} 
                `
          })
        }
      }),
      showNotes: z.boolean(),
      notes: z.string().optional(),
      replace: z.boolean()
    }
  }

  const repositorySchema = z
    .object({
      title: z
        .string()
        .min(1, i18n.t('messages.errors.required')),
      value: z.number(),
      props: z.object({
        technology: z.string()
      })
    })
    .nullable()
    .refine(
      (val) => val !== null,
      i18n.t('messages.errors.required')
    )

  const submissionSchema = z.discriminatedUnion(
    'technology',
    [
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
                ...packagePropertiesBaseFields(
                  Technologies.enum.R
                ),
                ...rPackagePropertiesBaseFieldsSchema
              }),
              z.object({
                binary: z.literal(false),
                generateManual: z.boolean(),
                ...packagePropertiesBaseFields(
                  Technologies.enum.R
                )
              }),
              z.object({
                binary: z.literal(undefined),
                generateManual: z.boolean(),
                ...packagePropertiesBaseFields(
                  Technologies.enum.R
                )
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
              ...packagePropertiesBaseFields(
                Technologies.enum.Python
              )
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
    ]
  )

  return { submissionSchema }
}
