<template>
  <div class="cmspage categories">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-stream"></i>&nbsp;&nbsp;Categories</span>
          <b-button variant="outline-success" size="sm" @click="openCreateForm"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new Category</b-button>
        </div>
        <hr>
        <CategoryList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <CategoryItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryList from '~/components/cms/categories/list';
import CategoryItem from '~/components/cms/categories/item';
import CreateForm from '~/components/cms/categories/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    CategoryList,
    CategoryItem,
    CreateForm
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/categories?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/categories');
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