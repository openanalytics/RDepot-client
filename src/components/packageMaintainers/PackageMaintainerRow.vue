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
      v-if="
        loggedUserStore.can(
          'PATCH',
          'packageMaintainers'
        ) ||
        loggedUserStore.can('DELETE', 'packageMaintainers')
      "
      id="package-maintainer-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        true
        center
        no-sort
        :text="$t('columns.actions')"
        justify="center"
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
              v-if="
                loggedUserStore.can(
                  'PATCH',
                  'packageMaintainers'
                )
              "
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
          v-if="
            loggedUserStore.can(
              'DELETE',
              'packageMaintainers'
            )
          "
        />
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { EntityModelPackageMaintainerDto } from '@/openapi'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'
import { useLoggedUserStore } from '@/store/logged_user'
import { usePackageMaintainersStore } from '@/store/package_maintainers'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources//TextRecord.vue'
import { OverlayEnum } from '@/enum/Overlay'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  packageMaintainer: Object as () =>
    | EntityModelPackageMaintainerDto
    | undefined
})

const loggedUserStore = useLoggedUserStore()
const commonStore = useCommonStore()
const maintainersStore = usePackageMaintainersStore()

function chooseMaintainer() {
  maintainersStore.setChosenMaintainer(
    props.packageMaintainer || {}
  )
}

function edit() {
  maintainersStore.setChosenMaintainer(
    props.packageMaintainer || {}
  )
  commonStore.setOverlayText(
    i18n.t('maintainers.edit', {
      maintainerName: props.packageMaintainer?.user?.id
    })
  )
  commonStore.setOverlayModel(true)
  commonStore.setOverlayOpacity(0.8)
  commonStore.setOverlayComponent(OverlayEnum.enum.Edit)
}

function deleteDialog() {
  maintainersStore.setChosenMaintainer(
    props.packageMaintainer || {}
  )
  commonStore.setOverlayText(
    i18n.t('maintainers.deleteQuestion', {
      maintainerName: props.packageMaintainer?.user?.id
    })
  )
  commonStore.setOverlayModel(true)
  commonStore.setOverlayOpacity(0.8)
  commonStore.setOverlayComponent(OverlayEnum.enum.Delete)
}
</script>
