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
              <b-input type="text" :value="item.code" disabled></b-input>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Package</div>
            <div class="value">
              <b-form-select :options="packages" :value="item.package" disabled></b-form-select>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">{{ item.package == 'discount' ? 'Amount' : 'Quantity' }}</div>
            <div class="value">
              <b-input type="text" :value="item.quantity" disabled></b-input>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Multi Usage</div>
            <div class="value">
              <b-form-checkbox :checked="item.multi ? true : false" disabled></b-form-checkbox>
            </div>
          </div>
          <div class="item-row" v-show="item.multi">
            <div class="prop">Start Date</div>
            <div class="value">
              <b-form-datepicker size="sm" placeholder="Start Date" v-model="item.start_date" required></b-form-datepicker>
            </div>
          </div>
          <div class="item-row" v-show="item.multi">
            <div class="prop">End Date</div>
            <div class="value">
              <b-form-datepicker size="sm" placeholder="End Date" v-model="item.end_date" required></b-form-datepicker>
            </div>
          </div>
        </div>
        <div class="item-actions">
          <div style="text-align: center;">
            <b-alert show variant="danger">You can only update start/end dates of multi usage coupons</b-alert>
          </div>
          <b-button variant="primary" type="submit" :disabled="loading || item.user_id" v-if="item.multi"><i class="far fa-edit"></i>&nbsp;&nbsp;Update</b-button>
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
        { value: 'discount', text: 'Discount' }
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
      this.$axios.$patch(`/cms/coupons/${this.itemId}`, this.item)
      .then((response) => {
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