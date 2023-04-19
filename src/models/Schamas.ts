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
export const validUrl = nonEmptyString.url({
  message: i18n.t('common.errors.url')
})

export const repositorySchema = z.object({
  id: z.number().default(0),
  version: z.number().default(0),
  publicationUri: validUrl,
  name: nonEmptyString,
  serverAddress: validUrl,
  deleted: z.boolean().default(false),
  published: z.boolean().default(false),
  synchronizing: z.boolean().default(false),
  technology: Technologies,
  links: z.array(linkSchema).optional()
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
