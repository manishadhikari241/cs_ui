<template>
  <div class="cmspage maskRequests">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-tshirt"></i>&nbsp;&nbsp;Mask Requests</span>
        </div>
        <hr>
        <RequestList ref="list" />
      </div>
      <div class="itemframe">
        <RequestItem v-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import RequestList from '~/components/cms/maskRequests/list';
import RequestItem from '~/components/cms/maskRequests/item';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    RequestList,
    RequestItem
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/maskRequests?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/maskRequests');
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