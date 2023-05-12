import { i18n } from '@/plugins/i18n'

export const packagesFiltrationLabels: Map<string, string> =
  new Map<string, string>([
    ['state', i18n.t('filtration.state')],
    ['deleted', i18n.t('filtration.deleted')],
    ['repository', i18n.t('filtration.repositoryName')],
    ['name', i18n.t('filtration.packageName')],
    ['technologies', i18n.t('filtration.technologies')]
  ])

export const repositoriesFiltrationLabels: Map<
  string,
  string
> = new Map<string, string>([
  ['deleted', i18n.t('filtration.deleted')],
  ['name', i18n.t('filtration.repositoryName')],
  ['technologies', i18n.t('filtration.technologies')]
])

export const submissionsFiltrationLabels: Map<
  string,
  string
> = new Map<string, string>([
  ['assignedToMe', i18n.t('filtration.assignedToMe')],
  ['state', i18n.t('filtration.state')],
  ['package', i18n.t('filtration.packageName')]
])

export const eventsFiltrationLabels: Map<string, string> =
  new Map<string, string>([
    ['userId', i18n.t('filtration.userId')],
    ['resourceId', i18n.t('filtration.resourceId')],
    ['eventType', i18n.t('filtration.eventType')],
    ['resourceType', i18n.t('filtration.resourceType')],
    ['technologies', i18n.t('filtration.technologies')]
  ])

export const packageMaintainersFiltrationLabels: Map<
  string,
  string
> = new Map<string, string>([
  ['deleted', i18n.t('filtration.deleted')],
  ['technologies', i18n.t('filtration.technologies')]
])

export const repositoryMaintainersFiltrationLabels: Map<
  string,
  string
> = packageMaintainersFiltrationLabels
