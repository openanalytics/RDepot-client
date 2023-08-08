<template>
  <div
    v-dompurify-html="md_description"
    class="text my-5"
  ></div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { useUtilities } from '@/composable/utilities'
import { computed } from 'vue'
const props = defineProps({
  description: {
    type: String,
    required: true
  },
  short_version: {
    type: Boolean,
    default: false
  }
})

const { short_renderer, renderer } = useUtilities()

marked.use({
  renderer: props.short_version ? short_renderer : renderer
})

const md_description = computed(() => {
  return marked.parse(
    props.description.replaceAll('\\n', '\n') || '',
    { breaks: true, gfm: true }
  )
})
</script>

<style lang="scss">
$code_color: rgba(var(--v-theme-code));

code {
  margin-top: -25px; // removes weird extra newline at the beginning of code block
  align-self: center;
}

i {
  align-self: center;
}

pre {
  background-color: $code_color;
  padding: 20px;
  line-height: 1.5;
  border-radius: 8px;
  -webkit-box-shadow: 4px 4px 12px 0px #42445a;
  -moz-box-shadow: 4px 4px 12px 0px rgba(66, 68, 90, 1);
  box-shadow: 2px 2px 6px 0px rgba(66, 68, 90, 1);
  max-width: 1200px;
  font-size: 0.9em;
  white-space: pre-line;
}

th,
td {
  border: 1px solid;
  padding: 10px;
}

table {
  border: 1px solid;
  border-collapse: collapse;
}
</style>
