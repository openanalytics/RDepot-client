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
        {{ user.login }} ({{ user.role }})
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
          v-text="item.login + ' (' + item.role + ')'"
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useLoggedUserStore } from '@/store/logged_user'
import { useCommonStore } from '@/store/common'
const users = [
  {
    token: import.meta.env.VITE_ADMIN_TOKEN,
    login: 'einstein',
    role: 'admin',
    id: 8
  },
  {
    token: import.meta.env.VITE_REPOSITORY_MAINTAINER_TOKEN,
    login: 'tesla',
    role: 'repository maintainer',
    id: 5
  },
  {
    token: import.meta.env.VITE_PACKAGE_MAINTAINER_TOKEN,
    login: 'galileo',
    role: 'package maintainer',
    id: 6
  },
  {
    token: import.meta.env.VITE_USER_TOKEN,
    login: 'newton',
    role: 'user',
    id: 7
  }
]
const common_store = useCommonStore()
const logged_user_store = useLoggedUserStore()
const user = ref({
  token: logged_user_store.userToken,
  login: logged_user_store.userLogin,
  role: logged_user_store.userRole,
  id: logged_user_store.userId
})
function changeUser(new_user: any) {
  user.value = new_user
  logged_user_store.change_user(
    user.value.token,
    user.value.login,
    user.value.role,
    user.value.id
  )
  common_store.updateKey()
}
</script>
