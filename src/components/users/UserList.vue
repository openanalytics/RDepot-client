<template>
  <v-row justify="end" class="my-10 mx-10" align="center" />
  <ResourcesList :resources="user_store.userList">
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
import ResourcesList from '../common/ResourcesList.vue'
import { useUserStore } from '@/store/users'

const user_store = useUserStore()

function updateData(): void {
  user_store.fetchUsers()
}

onBeforeMount(() => {
  updateData()
  user_store.fetchRoles()
})
</script>
