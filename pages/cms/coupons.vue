<template>
  <div class="cmspage coupons">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-hand-holding-usd"></i>&nbsp;&nbsp;Coupons</span>
          <b-button-group size="sm">
            <!-- <b-button variant="outline-primary" @click="create('standard')" :disabled="loading">+10 Standard</b-button>
            <b-button variant="outline-success" @click="create('extended')" :disabled="loading">+10 Extended</b-button>
            <b-button variant="outline-info" @click="create('simulator')" :disabled="loading">+10 Simulator</b-button>
            <b-button variant="outline-danger" @click="create('exclusive')" :disabled="loading">+10 Exclusive</b-button> -->
            <b-button variant="outline-success" size="sm" @click="openCreateForm"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new coupon</b-button>
          </b-button-group>
        </div>
        <hr>
        <CouponList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <CouponItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import CouponList from '~/components/cms/coupons/list';
import CouponItem from '~/components/cms/coupons/item';
import CreateForm from '~/components/cms/coupons/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    CouponList,
    CouponItem,
    CreateForm
  },
  data() {
    return {
      itemId: null,
      loading: false,
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/coupons?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/coupons');
        this.$refs.list.refresh();
      }
    },

    onRouteUpdate() {
      this.itemId = this.$route.query.id;
    },

    // create(pkg) {
    //   this.loading = true;
    //   this.$axios.$post('/cms/coupons', {package: pkg, quantity: 10, multi: false, start_date: this.$moment().format('YYYY-MM-DD'), end_date: this.$moment().format('YYYY-MM-DD')})
    //     .then((response) => {
    //       this.loading = false;
    //       this.$toast.success('Coupons created successfully');
    //       this.updated({refresh: true});
    //     }).catch((error) => {
    //       this.loading = false;
    //       this.$toast.error(error.response.data.error.message);
    //     });
    // }
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