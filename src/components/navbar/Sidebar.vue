<template>
  <v-navigation-drawer
    v-model="drawer"
    :location="xs ? 'start' : 'left'"
    :touchless="mobile ? false : true"
  >
    <v-list nav open-strategy="single">
      <v-list-item
        prepend-icon="mdi-account"
        :title="loggedUserStore.userLogin"
        subtitle="logged in"
      ></v-list-item>
      {{ $ability.can('GET', 'events') }}
      {{ $ability.can('POST', 'r submissions') }}
      <v-divider class="pb-3"></v-divider>
      <v-list-item
        v-if="$ability.can('GET', 'events')"
        prepend-icon="mdi-timetable"
        :title="$t('common.events')"
        :value="$t('common.events')"
        @click="$router.replace({ name: 'events' })"
      ></v-list-item>

      <v-list-item
        v-if="$ability.can('POST', 'r submissions')"
        prepend-icon="mdi-upload"
        :title="$t('common.addPackage')"
        :value="$t('common.addPackage')"
        @click="$router.replace({ name: 'addSubmission' })"
      ></v-list-item>

      <v-list-item
        v-if="$ability.can('GET', 'r submissions')"
        prepend-icon="mdi-email"
        :title="$t('common.submissions')"
        :value="$t('common.submissions')"
        @click="$router.replace({ name: 'submissions' })"
      ></v-list-item>

      <v-list-group
        v-if="
          $ability.can('GET', 'package maintainers') ||
          $ability.can('GET', 'packages')
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
          v-if="$ability.can('GET', 'packages')"
          :title="$t('common.list')"
          :value="$t('packages.list')"
          id="sidebarpackageslist"
          @click="$router.replace({ name: 'packages' })"
        ></v-list-item>
        <v-list-item
          v-if="$ability.can('GET', 'package maintainers')"
          :title="$t('common.maintainers')"
          :value="$t('packages.maintainers')"
          @click="
            $router.replace({ name: 'packageMaintainers' })
          "
        ></v-list-item>
      </v-list-group>
      <v-list-group value="Repositories" tag="Repositories">
        <template v-slot:activator="{ props }">
          <v-list-item
            prepend-icon="mdi-source-repository"
            v-bind="props"
            :title="$t('common.repositories')"
          ></v-list-item>
        </template>

        <v-list-item
          :title="$t('common.list')"
          :value="$t('repositories.list')"
          @click="$router.replace({ name: 'repositories' })"
        ></v-list-item>
        <v-list-item
          :title="$t('common.maintainers')"
          :value="$t('repositories.maintainers')"
          id="sidebarrepositorymintainers"
          @click="
            $router.replace({
              name: 'repositoryMaintainers'
            })
          "
        ></v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useCommonStore } from '@/store/common'
import { useLoggedUserStore } from '@/store/logged_user'
import { computed } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { xs, mobile } = useDisplay()
const loggedUserStore = useLoggedUserStore()

const common_store = useCommonStore()
const drawer = computed({
  get() {
    return common_store.drawer
  },
  set(value: boolean) {
    common_store.setDrawer(value)
  }
})
</script>
