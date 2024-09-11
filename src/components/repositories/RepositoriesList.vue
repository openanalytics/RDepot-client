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
  <OATable
    v-model:expanded="expanded"
    :headers="filteredHeaders"
    :items="repositoryStore.repositories"
    :items-length="repositoryStore.totalNumber"
    item-value="name"
    :title="i18n.t('repositories.list')"
    :loading="repositoryStore.loading"
    expand-on-click
    :sort-by="sortBy"
    :return-object="false"
    @update:options="fetchData"
  >
    <template #topAction>
      <AddButton v-if="postCondition" />
    </template>

    <template #[`item.name`]="{ value }">
      <div :id="`repositories-list-${value}`">
        {{ value }}
      </div>
    </template>
    <template #[`item.published`]="{ item }">
      <v-tooltip
        location="top"
        :disabled="!isDisabled(item)"
      >
        <template #activator="{ props }">
          <span
            v-bind="props"
            style="width: 100%"
            class="d-flex justify-center"
          >
            <v-checkbox
              id="checkbox-published"
              v-model="item.published"
              density="compact"
              :disabled="isDisabled(item)"
              hide-details
              :readonly="isDisabled(item)"
              :color="isDisabled(item) ? 'grey' : 'oablue'"
              :class="{
                'mr-6': item.lastPublicationSuccessful
              }"
              @click.stop="updateRepositoryPublished(item)"
            >
              <template #append>
                <v-icon
                  v-if="
                    !item.lastPublicationSuccessful &&
                    item.lastPublicationTimestamp
                  "
                  id="repository-description-publication-status"
                  v-tooltip="
                    $t(
                      `repositories.details.publication-failed-on`,
                      {
                        dateTime: formatDateTime(
                          new Date(
                            item.lastPublicationTimestamp
                          )
                        )
                      }
                    )
                  "
                  :icon="Icons.get('exclamation')"
                  color="oared"
                  @click.stop=""
                >
                </v-icon>
              </template>
            </v-checkbox>
          </span>
        </template>
        <span v-if="!canPatch(item.links)">{{
          $t('common.notAuthorized')
        }}</span>
        <span v-if="configStore.declarativeMode">{{
          $t('repositories.declarative.publish')
        }}</span>
        <span v-if="item.deleted">
          {{ $t('repositories.deleted') }}</span
        >
        <span v-if="isPending(item)">
          {{ $t('common.pending') }}</span
        >
      </v-tooltip> </template
    ><template #[`item.actions`]="{ item }">
      <ProgressCircularSmall v-if="isPending(item)" />
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <EditIcon
          :disabled="
            !canPatch(item.links) ||
            configStore.declarativeMode ||
            item.deleted
          "
          :text="$t('common.edit')"
          :hover-message="
            configStore.declarativeMode
              ? $t('repositories.declarative.edit')
              : item.deleted
              ? $t('repositories.deleted')
              : undefined
          "
          @set-entity="chooseRepositoryToUpdate(item)"
        />
        <DeleteIcon
          v-if="item.name"
          :id="`delete-repository-icon-${item.id}`"
          :disabled="
            !configStore.deletingRepositories ||
            !canDelete(item.links) ||
            configStore.declarativeMode ||
            item.deleted
          "
          :name="item.name"
          :hover-message="
            configStore.declarativeMode
              ? $t('repositories.declarative.delete')
              : !configStore.deletingRepositories
              ? $t('config.deletingRepositories')
              : item.deleted
              ? $t('repositories.deleted')
              : undefined
          "
          @set-resource-id="chooseRepositoryToUpdate(item)"
        /> </span
    ></template>
    <template #expanded-row="{ columns }">
      <td :colspan="columns.length">
        <div class="additional-row">
          <v-card class="additional-row expanded-package">
            <RepositoryDescription />
          </v-card>
        </div>
      </td>
    </template>
  </OATable>
</template>

<script setup lang="ts">
import { EntityModelRepositoryDto } from '@/openapi'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import { useRepositoryStore } from '@/store/options/repositories'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { i18n } from '@/plugins/i18n'
import {
  DataTableHeaders,
  DataTableOptions,
  Sort
} from '@/models/DataTableOptions'
import { useConfigStore } from '@/store/options/config'
import { useUtilities } from '@/composable/utilities'
import { computed } from 'vue'
import { isAtLeastRepositoryMaintainer } from '@/enum/UserRoles'
import { ref } from 'vue'
import { useSort } from '@/composable/sort'
import { useAuthorizationStore } from '@/store/options/authorization'
import ProgressCircularSmall from '../common/progress/ProgressCircularSmall.vue'
import RepositoryDescription from './repositoryDetails/RepositoryDescription.vue'
import { Technologies } from '@/enum/Technologies'
import Icons from '@/maps/Icons'
import { useDates } from '@/composable/date'
import OATable from '../common/datatable/OATable.vue'
import AddButton from '../common/buttons/AddButton.vue'

const { deepCopy } = useUtilities()
const repositoryStore = useRepositoryStore()
const { canDelete, canPatch } = useUserAuthorities()
const configStore = useConfigStore()
const authorizationStore = useAuthorizationStore()
const { formatDateTime } = useDates()

const exp = ref<string[]>([])

const { getSort } = useSort()
const defaultSort: Sort[] = [{ key: 'name', order: 'asc' }]
const sortBy = ref(defaultSort)

const expanded = computed({
  get(): string[] {
    return exp.value
  },
  async set(newVal: string[]) {
    repositoryStore.chosenRepository = {}
    let newRepo = newVal[0]
    if (
      newVal[0] == undefined ||
      newVal[0] == exp.value[0]
    ) {
      newRepo = newVal[1]
    }
    exp.value = []
    exp.value.push(newRepo)
    getRepositoryDetails(newRepo)
  }
})

const postCondition = computed(() =>
  authorizationStore.can('POST', 'repository')
)

const headers = computed<DataTableHeaders[]>(() => [
  {
    title: i18n.t('columns.repository.name'),
    align: 'start',
    key: 'name',
    width: 200
  },
  {
    title: i18n.t('columns.repository.publicationUri'),
    align: 'start',
    key: 'publicationUri',
    width: 250
  },
  {
    title: i18n.t('columns.repository.serverAddress'),
    align: 'start',
    key: 'serverAddress'
  },
  {
    title: i18n.t('columns.repository.technology'),
    align: 'center',
    key: 'technology',
    width: 130
  },
  {
    title: i18n.t('columns.repository.version'),
    align: 'center',
    key: 'version',
    width: 130
  },
  {
    title: i18n.t('columns.repository.packagesNo'),
    align: 'center',
    key: 'numberOfPackages',
    width: 130,
    sortable: false
  },
  {
    title: i18n.t('columns.repository.published'),
    align: 'center',
    key: 'published',
    width: 150
  },
  {
    title: i18n.t('columns.actions'),
    align: 'center',
    key: 'actions',
    width: 100,
    sortable: false
  }
])

function resetElementWidth() {
  headers.value[1].width = undefined
}

async function getRepositoryDetails(repoName: string) {
  if (repositoryStore.filtration.deleted) {
    repositoryStore.chosenRepository = { name: repoName }
  } else {
    const chosenRepo = repositoryStore.repositories.filter(
      (repository: EntityModelRepositoryDto) =>
        repository.name == repoName
    )

    const repositories = await repositoryStore.get(
      repoName,
      chosenRepo[0].technology as Technologies
    )
    repositoryStore.chosenRepository = repositories[0]
  }
}

const filteredHeaders = computed(() => {
  let filteredHeaders = headers.value
  if (repositoryStore.filtration.deleted) {
    filteredHeaders = headers.value.filter(
      (header) => header.key != 'actions'
    )
  }
  if (
    !isAtLeastRepositoryMaintainer(
      authorizationStore.userRole || 0
    )
  ) {
    resetElementWidth()
    return filteredHeaders.filter(
      (header) => header.key != 'serverAddress'
    )
  }
  return filteredHeaders
})

function fetchData(options: DataTableOptions) {
  sortBy.value = getSort(options.sortBy, defaultSort)
  repositoryStore.getPage(options)
}

function isDisabled(item: EntityModelRepositoryDto) {
  return (
    configStore.declarativeMode ||
    !canPatch(item.links) ||
    item.deleted ||
    isPending(item)
  )
}

function updateRepositoryPublished(
  item: EntityModelRepositoryDto
): void {
  if (!isDisabled(item) && canPatch(item.links)) {
    repositoryStore.setChosen(item.id)
    const newRepository = deepCopy(item)
    newRepository.published = !newRepository.published
    repositoryStore.patch(newRepository)
  }
}

function chooseRepositoryToUpdate(
  item: EntityModelRepositoryDto
) {
  repositoryStore.setChosen(item.id)
}

function isPending(
  item: EntityModelRepositoryDto
): boolean {
  return !!repositoryStore.pending.find(
    (repository) => repository.id == item.id
  )
}
</script>

<style lang="scss">
.v-selection-control {
  justify-content: center;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-input--horizontal .v-input__append {
  margin-inline-start: 0px !important;
}
</style>
