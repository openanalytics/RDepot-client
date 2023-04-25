<template>
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="package-maintainer-row"
  >
    <v-col
      id="package-maintainer-name"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle v-if="title" :text="$t('columns.name')" />
      <TextRecord
        v-else
        :text="packageMaintainer?.user?.name"
      />
    </v-col>
    <v-col
      id="package-maintainer-package"
      cols="lg-7"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.packageName')"
      />
      <TextRecord
        v-else
        :text="packageMaintainer?.packageName"
      />
    </v-col>
    <v-col
      id="package-maintainer-technology"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        center
        no-sort
        :text="$t('columns.technology')"
      />
      <TextRecord
        v-else
        :text="packageMaintainer?.repository?.technology"
        no-margin
      />
    </v-col>
    <v-col
      id="package-maintainer-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.repository')"
      />
      <TextRecord
        v-else
        :text="packageMaintainer?.repository?.name"
      />
    </v-col>
    <v-col
      id="package-maintainer-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        true
        no-sort
        :text="$t('columns.actions')"
      />
      <span
        v-else-if="
          packageMaintainer && !packageMaintainer.deleted
        "
        class="d-flex justify-center align-center"
      >
        <v-tooltip top>
          <template v-slot:activator="{ props }">
            <v-icon
              id="pencil-icon"
              @click.stop
              @click="edit"
              v-bind="props"
              class="ml-3"
              color="oablue"
              >mdi-pencil</v-icon
            >
          </template>
          <span id="action-edit">{{
            $t('maintainers.edit')
          }}</span>
        </v-tooltip>
        <delete-icon
          :name="props.packageMaintainer?.user?.name"
          :set-resource-id="chooseMaintainer"
        />
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { EntityModelPackageMaintainerDto } from '@/openapi'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import DeleteIcon from '../common/action_icons/DeleteIcon.vue'
import SortTitle from '../packages/SortTitle.vue'
import TextRecord from '../packages/TextRecord.vue'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  packageMaintainer: Object as () =>
    | EntityModelPackageMaintainerDto
    | undefined
})

const maintainers_store = usePackageMaintainersStore()

function edit() {}

function chooseMaintainer() {
  if (props.packageMaintainer) {
    maintainers_store.setChosenMaintainer(
      props.packageMaintainer
    )
  }
}
</script>
