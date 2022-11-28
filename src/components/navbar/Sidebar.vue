<template>
  <v-navigation-drawer permanent class="sidebar">
    <v-list-item class="itemsList px-2">
      <v-list-item-avatar>
        <v-img
          src="https://randomuser.me/api/portraits/men/85.jpg"
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-title>username</v-list-item-title>

      <!-- <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn> -->
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-upload</v-icon>
        </v-list-item-icon>
        <router-link :to="{ name: 'addSubmission' }">
          <v-list-item-title>{{
            $t('common.addPackage')
          }}</v-list-item-title>
        </router-link>
      </v-list-item>

      <v-list-group
        :value="false"
        color="text"
        prepend-icon="mdi-package"
      >
        <template v-slot:activator>
          <v-list-item-title>
            {{ $t('common.packages') }}
          </v-list-item-title>
        </template>

        <router-link :to="{ name: 'packages' }">
          <v-list-item>
            <v-list-item-title
              class="pl-15"
              v-text="$t('common.list')"
            ></v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </router-link>
        <v-list-item>
          <v-list-item-title
            class="pl-15"
            v-text="$t('common.maintainers')"
          ></v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>

      <v-list-group
        :value="false"
        color="text"
        prepend-icon="mdi-source-repository"
      >
        <template v-slot:activator>
          <v-list-item-title>
            {{ $t('common.repositories') }}
          </v-list-item-title>
        </template>

        <v-list-item>
          <v-list-item-title
            class="pl-15"
            v-text="$t('common.list')"
          ></v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-list-item-title
            class="pl-15"
            v-text="$t('common.maintainers')"
          ></v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{
          $t('submissions')
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      mini: true,
      drawer: true,
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline']
      ]
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

// .sidebar-hide {
//   min-width: 60px;
// }
.sidebar-show {
  min-width: 350px;
}
</style>
