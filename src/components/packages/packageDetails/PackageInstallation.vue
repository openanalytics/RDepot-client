<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
  <div class="subtitle my-5">
    {{ $t('packages.install') }}
  </div>
  <div class="text">
    {{
      $t('packages.installInstruction', [
        packageBag?.technology
      ])
    }}
  </div>

  <div class="code mb-2 mt-4 mr-2 ml-1">
    <code class="d-flex justify-lg-space-between pt-7">
      {{
        $t('packages.download-code', [
          packageBag.name,
          packageBag.repository?.publicationUri
        ])
      }}
      <v-icon
        @click="copyContent()"
        icon="mdi-content-copy"
        size="large"
        start
      />
    </code>
  </div>
</template>

<script setup lang="ts">
import { EntityModelRPackageDto } from '@/openapi'
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { i18n } from '@/plugins/i18n'
import { notify } from '@kyvg/vue3-notification'
import { usePackageDetailsStore } from '@/store/package_details'

const { copy } = useClipboard()

const packageDetailsStore = usePackageDetailsStore()

const packageBag = computed<EntityModelRPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelRPackageDto
)

function copyContent() {
  try {
    copy(
      i18n.t('packages.download-code', [
        packageBag.value.name
      ])
    )
    notify({
      text: i18n.t('common.copied'),
      type: 'success'
    })
  } catch (error) {
    notify({
      text: i18n.t('common.errors.copyFailed'),
      type: 'error'
    })
  }
}
</script>

<style scoped lang="scss">
$text_color: rgba(var(--v-theme-about-package));
$code_color: rgba(var(--v-theme-code));

.subtitle {
  font-size: 2rem;
  line-height: 1.4;
  font-weight: 500;
  color: $text_color;
}

.text {
  color: $text_color;
  font-size: 1.125rem;
  line-height: 1.3;
}

.code {
  background-color: $code_color;
  padding: 20px;
  line-height: 1.5;
  border-radius: 8px;
  -webkit-box-shadow: 4px 4px 12px 0px #42445a;
  -moz-box-shadow: 4px 4px 12px 0px rgba(66, 68, 90, 1);
  box-shadow: 2px 2px 6px 0px rgba(66, 68, 90, 1);
  max-width: 1200px;
  font-size: 0.9em;
}
</style>