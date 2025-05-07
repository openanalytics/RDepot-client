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
  <div class="mb-10">
    <strong>{{ i18n.t('updatedProperties.title') }}</strong>
    <div
      v-for="(property, i) in event.changedProperties"
      :key="i"
      class="d-flex align-center my-2"
    >
      <div style="width: fit-content">
        <v-chip size="small" color="primary" variant="flat">
          {{
            getTranslationWithFallbackValue(
              property.property
            )
          }}
        </v-chip>
      </div>

      <TruncatedText
        :value="
          getTranslationWithFallbackValue(
            property.valueBefore
          )
        "
      />
      <v-icon size="small" class="mx-3">{{
        Icons.get('arrow-right')
      }}</v-icon>
      <TruncatedText
        :value="
          getTranslationWithFallbackValue(
            property.valueAfter
          )
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TruncatedText from '@/components/common/tooltips/TruncatedText.vue'
import { useTranslations } from '@/composable/translations/translations'
import { EntityModelNewsfeedEventDto } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import Icons from '@/maps/Icons'

defineProps({
  event: {
    type: Object as () => EntityModelNewsfeedEventDto,
    required: true
  }
})
const { getTranslationWithFallbackValue } =
  useTranslations()
</script>
