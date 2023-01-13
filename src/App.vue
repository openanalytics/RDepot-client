<template>
  <v-app>
    <v-main>
    <Sidebar />
    <Navbar />
      <router-view class="mainApp"></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Sidebar from '@/components/navbar/Sidebar.vue';
import Navbar from '@/components/navbar/Navbar.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
