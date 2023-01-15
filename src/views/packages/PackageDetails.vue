<template>
  <div>
    PACKAGE DETAILS
    <p>
      {{ props.name }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ name: String })
</script>
