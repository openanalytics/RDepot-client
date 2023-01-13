<template>
  <div>
    {{ title }}
    {{ repositories }}
  </div>
</template>

<script  setup lang="ts">
import { useRepositoryStore } from '@/store/repositories';
import { computed, onMounted, ref } from 'vue';

const title = ref('repositories')
const repository_store = useRepositoryStore()

const repositories = computed(function(){
  return repository_store.repositories
})

function updateState(){
  repository_store.fetchRepositories()
}

onMounted(() => {
  updateState()
})

</script>
