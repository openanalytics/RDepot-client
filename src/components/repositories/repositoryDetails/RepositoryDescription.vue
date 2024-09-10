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
  <v-card
    id="repository-description-card"
    :loading="!repositoryStore.chosenRepository"
  >
    <v-card-text
      v-if="repositoryStore.chosenRepository.id"
      class="d-flex flex-column ga-3"
    >
      <v-timeline
        dot-color="oablue"
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
          icon="mdi-pencil"
          size="x-small"
        >
          <div
            class="d-flex flex-no-wrap ga-3 align-center"
          >
            <div>
              {{
                $t(
                  'repositories.details.last-modification-date'
                )
              }}
            </div>
            <v-chip size="small" color="oablue">
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
                  'repositories.details.last-publication-date'
                )
              }}
            </div>
            <div
              class="d-flex flex-no-wrap align-center ga-1"
            >
              <v-chip size="small" color="oablue">
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
                        `repositories.details.publication-succeed`
                      )
                    : $t(
                        `repositories.details.publication-failed`
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
          v-if="repositoryStore.chosenRepository.hashMethod"
          id="repository-description-hash-method"
          icon="mdi-pound"
          size="x-small"
        >
          <div
            class="d-flex flex-no-wrap ga-3 align-center"
          >
            <div>
              {{ $t('repositories.details.hash-method') }}
            </div>
            <v-chip size="small" color="oablue">
              {{
                repositoryStore.chosenRepository.hashMethod
              }}
            </v-chip>
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
      color="oablue"
      size="x-small"
      variant="text"
      class="button mt-3 ml-3 my-3"
      @click="navigate(repositoryStore.chosenRepository)"
    >
      {{ $t('common.seepackages') }}</v-btn
    >
  </v-card>
</template>

<script setup lang="ts">
import { useDates } from '@/composable/date'
import Icons from '@/maps/Icons'
import { EntityModelRepositoryDto } from '@/openapi'
import router from '@/plugins/router'
import { usePackagesStore } from '@/store/options/packages'
import { useRepositoryStore } from '@/store/options/repositories'

const packagesStore = usePackagesStore()
const repositoryStore = useRepositoryStore()
const { formatDateTime } = useDates()

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
