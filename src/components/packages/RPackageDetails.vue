<template>
  <div class="my-5 mx-1 mb-10">
    <div class="package_title my-5">
      {{ packageBag.title }}
    </div>
    <div class="text my-5">
      {{ packageBag.description }}
    </div>
    <div class="text my-3">
      {{ $t('packages.originalRPackageData') }}:
    </div>
    <div class="d-flex" style="flex-direction: column">
      <div class="d-flex">
        <div class="col_title col_small">
          {{ $t('packages.authors') }}:
        </div>
        <div class="col_desc">{{ packageBag.author }}</div>
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
      {{ $t('packages.install') }}
    </div>
    <div class="text">
      {{ $t('packages.installInstruction') }}
    </div>

    <div class="code my-2">
      <code class="d-flex justify-lg-space-between">
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
    <div class="subtitle my-5">
      {{ $t('packages.documentation') }}
    </div>
    <div
      class="document"
      v-for="(vignette, index) in vignettes.data"
      :key="index"
    >
      {{ vignette.title }}
    </div>
    <div v-show="vignettes.data?.length == 0">
      {{ $t('packages.noVignette') }}
    </div>
    <div class="document" @click="getManual">
      {{ $t('packages.referenceManual') }}
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
        <div class="col_desc document">
          {{ $t('packages.archive') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  EntityModelRPackageDto,
  ResponseDtoListVignette
} from '@/openapi'
import { computed, ref } from 'vue'
import { usePackagesStore } from '@/store/packages'
import { useClipboard } from '@vueuse/core'
import { i18n } from '@/plugins/i18n'
import { notify } from '@kyvg/vue3-notification'
const { copy } = useClipboard()
const package_store = usePackagesStore()

package_store.fetchRPackageFields()

const packageBag = computed<EntityModelRPackageDto>(
  () => package_store.package as EntityModelRPackageDto
)

const submission = ref(package_store.submission)

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

const vignettes = computed<ResponseDtoListVignette>(() => {
  return package_store.vignettes
})
async function getManual() {
  await package_store.downloadManual()
}

const details = [
  {
    translation: 'packages.depends',
    value: packageBag.value.depends
  },
  {
    translation: 'packages.imports',
    value: packageBag.value.imports
  },
  {
    translation: 'packages.suggests',
    value: packageBag.value.suggests
  },
  {
    translation: 'packages.systemRequirements',
    value: packageBag.value.systemRequirements
  },
  {
    translation: 'packages.license',
    value: packageBag.value.license
  },
  {
    translation: 'packages.url',
    value: packageBag.value.url
  }
]
</script>

<style lang="scss">
$text_color: rgba(var(--v-theme-about-package));
$background_color: rgba(var(--v-theme-about-background));
$code_color: rgba(var(--v-theme-code));

.package_title {
  font-size: 3rem;
  line-height: 1.4;
  font-weight: 500;
  color: $text_color;
}

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
