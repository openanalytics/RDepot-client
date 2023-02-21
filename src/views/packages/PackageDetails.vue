<template>
  <div class="mx-1 mb-10">
    <div class="package_title my-5">
      {{ packageBag?.title }}
    </div>
    <div class="text my-5">
      {{ packageBag?.description }}
    </div>
    <div class="text my-3">As described in R package:</div>
    <div class="d-flex" style="flex-direction: column">
      <div class="d-flex">
        <div class="col_title col_small">Author</div>
        <div class="col_desc">
          {{ packageBag.author }}
        </div>
      </div>
    </div>

    <div class="text my-3">Within RDepot:</div>
    <div class="d-flex" style="flex-direction: column">
      <div class="d-flex">
        <div class="col_title col_small">Submitter</div>
        <div class="col_desc">
          <!-- {{ packageBag.sub }} -->
        </div>
      </div>

      <div class="d-flex">
        <div class="col_title col_small">Approver</div>
        <div class="col_desc">
          <!-- {{ packageBag.sub }} -->
        </div>
      </div>

      <div class="d-flex">
        <div class="col_title col_small">Maintainer</div>
        <div class="col_desc">
          <!-- {{ packageBag.sub }} -->
        </div>
      </div>
    </div>
    <div class="subtitle my-5">Install</div>
    <div class="text">
      To install this package, start R and enter:
    </div>
    <div class="code my-2">
      <code>
        <!--TODO-->
        install.packages("{{ packageBag.name }}", repos =
        c(rdepot = "repository publication id when there
        will be dto with short version of repository
        avaiable"), getOption("repos")))
      </code>
    </div>
    <div class="subtitle my-5">Documentation</div>
    <div
      class="document"
      v-for="(vignette, index) in vignettes.data"
      :key="index"
    >
      {{ vignette.title }}
    </div>
    <div v-show="vignettes.data?.length == 0">
      No vignettes avaiable
    </div>
    <div class="document" @click="getManual">
      Reference Manual
    </div>
    <div class="subtitle my-5">Details</div>
    <div class="d-flex" style="flex-direction: column">
      <div class="d-flex">
        <div class="col_title">Depends</div>
        <div class="col_desc">
          {{ packageBag.description }}
        </div>
      </div>
      <div class="d-flex">
        <div class="col_title">Imports</div>
        <div class="col_desc">{{ packageBag.imports }}</div>
      </div>
      <div class="d-flex">
        <div class="col_title">Suggests</div>
        <div class="col_desc">
          {{ packageBag.suggests }}
        </div>
      </div>
      <div class="d-flex">
        <div class="col_title">System Requirements</div>
        <div class="col_desc">
          {{ packageBag.systemRequirements }}
        </div>
      </div>
      <div class="d-flex">
        <div class="col_title">License</div>
        <div class="col_desc">
          {{ packageBag.license }}
        </div>
      </div>
      <div class="d-flex">
        <div class="col_title">URL</div>
        <div class="col_desc">
          {{ packageBag.url }}
        </div>
      </div>
    </div>
    <div class="subtitle my-5">Downloads</div>
    <div class="d-flex" style="flex-direction: column">
      <div class="d-flex align-center">
        <div class="col_title">Source file</div>
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
        <div class="col_title">Windows binaries</div>
        <div class="col_desc">Not avaiable</div>
      </div>
      <div class="d-flex align-center">
        <div class="col_title">OS X binaries</div>
        <div class="col_desc">Not avaiable</div>
      </div>
      <div class="d-flex align-center">
        <div class="col_title">Old sources</div>
        <div class="col_desc document">Archive</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  EntityModelRPackageDto,
  ResponseDtoListVignette
} from '@/openapi'
import { computed } from 'vue'
import { usePackagesStore } from '@/store/packages'

const package_store = usePackagesStore()

const packageBag = computed<EntityModelRPackageDto>(() => {
  return package_store.package
})

const vignettes = computed<ResponseDtoListVignette>(() => {
  return package_store.vignettes
})
async function getManual() {
  await package_store.downloadManual()
}
</script>

<script lang="ts">
export default {
  beforeRouteEnter: async function (to) {
    const package_store = usePackagesStore()
    await package_store.fetchPackage(
      to.params.name as string
    )
  }
}
</script>

<style lang="scss">
$text_color: #555555;
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
  background-color: #bbb9b9;
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
  background-color: #e0dfdf;
  padding: 20px;
  line-height: 1.5;
  // border: solid 1px #424455;
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
