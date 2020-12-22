<template>
  <div class="cmspage seasons">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-calendar"></i>&nbsp;&nbsp;Seasons</span>
          <b-button variant="outline-success" size="sm" @click="openCreateForm"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new Season</b-button>
        </div>
        <hr>
        <SeasonList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <SeasonItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import SeasonList from '~/components/cms/seasons/list';
import SeasonItem from '~/components/cms/seasons/item';
import CreateForm from '~/components/cms/seasons/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    SeasonList,
    SeasonItem,
    CreateForm
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/seasons?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/seasons');
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