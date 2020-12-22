<template>
  <div class="cmspage designs">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-image"></i>&nbsp;&nbsp;Designs</span>
          <b-button variant="outline-success" size="sm" @click="openCreateForm"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new design</b-button>
        </div>
        <hr>
        <DesignList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <DesignItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import DesignList from '~/components/cms/designs/list';
import DesignItem from '~/components/cms/designs/item';
import CreateForm from '~/components/cms/designs/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    DesignList,
    DesignItem,
    CreateForm
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/designs?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/designs');
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