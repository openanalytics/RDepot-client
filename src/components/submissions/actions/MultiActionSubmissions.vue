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
  <div class="d-flex align-center">
    <v-checkbox-btn
      id="submissions-select-all"
      :model-value="allSelected"
      :indeterminate="someSelected && !allSelected"
      @update:model-value="selectAll"
    />
    <v-speed-dial
      location="bottom center"
      location-strategy="connected"
      transition="fade-transition"
      scroll-strategy="close"
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
          id="submissions-multi-actions"
          variant="text"
          size="x-small"
          :icon="Icons.get('more')"
          color="oablue"
          v-bind="activatorProps"
          style="margin-left: -10px"
        >
        </v-btn>
      </template>
      <v-tooltip location="right">
        <template #activator="{ props: tooltipActivator }">
          <div v-bind="tooltipActivator">
            <v-btn
              id="submissions-multi-accept"
              key="1"
              :icon="Icons.get('accept')"
              color="success"
              :disabled="
                submissionStore.selected.length == 0
              "
              size="small"
              @click="
                openEditDialog(
                  SubmissionEditOptions.enum.accept
                )
              "
            ></v-btn>
          </div>
        </template>
        <span
          >{{ i18n.t('action.accept') }}
          <span v-if="submissionStore.selected.length == 0"
            >({{ i18n.t('package.chooseOneToEnable') }})
          </span></span
        >
      </v-tooltip>
      <v-tooltip location="right">
        <template #activator="{ props: tooltipActivator }">
          <div v-bind="tooltipActivator">
            <v-btn
              id="submissions-multi-reject"
              key="2"
              :icon="Icons.get('reject')"
              color="oared"
              :disabled="
                submissionStore.selected.length == 0
              "
              size="small"
              @click="
                openEditDialog(
                  SubmissionEditOptions.enum.reject
                )
              "
            ></v-btn>
          </div>
        </template>
        <span
          >{{ i18n.t('action.reject') }}
          <span v-if="submissionStore.selected.length == 0"
            >({{ i18n.t('package.chooseOneToEnable') }})
          </span></span
        >
      </v-tooltip>
      <v-tooltip location="right">
        <template #activator="{ props: tooltipActivator }">
          <div v-bind="tooltipActivator">
            <v-btn
              id="submissions-multi-cancel"
              key="3"
              :icon="Icons.get('cancel')"
              color="oared"
              :disabled="
                submissionStore.selected.length == 0
              "
              size="small"
              @click="
                openEditDialog(
                  SubmissionEditOptions.enum.cancel
                )
              "
            ></v-btn>
          </div>
        </template>
        <span
          >{{ i18n.t('action.cancel') }}
          <span v-if="submissionStore.selected.length == 0"
            >({{ i18n.t('package.chooseOneToEnable') }})
          </span></span
        >
      </v-tooltip>
    </v-speed-dial>
  </div>
</template>

<script setup lang="ts">
import { useSubmissionStore } from '@/store/options/submission'
import { useCommonStore } from '@/store/options/common'
import { i18n } from '@/plugins/i18n'
import { OverlayEnum } from '@/enum/Overlay'
import { SubmissionEditOptions } from '@/enum/SubmissionEditOptions'
import Icons from '@/maps/Icons'

defineProps({
  allSelected: {
    type: Boolean,
    required: true
  },
  someSelected: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['selectAll'])

function selectAll() {
  emit('selectAll')
}

const submissionStore = useSubmissionStore()
const commonStore = useCommonStore()

function openEditDialog(editOption: SubmissionEditOptions) {
  submissionStore.prepareToEdit(editOption)
  commonStore.openOverlay(OverlayEnum.enum.Edit)
}
</script>
