<template>
  <div class="cmspage countries">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-columns"></i>&nbsp;&nbsp;Pages</span>
        </div>
        <hr>
        <PageList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <PageItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import PageList from '~/components/cms/pages/list';
import PageItem from '~/components/cms/pages/item';
import CreateForm from '~/components/cms/pages/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    PageList,
    PageItem,
    CreateForm
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/pages?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/pages');
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
      if (this.$auth.user.role_id == 2) {
        this.$router.push('/cms/collections');
      }
    });
  }
}
</script>

<style lang="scss" scoped>

</style>