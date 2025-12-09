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
  <v-card :title="i18n.t('actions.general.install')">
    <v-card-subtitle class="pb-3">
      <i18n-t :keypath="installHint" tag="p">
        <template #url>
          <a
            id="rclient-html"
            target="_blank"
            href="https://craneserver.net/docs/client/"
          >
            R Client
          </a>
        </template>
      </i18n-t>
      <code
        v-if="installCommand"
        id="package-install-command"
        style="font-size: 0.9em"
        class="d-flex justify-lg-space-between align-center"
      >
        {{ installCommand }}
        <v-tooltip location="left">
          <template #activator="{ props }">
            <div
              id="tooltip-activator"
              class="d-flex align-center"
              v-bind="props"
            >
              <v-icon
                :icon="Icons.get('copy')"
                size="large"
                start
                @click="copyContent()"
              />
            </div>
          </template>
          <span id="tooltip-wait">{{
            i18n.t('actions.general.copy')
          }}</span>
        </v-tooltip>
      </code>
    </v-card-subtitle>
  </v-card>
</template>

<script setup lang="ts">
import { EntityModelRPackageDto } from '@/openapi'
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { usePackageDetailsStore } from '@/store/options/packageDetails'
import { useToast } from '@/composable/toasts'
import { useI18n } from 'vue-i18n'
import Icons from '@/maps/Icons'
import { Technologies } from '@/enum/Technologies'
import { usePackageInstallation } from '@/composable/packages/packageInstallation.ts'
import { i18n } from '@/plugins/i18n.ts'

const packageDetailsStore = usePackageDetailsStore()

const toasts = useToast()
const { copy } = useClipboard()
const { t } = useI18n()

const packageBag = computed<EntityModelRPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelRPackageDto
)

const { installCommands, installHints } =
  usePackageInstallation()

const installCommand = computed(() => {
  if (!packageBag.value.repository?.published) {
    return ''
  }

  if (
    packageBag.value.technology === Technologies.Enum.Python
  ) {
    return packageBag.value.repository
      ?.requiresAuthentication
      ? installCommands.python.crane
      : installCommands.python.standard
  }

  return packageBag.value.binary
    ? installCommands.r.binary
    : installCommands.r.standard
})

const installHint = computed(() => {
  if (!packageBag.value.repository?.published) {
    return installHints.value.notPublished
  }
  if (
    packageBag.value.technology === Technologies.Enum.Python
  ) {
    return installHints.value.python.standard
  }

  if (packageBag.value.repository.requiresAuthentication) {
    return packageBag.value.binary
      ? installHints.value.r.binaryCrane
      : installHints.value.r.standardCrane
  }
  return packageBag.value.binary
    ? installHints.value.r.binary
    : installHints.value.r.standard
})

function copyContent() {
  try {
    copy(installCommand.value)
    toasts.success(t('messages.general.copied'))
  } catch {
    toasts.error(t('messages.errors.copyFailed'))
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
  padding: 10px;
  line-height: 1.5;
  border-radius: 8px;
  -webkit-box-shadow: 4px 4px 12px 0px #42445a;
  -moz-box-shadow: 4px 4px 12px 0px rgba(66, 68, 90, 1);
  box-shadow: 2px 2px 6px 0px rgba(66, 68, 90, 1);
  max-width: 1200px;
  font-size: 0.9em;
}

code {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
