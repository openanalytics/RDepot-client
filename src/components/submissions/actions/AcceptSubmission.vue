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
  <IconButton
    v-if="
      authorizationStore.me?.id != item.submitter?.id &&
      item.state ===
        EntityModelSubmissionDtoStateEnum.WAITING &&
      canPatch(item.links, 'state')
    "
    :id="`accept-button-${item.id}`"
    :tooltip="$t('action.accept')"
    :icon="Icons.get('accept')"
    size="small"
    color="success"
    @click="acceptSubmission(item)"
  />
</template>

<script setup lang="ts">
import {
  EntityModelSubmissionDto,
  EntityModelSubmissionDtoStateEnum
} from '@/openapi'
import { useSubmissionActions } from '@/composable/submissions/submissionActions'
import IconButton from '@/components/common/buttons/IconButton.vue'
import { useAuthorizationStore } from '@/store/options/authorization'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import Icons from '@/maps/Icons'

defineProps({
  item: {
    type: Object as () => EntityModelSubmissionDto,
    required: true
  }
})

const authorizationStore = useAuthorizationStore()
const { canPatch } = useUserAuthorities()
const { acceptSubmission } = useSubmissionActions()
</script>
