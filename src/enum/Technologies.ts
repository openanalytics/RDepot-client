import { z } from 'zod'

export const Technologies = z.enum(['R', 'Python'])
export type Technologies = z.infer<typeof Technologies>
