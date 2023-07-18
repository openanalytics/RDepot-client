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
  <div class="my-5 mx-1 mb-10">
    <div class="package_title my-5">
      {{
        packageBag.title ||
        packageBag.summary ||
        packageBag.name
      }}
    </div>
    <div
      v-dompurify-html="packageBagDescription"
      class="text my-5"
    ></div>
    <div class="text my-3">
      {{ $t('packages.originalPythonPackageData') }}:
    </div>
    <div class="d-flex" style="flex-direction: column">
      <div class="d-flex">
        <div class="col_title col_small">
          {{ $t('packages.authors') }}:
        </div>
        <div class="col_desc">{{ packageBag.author }}</div>
      </div>
      <div class="d-flex">
        <div class="col_title col_small">
          {{ $t('packages.emailAuthors') }}:
        </div>
        <div class="col_desc">
          {{ packageBag.authorEmail }}
        </div>
      </div>
    </div>

    <div class="text my-3">
      {{ $t('packages.withinRdepot') }}:
    </div>
    <div class="d-flex" style="flex-direction: column">
      <div class="d-flex">
        <div class="col_title col_small">
          {{ $t('packages.submitter') }}:
        </div>
        <div class="col_desc">
          {{ submission?.submitter?.name }}
        </div>
      </div>

      <div class="d-flex">
        <div class="col_title col_small">
          {{ $t('packages.approver') }}:
        </div>
        <div class="col_desc">
          {{ submission?.approver?.name }}
        </div>
      </div>

      <div class="d-flex">
        <div class="col_title col_small">
          {{ $t('packages.maintainer') }}:
        </div>
        <div class="col_desc">
          {{ packageBag.user?.name }}
        </div>
      </div>
    </div>
    <div class="subtitle my-5">
      {{ $t('packages.details') }}
    </div>
    <div class="d-flex" style="flex-direction: column">
      <template v-for="{ translation, value } in details">
        <div v-if="value" class="d-flex">
          <div class="col_title">
            {{ $t(translation) }}
          </div>
          <div class="col_desc">
            {{ value }}
          </div>
        </div>
      </template>
    </div>
    <div class="subtitle my-5">
      {{ $t('packages.downloads') }}
    </div>
    <div class="d-flex" style="flex-direction: column">
      <div class="d-flex align-center">
        <div class="col_title">
          {{ $t('packages.sourceFile') }}
        </div>
        <a
          :href="
            '/manager/packages/' +
            packageBag.id +
            '/download/' +
            packageBag.name +
            '_' +
            packageBag.version +
            '.tar.gz'
          "
          class="col_desc document"
        >
          {{ packageBag.name }}_{{
            packageBag.version
          }}.tar.gz
        </a>
      </div>
      <div class="d-flex align-center">
        <div class="col_title">
          {{ $t('packages.windowsBinaries') }}
        </div>
        <div class="col_desc">
          {{ $t('common.notAvailable') }}
        </div>
      </div>
      <div class="d-flex align-center">
        <div class="col_title">
          {{ $t('packages.osxBinaries') }}
        </div>
        <div class="col_desc">
          {{ $t('common.notAvailable') }}
        </div>
      </div>
      <div class="d-flex align-center">
        <div class="col_title">
          {{ $t('packages.oldSources') }}
        </div>
        <div class="col_desc">
          {{ $t('packages.archive') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityModelPythonPackageDto } from '@/openapi'
import { computed, ref } from 'vue'
import { usePackagesStore } from '@/store/packages'
import { marked } from 'marked'
import { useUtilities } from '@/composable/utilities'

const package_store = usePackagesStore()

package_store.fetchPythonPackageFields()

const packageBag = computed<EntityModelPythonPackageDto>(
  () => package_store.package as EntityModelPythonPackageDto
)

const { renderer } = useUtilities()

const packageBagDescription = computed(() => {
  marked.use({ renderer })
  return marked.parse(
    package_store.package?.description?.replaceAll(
      '\\n',
      '\n'
    ) || '',
    { breaks: true, gfm: true }
  )
})

const details = [
  {
    translation: 'packages.version',
    value: packageBag.value.version
  },
  {
    translation: 'packages.platform',
    value: packageBag.value.platform
  },
  {
    translation: 'packages.projectUrl',
    value: packageBag.value.projectUrl
  },
  {
    translation: 'packages.providesExtra',
    value: packageBag.value.providesExtra
  },
  {
    translation: 'packages.requiresDist',
    value: packageBag.value.requiresDist
  },
  {
    translation: 'packages.requiresExternal',
    value: packageBag.value.requiresExternal
  },
  {
    translation: 'packages.requiresPython',
    value: packageBag.value.requiresPython
  },
  {
    translation: 'packages.url',
    value: packageBag.value.url
  }
]

const submission = ref(package_store.submission)
</script>

<style lang="scss">
$text_color: rgba(var(--v-theme-about-package));
$background_color: rgba(var(--v-theme-about-background));
$code_color: rgba(var(--v-theme-code));

h1,
.package_title {
  font-size: 3rem;
  line-height: 1.4;
  font-weight: 500;
  color: $text_color;
}

h2,
.subtitle {
  font-size: 2rem;
  line-height: 1.4;
  font-weight: 500;
  color: $text_color;
}

p,
.text {
  color: $text_color;
  font-size: 1.125rem;
  line-height: 1.3;
}

.col_title {
  color: $text_color;
  width: 130px;
  background-color: $background_color;
  margin-right: 1rem;
  font-weight: 500;
  padding: 3px;
  border-radius: 4px;
  margin: 1px;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.01);
  }
}

.col_small {
  width: 90px;
}

.col_desc {
  padding: 3px;
  margin: 1px;
  color: $text_color;
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

.document {
  color: rgb(var(--v-theme-oared));
  transition: all 0.2s ease;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
}
</style>
