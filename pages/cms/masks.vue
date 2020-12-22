<template>
  <div class="cmspage masks">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-tshirt"></i>&nbsp;&nbsp;Masks</span>
          <b-button variant="outline-success" size="sm" @click="openCreateForm"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new mask</b-button>
        </div>
        <hr>
        <MaskList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <MaskItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import MaskList from '~/components/cms/masks/list';
import MaskItem from '~/components/cms/masks/item';
import CreateForm from '~/components/cms/masks/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    MaskList,
    MaskItem,
    CreateForm
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/masks?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/masks');
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