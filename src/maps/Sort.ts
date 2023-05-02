import { i18n } from '@/plugins/i18n'

export const sort_params: Map<string, string> = new Map<
  string,
  string
>([
  [i18n.t('columns.name'), 'name'],
  [i18n.t('columns.version'), 'version'],
  [i18n.t('columns.title'), 'title'],
  [i18n.t('columns.maintainer'), 'user'],
  [i18n.t('columns.active'), 'active'],
  [i18n.t('columns.approver'), 'approver'],
  [i18n.t('columns.submitter'), 'submitter'],
  [i18n.t('columns.publicationUri'), 'publicationUri'],
  [i18n.t('columns.serverAddress'), 'serverAddress'],
  [i18n.t('columns.packagesNo'), 'packagesNo'],
  [i18n.t('columns.published'), 'published'],
  [i18n.t('columns.published'), 'published'],
  [i18n.t('columns.technology'), 'resourceTechnology'],
  [i18n.t('columns.repository'), 'repository'],
  [i18n.t('columns.accepted'), 'state'],
  [i18n.t('columns.package'), 'packageName'],
  [i18n.t('columns.date'), 'date'],
  [i18n.t('columns.packageName'), 'packageName']
])

//TODO check sort by number of packages
//TODO for now sort is with ASCII characters
