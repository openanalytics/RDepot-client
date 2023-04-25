import { z } from 'zod'

export const OverlayEnum = z.enum([
  'Delete',
  'Edit',
  'Reset',
  'Filtration',
  'Create'
])
export type OverlayEnum = z.infer<typeof OverlayEnum>
