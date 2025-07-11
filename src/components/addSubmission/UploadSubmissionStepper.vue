<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
 ===========================================================================
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the Apache License as published by
 The Apache Software Foundation, either version 2 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 Apache License for more details.
 
 You should have received a copy of the Apache License
 along with this program. If not, see <http://www.apache.org/licenses/>
 
-->

<template>
  <div style="max-width: 1500px !important; width: 100%">
    <StepTitle :e1="el" :technology="values.technology" />
    <v-window
      v-model="el"
      class="stepper mx-10"
      :touch="{ left: () => {}, right: () => {} }"
    >
      <v-window-item :value="el">
        <v-form>
          <keep-alive>
            <component
              :is="components[el - 1]"
              @next="changeValue"
            ></component>
          </keep-alive>
          <div class="d-flex justify-space-between">
            <v-btn
              v-if="el === 2"
              id="back-button"
              color="primary"
              @click="changeValue(1)"
            >
              {{ i18n.t('actions.general.goBack') }}
            </v-btn>
            <v-spacer v-else />
            <v-btn
              v-if="el === 1"
              id="next-button"
              :disabled="!values.repository"
              color="primary"
              @click="changeValue(2)"
            >
              {{ i18n.t('actions.general.continue') }}
            </v-btn>
            <v-tooltip :disabled="meta.valid && meta.dirty">
              <template #activator="{ props }">
                <div v-bind="props">
                  <v-btn
                    v-if="el === 2"
                    id="next-button"
                    :disabled="!(meta.valid && meta.dirty)"
                    color="primary"
                    @click="changeValue(3)"
                  >
                    {{ i18n.t('actions.general.submit') }}
                  </v-btn>
                </div>
              </template>
              {{ i18n.t('messages.errors.invalidForm') }}
            </v-tooltip>
          </div>
        </v-form>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import StepTitle from './StepTitle.vue'
import StepFirst from './StepFirst.vue'
import StepSecond from './StepSecond.vue'
import StepThird from './StepThird.vue'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useSubmissionValidationSchema } from '@/composable/submissions/submissionSchema'
import { useUploadSubmissionStore } from '@/store/setup/uploadSubmission'
import { i18n } from '@/plugins/i18n'

const components = [StepFirst, StepSecond, StepThird]

const el = ref(1)
const { submissionSchema } = useSubmissionValidationSchema()
const { values, setFieldValue, meta } = useForm({
  validationSchema: toTypedSchema(submissionSchema)
})
const uploadSubmissionStore = useUploadSubmissionStore()

async function changeValue(event: number) {
  el.value = event
  if (el.value == 1) {
    setFieldValue('packages', [])
  } else if (el.value == 3) {
    const parsedValues =
      await submissionSchema.parseAsync(values)
    uploadSubmissionStore.addSubmissionRequests(
      parsedValues
    )
  }
}
</script>

<style scoped lang="scss">
.stepper {
  max-width: 96% !important;
}
</style>
