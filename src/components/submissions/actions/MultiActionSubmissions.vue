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
        />
      </template>
      <v-btn
        id="submissions-multi-divert-attention"
        key="1"
        style="display: none"
      />
      <div
        v-for="(button, i) in actionButtons"
        :key="i"
        v-tooltip:end="button.tooltipMessage"
      >
        <v-btn
          :id="button.id"
          :key="i + 2"
          :icon="button.icon"
          :color="button.color"
          :disabled="submissionStore.selected.length == 0"
          size="small"
          @click="button.onClickAction"
        />
      </div>
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
import { computed } from 'vue'

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

const chooseAtLeasOneMessage = computed(() =>
  submissionStore.selected.length == 0
    ? ' (' + i18n.t('package.chooseOneToEnable') + ')'
    : ''
)

const actionButtons = computed(() => [
  {
    id: 'submissions-multi-accept',
    icon: Icons.get('accept'),
    color: 'success',
    tooltipMessage: `${i18n.t('action.accept')} ${
      chooseAtLeasOneMessage.value
    }`,
    onClickAction: () =>
      openEditDialog(SubmissionEditOptions.enum.accept)
  },
  {
    id: 'submissions-multi-reject',
    icon: Icons.get('reject'),
    color: 'oared',
    tooltipMessage: `${i18n.t('action.reject')} ${
      chooseAtLeasOneMessage.value
    }`,
    onClickAction: () =>
      openEditDialog(SubmissionEditOptions.enum.reject)
  },
  {
    id: 'submissions-multi-cancel',
    icon: Icons.get('cancel'),
    color: 'oared',
    tooltipMessage: `${i18n.t('action.cancel')} ${
      chooseAtLeasOneMessage.value
    }`,
    onClickAction: () =>
      openEditDialog(SubmissionEditOptions.enum.cancel)
  },
  {
    id: 'submissions-multi-download',
    icon: Icons.get('download'),
    color: 'gray',
    tooltipMessage: `${i18n.t('action.download')} ${
      chooseAtLeasOneMessage.value
    }`,
    onClickAction: () =>
      openEditDialog(SubmissionEditOptions.enum.download)
  }
])

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
