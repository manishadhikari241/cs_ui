<template>
  <div class="cmscomponent item color">
    <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>
    <div v-if="item">
      <div class="title">
        <span><i class="far fa-edit"></i>&nbsp;&nbsp;ID: {{ item.id }}</span>
        <div>
          <b-button variant="outline-danger" size="sm" @click="deleteItem"><i class="fas fa-trash"></i>&nbsp;&nbsp;Delete</b-button>
          <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
        </div>
      </div>
      <hr>
      <form @submit.prevent="update">
        <div class="item-content">
          <div class="item-row">
            <div class="prop">Code</div>
            <div class="value">
              <b-input type="text" name="code" :value="item.code" maxlength="2" required></b-input>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Name (EN)</div>
            <div class="value">
              <b-input type="text" name="nameEN" :value="item.translations[0].name" required></b-input>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Name (CH)</div>
            <div class="value">
              <b-input type="text" name="nameCH" :value="item.translations[1].name" required></b-input>
            </div>
          </div>
        </div>
        <div class="item-actions">
          <b-button variant="primary" type="submit" :disabled="loading"><i class="far fa-edit"></i>&nbsp;&nbsp;Update</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['itemId'],
  data() {
    return {
      item: null,
      loading: false
    }
  },
  methods: {
    load() {
      this.$axios.$get(`/cms/colors/${this.itemId}`)
        .then((response) => {
          this.item = response;
        });
    },

    cancel() {
      this.$emit('updated', { clearItemFrame: true });
    },

    update(e) {
      this.loading = true;
      this.$axios.$patch(`/cms/colors/${this.itemId}`, {
        code: e.target.elements.code.value,
        nameEN: e.target.elements.nameEN.value,
        nameCH: e.target.elements.nameCH.value,
      }).then((response) => {
        this.loading = false;
        this.$toast.success('Color updated successfully');
        this.$emit('updated', { refresh: true });
      }).catch((error) => {
        this.loading = false;
        this.$toast.error(error.response.data.error.message);
      });
    },

    deleteItem() {
      this.$bvModal.msgBoxConfirm('Are you sure?', {centered: true, bodyClass: 'confirm-box-body', footerClass: 'confirm-box-footer'})
          .then(value => {
            if (value) {
              let itemId = this.itemId;
              this.$axios.$delete(`/cms/colors/${itemId}`)
                .then((response) => {
                  this.$toast.success('Color deleted successfully');
                  this.cancel();
                }).catch((error) => {
                  this.$toast.error(error.response.data.error.message);
                });
            }
          })
    }
  },
  watch: {
    itemId() {
      this.item = null;
      this.load();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  }
}
</script>

<style lang="scss" scoped>

</style>