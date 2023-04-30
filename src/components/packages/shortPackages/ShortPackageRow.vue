<template>
  <v-row :class="{ title: title }" id="package-row">
    <v-col
      id="package-name"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      <SortTitle v-if="title" :text="$t('columns.name')" />
      <TextRecord v-else :text="packageBag?.name" />
    </v-col>
    <v-col
      id="package-version"
      cols="1"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.version')"
      />
      <TextRecord v-else :text="packageBag?.version" />
    </v-col>
    <v-col
      id="package-description"
      cols="lg-8\7 sm-2"
      class="d-flex align-center"
    >
      <SortTitle v-if="title" :text="$t('columns.title')" />
      <TextRecord v-else :text="packageBag?.title" />
    </v-col>
    <v-col
      id="package-maintainer"
      cols="lg-2 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.maintainer')" />
      <TextRecord v-else :text="packageBag?.user?.name"
    /></v-col>
    <v-col
      id="package-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        no-sort
      />
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="navigate-icon"
              @click.stop
              @click="navigate"
              v-bind="props"
              color="oablue"
              >mdi-forward</v-icon
            >
          </template>
          <span id="action-details">{{
            $t('common.details')
          }}</span>
        </v-tooltip>
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import router from '@/router'
import { EntityModelPackageDto } from '@/openapi'
import SortTitle from '../SortTitle.vue'
import TextRecord from '../TextRecord.vue'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  packageBag: Object as () =>
    | EntityModelPackageDto
    | undefined
})

function navigate() {
  if (props.packageBag) {
    router.push({
      name: 'packageDetails',
      params: {
        name: props.packageBag.id
      }
    })
  }
}
</script>

<style lang="scss">
.v-col {
  padding: 10px !important;
  font-size: 13px !important;
}
.col {
  line-height: 1.3;
}
.title {
  font-weight: 600 !important;
  padding: 16px 24px;
}

.v-input__control {
  justify-content: center !important;
}

#packagerow {
  .v-input__details {
    display: none !important;
  }
}
</style>
