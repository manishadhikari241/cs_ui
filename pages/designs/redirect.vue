<template>
  <div>
    <div style="text-align: center"><b-spinner type="grow" label="Loading..."></b-spinner></div>
  </div>
</template>

<script>
export default {
  methods: {
    load() {
      var keyword = this.$route.params.pathMatch;
      if (keyword.length == 8) {
        this.$axios.$get(`/design?keyword=${keyword}`)
          .then((response) => {
            if (response.data.length) {
              this.$router.push(`/designs/${response.data[0].code}`);
            } else {
              this.$router.push('/');
            }
          });
      } else {
        this.$router.push('/');
      }
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