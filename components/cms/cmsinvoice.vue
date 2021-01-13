<template>
  <div>
    <div class="title">
      <span>Invoice # {{ payment.id }}</span>
      <b-button size="sm" @click="print" class="btn-print ignorePrint">Print Invoice &nbsp;&nbsp;<i class="fas fa-print"></i></b-button>
    </div>
    <div class="invoice-header">
      <div class="logo"><img alt="logo" src="~/assets/logo.svg"></div>
      <div class="text">Unit 611, Kinetic Industrial Center, No.7 Wang Kwong Road, Kowloon Bay, Hong Kong</div>
      <div class="text">www.collectionstock.com</div>
    </div>
    <br><hr class="ignorePrint">
    <div class="invoice-details">
      <div class="prop">Invoice Date</div>
      <div class="value">{{ $moment(payment.created_at).format('DD/MM/YYYY') }}</div>
      <div class="prop">Payment Method</div>
      <div class="value">
        <span v-if="payment.channel != 'coupon'">Credit Card</span>
        <span v-if="payment.channel == 'coupon'">Coupon</span>
      </div>
      <div class="prop">{{ $t('billing_details') }}</div>
      <div class="value" v-if="payment.billing_details">{{ payment.billing_details }}</div>
      <div class="prop" v-if="payment.channel != 'coupon'">Transaction ID</div>
      <div class="value" v-if="payment.channel != 'coupon'">{{ payment.transaction_id }}</div>
      <div class="prop">Package</div>
      <div class="value">
        <div v-if="payment.package == 'standard' || payment.package == 'extended'">
          <p><span class="capitalize">{{ $t(payment.package) }}</span> {{ payment.package == 'standard' || payment.package == 'extended' ? 'License' : 'Requests' }} - ${{ payment.amount }} for {{ payment.quantity }} {{ payment.package == 'standard' || payment.package == 'extended' ? 'designs' : 'requests' }}</p>
          <p v-if="payment.package == 'standard'">{{ $t('jpg_only') }}</p>
          <p v-if="payment.package == 'extended'">{{ $t('jpg_pdf_ai_eps') }}</p>
          <p v-if="payment.package == 'standard'">{{ $t('for_print_advertising_design') }}</p>
          <p v-if="payment.package == 'extended'">{{ $t('for_resale_items_or_reproduction') }}</p>
        </div>
        <div v-else-if="payment.package == 'simulator'">
          <p>PRODUCT SIMULATOR - ${{ payment.amount }} for {{ payment.quantity }} products</p>
          <p>Add your own products into the simulator</p>
        </div>
        <div v-else>
          <p>Exclusive Designs - ${{ payment.amount }} for {{ payment.quantity }} designs</p>
          <p>JPG, PDF, AI, EPS</p>
          <p>Ownership Certificate</p>
          <p>Tailor-made on request</p>
        </div>
        <p>{{ $t('to_be_used_within') }}</p>
      </div>
      <div class="prop">Period</div>
      <div class="value">1 year : {{ $moment(payment.created_at).format('DD/MM/YYYY') }} - {{ $moment(payment.created_at).add('years', 1).format('DD/MM/YYYY') }}</div>
      <div class="prop">Contract Start Date</div>
      <div class="value">{{ $moment(payment.created_at).format('DD/MM/YYYY') }}</div>
      <div class="prop">Total</div>
      <div class="value">US$ {{ payment.amount }}</div>
      <div class="prop">IMPORTANT</div>
      <div class="value">
        <p>* Payment are made in USD</p>
        <p>* No VAT applies - For EU customers Reverse Charge applies (VAT 0%).</p>
        <p>* On all designs you download and use on Collectionstock the Extended License Terms will apply.</p>
      </div>
      <br>

    </div>
  </div>
</template>

<script>
export default {
  name: 'cmsinvoice',
  props: ['payment'],
  methods: {
    print() {
      if (process.client) {
        window.print();
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 25px;
  font-weight: 700;
  color: $black;
}

.back {
  font-size: 14px;
  color: $black;
  border: 1px solid $black;
  border-radius: 30px;
  padding: 5px 20px;
  background-color: #fff;
  font-weight: 700;
  right: 175px;
  position: absolute;
}

.btn-print {
  background: $black;
}

.invoice-header {
  padding-top: 15px;
  text-align: center;

  .logo {
    margin-bottom: 10px;

    img {
      height: 70px;
    }
  }

  .text {
    color: #4a4a4a;
    font-size: 14px;
  }
}

.invoice-details {
  font-size: 14px;

  .prop {
    font-weight: 700;
    padding: 10px;
  }

  .value {
    padding: 10px;

    p {
      margin: 0;
      padding: 0;
    }

    .capitalize {
      text-transform: capitalize;
    }
  }
}
</style>
