import { defineAbilityFor } from '@/services/abilities'
import { Role } from '@/enum/UserRoles'

export const caslAbility = defineAbilityFor(Role.enum.user)
