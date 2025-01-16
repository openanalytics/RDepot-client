/*
 * R Depot
 *
 * Copyright (C) 2012-2025 Open Analytics NV
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

import { Technologies } from '@/enum/Technologies'
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'
import { ref, computed } from 'vue'
import { i18n } from '@/plugins/i18n'

export function useEnumFiltration() {
  function sortValues(values: { title: string }[]) {
    return values.sort((a, b) =>
      a.title.localeCompare(b.title)
    )
  }

  const states = computed(() =>
    Object.values(EntityModelSubmissionDtoStateEnum).map(
      (state) => {
        return {
          title: i18n.t('states.' + state.toLowerCase()),
          value: state
        }
      }
    )
  )

  const technologies = ref(Technologies.options)

  const resourceTypes = computed(() => [
    {
      title: i18n.t('resourceType.package'),
      value: 'package'
    },
    {
      title: i18n.t('resourceType.repository'),
      value: 'repository'
    },
    { title: i18n.t('resourceType.user'), value: 'user' },
    {
      title: i18n.t('resourceType.submission'),
      value: 'submission'
    },
    {
      title: i18n.t('resourceType.packageMaintainer'),
      value: 'packageMaintainer'
    },
    {
      title: i18n.t('resourceType.repositoryMaintainer'),
      value: 'repositoryMaintainer'
    },
    {
      title: i18n.t('resourceType.accessToken'),
      value: 'accessToken'
    }
  ])

  const roles = computed(() => [
    { title: i18n.t('role.admin'), value: 'admin' },
    { title: i18n.t('resourceType.user'), value: 'user' },
    {
      title: i18n.t('resourceType.packageMaintainer'),
      value: 'packagemaintainer'
    },
    {
      title: i18n.t('resourceType.repositoryMaintainer'),
      value: 'repositorymaintainer'
    }
  ])

  const eventTypes = computed(() => [
    {
      title: i18n.t('eventTypes.create'),
      value: 'create'
    },
    {
      title: i18n.t('eventTypes.update'),
      value: 'update'
    },
    {
      title: i18n.t('eventTypes.delete'),
      value: 'delete'
    },
    {
      title: i18n.t('eventTypes.upload'),
      value: 'upload'
    }
  ])

  return {
    states,
    technologies,
    resourceTypes,
    eventTypes,
    roles,
    sortValues
  }
}
