<template>
  <div class="cmspage colors">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-globe-americas"></i>&nbsp;&nbsp;Colors</span>
          <b-button variant="outline-success" size="sm" @click="openCreateForm"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new color</b-button>
        </div>
        <hr>
        <ColorList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <ColorItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import ColorList from '~/components/cms/colors/list';
import ColorItem from '~/components/cms/colors/item';
import CreateForm from '~/components/cms/colors/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    ColorList,
    ColorItem,
    CreateForm
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/colors?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/colors');
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