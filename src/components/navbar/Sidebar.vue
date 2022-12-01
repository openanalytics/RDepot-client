<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list-item class="itemsList px-2 py-5">
      <v-list-item-avatar
        ><v-icon>mdi-account</v-icon></v-list-item-avatar
      >

      <v-list-item-title>username</v-list-item-title>
    </v-list-item>

    <v-divider class="pb-3"></v-divider>

    <v-list nav dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-upload</v-icon>
        </v-list-item-icon>
        <router-link :to="{ name: 'addSubmission' }">
          <v-list-item-title
            >{{ $t('common.addPackage') }}
          </v-list-item-title>
        </router-link>
      </v-list-item>

      <v-list-group
        :value="false"
        color="text"
        prepend-icon="mdi-package"
      >
        <template v-slot:activator>
          <v-list-item-title>{{
            $t('common.packages')
          }}</v-list-item-title>
        </template>

        <router-link :to="{ name: 'packages' }">
          <v-list-item>
            <router-link
              :to="{ name: 'packages' }"
              style="width: 100%"
            >
              <v-list-item-title
                class="pl-15"
                v-text="$t('common.list')"
              ></v-list-item-title>
            </router-link>
          </v-list-item>
        </router-link>
        <v-list-item>
          <router-link
            :to="{ name: 'packages' }"
            style="width: 100%"
          >
            <v-list-item-title
              class="pl-15"
              v-text="$t('common.maintainers')"
            ></v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list-group>

      <v-list-group
        :value="false"
        color="text"
        prepend-icon="mdi-source-repository"
      >
        <template v-slot:activator>
          <v-list-item-title>{{
            $t('common.repositories')
          }}</v-list-item-title>
        </template>

        <v-list-item>
          <router-link :to="{ name: 'repositories' }">
            <v-list-item-title
              class="pl-15"
              v-text="$t('common.list')"
            ></v-list-item-title>
          </router-link>
        </v-list-item>
        <v-list-item>
          <router-link :to="{ name: 'repositories' }">
            <v-list-item-title
              class="pl-15"
              v-text="$t('common.maintainers')"
            ></v-list-item-title>
          </router-link>
        </v-list-item>
      </v-list-group>
      <v-list-item
        link
        style="width: 100%"
        class="d-flex justify-left"
      >
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <router-link :to="{ name: 'submissions' }">
          <v-list-item-title>{{
            $t('submissions')
          }}</v-list-item-title>
        </router-link>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import store from '@/store'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {}
  },
  computed: {
    drawer: {
      get() {
        return store.state.common.drawer
      },
      set(value: Boolean) {
        store.dispatch('setDrawer', value)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  max-height: 100%;
  width: 100%;
  .itemsList {
    margin-top: 80px;
  }
}

.sidebar-show {
  min-width: 350px;
}
div .v-list a {
  text-decoration: none;
  color: unset;
}
.v-application--is-ltr
  .v-list-item__icon:last-of-type:not(:only-child) {
  margin-left: 0 !important;
}
</style>
