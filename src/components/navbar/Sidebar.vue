<template>
  <v-layout style="position: inherit">
    <v-navigation-drawer
      v-model="drawer"
      style="z-index:1000"
      temporary
      absolute
      height="100%"
    >
      <v-list nav class="sidebar">
        <v-list-item
          prepend-icon="mdi-account"
          title="username"
          subtitle="logged in"
        ></v-list-item>
        <v-divider class="pb-3"></v-divider>
        <v-list-item
          prepend-icon="mdi-upload"
          :title="$t('common.addPackage')"
          :value="$t('common.addPackage')"
          @click="$router.replace({name: 'addSubmission'})"
        ></v-list-item>

        <v-list-group prepend-icon="mdi-package" value="packages">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="$t('common.packages')"
            ></v-list-item>
          </template>

          <v-list-item
          :title="$t('common.list')"
          :value="$t('common.list')"
          @click="$router.replace({name: 'packages'})"
        ></v-list-item>
        <v-list-item
          :title="$t('common.maintainers')"
          :value="$t('common.maintainers')"
          @click="$router.replace({name: 'packages'})"
        ></v-list-item>
        </v-list-group>

        <v-list-group prepend-icon="mdi-source-repository" value="repositories">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="$t('common.repositories')"
            ></v-list-item>
          </template>

          <v-list-item
          :title="$t('common.list')"
          :value="$t('common.list')"
          @click="$router.replace({name: 'repositories'})"
        ></v-list-item>
        <v-list-item
          :title="$t('common.maintainers')"
          :value="$t('common.maintainers')"
          @click="$router.replace({name: 'repositories'})"
        ></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/store/common";
import { computed } from "vue";

const common_store = useCommonStore();

const drawer = computed({
  get() {
    return common_store.drawer;
  },
  set(value: boolean) {
    common_store.setDrawer(value);
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  max-height: 100%;
  width: 100%;
  margin-top: 80px !important;
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
.v-application--is-ltr .v-list-item__icon:last-of-type:not(:only-child) {
  margin-left: 0 !important;
}

.v-list-item__content {
  display: flex !important;
  justify-content: flex-start;
  align-items: center;
}
</style>
