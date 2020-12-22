<template>
  <div class="cmspage users">
    <div class="contentframe">
      <div class="menuframe ignorePrint">
        <div class="title">
          <span><i class="fas fa-users"></i>&nbsp;&nbsp;Users</span>
          <b-button variant="outline-success" size="sm" @click="openCreateForm"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add new user</b-button>
        </div>
        <hr>
        <UserList ref="list" />
      </div>
      <div class="itemframe">
        <CreateForm v-if="itemId == -1" @updated="updated" />
        <UserItem v-else-if="itemId" :itemId="itemId" @updated="updated" />
      </div>
    </div>
  </div>
</template>

<script>
import UserList from '~/components/cms/users/list';
import UserItem from '~/components/cms/users/item';
import CreateForm from '~/components/cms/users/create';

export default {
  middleware: 'cmsuser',
  layout: 'cms',
  components: {
    UserList,
    UserItem,
    CreateForm
  },
  data() {
    return {
      itemId: null
    }
  },
  methods: {
    openCreateForm() {
      this.$router.push('/cms/users?id=-1');
    },

    updated({ refresh, clearItemFrame }) {
      if (refresh === true) this.$refs.list.refresh();
      if (clearItemFrame === true) {
        this.itemId = null;
        this.$router.push('/cms/users');
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