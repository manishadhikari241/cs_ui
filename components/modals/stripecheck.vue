<template>
  <div>
    <b-modal id="modal-stripecheck" size="xs" centered hide-header hide-footer :no-close-on-esc="true" :no-close-on-backdrop="true">
      <b-container>
        <div style="text-align: center">Processing payment</div>
        <br><br>
        <div style="text-align: center">
          <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { BIconX } from "bootstrap-vue";

export default {
  components: {
    BIconX
  },
  data() {
    return {
      interval: null
    }
  },
  methods: {
    startCheck(id) {
      this.$bvModal.show("modal-stripecheck");
      this.interval = setInterval(() => { this.check(id) }, 5000);
    },

    check(id) {
      this.$axios.$get(`/payments/stripe/check/${id}`)
        .then((response) => {
          if (response.status == 0) {

          } else if (response.status == 1) {
            this.$store.commit("app/setQuota", response.quota);
            this.$bvModal.show("modal-quota");
            this.stop();
          } else {
            this.$toast.error('Payment Failed');
            this.stop();
          }
        }).catch((error) => {
          this.$toast.error(error.response.data.error.message);
          this.stop();
        });
    },

    stop() {
      clearInterval(this.interval);
      this.$router.push(this.$route.path);
      this.$bvModal.hide("modal-stripecheck");
    }
  },
  beforeDestroy() {
    this.stop();
  }
}
</script>

<style lang="scss">
#modal-stripecheck {
  .modal-content {
    padding: 15px 0;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    border: 3px solid $black;
  }
}
</style>