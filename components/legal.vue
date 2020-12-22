<template>
  <div>
    <div style="text-align: center" v-if="!pageInfo"><b-spinner type="grow" label="Loading..."></b-spinner></div>
    <div v-else v-html="pageInfo.translations[$i18n.locale].body"></div>
  </div>
</template>

<script>
export default {
  props: ['slug'],
  data() {
    return {
      pageInfo: null
    }
  },
  methods: {
    load() {
      this.$axios.$get(`/pages/${this.slug}`)
        .then((res) => {
          this.pageInfo = res;
        })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  }
}
</script>

<style lang="scss" scoped>

</style>