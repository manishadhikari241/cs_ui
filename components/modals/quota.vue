<template>
  <div>
    <b-modal id="modal-quota" size="xl" centered hide-header hide-footer>
      <button class="btn-modal-quota-close" @click="$bvModal.hide('modal-quota')"><b-icon-x></b-icon-x></button>
      <b-container v-if="init.quota">
        <b-row>
          <b-col sm="12" md="12" lg="12" xl="6" class="left">
            <div class="thanks-message">
              <div class="thanks">
                <img src="~@/assets/thankyou.png">
              </div>
              <div class="message">
                <p v-html="$t('your_quota_updated_automatically')"></p>
              </div>
                 <!--<b-button type="button" class="download_button">-->
                                <!--<img style="height:34px; width:46px;" src="~/assets/icons/download_white.png" />-->

                  <!--{{$t('download_invoice')}}</b-button>-->
            </div>
          </b-col>
          <b-col class="right lg-hide">
            <div class="updated-quota">
              <div class="title">{{ $t('updated_quota_status') }}</div>
              <div class="packages">
                <b-row>
                  <b-col sm="6" v-for="(plan, $index) in plans" :key="`updated_quota_package_${$index}`">
                    <div class="package" v-if="plan.package == 'extended' && $auth.user.is_existing_user">
                      <div class="package-title">{{ $t(plan.title) }}</div>
                      <div class="package-price">{{ init.plan_quota }}</div>
                      <div class="existing-plan-description">
                          <p>OUT OF {{ init.plan.lib_plan.quota }}</p>
                          <p>PER MONTH</p>
                      </div>
                    </div>
                    <div class="package" v-else>
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
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { BIconX } from "bootstrap-vue";

export default {
  components: {
    BIconX
  },
  computed: {
    ...mapState("app", ["init"]),
    ...mapState("pricing", ["packages"])
  },
  data() {
    return {
      plans: [
        {
          title: "standard_license",
          item: "design",
          package: "standard"
        },
        {
          title: "extended_license",
          item: "design",
          package: "extended"
        },
        {
          title: "exclusive_design",
          item: "request",
          package: "exclusive"
        },
        {
          title: "product_simulator",
          item: "request",
          package: "simulator"
        }
      ]
    };
  },
  methods: {
    buy(pkg) {
      this.$bvModal.hide("modal-quota");
      this.$bvModal.show("modal-payments");
      this.$store.commit("payments/setPackage", { key: pkg, index: 0 });
    }
  }
};
</script>

<style lang="scss">
#modal-quota {
  .download_button {
    border-radius: 30px;
    background-color: #363636;
    color: #fff;
    width: 305px;
    font-weight: 700;
    margin-right: 10px;
    margin-top: 129px;
    font-size: 20px;
    text-transform: uppercase;
    border: none;
    outline: none;
    box-shadow: none;
  }
  .btn-modal-quota-close {
    position: absolute;
    top: 0;
    right: 20px;
    border: none;
    background: transparent;
    outline: none;
    font-size: 35px;
    color: #aaa;
    cursor: pointer;
    z-index: 999;
  }

  .modal-content {
    padding: 15px 0;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);

    .left {
      font-size: 18px;
      border-right: 1px solid #000;
        @media screen and (max-width: 1024px) {
border: none;
  }

      .thanks-message {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .thanks {
          text-align: center;
          margin-bottom: 50px;
          img {
            max-width: 70%;
          }
        }

        .message {
          text-align: center;
          color: $black;
          font-size: 20px;
          font-weight: 600;
        }
      }
    }

    .right {
      padding-left: 50px;
      padding-right: 100px;

      .updated-quota {
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
            font-size: 20px;
            font-weight: 600;
            text-transform: uppercase;
          }

          .package-price {
            font-size: 50px;
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

          .existing-plan-description {
            font-size: 16px;
            color: #999;
            margin-top: 10px;

            p {
                margin: 0;
                font-weight: 600;
            }
          }
        }
      }
    }
  }
}
</style>