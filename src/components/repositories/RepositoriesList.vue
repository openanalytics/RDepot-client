<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
    :title="i18n.t('resources.repository', 2)"
    :loading="repositoryStore.loading"
    expand-on-click
    :sort-by="sortBy"
    :return-object="false"
    @update:options="fetchData"
  >
    <template #topAction>
      <AddButton v-if="postCondition" />
    </template>

    <template #[`item.name`]="{ value, item }">
      <v-list-item
        :id="`repositories-list-${value}`"
        lines="two"
        class="px-0 mx-0"
      >
        <template #prepend>
          <div
            class="d-flex align-start justify-center mr-3"
          >
            <AuthenticationInformation
              :value="item.requiresAuthentication"
              :authentication="false"
            />
          </div>
        </template>
        <template #title>
          {{ value }}
          <small style="opacity: 0.5"
            >v.{{ item.version }}</small
          >
          <TechnologyChip
            size="x-small"
            class="ml-1"
            :technology="item.technology"
          />
        </template>
        <template #subtitle>
          <div>
            <small>
              <div
                class="d-flex justify-start align-center ga-2"
              >
                <CopyableCell
                  :value="item.publicationUri"
                  :tooltip-message="`${$t('actions.general.copy')} ${$t('fields.repositories.publicationUri').toLowerCase()}`"
                />
                <DeprecatedWarning
                  v-if="
                    getEnv(
                      'VITE_ADDRESS_DEPRECATION_WARNING'
                    ) !== 'false' &&
                    deprecatedAddressTooltip(
                      item.serverAddress
                    )
                  "
                  :value="value"
                />
              </div>
            </small>
          </div>
        </template>
      </v-list-item>
    </template>
    <template #[`item.published`]="{ item }">
      <v-tooltip location="top">
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
              @click.stop="updateRepositoryPublished(item)"
            >
              <template #append> </template>
            </v-checkbox>
          </span>
        </template>
        <span v-if="configStore.declarativeMode">{{
          $t('messages.repositories.declarative.publish')
        }}</span>
        <span v-else-if="!canPatch(item.links)">{{
          $t('messages.general.notAuthorized')
        }}</span>
        <span v-else-if="item.deleted">
          {{
            $t('messages.general.deleted', {
              resource_name: $t('resources.repository')
            })
          }}</span
        >
        <span v-else-if="isPending(item)">
          {{ $t('messages.general.pending') }}</span
        >
        <span v-else-if="item.published">
          {{ $t('actions.repositories.unpublish') }}
        </span>
        <span v-else>
          {{ $t('actions.repositories.publish') }}
        </span>
      </v-tooltip>
    </template>

    <template #[`item.actions`]="{ item }">
      <ProgressCircularSmall v-if="isPending(item)" />
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <RepublishIcon
          :repo="item"
          @set-entity="chooseRepositoryToUpdate(item)"
        />
        <EditIcon
          :icon-id="`edit-repository-${item.id}`"
          :disabled="
            !canPatch(item.links) ||
            configStore.declarativeMode ||
            item.deleted
          "
          :text="$t('actions.general.edit')"
          :hover-message="
            configStore.declarativeMode
              ? $t('messages.repositories.declarative.edit')
              : item.deleted
                ? $t('messages.general.deleted', {
                    resource_name: $t(
                      `resources.repository`
                    )
                  })
                : undefined
          "
          class="mr-1"
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
              ? i18n.t(
                  'messages.repositories.declarative.delete'
                )
              : !configStore.deletingRepositories
                ? i18n.t(
                    'messages.config.deletingRepositories'
                  )
                : item.deleted
                  ? $t('messages.general.deleted', {
                      resource_name: $t(
                        `resources.repository`
                      )
                    })
                  : undefined
          "
          @set-resource-id="chooseRepositoryToUpdate(item)"
        />
        <GoToButton
          :item="item"
          from="repositories"
          :tooltip="$t('actions.general.goTo')"
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
import RepublishIcon from '@/components/common/action_icons/RepublishIcon.vue'
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
import { computed, ref } from 'vue'
import { useSort } from '@/composable/sort'
import { useAuthorizationStore } from '@/store/options/authorization'
import ProgressCircularSmall from '../common/progress/ProgressCircularSmall.vue'
import RepositoryDescription from './repositoryDetails/RepositoryDescription.vue'
import { Technologies } from '@/enum/Technologies'
import OATable from '../common/datatable/OATable.vue'
import AddButton from '../common/buttons/AddButton.vue'
import TechnologyChip from '@/components/common/chips/TechnologyChip.vue'
import CopyableCell from '@/components/common/datatable/CopyableCell.vue'
import AuthenticationInformation from '@/components/common/datatable/AuthenticationInformation.vue'
import getEnv from '@/utils/env'
import { useRepositoryDeprecated } from '@/composable/repositories/repositoriesDeprecatedAddress'
import DeprecatedWarning from '@/components/common/datatable/DeprecatedWarning.vue'
import GoToButton from '@/components/common/action_icons/GoToButton.vue'

const { deepCopy } = useUtilities()
const repositoryStore = useRepositoryStore()
const { canDelete, canPatch } = useUserAuthorities()
const configStore = useConfigStore()
const authorizationStore = useAuthorizationStore()
const { deprecatedAddressTooltip } =
  useRepositoryDeprecated()

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
    title: i18n.t('forms.general.name'),
    align: 'start',
    key: 'name'
  },
  {
    title: i18n.t('fields.repositories.published'),
    align: 'center',
    key: 'published',
    width: 140
  },
  {
    title: i18n.t('fields.general.actions'),
    align: 'center',
    key: 'actions',
    width: 100,
    sortable: false
  }
])

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
table {
  background: rgb(var(--v-theme-background)) !important;
}

tr {
  background-color: rgb(var(--v-theme-surface)) !important;
}

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

.additional-row {
  display: grid;
  animation-duration: 0.2s;
  animation-name: animate-fade;
  animation-fill-mode: forwards;
}

.expanded-package {
  margin: 0.5rem;
  overflow: hidden;
}
</style>
