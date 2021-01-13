<template>
  <div class="component alipay">
    <form @submit.prevent="pay">
      <div id="alipay"></div>
      <button>{{ $t('buy') }}</button>
    </form>
    <div id="alipay-errors" role="alert"></div>
  </div>
</template>

<script>
export default {
  props: ['info'],
  data() {
    return {
      card: null,
      baseURL: process.env.NUXT_ENV_SERVER
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
      this.$emit('status', true);
      this.$axios.$post('/payments/alipay/token', {
        amount: this.info.price,
        package: this.info.pkg,
        package_type: this.info.package_type,
        billing_details: this.info.billingDetails,
        vat_number: this.info.vatNumber
      }).then((response) => {
        this.$stripe.confirmAlipayPayment(response.token, {
          return_url: `${this.baseURL}/api/payments/alipay/confirm`,
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

<style lang="scss">
.component.alipay {
  margin-top: 30px;

  input,
  .StripeElement {
    height: 40px;
    padding: 10px 12px;

    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  input:focus,
  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }

  button {
    margin-top: 20px;
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