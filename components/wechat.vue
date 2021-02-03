<template>
  <div class="component wechat">
    <div v-if="qr">
      <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qr}`">
      <br><br>
      <button @click="$emit('bgcheck', id)">{{ $t('continue') }}</button>
      <br><br>
      <p>{{$t('please_scan_wechat')}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info', 'coupon'],
  data() {
    return {
        id: null,
        qr: null
    }
  },
  methods: {
    init() {
      this.$emit('status', true);
      this.$axios.$post('/payments/stripe/init', {
        channel: 'wechat',
        amount: this.info.price,
        package: this.info.pkg,
        package_type: this.info.package_type,
        billing_details: this.info.billingDetails,
        vat_number: this.info.vatNumber,
        coupon: this.coupon
      }).then((response) => {
        this.$emit('status', false);
        this.qr = response.qr;
        this.id = response.id;
      }).catch((error) => {
        this.$emit('status', false);
        this.$toast.error(error.response.data.error.message);
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  }
}
</script>

<style lang="scss">
.component.wechat {
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