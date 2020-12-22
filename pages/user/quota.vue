<template>
  <div class="page user">
    <b-container>
      <b-row>
        <b-col md="3">
          <UserMenu />
        </b-col>
        <b-col md="9">
          <div class="content">
            <b-row>
              <b-col md="7">
                <div class="quota-container">
                  <div class="title">{{ $t('your_quota') }}</div>
                  <div class="packages" v-if="init.quota">
                    <b-row>
                      <b-col sm="6" v-for="(plan, $index) in plans" :key="`updated_quota_package_${$index}`">
                        <div class="package">
                          <div class="package-title">{{ $t(plan.title) }}</div>
                          <div class="package-price">{{ init.quota[plan.package] }}</div>
                          <div class="package-expiry" v-if="init.quota[plan.package] > 0"><strong>{{ $t('expires') }}</strong>: {{ $moment(init.quota[`${plan.package}_expiry`]).format('DD/MM/YY') }}</div>
                          <div class="package-expiry" v-else>&nbsp;</div>
                          <b-button class="get-more" @click="buy(plan.package)">{{ $t('get_more') }}</b-button>
                        </div>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </b-col>
              <b-col md="5">
                <div class="downloads">
                  <div class="title">{{ $t('your_downloads') }}</div>
                  <div class="number">{{ nOfDownloads }}</div>
                  <nuxt-link class="browse" to="/user/downloads">{{ $t('browse') }}</nuxt-link>
                </div>
              </b-col>
            </b-row>
            
            <br><br>

            <div class="important-quota-message">
              <p class="important-title">{{ $t('important_message') }}</p>
              <p class="important-description">{{ $t('quota_expiration_notice') }}</p>
              <p class="important-terms" v-html="$t('for_more_info_terms')"></p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserMenu from '~/components/menus/user-menu';

export default {
  middleware: 'auth',
  components: {
    UserMenu
  },
  computed: {
    ...mapState('app', ['init']),
    ...mapState('pricing', ['packages']),
  },
  data() {
    return {
      plans: [
        {
          title: 'standard_license',
          item: 'design',
          package: 'standard'
        },
        {
          title: 'extended_license',
          item: 'design',
          package: 'extended'
        },
        {
          title: 'exclusive_design',
          item: 'request',
          package: 'exclusive'
        },
        {
          title: 'product_simulator',
          item: 'request',
          package: 'simulator'
        }
      ],
      nOfDownloads: 0
    }
  },
  methods: {
    getNumberOfDownloads() {
      this.$axios.$get('/downloads/numberOfDownloads')
        .then((response) => {
          this.nOfDownloads = response.count;
        })
    },

    buy(pkg) {
      this.$bvModal.show('modal-payments');
      this.$store.commit('payments/setPackage', { key: pkg, index: 0 });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getNumberOfDownloads();
    })
  }
}
</script>

<style lang="scss">
.page.user {
  .content {
    padding-left: 20px;
  }

  .quota-container {
    .title {
      font-size: 25px;
      font-weight: 700;
      color: $black;
    }

    .package {
      margin: 20px 0;
      text-align: center;
      color: $black;

      .package-title {
        font-size: 16px;
        font-weight: 600;
        text-transform: uppercase;
      }

      .package-price {
        font-size: 40px;
        font-weight: 700;
      }

      .package-expiry {
        font-size: 14px;
        margin-bottom: 3px;
      }

      .get-more {
        display: inline-block;
        width: 100%;
        padding: 7px 0;
        color: #fff;
        background: $brand;
        font-size: 16px;
        font-weight: 700;
        border-radius: 30px;
        outline: none;
        border: none;
        box-shadow: none;
        text-transform: uppercase;
      }
    }
  }

  .downloads {
    float: right;
    border: 1px solid $black;
    text-align: center;
    padding: 50px 40px;
    border-radius: 4px;

    .title {
      font-size: 22px;
      font-weight: 600;
      color: $black;
    }

    .number {
      font-size: 50px;
      font-weight: 700;
    }

    .browse {
      display: inline-block;
      padding: 5px 40px;
      border: 1px solid $black;
      color: $black;
      border-radius: 30px;
      font-weight: 700;
      font-size: 20px;
      text-decoration: none;
      text-transform: uppercase;
    }
  }

  .important-quota-message {
    padding: 15px 20px;
    border: 1px solid $black;
    border-radius: 4px;
    color: $black;
    font-size: 14px;
    font-weight: 600;

    .important-title {
      font-weight: 700;
    }

    .important-terms {
      a {
        color: inherit;
        text-decoration: none;
        border-bottom: 1px solid $black;
      }
    }
  }
}


@media screen and (max-width: 767px) {
  .page.user {
    .content {
      padding-left: 0;
    }
  }
}
</style>