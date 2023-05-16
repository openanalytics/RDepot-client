/* 
 *  R Depot
 *  
 *  Copyright (C) 2012-2023 Open Analytics NV
 *  
 *  ===========================================================================
 *  
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the Apache License as published by
 *  The Apache Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  Apache License for more details.
 *  
 *  You should have received a copy of the Apache License
 *  along with this program. If not, see <http://www.apache.org/licenses/>
 *  
 */

import { Technologies } from '@/enum/Technologies'
import { i18n } from '@/plugins/i18n'
import z from 'zod'

const linkSchema = z.object({
  rel: z.string().optional(),
  href: z.string().optional(),
  hreflang: z.string().optional(),
  media: z.string().optional(),
  title: z.string().optional(),
  type: z.string().optional(),
  deprecation: z.string().optional(),
  profile: z.string().optional(),
  name: z.string().optional()
})

export const nonEmptyString = z.string().nonempty()
export const url = nonEmptyString.url({
  message: i18n.t('common.errors.url')
})
export const email = nonEmptyString.email({
  message: i18n.t('common.errors.email')
})

export const repositorySchema = z.object({
  id: z.number().default(0),
  version: z.number().default(0),
  publicationUri: url,
  name: nonEmptyString,
  serverAddress: url,
  deleted: z.boolean().default(false),
  published: z.boolean().default(false),
  synchronizing: z.boolean().default(false),
  technology: Technologies,
  links: z.array(linkSchema).optional()
})

const repositoryProjectionSchema = z.object({
  id: z.number(),
  name: nonEmptyString,
  publicationUri: url,
  technology: Technologies
})

const userProjectionSchema = z.object({
  id: z.number(),
  name: nonEmptyString,
  login: nonEmptyString,
  email: email
})

export const UserRoleSchema = z.object({
  id: z.number().min(1).max(5),
  value: z.number().min(0).max(4),
  description: nonEmptyString,
  name: nonEmptyString
})

export const PackageSchema = z.object({
  id: z.number().optional(),
  user: userProjectionSchema.optional(),
  repository: repositoryProjectionSchema.optional(),
  submissionId: z.number().optional(),
  name: z.string().optional(),
  version: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  title: z.string().optional(),
  url: z.string().optional(),
  source: z.string().optional(),
  active: z.boolean().optional(),
  deleted: z.boolean().optional(),
  technology: z.string().optional(),
  links: z.array(linkSchema).optional()
})

export const repositoryMaintainerSchema = z.object({
  id: z.number(),
  user: userProjectionSchema,
  repository: repositoryProjectionSchema,
  deleted: z.boolean().default(false),
  description: z.string(),
  links: z.array(linkSchema).optional()
})

export const packageMaintainerSchema = z.object({
  id: z.number(),
  user: userProjectionSchema,
  packageName: nonEmptyString,
  repository: repositoryProjectionSchema,
  deleted: z.boolean().default(false),
  description: z.string(),
  links: z.array(linkSchema)
})

export function formValidation<T extends z.ZodTypeAny>(
  zObject: T
) {
  let curry = (input: unknown) => {
    const parsedInput = zObject.safeParse(input)
    if (parsedInput.success) {
      return parsedInput.data
    } else {
      return parsedInput.error.message
    }
  }
  return curry
}
