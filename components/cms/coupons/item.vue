<template>
  <div class="cmscomponent item coupon">
    <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>
    <div v-if="item">
      <div class="title">
        <span><i class="far fa-edit"></i>&nbsp;&nbsp;ID: {{ item.id }}</span>
        <div>
          <b-button variant="outline-danger" size="sm" @click="deleteItem" :disabled="item.user_id"><i class="fas fa-trash"></i>&nbsp;&nbsp;Delete</b-button>
          <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
        </div>
      </div>
      <hr>
      <form @submit.prevent="update">
        <div class="item-content">
          <div class="item-row">
            <div class="prop">Code</div>
            <div class="value">
              <b-input type="text" name="code" :value="item.code" :disabled="item.user_id" required></b-input>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Package</div>
            <div class="value">
              <b-form-select v-model="item.package" :options="packages" name="package" :disabled="item.user_id" required></b-form-select>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Quantity</div>
            <div class="value">
              <b-input type="text" name="quantity" :value="item.quantity" :disabled="item.user_id" required></b-input>
            </div>
          </div>
        </div>
        <div class="item-actions">
          <div style="text-align: center;">
            <b-alert show variant="danger" v-if="item.user_id">Used coupons cannot be updated or deleted</b-alert>
          </div>
          <b-button variant="primary" type="submit" :disabled="loading || item.user_id"><i class="far fa-edit"></i>&nbsp;&nbsp;Update</b-button>
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
      loading: false,
      packages: [
        { value: 'standard', text: 'Standard' },
        { value: 'extended', text: 'Extended' },
        { value: 'simulator', text: 'Simulator' },
        { value: 'exclusive', text: 'Exclusive' },
      ]
    }
  },
  methods: {
    load() {
      this.$axios.$get(`/cms/coupons/${this.itemId}`)
        .then((response) => {
          this.item = response;
        });
    },

    cancel() {
      this.$emit('updated', { clearItemFrame: true });
    },

    update(e) {
      this.loading = true;
      this.$axios.$patch(`/cms/coupons/${this.itemId}`, {
        code: e.target.elements.code.value,
        pkg: e.target.elements.package.value,
        quantity: e.target.elements.quantity.value,
      }).then((response) => {
        this.loading = false;
        this.$toast.success('Coupon updated successfully');
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
              this.$axios.$delete(`/cms/coupons/${itemId}`)
                .then((response) => {
                  this.$toast.success('Coupon deleted successfully');
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