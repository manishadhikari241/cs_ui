<template>
  <div class="cmspage countries">
    <div class="contentframe">
      <div class="menuframe">
        <div class="title">
          <span><i class="fas fa-globe-americas"></i>&nbsp;&nbsp;Countries</span>
          <b-button variant="outline-success" size="sm" @click="openCreateForm"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new country</b-button>
        </div>
        <hr>
        <CountryList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <CountryItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import CountryList from '~/components/cms/countries/list';
import CountryItem from '~/components/cms/countries/item';
import CreateForm from '~/components/cms/countries/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    CountryList,
    CountryItem,
    CreateForm
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/countries?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/countries');
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