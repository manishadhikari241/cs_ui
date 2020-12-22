<template>
  <div class="cmspage tags">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-tags"></i>&nbsp;&nbsp;Tags</span>
          <b-button variant="outline-success" size="sm" @click="openCreateForm"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new Tag</b-button>
        </div>
        <hr>
        <TagList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <TagItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import TagList from '~/components/cms/tags/list';
import TagItem from '~/components/cms/tags/item';
import CreateForm from '~/components/cms/tags/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    TagList,
    TagItem,
    CreateForm
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/tags?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/tags');
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