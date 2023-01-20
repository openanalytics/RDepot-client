<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-container class="mt-4">
            <v-row
              justify="space-between"
              class="ml-10"
              align="center"
            >
              <div></div>
              <v-pagination
                v-model="page"
                class="my-4"
                :length="howManyPages"
              ></v-pagination>
              <v-row class="pageSize">
                <v-text-field
                  style="flex: 1"
                  width="40"
                  v-model="pageSize"
                  type="number"
                  color="text"
                  :label="$t('pagination.size')"
                ></v-text-field>
              </v-row>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { usePackagesStore } from '@/store/packages'
import { ref } from 'vue'
import { computed } from '@vue/runtime-core'

var props = defineProps({
  howMany: Number,
  page: Number
})

const emit = defineEmits(['newPage'])
const allPackages = ref(100)
const package_store = usePackagesStore()

const howManyPages = computed(function () {
  return allPackages.value / package_store.pageSize
})

const pageSize = computed({
  get() {
    return package_store.pageSize
  },
  set(value: number) {
    package_store.setPageSize(value)
  }
})

const page = computed({
  get: () => props.page,
  set: (value) => emit('newPage', value)
})
</script>

<style lang="scss" scoped>
.pageSize {
  max-width: 100px !important;
}
</style>
