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
                v-model="localPage"
                class="my-4"
                :total-visible="
                  common_store.totalVisiblePages
                "
                :length="howManyPages"
              ></v-pagination>
              <v-row class="pageSize">
                <v-text-field
                  id="page-size-input"
                  style="flex: 1"
                  width="40"
                  v-model="localPageSize"
                  type="number"
                  color="text"
                  aria-valuemin="1"
                  :label="$t('pagination.size')"
                  @blur="setPageSize()"
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
import { useCommonStore } from '@/store/common'
import { computed, ref } from 'vue'

const common_store = useCommonStore()

const props = defineProps({
  howManyPages: {
    type: Number
  },
  pageSize: {
    type: Number
  },
  page: { type: Number }
})

const emit = defineEmits(['newPage', 'newPageSize'])

const localPage = computed({
  get() {
    return props.page
  },
  set: (value) => {
    if (value) emit('newPage', value - 1)
  }
})

const localPageSize = ref(props.pageSize)

function setPageSize() {
  emit('newPageSize', localPageSize.value)
}
</script>

<style lang="scss" scoped>
.pageSize {
  max-width: 100px !important;
}
</style>
