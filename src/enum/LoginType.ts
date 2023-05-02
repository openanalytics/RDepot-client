import { z } from 'zod'

export const LoginType = z.enum(['DEFAULT', 'KEYCLOAK'])
export type LoginType = z.infer<typeof LoginType>
