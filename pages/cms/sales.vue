<template>
  <div class="cmspage users">
    <div class="contentframe">
      <div class="menuframe ignorePrint">
        <div class="title">
          <span><i class="fas fa-file"></i>&nbsp;&nbsp;Sales</span>
        </div>
        <hr>
        <SalesList ref="list" />
      </div>
      <div class="itemframe">
        <SalesItem v-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import SalesList from '~/components/cms/sales/list';
import SalesItem from '~/components/cms/sales/item';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    SalesList,
    SalesItem,
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/sales');
        this.$refs.list.refresh();
      }
    },

    onRouteUpdate() {
      this.itemId = this.$route.query.id;
    }
  },
  watch: {
    $route() {
      this.onRouteUpdate();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.onRouteUpdate();
    });
  }
}
</script>

<style lang="scss" scoped>

</style>
