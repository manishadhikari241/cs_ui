<template>
  <div class="cmspage exclusive">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="far fa-image"></i>&nbsp;&nbsp;Exclusive</span>
        </div>
        <hr>
        <ExclusiveList ref="list" />
      </div>
      <div class="itemframe">
        <ExclusiveItem v-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import ExclusiveList from '~/components/cms/exclusive/list';
import ExclusiveItem from '~/components/cms/exclusive/item';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    ExclusiveList,
    ExclusiveItem
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/exclusive?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/exclusive');
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