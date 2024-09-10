<!--
 R Depot
 
 Copyright (C) 2012-2024 Open Analytics NV
 
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
  <div v-if="packageBag?.repository?.published">
    <div class="text">
      {{ installInstruction }}
    </div>

    <div class="code mb-2 mt-4 mr-2 ml-1">
      <code
        id="install-command"
        class="d-flex justify-lg-space-between pt-7"
      >
        {{ installCode }}
        <v-tooltip location="left">
          <template #activator="{ props }">
            <div id="tooltip-activator" v-bind="props">
              <v-icon
                :icon="Icons.get('copy')"
                size="large"
                start
                @click="copyContent()"
              />
            </div>
          </template>
          <span id="tooltip-wait">{{
            $t('packages.copy')
          }}</span>
        </v-tooltip>
      </code>
    </div>
  </div>
  <div v-else>
    <div class="text">
      {{ $t('packages.noInstallInstruction') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityModelRPackageDto } from '@/openapi'
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import Icons from '@/maps/Icons'

const { copy } = useClipboard()

const packageDetailsStore = usePackageDetailsStore()

const toasts = useToast()
const { t } = useI18n()

const packageBag = computed<EntityModelRPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelRPackageDto
)

const installInstruction = computed<string>(() => {
  return t(
    `packages.installInstruction-${packageBag.value.technology}`
  )
})

const installCode = computed<string>(() => {
  return t(
    `packages.installCode-${packageBag.value.technology}`,
    [
      packageBag.value.name,
      packageBag.value.repository?.publicationUri
    ]
  )
})

function copyContent() {
  try {
    copy(installCode.value)
    toasts.success(t('common.copied'))
  } catch (error) {
    toasts.error(t('common.errors.copyFailed'))
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
