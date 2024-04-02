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
  <VRow
    class="px-5"
    :class="{ title: title }"
    id="package-row"
  >
    <VCol
      id="package-row-name"
      cols="lg-1 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.package.name')"
        sortKey="columns.package.name"
      />
      <TextRecord v-else :text="packageBag?.name" />
    </VCol>
    <VCol
      id="package-row-version"
      cols="1"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.package.version')"
        sortKey="columns.package.version"
      />
      <TextRecord v-else :text="packageBag?.version" />
    </VCol>
    <VCol
      id="package-row-title"
      cols="lg-3 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.package.title')"
        sortKey="columns.package.title"
      />
      <TextRecord v-else :text="packageBag?.title" />
    </VCol>
    <VCol
      id="package-row-maintainer"
      cols="lg-2 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.package.maintainer')"
        sortKey="columns.package.maintainer"
        :justify="JustifyEnum.Enum.center"
      />
      <TextRecord v-else :text="packageBag?.user?.name" />
    </VCol>

    <VCol
      id="package-row-state"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.package.state')"
        sortKey="columns.package.state"
        :justify="JustifyEnum.Enum.center"
      />
      <v-tooltip location="right" v-else-if="packageBag">
        <template #activator="{ props }">
          <div
            id="tooltip-activator"
            v-bind="props"
            class="mt-2"
          >
            <v-icon
              :icon="
                getStatusIcon(
                  EntityModelSubmissionDtoStateEnum[
                    packageBag?.submission?.state ||
                      EntityModelSubmissionDtoStateEnum.WAITING
                  ] ||
                    EntityModelSubmissionDtoStateEnum.WAITING
                )
              "
              :color="
                getStatusColor(
                  EntityModelSubmissionDtoStateEnum[
                    packageBag?.submission?.state ||
                      EntityModelSubmissionDtoStateEnum.WAITING
                  ] ||
                    EntityModelSubmissionDtoStateEnum.WAITING
                )
              "
            ></v-icon>
          </div>
        </template>
        <span id="tooltip-wait">{{
          getTooltipMessage(
            EntityModelSubmissionDtoStateEnum[
              packageBag?.submission?.state ||
                EntityModelSubmissionDtoStateEnum.WAITING
            ] || EntityModelSubmissionDtoStateEnum.WAITING
          )
        }}</span>
      </v-tooltip>
    </VCol>

    <VCol
      id="package-row-technology"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.package.technology')"
        sortKey="columns.package.technology"
        :justify="JustifyEnum.Enum.center"
      />
      <TextRecord v-else :text="packageBag?.technology" />
    </VCol>
    <VCol
      id="package-row-repository"
      cols="lg-1 sm-2"
      class="d-flex align-center justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.package.repository')"
        sortKey="columns.package.repository"
        :justify="JustifyEnum.Enum.center"
      />
      <TextRecord
        v-else
        :text="packageBag?.repository?.name"
      />
    </VCol>
    <VCol
      id="package-row-active"
      cols="lg-1"
      class="d-flex justify-center align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.package.active')"
        sortKey="columns.package.active"
        :justify="JustifyEnum.Enum.center"
      />
      <span v-else-if="packageBag">
        <v-tooltip
          location="top"
          :disabled="canPatch(packageBag?.links)"
        >
          <template #activator="{ props }">
            <span v-bind="props">
              <VCheckbox
                id="checkbox-active"
                class="mr-8"
                @click.stop
                v-model="packageBag.active"
                @change="updatePackageActive"
                :readonly="!canPatch(packageBag?.links)"
                :color="
                  !canPatch(packageBag?.links)
                    ? 'grey'
                    : 'oablue'
                "
              />
            </span>
          </template>
          <span v-if="!canPatch(packageBag?.links)">{{
            $t('common.notAuthorized')
          }}</span>
        </v-tooltip>
      </span>
    </VCol>
    <VCol
      id="package-row-actions"
      cols="lg-1"
      class="d-flex justify-center align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        sortKey="columns.actions"
        no-sort
        :justify="JustifyEnum.Enum.center"
      />
      <span v-else-if="packageBag && !packageBag.deleted">
        <DeleteIcon
          :disabled="
            !canDelete(props.packageBag?.links) &&
            !props.packageBag?.deleted
          "
          :name="props.packageBag?.name"
          @setResourceId="choosePackage"
          class=""
        />
      </span>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import { EntityModelPackageDto } from '@/openapi'
import { usePackagesStore } from '@/store/packages'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { JustifyEnum } from '@/enum/Justify'
import { useSubmissionIcons } from '@/composable/submissions/statusIcons'
import { EntityModelSubmissionDtoStateEnum } from '@/openapi'

const { canDelete, canPatch } = useUserAuthorities()

const packageStore = usePackagesStore()

const { getStatusIcon, getStatusColor, getTooltipMessage } =
  useSubmissionIcons()

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  packageBag: Object as () =>
    | EntityModelPackageDto
    | undefined
})

function choosePackage() {
  packageStore.setChosenPackage(props.packageBag)
}

function updatePackageActive() {
  if (
    canPatch(props.packageBag?.links) &&
    props.packageBag &&
    props.packageBag.id &&
    props.packageBag.active != undefined
  ) {
    packageStore.activatePackage(props.packageBag)
  }
}
</script>
