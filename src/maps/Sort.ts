/*
 * R Depot
 *
 * Copyright (C) 2012-2023 Open Analytics NV
 *
 * ===========================================================================
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Apache License as published by
 * The Apache Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Apache License for more details.
 *
 * You should have received a copy of the Apache License
 * along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

import { i18n } from '@/plugins/i18n'

export const SORT_PARAMS: Map<string, string> = new Map<
  string,
  string
>([
  [i18n.t('columns.name'), 'name'],
  [i18n.t('columns.email'), 'email'],
  [i18n.t('columns.username'), 'login'],
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
