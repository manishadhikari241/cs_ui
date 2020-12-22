<template>
  <div class="component braintree" v-if="token">
    <div style="text-align: center" v-if="!loaded"><b-spinner type="grow" label="Loading..."></b-spinner></div>
    <v-braintree 
      :authorization="token"
      :vaultManager="true"
      :card="{
        cardholderName: {
          required: true,
          autocomplete: 'off'
        }
      }"
      :btnText="$t('buy')"
      btnClass="btn-cs-buy"
      @success="onSuccess"
      @error="onError"
      @load="onLoad"
    ></v-braintree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: null,
      loaded: false
    }
  },
  methods: {
    getToken() {
      this.token = null;
      this.$axios.$get('/payments/braintree/token')
        .then((response) => {
          this.token = response.token;
        })
    },

    onSuccess (payload) {
      let nonce = payload.nonce;
      this.$emit('onSuccess', nonce);
      // Do something great with the nonce...
    },
    
    onError (error) {
      let message = error.message;
      // alert(message);
      // Whoops, an error has occured while trying to get the nonce
    },

    onLoad () {
      this.loaded = true;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getToken();
    });
  }
}
</script>

<style lang="scss">
.component.braintree {
  .btn-cs-buy {
    border: none;
    outline: none;
    width: 200px;
    padding: 5px;
    background: $brand;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    border-radius: 30px;

    &:active {
      box-shadow: inset 0 0 10px rgba(0, 0, 0, .5);
    }
  }
}
</style>