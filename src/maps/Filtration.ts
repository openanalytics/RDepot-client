/*
 *  R Depot
 *
 *  Copyright (C) 2012-2023 Open Analytics NV
 *
 *  ===========================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the Apache License as published by
 *  The Apache Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  Apache License for more details.
 *
 *  You should have received a copy of the Apache License
 *  along with this program. If not, see <http://www.apache.org/licenses/>
 *
 */

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
