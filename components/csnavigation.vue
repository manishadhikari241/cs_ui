<template>
  <div>
    <div class="component mobile-search-input md-show">
      <Search :hideCategories="true" />
    </div>

    <div class="component csnavigation">
      <b-navbar toggleable="md">
        <b-navbar-toggle target="csnavigation-collapse">
          <template v-slot:default="{ expanded }">
            <span v-if="expanded">{{ $t('menu') }} <b-icon-chevron-up></b-icon-chevron-up></span>
            <span v-else>{{ $t('menu') }} <b-icon-chevron-down></b-icon-chevron-down></span>
          </template>
        </b-navbar-toggle>
        <b-collapse id="csnavigation-collapse" is-nav>
          <b-navbar-nav>
            <li class="nav-item">
              <nuxt-link :to="localePath('/collections')" class="nav-link">{{ $t('collections') }}</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="localePath('/designs')" class="nav-link">{{ $t('designs') }}</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="localePath('/simulator')" class="nav-link">{{ $t('simulator') }}</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="localePath('/request')" class="nav-link">{{ $t('request_nav') }}</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="localePath('/exclusive')" class="nav-link">{{ $t('exclusive') }}</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="localePath('/extra')" class="nav-link">{{ $t('extra') }}</nuxt-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { BIconChevronUp, BIconChevronDown } from 'bootstrap-vue';
import Search from '~/components/search';

export default Vue.extend({
  components: {
    BIconChevronUp,
    BIconChevronDown,
    Search
  }
})
</script>

<style lang="scss">
.component.mobile-search-input {
  padding: 15px 20px;

  .searchbox {
    margin: 0 auto;

    input {
      width: 100% !important;
    }
  }
}

  .component.csnavigation {
    > nav {
      justify-content: center;

      li {
        margin: 0 10px;
        padding: 0;
        font-size: 18px;
        transition: background-color .2s;

        a {
          color: #000 !important;
          transition: color .2s;

          &.nuxt-link-active {
            border-bottom: 1px solid #000;
            font-weight: 700;
          }
        }
      }

      .navbar-toggler {
        width: 100%;
        padding: 10px 0;
        outline: none;
        color: #000;
        border: none;
        border-radius: 0;
        font-weight: 600;
      }
    }
  }

  #csnavigation-collapse {
    justify-content: center;
  }

  @media screen and (max-width: 767px) {
    .component.csnavigation {
      > nav {
        padding: 0;
        border-top: 1px solid #1d1d1b;
        border-bottom: 1px solid #1d1d1b;

        li {
          padding: 5px 0;
          margin: 0;
          text-align: center;
          background-color: #1d1d1b;
          
          a {
            color: #fff !important;
          }

          &:hover {
            background-color: #fff;

            a {
              color: #000 !important;
            }
          }
        }
      }
    }
  }
</style>