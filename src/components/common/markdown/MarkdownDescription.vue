<!--
 R Depot
 
 Copyright (C) 2012-2025 Open Analytics NV
 
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
  <div
    id="markdown-description"
    v-dompurify-html="mdDescription"
    :class="[
      'text',
      short ? ' short' : changes ? 'pa-4 py-1' : 'pa-5',
      changes ? '' : description ? 'my-5' : ''
    ]"
  ></div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import { useUtilities } from '@/composable/utilities'
import { computed } from 'vue'
import { i18n } from '@/plugins/i18n'

const componentProps = defineProps<{
  description?: string
  short?: boolean
  packageId?: number
  changes?: boolean
}>()

const { renderer } = useUtilities()

// Reset marked settings to use defaults
marked.use(marked.getDefaults())
marked.use({
  renderer: renderer
})

const mdDescription = computed(() => {
  const description =
    componentProps.description ||
    i18n.t('package.noDescriptionProvided')
  return marked.parse(
    description.replaceAll('\\n', '\n') || '',
    { breaks: true, gfm: true }
  )
})
</script>

<style local lang="scss">
$code_color: rgba(var(--v-theme-code));
#markdown-description {
  code {
    margin-top: -25px; // removes weird extra newline at the beginning of code block
    align-self: center;
  }

  i {
    align-self: center;
  }

  pre {
    background-color: $code_color;
    padding: 10px;
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

  ul > li,
  ol > li {
    margin-left: 45px;
  }
}
</style>
