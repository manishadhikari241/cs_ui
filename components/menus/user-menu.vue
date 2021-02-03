<template>
  <div>
    <div class="component user-menu">
      <section class="header">
        <span>{{ $t('user_account') }}</span>
        <b-icon-chevron-down></b-icon-chevron-down>
      </section>
      <nuxt-link :to="localePath('/user/quota')">{{ $t('your_quota') }}</nuxt-link>
      <nuxt-link :to="localePath('/user/payment-history')">{{ $t('payment_history') }}</nuxt-link>
      <nuxt-link :to="localePath('/user/profile')">{{ $t('user_information') }}</nuxt-link>
      <nuxt-link :to="localePath('/user/password')">{{ $t('password') }}</nuxt-link>
      <nuxt-link :to="localePath('/user/address')">{{$t('address_book')}}</nuxt-link>
      <nuxt-link :to="localePath('/user/newsletter')">{{$t('news_letter_menu')}}</nuxt-link>
    </div>
    <br><br>
  </div>
</template>

<script>
import { BIconChevronDown } from 'bootstrap-vue';

export default {
  components: {
    BIconChevronDown
  }
}
</script>

<style lang="scss" scoped>
.component.user-menu {
  background: $black;
  padding: 10px 0;
  border-radius: 4px;

  section.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    @media screen and (max-width: 768px) {
      font-size: 14px;

    }
  }

  a {
    display: block;
    padding: 10px 20px;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    @media screen and (max-width: 768px) {
      font-size: 14px;

    }

    &.nuxt-link-active {
      color: $black;
      background-color: #fff;
    }
  }
}
</style>