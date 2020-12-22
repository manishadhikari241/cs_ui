<template>
  <div class="cmscomponent item country create">
    <div class="title">
      <span><i class="fas fa-plus"></i>&nbsp;&nbsp;ID: Add new User</span>
      <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
    </div>
    <hr>
    <form @submit.prevent="create">
      <div class="item-content">
        <div class="item-row">
          <div class="prop">First Name</div>
          <div class="value">
            <b-input type="text" name="first_name" v-model="item.first_name" required></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Last Name</div>
          <div class="value">
            <b-input type="text" name="last_name" v-model="item.last_name" required></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Email</div>
          <div class="value">
            <b-input type="email" name="email" v-model="item.email" required></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Password</div>
          <div class="value">
            <b-input type="password" name="password" v-model="item.password" required></b-input>
          </div>
        </div>
      </div>
      <div class="item-actions">
        <b-button variant="primary" type="submit" :disabled="loading"><i class="fas fa-plus"></i>&nbsp;&nbsp;Create</b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      item: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('updated', {clearItemFrame: true});
    },

    create() {
      this.loading = true;
      this.$axios.$post('/cms/users', this.item)
        .then((response) => {
          this.loading = false;
          this.$toast.success('New user added successfully');
          this.cancel();
        }).catch((error) => {
          this.loading = false;
          this.$toast.error(error.response.data.error.message);
        });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>