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
import { useSubmissionStore } from '@/store/options/submission'
import { SubmissionEditOptions } from '@/enum/SubmissionEditOptions'
import { useSubmissionActionTranslations } from '@/composable/submissions/submissionActionTranslations'
import { i18n } from '@/plugins/i18n'

let submissionsStore: any

beforeEach(async () => {
  setActivePinia(createPinia())
  submissionsStore = useSubmissionStore()
})

describe('submission Action Translations', () => {
  it('should return correct translation for accept action', () => {
    i18n.locale.value = 'en'
    submissionsStore.submissionsToEdit = {
      editOption: SubmissionEditOptions.Enum.accept
    }
    const { editText, editActionWarning } =
      useSubmissionActionTranslations()
    expect(editText.value).toEqual('ACCEPT')
    expect(editActionWarning.value).toEqual('accepted')

    i18n.locale.value = 'pl'
    expect(editText.value).toEqual('ZAAKCEPTUJ')
    expect(editActionWarning.value).toEqual('zaakceptowane')
  })

  it('should return correct translation for reject action', () => {
    i18n.locale.value = 'en'
    submissionsStore.submissionsToEdit = {
      editOption: SubmissionEditOptions.Enum.reject
    }
    const { editText, editActionWarning } =
      useSubmissionActionTranslations()
    expect(editText.value).toEqual('REJECT')
    expect(editActionWarning.value).toEqual('rejected')

    i18n.locale.value = 'pl'
    expect(editText.value).toEqual('ODRZUĆ')
    expect(editActionWarning.value).toEqual('odrzucone')
  })

  it('should return correct translation for cancel action', () => {
    i18n.locale.value = 'en'
    submissionsStore.submissionsToEdit = {
      editOption: SubmissionEditOptions.Enum.cancel
    }
    const { editText, editActionWarning } =
      useSubmissionActionTranslations()
    expect(editText.value).toEqual('CANCEL')
    expect(editActionWarning.value).toEqual('cancelled')

    i18n.locale.value = 'pl'
    expect(editText.value).toEqual('ANULUJ')
    expect(editActionWarning.value).toEqual('anulowane')
  })
})
