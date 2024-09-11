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

import { SubmissionEditOptions } from '@/enum/SubmissionEditOptions'
import { i18n } from '@/plugins/i18n'
import { useSubmissionStore } from '@/store/options/submission'
import { computed } from 'vue'

export function useSubmissionActionTranslations() {
  const submissionsStore = useSubmissionStore()

  const editText = computed(() => {
    switch (
      submissionsStore.submissionsToEdit?.editOption
    ) {
      case SubmissionEditOptions.enum.accept: {
        return i18n.t('action.accept').toUpperCase()
      }
      case SubmissionEditOptions.enum.reject: {
        return i18n.t('action.reject').toUpperCase()
      }
      case SubmissionEditOptions.enum.cancel: {
        return i18n.t('action.cancel').toUpperCase()
      }
      default:
        return ''
    }
  })

  const editActionWarning = computed(() => {
    switch (
      submissionsStore.submissionsToEdit?.editOption
    ) {
      case SubmissionEditOptions.enum.accept: {
        return i18n
          .t('updatedProperties.accepted')
          .toLowerCase()
      }
      case SubmissionEditOptions.enum.reject: {
        return i18n
          .t('updatedProperties.rejected')
          .toLowerCase()
      }
      case SubmissionEditOptions.enum.cancel: {
        return i18n
          .t('updatedProperties.cancelled')
          .toLowerCase()
      }
      default:
        return ''
    }
  })
  return {
    editText,
    editActionWarning
  }
}
