import { Ability } from '@/plugins/casl'

declare module 'vue' {
  interface ComponentCustomProperties {
    $ability: Ability
    $can(
      this: this,
      ...args: Parameters<this['$ability']['can']>
    ): boolean
  }
}
