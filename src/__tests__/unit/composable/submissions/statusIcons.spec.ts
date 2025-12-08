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

import { describe, it, expect, beforeEach } from 'vitest'

import { createPinia, setActivePinia } from 'pinia'
import { useSubmissionIcons } from '@/composable/submissions/statusIcons'
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'
import { i18n } from '@/plugins/i18n'

beforeEach(async () => {
  setActivePinia(createPinia())
})

describe('status icons composable', () => {
  it('should return icon for accepted submission', () => {
    const { getStatusIcon } = useSubmissionIcons()
    expect(
      getStatusIcon(
        EntityModelSubmissionDtoStateEnum.ACCEPTED
      )
    ).toEqual('mdi-email-check-outline')
  })
  it('should return icon for waiting submission', () => {
    const { getStatusIcon } = useSubmissionIcons()
    expect(
      getStatusIcon(
        EntityModelSubmissionDtoStateEnum.WAITING
      )
    ).toEqual('mdi-progress-question')
  })

  it('should return icon for rejected submission', () => {
    const { getStatusIcon } = useSubmissionIcons()
    expect(
      getStatusIcon(
        EntityModelSubmissionDtoStateEnum.REJECTED
      )
    ).toEqual('mdi-email-remove-outline')
  })

  it('should return icon for cancelled submission', () => {
    const { getStatusIcon } = useSubmissionIcons()
    expect(
      getStatusIcon(
        EntityModelSubmissionDtoStateEnum.CANCELLED
      )
    ).toEqual('mdi-cancel')
  })

  it('should return color for accepted submission', () => {
    const { getStatusColor } = useSubmissionIcons()
    expect(
      getStatusColor(
        EntityModelSubmissionDtoStateEnum.ACCEPTED
      )
    ).toEqual('success')
  })
  it('should return color for waiting submission', () => {
    const { getStatusColor } = useSubmissionIcons()
    expect(
      getStatusColor(
        EntityModelSubmissionDtoStateEnum.WAITING
      )
    ).toEqual('')
  })

  it('should return color for rejected submission', () => {
    const { getStatusColor } = useSubmissionIcons()
    expect(
      getStatusColor(
        EntityModelSubmissionDtoStateEnum.REJECTED
      )
    ).toEqual('error')
  })

  it('should return color for cancelled submission', () => {
    const { getStatusColor } = useSubmissionIcons()
    expect(
      getStatusColor(
        EntityModelSubmissionDtoStateEnum.CANCELLED
      )
    ).toEqual('error')
  })

  it('should return tooltip message for accepted submission', () => {
    const { getTooltipMessage } = useSubmissionIcons()
    expect(
      getTooltipMessage(
        EntityModelSubmissionDtoStateEnum.ACCEPTED
      )
    ).toEqual(i18n.t('properties.submissions.accepted'))
  })
  it('should return tooltip message for waiting submission', () => {
    const { getTooltipMessage } = useSubmissionIcons()
    expect(
      getTooltipMessage(
        EntityModelSubmissionDtoStateEnum.WAITING
      )
    ).toEqual(
      i18n.t('messages.submissions.waitingForAction')
    )
  })

  it('should return tooltip message for rejected submission', () => {
    const { getTooltipMessage } = useSubmissionIcons()
    expect(
      getTooltipMessage(
        EntityModelSubmissionDtoStateEnum.REJECTED
      )
    ).toEqual(i18n.t('properties.submissions.rejected'))
  })

  it('should return tooltip message for cancelled submission', () => {
    const { getTooltipMessage } = useSubmissionIcons()
    expect(
      getTooltipMessage(
        EntityModelSubmissionDtoStateEnum.CANCELLED
      )
    ).toEqual(i18n.t('properties.submissions.cancelled'))
  })
})
