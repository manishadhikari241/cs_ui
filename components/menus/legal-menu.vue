<template>
  <div>
    <div class="component legal-menu">
      <section class="header">
        <span>{{ $t('legal') }}</span>
        <b-icon-chevron-down></b-icon-chevron-down>
      </section>
      <nuxt-link :to="localePath('/legal/terms-of-use')" class="active">{{ $t('terms_of_use') }}</nuxt-link>
      <nuxt-link :to="localePath('/legal/users-terms-and-conditions')">{{ $t('users_terms_and_conditions') }}</nuxt-link>
      <nuxt-link :to="localePath('/legal/studio-terms-and-conditions')">{{ $t('studio_terms_and_conditions') }}</nuxt-link>
      <nuxt-link :to="localePath('/legal/design-request-terms-and-conditions')">{{ $t('design_request_terms_and_conditions') }}</nuxt-link>
      <nuxt-link :to="localePath('/legal/privacy-policy')">{{ $t('privacy_policy') }}</nuxt-link>
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
.component.legal-menu {
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
  }

  a {
    display: block;
    padding: 10px 20px;
    color: #fff;
    font-size: 16px;
    text-decoration: none;

    &.nuxt-link-active {
      color: $black;
      background-color: #fff;
    }
  }
}
</style>