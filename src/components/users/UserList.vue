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
  <ResourcesList :resources="userStore.userList">
    <template #title>
      <UserRow title />
    </template>
    <template #expansion-row="slotProps">
      <UserRow :user="slotProps.resource" />
    </template>
  </ResourcesList>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import UserRow from '@/components/users/UserRow.vue'
import ResourcesList from '@/components/common/resources/ResourcesList.vue'
import { useUserStore } from '@/store/users'

const userStore = useUserStore()

function updateData(): void {
  userStore.fetchUsers()
}

onBeforeMount(() => {
  updateData()
  userStore.fetchRoles()
})
</script>
