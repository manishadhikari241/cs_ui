<template>
  <div class="component alipay">
    <button @click="init">{{ $t('continue') }}</button>
    <br><br>
    <p>{{$t('please_do_not_close_browser')}}</p>
  </div>
</template>

<script>
export default {
  props: ['info', 'coupon'],
  methods: {
    init() {
      this.$emit('status', true);
      this.$axios.$post('/payments/stripe/init', {
        channel: 'alipay',
        amount: this.info.price,
        package: this.info.pkg,
        package_type: this.info.package_type,
        billing_details: this.info.billingDetails,
        vat_number: this.info.vatNumber,
        coupon: this.coupon
      }).then((response) => {
        window.location.href = response.redirect;
      }).catch((error) => {
        this.$emit('status', false);
        this.$toast.error(error.response.data.error.message);
      });
    }
  }
}
</script>

<style lang="scss">
.component.alipay {
  margin-top: 30px;

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