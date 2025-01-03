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
  <v-card
    :title="$t('packageDetails.installation.install')"
  >
    <div v-if="packageBag?.repository?.published">
      <v-card-subtitle class="pb-3">
        <template
          v-if="
            packageBag?.repository.requiresAuthentication
          "
        >
          <i18n-t
            v-if="packageBag?.binary"
            keypath="packageDetails.installation.installInstructionBinary"
            tag="p"
          >
            <template #binary>
              <b>{{
                $t('packageDetails.installation.binary')
              }}</b>
            </template>
          </i18n-t>
          <p v-else>
            {{ installInstruction }}
          </p>
        </template>
        <template v-else>
          <i18n-t
            v-if="packageBag?.binary"
            keypath="packageDetails.installation.installInstructionBinaryCrane"
            tag="p"
          >
            <template #binary>
              <b>{{
                $t('packageDetails.installation.binary')
              }}</b>
            </template>
            <template #url>
              <a
                id="rclient-html"
                href="https://craneserver.net/docs/client/"
              >
                R Client
              </a>
            </template>
          </i18n-t>
          <i18n-t
            v-else
            :keypath="`packageDetails.installation.installInstructionCrane-${packageBag?.technology}`"
            tag="p"
          >
            <template #binary>
              <b>{{
                $t('packageDetails.installation.binary')
              }}</b>
            </template>
            <template #url>
              <a
                id="rclient-html"
                href="https://craneserver.net/docs/client/"
              >
                R Client
              </a>
            </template>
          </i18n-t>
        </template>
      </v-card-subtitle>
      <div class="code mb-4 mx-4">
        <code
          id="package-install-command"
          style="font-size: 0.9em"
          class="d-flex justify-lg-space-between align-center"
        >
          {{
            packageBag?.binary
              ? installCodeBinary
              : packageBag?.repository
                    .requiresAuthentication
                ? installCodeCrane
                : installCode
          }}
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
              $t('packages.copy')
            }}</span>
          </v-tooltip>
        </code>
      </div>
    </div>
    <div v-else>
      <v-card-subtitle class="pb-3">
        {{
          $t(
            'packageDetails.installation.noInstallInstruction'
          )
        }}
      </v-card-subtitle>
    </div>
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

const packageDetailsStore = usePackageDetailsStore()

const toasts = useToast()
const { copy } = useClipboard()
const { t } = useI18n()

const packageBag = computed<EntityModelRPackageDto>(
  () =>
    packageDetailsStore.packageBag as EntityModelRPackageDto
)

const installInstruction = computed<string>(() =>
  t(
    `packageDetails.installation.installInstruction-${packageBag.value.technology}`
  )
)

const installCode = computed<string>(() =>
  t(
    `packageDetails.installation.installCode-${packageBag.value.technology}`,
    [
      packageBag.value.name,
      packageBag.value.repository?.publicationUri,
      packageBag.value.repository?.name
    ]
  )
)

const installCodeCrane = computed<string>(() =>
  t(
    `packageDetails.installation.installCodeCrane-${packageBag.value.technology}`,
    [
      packageBag.value.name,
      packageBag.value.repository?.publicationUri,
      packageBag.value.repository?.name
    ]
  )
)

const installCodeBinary = computed<string>(() =>
  t('packageDetails.installation.installCodeBinary', [
    packageBag.value.name,
    packageBag.value.repository?.publicationUri,
    packageBag.value.repository?.name,
    packageBag.value.distribution
  ])
)

function copyContent() {
  try {
    copy(installCode.value)
    toasts.success(t('common.copied'))
  } catch {
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
  padding: 10px;
  line-height: 1.5;
  border-radius: 8px;
  -webkit-box-shadow: 4px 4px 12px 0px #42445a;
  -moz-box-shadow: 4px 4px 12px 0px rgba(66, 68, 90, 1);
  box-shadow: 2px 2px 6px 0px rgba(66, 68, 90, 1);
  max-width: 1200px;
  font-size: 0.9em;
}
</style>
