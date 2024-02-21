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
    id="user-row"
  >
    <v-col
      id="user-name"
      cols="lg-3 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.users.name')"
        sortKey="columns.users.name"
      />
      <TextRecord v-else :text="user?.name" />
    </v-col>
    <v-col
      id="user-email"
      cols="lg-3"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.users.email')"
        sortKey="columns.users.email"
      />
      <TextRecord v-else :text="user?.email" />
    </v-col>
    <v-col
      id="user-username"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.users.username')"
        sortKey="columns.users.username"
      />
      <TextRecord v-else :text="user?.login" />
    </v-col>
    <v-col
      id="user-role"
      cols="lg-2 sm-2"
      class="d-flex align-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.users.role')"
        sortKey="columns.users.role"
      />
      <TextRecord v-else :text="getRole" />
    </v-col>
    <v-col
      id="user-active"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.users.active')"
        sortKey="columns.users.active"
        :justify="JustifyEnum.Enum.center"
      />
      <span v-else-if="user">
        <v-checkbox
          id="checkbox-active"
          color="oablue"
          @click.stop
          disabled
          v-model="user.active"
        />
      </span>
    </v-col>
    <v-col
      id="user-actions"
      cols="lg-1"
      class="d-flex justify-center"
    >
      <SortTitle
        v-if="title"
        :text="$t('columns.actions')"
        sortKey="columns.actions"
        :justify="JustifyEnum.Enum.center"
        no-sort
      />
      <span
        v-else-if="user"
        class="d-flex justify-center align-center"
      >
        <edit-icon
          v-if="canPatch(user?.links)"
          @set-entity="setEditUser"
          :text="$t('users.edit.tooltip')"
        >
        </edit-icon>
      </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import SortTitle from '@/components/common/resources/SortTitle.vue'
import EditIcon from '@/components/common/action_icons/EditIcon.vue'
import TextRecord from '@/components/common/resources/TextRecord.vue'
import { computed } from 'vue'
import { EntityModelUserDto } from '@/openapi'
import { roleToString } from '@/enum/UserRoles'
import { useUserStore } from '@/store/users'
import { useUserAuthorities } from '@/composable/authorities/userAuthorities'
import { JustifyEnum } from '@/enum/Justify'

const userStore = useUserStore()

const props = defineProps({
  title: {
    type: Boolean,
    default: false
  },
  user: Object as () => EntityModelUserDto | undefined
})

const { canPatch } = useUserAuthorities()

const getRole = computed(() => {
  return roleToString.parse((props.user?.roleId || 1) - 1)
})

function setEditUser() {
  if (props.user) {
    userStore.chosenUser = props.user
  }
}
</script>
