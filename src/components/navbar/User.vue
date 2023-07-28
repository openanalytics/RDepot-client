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
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <v-btn
        id="change-user-button"
        color="oared"
        variant="elevated"
        v-bind="props"
        class="px-3 custom-button mx-3"
        depressed
      >
        {{ user.login }} ({{
          roleToString.parse(user.role)
        }})
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in users"
        :key="index"
        @click="changeUser(item)"
        link
      >
        <v-list-item-title
          v-text="
            item.login +
            ' (' +
            roleToString.parse(item.role) +
            ')'
          "
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useLoggedUserStore } from '@/store/logged_user'
import { useCommonStore } from '@/store/common'
import { Role, roleToString } from '@/enum/UserRoles'
const users = [
  {
    token: import.meta.env.VITE_ADMIN_TOKEN,
    login: 'einstein',
    role: Role.enum.admin,
    id: 8
  },
  {
    token: import.meta.env.VITE_REPOSITORY_MAINTAINER_TOKEN,
    login: 'tesla',
    role: Role.enum.repositoryMaintainer,
    id: 5
  },
  {
    token: import.meta.env.VITE_PACKAGE_MAINTAINER_TOKEN,
    login: 'galileo',
    role: Role.enum.packageMaintainer,
    id: 6
  },
  {
    token: import.meta.env.VITE_USER_TOKEN,
    login: 'newton',
    role: Role.enum.user,
    id: 7
  }
]
const commonStore = useCommonStore()
const loggedUserStore = useLoggedUserStore()
const user = ref({
  token: loggedUserStore.userToken,
  login: loggedUserStore.userLogin,
  role: loggedUserStore.userRole,
  id: loggedUserStore.userId
})
function changeUser(newUser: any) {
  user.value = newUser
  loggedUserStore.changeUser(
    user.value.token,
    user.value.login,
    user.value.role,
    user.value.id
  )
  commonStore.updateKey()
}
</script>
