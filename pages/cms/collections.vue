<template>
  <div class="cmspage collections">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-images"></i>&nbsp;&nbsp;Collections</span>
          <b-button variant="outline-success" size="sm" @click="openCreateForm"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new Collection</b-button>
        </div>
        <hr>
        <CollectionList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <CollectionItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import CollectionList from '~/components/cms/collections/list';
import CollectionItem from '~/components/cms/collections/item';
import CreateForm from '~/components/cms/collections/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    CollectionList,
    CollectionItem,
    CreateForm
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/collections?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/collections');
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