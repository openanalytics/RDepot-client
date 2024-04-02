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
  <v-row
    class="px-5"
    :class="{ title: title }"
    id="repository-maintainer-row"
  >
    <v-col
      id="repository-maintainer-name"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.repositoryMaintainer.name')"
        sortKey="columns.repositoryMaintainer.name"
        sortField="user.name"
      />
      <TextRecord
        v-else
        :text="repositoryMaintainer?.user?.name"
      />
    </v-col>
    <v-col
      id="repository-maintainer-repository"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="
          $t('columns.repositoryMaintainer.repository')
        "
        sortKey="columns.repositoryMaintainer.repository"
      />
      <TextRecord
        v-else
        :text="repositoryMaintainer?.repository?.name"
      />
    </v-col>
    <v-spacer />
    <v-col
      id="repository-maintainer-technology"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        no-sort
        :justify="JustifyEnum.Enum.center"
        :text="
          $t('columns.repositoryMaintainer.technology')
        "
        sortKey="columns.repositoryMaintainer.technology"
      />
      <TextRecord
        v-else
        no-margin
        :text="repositoryMaintainer?.repository?.technology"
      />
    </v-col>

    <v-col
      id="repository-maintainer-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :justify="JustifyEnum.Enum.center"
        no-sort
        :text="$t('columns.actions')"
        sortKey="columns.actions"
      />
      <span
        v-else-if="repositoryMaintainer"
        class="d-flex justify-center align-center"
      >
        <edit-icon
          :disabled="
            !canPatch(repositoryMaintainer.links) ||
            repositoryMaintainer.deleted
          "
          :text="i18n.t('maintainers.edit')"
          @set-entity="setEditMaintainer"
          :hoverMessage="
            repositoryMaintainer.deleted
              ? i18n.t('maintainers.deleted')
              : undefined
          "
        >
        </edit-icon>

        <delete-icon
          :disabled="
            !canDelete(repositoryMaintainer.links) ||
            repositoryMaintainer.deleted
          "
          :name="props.repositoryMaintainer?.user?.name"
          @setResourceId="setEditMaintainer"
          :hoverMessage="
            repositoryMaintainer.deleted
              ? i18n.t('maintainers.deleted')
              : undefined
          "
        />
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import SortTitle from '@/components/common/resources//SortTitle.vue'
import TextRecord from '@/components/common/resources//TextRecord.vue'
import { i18n } from '@/plugins/i18n'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { useRepositoryMaintainersStore } from '@/store/repository_maintainers'
import { EntityModelRepositoryMaintainerDto } from '@/openapi'
import { JustifyEnum } from '@/enum/Justify'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  repositoryMaintainer: Object as () =>
    | EntityModelRepositoryMaintainerDto
    | undefined
})

const maintainersStore = useRepositoryMaintainersStore()
const { canPatch, canDelete } = useUserAuthorities()

function setEditMaintainer() {
  if (props.repositoryMaintainer) {
    maintainersStore.setChosenMaintainer(
      props.repositoryMaintainer
    )
  }
}
</script>
