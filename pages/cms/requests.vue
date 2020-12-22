<template>
  <div class="cmspage requests">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="far fa-images"></i>&nbsp;&nbsp;Requests</span>
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
import RequestList from '~/components/cms/requests/list';
import RequestItem from '~/components/cms/requests/item';

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
      this.$router.push('/cms/requests?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/requests');
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