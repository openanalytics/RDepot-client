/*
 * R Depot
 *
 * Copyright (C) 2012-2024 Open Analytics NV
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
import { useI18n } from 'vue-i18n'

export function useEnumFiltration() {
  const { t } = useI18n()

  const states = computed(() =>
    Object.values(EntityModelSubmissionDtoStateEnum).map(
      (state) => {
        return {
          title: t('states.' + state.toLowerCase()),
          value: state
        }
      }
    )
  )

  const technologies = ref(Technologies.options)

  const resourceTypes = computed(() => [
    {
      title: t('resourceType.package'),
      value: 'package'
    },
    {
      title: t('resourceType.repository'),
      value: 'repository'
    },
    { title: t('resourceType.user'), value: 'user' },
    {
      title: t('resourceType.submission'),
      value: 'submission'
    },
    {
      title: t('resourceType.packageMaintainer'),
      value: 'packageMaintainer'
    },
    {
      title: t('resourceType.repositoryMaintainer'),
      value: 'repositoryMaintainer'
    },
    {
      title: t('resourceType.accessToken'),
      value: 'accessToken'
    }
  ])

  const roles = ref([
    'admin',
    'user',
    'packagemaintainer',
    'repositorymaintainer'
  ])

  const eventTypes = computed(() => [
    { title: t('eventTypes.create'), value: 'create' },
    { title: t('eventTypes.update'), value: 'update' },
    { title: t('eventTypes.delete'), value: 'delete' },
    { title: t('eventTypes.upload'), value: 'upload' }
  ])

  return {
    states,
    technologies,
    resourceTypes,
    eventTypes,
    roles
  }
}
