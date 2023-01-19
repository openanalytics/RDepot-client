<template>
  <v-app>
    <v-main>
      <Sidebar />
      <Navbar />
      <notifications
        position="top right"
        :max="5"
        pauseOnHover
      />
      <router-view class="mainApp"></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Sidebar from '@/components/navbar/Sidebar.vue'
import Navbar from '@/components/navbar/Navbar.vue'
</script>
