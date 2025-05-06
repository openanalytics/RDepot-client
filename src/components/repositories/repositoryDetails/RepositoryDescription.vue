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
  <v-card
    id="repository-description-card"
    :loading="!repositoryStore.chosenRepository"
  >
    <v-card-text
      v-if="repositoryStore.chosenRepository.id"
      class="d-flex flex-column ga-3"
    >
      <v-timeline
        dot-color="primary"
        fill-dot
        side="end"
        density="compact"
      >
        <v-timeline-item
          v-if="
            repositoryStore.chosenRepository
              .lastModifiedTimestamp
          "
          id="repository-description-last-modification-date"
          :icon="Icons.get('edit')"
          size="x-small"
        >
          <div
            class="d-flex flex-no-wrap ga-3 align-center"
          >
            <div>
              {{
                $t(
                  'properties.repositories.lastModificationDate'
                )
              }}
            </div>
            <v-chip size="small" color="primary">
              {{
                formatDateTime(
                  new Date(
                    repositoryStore.chosenRepository.lastModifiedTimestamp
                  )
                )
              }}
            </v-chip>
          </div>
        </v-timeline-item>
        <v-timeline-item
          v-if="
            repositoryStore.chosenRepository
              .lastPublicationTimestamp
          "
          id="repository-description-last-publication-date"
          size="x-small"
          icon="mdi-publish"
        >
          <div
            class="d-flex flex-no-wrap ga-3 align-center"
          >
            <div>
              {{
                $t(
                  'properties.repositories.lastPublicationDate'
                )
              }}
            </div>
            <div
              class="d-flex flex-no-wrap align-center ga-1"
            >
              <v-chip size="small" color="primary">
                {{
                  formatDateTime(
                    new Date(
                      repositoryStore.chosenRepository.lastPublicationTimestamp
                    )
                  )
                }}
              </v-chip>
              <v-icon
                id="repository-description-publication-status"
                v-tooltip="
                  repositoryStore.chosenRepository
                    .lastPublicationSuccessful
                    ? $t(
                        `properties.repositories.publicationSucceed`
                      )
                    : $t(
                        `properties.repositories.publicationFailed`
                      )
                "
                :icon="
                  repositoryStore.chosenRepository
                    .lastPublicationSuccessful
                    ? Icons.get('success')
                    : Icons.get('cancel')
                "
                size="15"
                :color="
                  repositoryStore.chosenRepository
                    .lastPublicationSuccessful
                    ? 'success'
                    : 'error'
                "
              >
              </v-icon>
            </div>
          </div>
        </v-timeline-item>
        <v-timeline-item
          v-if="
            isAtLeastRepositoryMaintainer(
              authorizationStore.userRole || 0
            )
          "
          id="repository-description-server-address"
          size="x-small"
          :icon="Icons.get('serverAddress')"
        >
          <div
            class="d-flex flex-no-wrap ga-3 align-center"
          >
            <div>
              {{ $t('fields.repositories.serverAddress') }}:
            </div>
            <div
              class="d-flex justify-start align-center ga-2"
            >
              <CopyableCell
                :value="
                  repositoryStore.chosenRepository
                    .serverAddress || ''
                "
                :tooltip-message="`${$t('actions.general.copy')} ${$t('fields.repositories.serverAddress').toLowerCase()}`"
              />
              <DeprecatedWarning
                v-if="
                  getEnv(
                    'VITE_ADDRESS_DEPRECATION_WARNING'
                  ) !== 'false' &&
                  repositoryStore.chosenRepository
                    .serverAddress &&
                  deprecatedAddressTooltip(
                    repositoryStore.chosenRepository
                      .serverAddress
                  )
                "
                :value="
                  repositoryStore.chosenRepository
                    .serverAddress
                "
              />
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          v-if="repositoryStore.chosenRepository.hashMethod"
          id="repository-description-hash-method"
          :icon="Icons.get('hashMethod')"
          size="x-small"
        >
          <div
            class="d-flex flex-no-wrap ga-3 align-center"
          >
            <div>
              {{ $t('forms.repositories.hash') }}
            </div>
            <v-chip size="small" color="primary">
              {{
                repositoryStore.chosenRepository.hashMethod
              }}
            </v-chip>
          </div>
        </v-timeline-item>
        <v-timeline-item
          id="repository-description-number-of-packages"
          :icon="Icons.get('package')"
          size="x-small"
        >
          <div
            class="d-flex flex-no-wrap ga-3 align-center"
          >
            <div>
              {{
                $t(
                  'properties.repositories.numberOfPackages'
                )
              }}:
            </div>
            <bold
              >{{
                repositoryStore.chosenRepository
                  .numberOfPackages
              }}
            </bold>
          </div>
        </v-timeline-item>

        <v-timeline-item
          v-if="
            repositoryStore.chosenRepository.technology ===
            'R'
          "
          :icon="Icons.get('redirect')"
          size="x-small"
        >
          <div
            class="d-flex flex-no-wrap ga-3 align-center"
          >
            <div>
              {{
                $t('forms.repositories.redirectToSource')
              }}:
            </div>
            <v-icon
              id="repository-description-redirect-to-source"
              :icon="
                repositoryStore.chosenRepository
                  .redirectToSource
                  ? Icons.get('success')
                  : Icons.get('error')
              "
              :color="
                repositoryStore.chosenRepository
                  .redirectToSource
                  ? 'success'
                  : 'error'
              "
            ></v-icon>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>

    <v-divider
      v-if="repositoryStore.chosenRepository.id"
      :thickness="3"
    />
    <v-btn
      id="see-repository-packages-button"
      ref="button"
      color="primary"
      size="x-small"
      variant="text"
      class="button mt-3 ml-3 my-3"
      @click="navigate(repositoryStore.chosenRepository)"
    >
      {{ $t('actions.repositories.seePackages') }}
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { useDates } from '@/composable/date'
import Icons from '@/maps/Icons'
import { EntityModelRepositoryDto } from '@/openapi'
import router from '@/plugins/router'
import { usePackagesStore } from '@/store/options/packages'
import { useRepositoryStore } from '@/store/options/repositories'
import getEnv from '@/utils/env'
import DeprecatedWarning from '@/components/common/datatable/DeprecatedWarning.vue'
import CopyableCell from '@/components/common/datatable/CopyableCell.vue'
import { isAtLeastRepositoryMaintainer } from '@/enum/UserRoles'
import { useAuthorizationStore } from '@/store/options/authorization'
import { useRepositoryDeprecated } from '@/composable/repositories/repositoriesDeprecatedAddress'

const packagesStore = usePackagesStore()
const repositoryStore = useRepositoryStore()
const authorizationStore = useAuthorizationStore()
const { formatDateTime } = useDates()
const { deprecatedAddressTooltip } =
  useRepositoryDeprecated()

function chooseRepository(name: string) {
  packagesStore.setFiltrationBy({ repository: [name] })
}

function navigate(repository: EntityModelRepositoryDto) {
  chooseRepository(repository.name || '')
  router.push({
    name: 'packages'
  })
}
</script>
