<template>
  <div class="cmscomponent item color create">
    <div class="title">
      <span><i class="fas fa-plus"></i>&nbsp;&nbsp;ID: Add new color</span>
      <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
    </div>
    <hr>
    <form @submit.prevent="create">
      <div class="item-content">
        <div class="item-row">
          <div class="prop">Code</div>
          <div class="value">
            <b-input type="text" name="code" v-model="item.code" required></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Name (EN)</div>
          <div class="value">
            <b-input type="text" name="nameEN" v-model="item.nameEN" required></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Name (CH)</div>
          <div class="value">
            <b-input type="text" name="nameCH" v-model="item.nameCH" required></b-input>
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
        code: '',
        nameEN: '',
        nameCH: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('updated', {clearItemFrame: true});
    },

    create() {
      this.loading = true;
      this.$axios.$post('/cms/colors', this.item)
        .then((response) => {
          this.loading = false;
          this.$toast.success('New color added successfully');
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