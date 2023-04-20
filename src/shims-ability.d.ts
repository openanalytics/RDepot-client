import { Ability } from '@/services/abilities'

declare module 'vue' {
  interface ComponentCustomProperties {
    $ability: Ability
    $can(
      this: this,
      ...args: Parameters<this['$ability']['can']>
    ): boolean
  }
}
