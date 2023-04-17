<template>
  <span class="mr-8"> {{ prepareText() }} </span>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'

const props = defineProps({
  text: {
    type: String
  }
})

const descMaxLength = ref(110)

function prepareText(): string {
  var text: string | undefined = props.text
  if (text) {
    if (text.length > descMaxLength.value) {
      text.slice(0, descMaxLength.value) + '...'
    }
    return text
  }
  return ''
}
</script>

<style scoped>
span {
  line-height: 1.3;
}
</style>
