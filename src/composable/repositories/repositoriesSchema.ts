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

import { useRepositoryStore } from '@/store/options/repositories'
import { i18n } from '@/plugins/i18n'
import z from 'zod'
import { Technologies } from '@/enum/Technologies'
import { useConfigStore } from '@/store/options/config.ts'

export function useRepositoryValidationSchema() {
  const createRepositorySchema = (
    repositoryStore: ReturnType<typeof useRepositoryStore>,
    id?: number
  ) => {
    const url = z.string().url({
      message: i18n.t('messages.errors.url')
    })

    function getRegex(technology?: Technologies): string {
      const configStore = useConfigStore()
      let regexPattern: string = '.+'
      if (
        configStore.repositoryNameValidationRegex.general
      ) {
        regexPattern =
          configStore.repositoryNameValidationRegex.general
      }
      if (technology) {
        type TechnologyKey =
          keyof typeof configStore.repositoryNameValidationRegex.technology
        const technologyKey =
          technology.toLowerCase() as TechnologyKey

        if (
          technologyKey in
          configStore.repositoryNameValidationRegex
            .technology
        ) {
          regexPattern =
            configStore.repositoryNameValidationRegex
              .technology[technologyKey]
        }
      }
      return regexPattern
    }

    function getNameSchema(
      technology?: Technologies
    ): z.Schema<string> {
      return z
        .string()
        .refine(async (value) => {
          const invalid =
            await repositoryStore.isRepositoryNameTaken(
              value,
              id
            )
          return !invalid
        }, i18n.t('forms.repositories.errors.duplicate'))
        .refine((value) => {
          return new RegExp(getRegex(technology)).test(
            value
          )
        }, i18n.t('messages.errors.reponame'))
    }

    const repositorySchemaBaseFields = {
      id: z.number().default(0),
      version: z.number().default(0),
      publicationUri: url,
      serverAddress: url,
      requiresAuthentication: z.boolean().default(false),
      deleted: z.boolean().default(false),
      published: z.boolean().default(false),
      synchronizing: z.boolean().default(false)
    }

    return z.discriminatedUnion('technology', [
      z.object({
        ...repositorySchemaBaseFields,
        name: getNameSchema(),
        technology: z.literal(undefined),
        hashMethod: z.string().optional(),
        redirectToSource: z.boolean().optional()
      }),
      z.object({
        ...repositorySchemaBaseFields,
        name: getNameSchema(Technologies.enum.R),
        technology: z.literal(Technologies.enum.R),
        redirectToSource: z.boolean()
      }),
      z.object({
        ...repositorySchemaBaseFields,
        name: getNameSchema(Technologies.enum.Python),
        technology: z.literal(Technologies.enum.Python),
        hashMethod: z.string()
      })
    ])
  }

  return {
    createRepositorySchema
  }
}
