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
    <MarkdownDescription
      :description="packageBag.description || ''"
    ></MarkdownDescription>
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
      {{ $t('packages.classifiers') }}
    </div>
    <div class="d-flex" style="flex-direction: column">
      <ul>
        <li
          class="classifier-key"
          v-for="key in Object.keys(categories)"
        >
          <strong>{{ key }}</strong>
          <ul>
            <li
              class="classifier-value"
              v-for="value in categories[key]"
            >
              {{ value }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EntityModelPythonPackageDto } from '@/openapi'
import { computed, ref } from 'vue'
import { usePackagesStore } from '@/store/packages'
import MarkdownDescription from '@/components/common/MarkdownDescription.vue'

const package_store = usePackagesStore()

package_store.fetchPythonPackageFields()

const packageBag = computed<EntityModelPythonPackageDto>(
  () => package_store.package as EntityModelPythonPackageDto
)

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

const categories = computed(() => {
  let classifiers: string =
    packageBag.value.classifiers || ''
  let categories: Record<string, Array<string>> = {}
  classifiers
    ?.split(',')
    .forEach((classifierAndVal: string) => {
      let splitIndex = classifierAndVal.indexOf('::')
      let classifier = classifierAndVal.substring(
        0,
        splitIndex
      )
      let value = classifierAndVal.substring(
        splitIndex + 2,
        classifierAndVal.length
      )
      if (categories[classifier]) {
        categories[classifier].push(value)
      } else {
        categories[classifier] = [value]
      }
    })
  return categories
})

const submission = ref(package_store.submission)
</script>

<style lang="scss">
$text_color: rgba(var(--v-theme-about-package));
$background_color: rgba(var(--v-theme-about-background));

.classifier-value {
  display: list-item;
  list-style-type: disc;
  padding-left: 10px;
  margin-left: 20px;
}

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

.document {
  color: rgb(var(--v-theme-oared));
  transition: all 0.2s ease;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
}
</style>
