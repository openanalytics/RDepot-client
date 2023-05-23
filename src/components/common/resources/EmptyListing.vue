<template>
  <v-expansion-panel class="py-3">
    <v-row>
      <v-col class="d-flex align-center justify-center">{{
        $t('common.noListingResults')
      }}</v-col>
    </v-row>
  </v-expansion-panel>
</template>

<style lang="scss">
.v-col {
  padding: 10px !important;
  span{
    font-size: 13px !important;

  }
}
.col {
  line-height: 1.3;
}
</style>
