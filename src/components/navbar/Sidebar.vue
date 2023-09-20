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
  <v-navigation-drawer
    v-model="drawer"
    :location="xs ? 'start' : 'left'"
    :touchless="mobile ? false : true"
  >
    <v-list nav open-strategy="single">
      <v-list-item
        prepend-icon="mdi-account"
        :title="getUserLogin"
        :subtitle="getSubtitle"
      ></v-list-item>
      <v-divider class="pb-3"></v-divider>
      <v-list-item
        v-if="authorizationStore.can('GET', 'events')"
        prepend-icon="mdi-timetable"
        :title="$t('common.events')"
        :value="$t('common.events')"
        @click="$router.push({ name: 'events' })"
      ></v-list-item>

      <v-list-item
        v-if="authorizationStore.can('POST', 'submissions')"
        prepend-icon="mdi-upload"
        :title="$t('common.addPackage')"
        :value="$t('common.addPackage')"
        @click="redirectAddPackage"
      ></v-list-item>

      <v-list-item
        v-if="authorizationStore.can('GET', 'submissions')"
        prepend-icon="mdi-email"
        :title="$t('common.submissions')"
        :value="$t('common.submissions')"
        @click="$router.push({ name: 'submissions' })"
      ></v-list-item>

      <v-list-group
        v-if="
          authorizationStore.can(
            'GET',
            'packageMaintainers'
          ) || authorizationStore.can('GET', 'packages')
        "
        value="Packages"
        tag="Packages"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-package"
            :title="$t('common.packages')"
          ></v-list-item>
        </template>

        <v-list-item
          v-if="authorizationStore.can('GET', 'packages')"
          :title="$t('common.list')"
          :value="$t('packages.list')"
          id="sidebarpackageslist"
          @click="$router.push({ name: 'packages' })"
        ></v-list-item>
        <v-list-item
          v-if="
            authorizationStore.can(
              'GET',
              'packageMaintainers'
            )
          "
          :title="$t('common.maintainers')"
          :value="$t('packages.maintainers')"
          @click="
            $router.push({ name: 'packageMaintainers' })
          "
        ></v-list-item>
      </v-list-group>
      <v-list-group
        v-if="
          authorizationStore.can('GET', 'repositories') ||
          authorizationStore.can(
            'GET',
            'repositoryMaintainers'
          )
        "
        value="Repositories"
        tag="Repositories"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            prepend-icon="mdi-source-repository"
            v-bind="props"
            :title="$t('common.repositories')"
          ></v-list-item>
        </template>

        <v-list-item
          v-if="
            authorizationStore.can('GET', 'repositories')
          "
          :title="$t('common.list')"
          :value="$t('repositories.list')"
          @click="$router.push({ name: 'repositories' })"
        ></v-list-item>
        <v-list-item
          v-if="
            authorizationStore.can(
              'GET',
              'repositoryMaintainers'
            )
          "
          :title="$t('common.maintainers')"
          :value="$t('repositories.maintainers')"
          id="sidebarrepositorymintainers"
          @click="
            $router.push({
              name: 'repositoryMaintainers'
            })
          "
        ></v-list-item>
      </v-list-group>
      <v-list-item
        v-if="authorizationStore.can('GET', 'users')"
        prepend-icon="mdi-account-multiple"
        :title="$t('common.users')"
        :value="$t('common.users')"
        @click="$router.push({ name: 'users' })"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-logout"
        :title="$t('common.logout')"
        :value="$t('common.logout')"
        @click="logout"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import router from '@/router'
import { i18n } from '@/plugins/i18n'
import { useCommonStore } from '@/store/common'
import { useAuthorizationStore } from '@/store/authorization'
import { useSubmissionStore } from '@/store/submission'
import { computed } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { authService } from '@/plugins/oauth'

const { xs, mobile } = useDisplay()
const authorizationStore = useAuthorizationStore()
const submissionsStore = useSubmissionStore()
const commonStore = useCommonStore()
const getUserLogin = computed(() => {
  return authorizationStore.me.name
})

const getSubtitle = computed(() => {
  return authorizationStore.me.name
    ? i18n.t('user.logged-in')
    : i18n.t('user.not-logged-in')
})

const drawer = computed({
  get() {
    return commonStore.drawer
  },
  set(value: boolean) {
    commonStore.setDrawer(value)
  }
})

function logout() {
  authorizationStore.logout()
}

const redirectAddPackage = () => {
  submissionsStore.updateStepperKey()
  submissionsStore.repository = undefined
  router.push({ name: 'addSubmission' })
}
</script>
