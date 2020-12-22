<template>
  <div class="cmspage extra">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-rss"></i>&nbsp;&nbsp;Posts</span>
          <b-button variant="outline-success" size="sm" @click="openCreateForm"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new post</b-button>
        </div>
        <hr>
        <PostList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <PostItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '~/components/cms/extra/list';
import PostItem from '~/components/cms/extra/item';
import CreateForm from '~/components/cms/extra/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    PostList,
    PostItem,
    CreateForm
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/extra?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/extra');
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