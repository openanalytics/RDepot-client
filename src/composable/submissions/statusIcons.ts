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

import {
  EntityModelSubmissionDtoStateEnum,
  SubmissionProjectionStateEnum
} from '@/openapi'
import { i18n } from '@/plugins/i18n'

export function useSubmissionIcons() {
  function getStatusIcon(
    state?:
      | EntityModelSubmissionDtoStateEnum
      | SubmissionProjectionStateEnum
  ) {
    switch (state) {
      case EntityModelSubmissionDtoStateEnum.ACCEPTED:
        return 'mdi-check-circle-outline'
      case EntityModelSubmissionDtoStateEnum.WAITING:
        return 'mdi-progress-question'
      case EntityModelSubmissionDtoStateEnum.REJECTED:
        return 'mdi-close-circle-outline'
      case EntityModelSubmissionDtoStateEnum.CANCELLED:
        return 'mdi-close-circle-outline'
      default:
        return
    }
  }

  function getStatusColor(
    state?:
      | EntityModelSubmissionDtoStateEnum
      | SubmissionProjectionStateEnum
  ) {
    switch (state) {
      case EntityModelSubmissionDtoStateEnum.ACCEPTED:
        return 'success'
      case EntityModelSubmissionDtoStateEnum.WAITING:
        return ''
      case EntityModelSubmissionDtoStateEnum.REJECTED:
        return 'error'
      case EntityModelSubmissionDtoStateEnum.CANCELLED:
        return 'error'
      default:
        return
    }
  }

  function getTooltipMessage(
    state: EntityModelSubmissionDtoStateEnum
  ) {
    switch (state) {
      case EntityModelSubmissionDtoStateEnum.ACCEPTED:
        return i18n.t('submissions.accepted')
      case EntityModelSubmissionDtoStateEnum.WAITING:
        return i18n.t('submissions.waitingForAction')
      case EntityModelSubmissionDtoStateEnum.REJECTED:
        return i18n.t('submissions.rejected')
      case EntityModelSubmissionDtoStateEnum.CANCELLED:
        return i18n.t('submissions.cancelled')
    }
  }

  return {
    getStatusIcon,
    getStatusColor,
    getTooltipMessage
  }
}
