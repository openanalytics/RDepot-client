<template>
  <v-row justify="end" class="my-5 mx-10" align="center">
    <CommonButton
      id="reset-packages-filtration"
      :title="$t('common.reset')"
      v-on:buttonClicked="
        showOverlay(OverlayEnum.RepositoryFiltrationReset)
      "
      class="mx-3"
    />
    <CommonButton
      :title="$t('filtration.title')"
      v-on:buttonClicked="
        showOverlay(OverlayEnum.RepositoryFiltration)
      "
      class="mx-3"
    />
  </v-row>
  <RepositoriesList />
</template>

<script setup lang="ts">
import RepositoriesList from '@/components/repositories/RepositoriesList.vue'
import CommonButton from '@/components/common/Button.vue'
import { OverlayEnum } from '@/enum/Overlay'
import { useCommonStore } from '@/store/common'
import { useRepositoryStore } from '@/store/repositories'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const common_store = useCommonStore()
const repository_store = useRepositoryStore()
const { t } = useI18n()

const repositories = computed(function () {
  return repository_store.repositories
})

function updateState() {
  repository_store.fetchRepositories()
}

onMounted(() => {
  updateState()
})

function showOverlay(value: number) {
  common_store.setOverlayText(t('filtration.makeSure'))
  common_store.setOverlayModel(true)
  common_store.setOverlayOpacity(0.8)
  common_store.setOverlayComponent(value)
}
</script>
