<!--
 R Depot
 
 Copyright (C) 2012-2023 Open Analytics NV
 
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
      id="token-deleted"
      cols="lg-1 sm-1"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.tokens.deleted')"
        sortKey="columns.tokens.deleted"
      />
      <VCheckbox
        v-else
        id="checkbox-deleted"
        class="mr-8"
        color="oablue"
        v-model="token!.deleted"
        disabled
      />
    </v-col>
    <v-col
      id="token-actions"
      cols="lg-4"
      class="d-flex justify-left"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        sortKey="columns.actions"
        no-sort
      />
      <span
        v-else
        class="d-flex justify-center align-center"
      >
        <v-btn
          id="accept-button"
          color="oablue"
          class="mx-1"
          @click="editToken(token)"
          >{{ $t('common.edit') }}</v-btn
        >
        <v-btn
          v-if="check"
          class="mx-1"
          id="cancel-button"
          color="oared"
          @click="deleteToken(token)"
          >{{ $t('common.delete') }}</v-btn
        >
        <v-btn
          v-if="check && active"
          id="accept-button"
          color="warning"
          @click="deactivateToken(token)"
          >{{ $t('common.deactivate') }}</v-btn
        >
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { EntityModelAccessTokenDto } from '@/openapi'
import { useTokenActions } from '@/composable/tokens/tokenActions'
import { useAuthorizationStore } from '@/store/authorization'
import SortTitle from '@/components/common/resources/SortTitle.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  token: Object as () =>
    | EntityModelAccessTokenDto
    | undefined
})

const authorizationStore = useAuthorizationStore()
const { canPatch } = useUserAuthorities()
const { deleteToken, editToken, deactivateToken } =
  useTokenActions()

const check = computed(() => {
  return authorizationStore.me.id === props.token?.user?.id
})

const active = computed(() => {
  return props.token?.active
})
</script>
