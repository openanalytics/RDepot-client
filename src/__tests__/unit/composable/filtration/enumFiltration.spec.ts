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

import { describe, it, expect } from 'vitest'

import { useEnumFiltration } from '@/composable/filtration/enumFiltration'
import { i18n } from '@/plugins/i18n'

describe('enum filtration composable', () => {
  it('should return current translation of all available states', () => {
    const { states } = useEnumFiltration()
    expect(states.value).toEqual([
      {
        title: i18n.t('properties.submissions.accepted'),
        value: 'ACCEPTED'
      },
      {
        title: i18n.t('properties.submissions.waiting'),
        value: 'WAITING'
      },
      {
        title: i18n.t('properties.submissions.cancelled'),
        value: 'CANCELLED'
      },
      {
        title: i18n.t('properties.submissions.rejected'),
        value: 'REJECTED'
      }
    ])
  })

  it('should return values sorted by title in default lang', () => {
    i18n.locale.value = 'en'
    const { eventTypes, sortValues } = useEnumFiltration()
    expect(sortValues(eventTypes.value)).toEqual([
      {
        title: 'Create',
        value: 'create'
      },
      {
        title: 'Delete',
        value: 'delete'
      },
      {
        title: 'Update',
        value: 'update'
      },
      {
        title: 'Upload',
        value: 'upload'
      }
    ])
  })

  it('should return current translation of all available states in changed translations', () => {
    i18n.locale.value = 'pl'
    const { states } = useEnumFiltration()
    expect(states.value).toEqual([
      {
        title: 'ZAAKCEPTOWANE',
        value: 'ACCEPTED'
      },
      {
        title: 'OCZEKUJĄCE',
        value: 'WAITING'
      },
      {
        title: 'ANULOWANE',
        value: 'CANCELLED'
      },
      {
        title: 'ODRZUCONE',
        value: 'REJECTED'
      }
    ])
  })

  it('should return technologies', () => {
    const { technologies } = useEnumFiltration()
    expect(technologies.value).toEqual(['Python', 'R'])
  })

  it('should return all resource types', () => {
    const { resourceTypes } = useEnumFiltration()
    expect(resourceTypes.value).toEqual([
      {
        title: i18n.t('resources.package'),
        value: 'package'
      },
      {
        title: i18n.t('resources.repository'),
        value: 'repository'
      },
      { title: i18n.t('resources.user'), value: 'user' },
      {
        title: i18n.t('resources.submission'),
        value: 'submission'
      },
      {
        title: i18n.t('resources.packageMaintainer'),
        value: 'packageMaintainer'
      },
      {
        title: i18n.t('resources.repositoryMaintainer'),
        value: 'repositoryMaintainer'
      },
      {
        title: i18n.t('resources.token'),
        value: 'accessToken'
      }
    ])
  })

  it('should return all resource types in changed translations', () => {
    const { resourceTypes } = useEnumFiltration()
    i18n.locale.value = 'pl'
    expect(resourceTypes.value).toEqual([
      {
        title: 'Pakiet',
        value: 'package'
      },
      {
        title: 'Repozytorium',
        value: 'repository'
      },
      { title: 'Użytkownik', value: 'user' },
      {
        title: 'Zgłoszenie',
        value: 'submission'
      },
      {
        title: 'Opiekun Pakietu',
        value: 'packageMaintainer'
      },
      {
        title: 'Opiekun Repozytorium',
        value: 'repositoryMaintainer'
      },
      {
        title: 'Token',
        value: 'accessToken'
      }
    ])
  })

  it('should return all roles', () => {
    const { roles } = useEnumFiltration()
    expect(roles.value).toEqual([
      { title: i18n.t('resources.admin'), value: 'admin' },
      { title: i18n.t('resources.user'), value: 'user' },
      {
        title: i18n.t('resources.packageMaintainer'),
        value: 'packagemaintainer'
      },
      {
        title: i18n.t('resources.repositoryMaintainer'),
        value: 'repositorymaintainer'
      }
    ])
  })

  it('should return all roles in changed translations', () => {
    i18n.locale.value = 'pl'
    const { roles } = useEnumFiltration()
    expect(roles.value).toEqual([
      { title: 'Administrator', value: 'admin' },
      { title: 'Użytkownik', value: 'user' },
      {
        title: 'Opiekun Pakietu',
        value: 'packagemaintainer'
      },
      {
        title: 'Opiekun Repozytorium',
        value: 'repositorymaintainer'
      }
    ])
  })

  it('should return all event types', () => {
    const { eventTypes } = useEnumFiltration()
    expect(eventTypes.value).toEqual([
      {
        title: i18n.t('properties.events.type.create'),
        value: 'create'
      },
      {
        title: i18n.t('properties.events.type.update'),
        value: 'update'
      },
      {
        title: i18n.t('properties.events.type.delete'),
        value: 'delete'
      },
      {
        title: i18n.t('properties.events.type.upload'),
        value: 'upload'
      }
    ])
  })

  it('should return all event types in changed translation', () => {
    i18n.locale.value = 'pl'
    const { eventTypes } = useEnumFiltration()
    expect(eventTypes.value).toEqual([
      {
        title: 'Utworzenie',
        value: 'create'
      },
      {
        title: 'Aktualizacja',
        value: 'update'
      },
      {
        title: 'Usunięcie',
        value: 'delete'
      },
      {
        title: 'Wgranie',
        value: 'upload'
      }
    ])
  })

  it('should return values sorted by title in changed lang', () => {
    i18n.locale.value = 'pl'
    const { eventTypes, sortValues } = useEnumFiltration()
    expect(sortValues(eventTypes.value)).toEqual([
      {
        title: 'Aktualizacja',
        value: 'update'
      },
      {
        title: 'Usunięcie',
        value: 'delete'
      },
      {
        title: 'Utworzenie',
        value: 'create'
      },

      {
        title: 'Wgranie',
        value: 'upload'
      }
    ])
  })
})
