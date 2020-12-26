<template>
  <div class="component stripe">
    <form @submit.prevent="pay">
      <div id="alipay"></div>
      <button>Submit Payment</button>
    </form>
    <div id="alipay-errors" role="alert"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card: null
    }
  },
  methods: {
    prepare() {
      const elements = this.$stripe.elements();
      var style = {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      };
      this.card = elements.create('card', {style});
      this.card.mount('#alipay');

      this.card.on('change', function(event) {
        var displayError = document.getElementById('alipay-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });
    },

    pay($event) {
      this.$axios.$get('/payments/stripe/token').then((response) => {
        this.$stripe.confirmAlipayPayment(response.token, {
          return_url: `http://localhost:3000`,
        }).then((result) => {
          if (result.error) {
            var errorElement = document.getElementById('alipay-errors');
            errorElement.textContent = result.error.message;
          }
        });
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.prepare();
    });
  }
}
</script>

<style>

</style>