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
    id="token-row"
  >
    <v-col
      id="token-name"
      cols="lg-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.tokens.name')"
        sortKey="columns.tokens.name"
        sortField="name"
      />
      <TextRecord v-else :text="token?.name" />
    </v-col>
    <v-col
      v-if="
        isAtLeastAdmin(
          authorizationStore.userRole
            ? authorizationStore.userRole
            : 0
        )
      "
      id="token-user"
      cols="lg-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.tokens.name')"
        sortKey="columns.tokens.user"
      />
      <TextRecord v-else :text="token?.user?.name" />
    </v-col>
    <v-col
      id="token-creationDate"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.tokens.creationDate')"
        sortKey="columns.tokens.creationDate"
      />
      <TextRecord v-else :text="token?.creationDate" />
    </v-col>
    <v-col
      id="token-expirationDate"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.tokens.expirationDate')"
        sortKey="columns.tokens.expirationDate"
      />
      <TextRecord v-else :text="token?.expirationDate" />
    </v-col>
    <v-col
      id="token-active"
      cols="lg-1 sm-1"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.tokens.active')"
        sortKey="columns.tokens.active"
      />
      <VCheckbox
        v-else
        id="checkbox-active"
        class="mr-8"
        color="oablue"
        v-model="token!.active"
        disabled
      />
    </v-col>
    <v-col
      id="token-actions"
      cols="lg-3"
      class="d-flex justify-left"
      style="justify-content: right"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        sortKey="columns.actions"
        no-sort
        right
      />
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <edit-icon
          v-if="canPatch(token?.links) && active"
          @set-entity="setEditEntity()"
          :text="$t('common.edit')"
        />
        <delete-icon
          v-if="canDelete(token?.links)"
          :name="token?.name"
          :set-resource-id="setEditEntity"
        />
        <deactivate-icon
          v-if="canPatch(token?.links) && active"
          :name="token?.name"
          :set-resource-id="setEditEntity"
        />
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EntityModelAccessTokenDto } from '@/openapi'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import DeleteIcon from '@/components/common/action_icons/DeleteIcon.vue'
import DeactivateIcon from '@/components/common/action_icons/DeactivateIcon.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import { useSettingsStore } from '@/store/settings'
import { useAuthorizationStore } from '@/store/authorization'
import { isAtLeastAdmin } from '@/enum/UserRoles'

const settingsStore = useSettingsStore()
const authorizationStore = useAuthorizationStore()

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  token: Object as () =>
    | EntityModelAccessTokenDto
    | undefined
})
const { canPatch, canDelete } = useUserAuthorities()

const active = computed(() => {
  return props.token?.active
})

function setEditEntity() {
  settingsStore.setChosenToken(props.token || {})
}
</script>
