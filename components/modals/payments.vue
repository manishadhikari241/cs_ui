<template>
  <div>
    <b-modal
      id="modal-payments"
      size="xl"
      @hidden="handleModalClose"
      centered
      hide-header
      hide-footer
    >
      <button
        class="btn-modal-payments-close"
        @click="$bvModal.hide('modal-payments')"
      >
        <b-icon-x></b-icon-x>
      </button>
      <b-container v-if="init.pricing">
        <b-row>
          <b-col md="5" class="left lg-hide">
            <div>
              <div class="package-details">
                <div class="license-name">{{ $t(licenseTitles[pkg.key]) }}</div>
                <div class="license-description">
                  <div v-if="pkg.key == 'standard'">
                    <p>{{ $t("jpg_only") }}</p>
                    <p>{{ $t("for_editorial_avertising_web") }}</p>
                    <p>{{ $t("to_be_used_within") }}</p>
                  </div>
                  <div v-if="pkg.key == 'extended'">
                    <p>{{ $t("jpg_pdf_ai_eps") }}</p>
                    <p>{{ $t("for_resale_items_can_edit_modify") }}</p>
                    <p>{{ $t("to_be_used_within") }}</p>
                  </div>
                  <div v-if="pkg.key == 'exclusive'">
                    <p>{{ $t("jpg_pdf_ai_eps") }}</p>
                    <p>{{ $t("ownership_certificate") }}</p>
                    <p>{{ $t("tailor_made_on_request") }}</p>
                    <p>{{ $t("to_be_used_within") }}</p>
                  </div>
                  <div v-if="pkg.key == 'simulator'">
                    <p>{{ $t("add_your_own_product") }}</p>
                    <p>{{ $t("simulator_by_request") }}</p>
                    <p>{{ $t("to_be_used_within") }}</p>
                  </div>
                </div>
                <br /><br />
              </div>
              <div class="package-prices">
                <b-button
                  :class="{ active: pkg.index == 0 }"
                  @click="selectPackage(pkg.key, 0)"
                >
                  <div class="quantity">
                    {{ init.pricing[`${pkg.key}_min_count`] }}
                    {{ pkg.key =='standard' || pkg.key =='extended' ? $t('download') :
                    pkg.key=='exclusive'?$t('single_design')
                      :$t('product')}}{{init.pricing[`${pkg.key}_min_count`] > 1 ? $i18n.locale == "en" ?
                    "s" : "" : "" }}
                  </div>
                  <div class="price">
                    ${{
                      init.pricing[`${pkg.key}_min_count`] *
                      init.pricing[`${pkg.key}_min_price`]
                    }}
                  </div>
                  <div class="per">
                    ${{ init.pricing[`${pkg.key}_min_price`] }} /
                    {{ pkg.key =='standard' || pkg.key =='extended' ? $t('download') :
                    pkg.key=='exclusive'?$t('single_design')
                      :$t('product')}}
                  </div>
                </b-button>
                <b-button
                  :class="{ active: pkg.index == 1 }"
                  @click="selectPackage(pkg.key, 1)"
                >
                  <div class="quantity">
                    {{ init.pricing[`${pkg.key}_max_count`] }}
                    {{ pkg.key =='standard' || pkg.key =='extended' ? $t('download') :
                    pkg.key=='exclusive'?$t('single_design')
                      :$t('product')}}{{init.pricing[`${pkg.key}_max_count`] > 1 ? $i18n.locale == "en" ?
                    "s" : "" : "" }}
                  </div>
                  <div class="price">
                    ${{
                      init.pricing[`${pkg.key}_max_count`] *
                      init.pricing[`${pkg.key}_max_price`]
                    }}
                  </div>
                  <div class="per">
                    ${{ init.pricing[`${pkg.key}_max_price`] }} /
                    {{ pkg.key =='standard' || pkg.key =='extended' ? $t('download') :
                    pkg.key=='exclusive'?$t('single_design')
                      :$t('product')}}
                  </div>
                </b-button>
              </div>
              <div class="payments-made">
                <p>{{ $t("payments_are_made_in_usd") }}</p>
              </div>
            </div>
          </b-col>
          <b-col class="right">
            <div v-show="mode == 'default'">
              <div class="total">
                {{$t('total_payment')}} ${{
                  init.pricing[
                    `${pkg.key}_${pkg.index == 0 ? "min" : "max"}_count`
                  ] *
                  init.pricing[
                    `${pkg.key}_${pkg.index == 0 ? "min" : "max"}_price`
                  ]
                }}
              </div>
              <div class="total-details">
                {{ $t(licenseTitles[pkg.key]) }} -
                {{
                  init.pricing[
                    `${pkg.key}_${pkg.index == 0 ? "min" : "max"}_count`
                  ]
                }}
                {{ pkg.key =='standard' || pkg.key =='extended' ? $t('download') :
                pkg.key=='exclusive'?$t('single_design')
                  :$t('product')}}{{init.pricing[`${pkg.key}_${pkg.index == 0 ? "min" : "max"}_count`] > 1 ? $i18n.locale == "en" ?
                "s" : "" : "" }}
              </div>

              <div class="coupon-container">
                <b-input v-model="coupon.code" :placeholder="$t('enter_coupon_code')" autocomplete="off" @keyup="coupon.amount = null"></b-input>
                <b-button @click="checkCoupon" :disabled="coupon.loading">{{$t('apply_coupon')}}</b-button>
                <span class="result" v-if="coupon.amount">-${{ coupon.amount }}</span>
              </div>

              <div class="methods">
                <div :class="{'active': paymentMethod == 'braintree'}" @click="updatePaymentMethod('braintree')">
                  <b-icon-circle-fill v-if="paymentMethod == 'braintree'"></b-icon-circle-fill>
                  <b-icon-circle v-else></b-icon-circle>
                  <span>&nbsp;{{ $t("credit_card") }}</span>
                </div>
                <div :class="{'active': paymentMethod == 'wechat'}" @click="updatePaymentMethod('wechat')">
                  <b-icon-circle-fill v-if="paymentMethod == 'wechat'"></b-icon-circle-fill>
                  <b-icon-circle v-else></b-icon-circle>
                  <span>&nbsp;{{ $t("wechat") }}</span>
                </div>
                <div :class="{'active': paymentMethod == 'alipay'}" @click="updatePaymentMethod('alipay')">
                  <b-icon-circle-fill v-if="paymentMethod == 'alipay'"></b-icon-circle-fill>
                  <b-icon-circle v-else></b-icon-circle>
                  <span>&nbsp;{{ $t("alipay") }}</span>
                </div>
              </div>

              <br />

              <b-form-checkbox v-model="addBillingCheck"
                >{{ $t("add_billing_address_to") }}
              </b-form-checkbox>
              <div
                v-if="billingAddress"
                class="billingAddress"
                @click="mode = 'billing'"
              >
                <p>{{ billingAddress.first_name }}</p>
                <p>{{ billingAddress.last_name }}</p>
                <p>{{ billingAddress.company }}</p>
                <p>{{ billingAddress.address1 }}</p>
                <p>{{ billingAddress.address2 }}</p>
                <p>{{ billingAddress.city }}</p>
                <p>{{ billingAddress.post_code }}</p>
                <p>{{ billingAddress.country }}</p>
                <p>{{ billingAddress.vat_number }}</p>
                <b-badge class="badge" variant="primary">{{
                  $t("change")
                }}</b-badge>
              </div>

              <Braintree ref="braintree" @onSuccess="buyBraintree" v-if="paymentMethod == 'braintree'" v-show="!paying" />
              <Alipay ref="alipay" @status="updatePayingStatus" :info="getPurchaseInfo()" :coupon="coupon.code" v-else-if="paymentMethod == 'alipay'" v-show="!paying" />
              <Wechat ref="wechat" @status="updatePayingStatus" :info="getPurchaseInfo()" :coupon="coupon.code" @bgcheck="startStripeBackgroundCheck" v-else v-show="!paying" />
              <div style="text-align: center" v-if="paying">
                <b-spinner type="grow" label="Loading..."></b-spinner>
              </div>
            </div>

            <div
              class="billing"
              v-show="mode == 'billing' || mode == 'newbilling'"
            >
              <div class="actions">
                <b-button
                  variant="light"
                  @click="
                    addBillingCheck = billingAddress ? true : false;
                    mode = 'default';
                  "
                >
                  <i class="fas fa-chevron-left"></i
                ></b-button>
              </div>
              <div class="addresses">
                <div class="list" v-show="mode == 'billing'">
                  <div class="title">{{ $t("pick_address") }}</div>
                  <div class="address-list">
                    <div
                      class="address"
                      v-for="address in init.addresses"
                      :key="address.id"
                      @click="selectBillingAddress(address)"
                    >
                      <p>{{ address.first_name }}</p>
                      <p>{{ address.last_name }}</p>
                      <p>{{ address.company }}</p>
                      <p>{{ address.address1 }}</p>
                      <p>{{ address.address2 }}</p>
                      <p>{{ address.city }}</p>
                      <p>{{ address.post_code }}</p>
                      <p>{{ address.country }}</p>
                      <p>{{ address.vat_number }}</p>
                      <b-badge
                        class="badge"
                        variant="success"
                        v-if="address.is_default"
                      >
                        {{ $t("default") }}
                      </b-badge>
                    </div>
                    <div class="address" @click="mode = 'newbilling'">
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <p
                        style="
                          text-align: center;
                          font-size: 16px;
                          font-weight: 600;
                        "
                      >
                        <i class="fas fa-plus"></i>&nbsp;&nbsp;{{
                          $t("add_new_address")
                        }}
                      </p>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                    </div>
                  </div>
                </div>

                <div class="newAddress" v-show="mode == 'newbilling'">
                  <div class="title">{{ $t("billing_details") }}</div>
                  <form @submit.prevent="addNewAddress">
                    <b-input
                      v-model="newAddress.first_name"
                      :placeholder="$t('first_name')"
                      required
                    ></b-input>
                    <b-input
                      v-model="newAddress.last_name"
                      :placeholder="$t('first_name')"
                      required
                    ></b-input>
                    <b-input
                      v-model="newAddress.company"
                      :placeholder="$t('company')"
                      required
                    ></b-input>
                    <b-input
                      v-model="newAddress.address1"
                      :placeholder="$t('address_1')"
                      required
                    ></b-input>
                    <b-input
                      v-model="newAddress.address2"
                      :placeholder="$t('address_2')"
                    ></b-input>
                    <b-input
                      v-model="newAddress.city"
                      :placeholder="$t('city')"
                      required
                    ></b-input>

                    <div class="info-row">
                      <b-input
                        v-model="newAddress.post_code"
                        :placeholder="$t('post_code')"
                        class="postCode mb-0"
                        required
                      ></b-input>
                      <p style="font-size: 12px">{{ $t("if_your_region") }}</p>
                    </div>
                    <multiselect
                      :class="'country_select'"
                      :select-label="$t('enter_to_select')"
                      :deselect-label="$t('enter_to_remove')"
                      :selected-label="$t('selected')"
                      v-model="newAddress.country"
                      :placeholder="$t('select_country')"
                      :options="countries"
                      track-by="id"
                      :searchable="true"
                      :custom-label="countryLabel"
                      :multiple="false"
                    >
                    </multiselect>
                    <br />

                    <b-input
                      v-model="newAddress.vat_number"
                      :placeholder="$t('vat_number')"
                      class="postCode"
                    >
                    </b-input>

                    <br />
                    <b-button type="submit" :disabled="newAddress.loading"
                      >{{ $t("confirm") }}
                    </b-button>
                  </form>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

    <StripeCheck ref="stripe" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { BIconX, BIconCircleFill, BIconCircle } from "bootstrap-vue";
import Braintree from "~/components/braintree";
import Alipay from "~/components/alipay";
import Wechat from "~/components/wechat";
import Multiselect from "vue-multiselect";
import StripeCheck from "~/components/modals/stripecheck";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  components: {
    BIconX,
    BIconCircleFill,
    BIconCircle,
    Braintree,
    Alipay,
    Wechat,
    Multiselect,
    StripeCheck
  },
  computed: {
    ...mapState("app", ["init"]),
    ...mapState("payments", ["pkg"])
  },
  data() {
    return {
      paymentMethod: 'braintree',
      licenseTitles: {
        standard: "standard_license",
        extended: "extended_license",
        exclusive: "exclusive_design",
        simulator: "product_simulator",
      },
      paying: false,
      addBillingCheck: false,
      mode: "default",
      billingAddress: null,
      countries: [],
      coupon: {
        loading: false,
        code: '',
        amount: null
      },

      newAddress: {
        first_name: this.$auth.user.first_name
          ? this.$auth.user.first_name
          : "",
        last_name: this.$auth.user.first_name ? this.$auth.user.last_name : "",
        company: "",
        address1: "",
        address2: "",
        country: "",
        city: "",
        post_code: "",
        vat_number: "",
        loading: false,
      },
    };
  },
  created(){

  },
  mounted() {
    this.$nextTick(() => {
      this.loadCountries();

      if (this.$route.query.CP) {
        this.$refs.stripe.startCheck(this.$route.query.CP);
      }
    });
  },
  methods: {
    startStripeBackgroundCheck(id) {
      this.$refs.stripe.startCheck(id);
      this.$bvModal.hide("modal-payments");
    },
 
    selectPackage(key, index) {
      this.$store.commit("payments/setPackage", { key, index });
      this.updateWechat();
    },

    loadCountries() {
      this.$axios.$get("/countries?all=1").then((response) => {
        this.countries = response;
      });
    },

    countryLabel({ translations }) {
      return translations[0].name;
    },

    updatePaymentMethod(method) {
      this.paymentMethod = method;
    },

    selectBillingAddress(address) {
      this.mode = "default";
      this.billingAddress = address;
    },

    addNewAddress() {
      this.newAddress.loading = true;
      let request = JSON.parse(JSON.stringify(this.newAddress));
      request.country = this.newAddress.country
        ? this.newAddress.country.translations[0].name
        : null;
      this.$axios
        .$post("/addresses", request)
        .then((response) => {
          this.newAddress.loading = false;
          this.$store.commit("app/addAddress", response);
          this.billingAddress = response[response.length - 1];
          this.mode = "default";
          this.newAddress = {
            first_name: this.$auth.loggedIn ? this.$auth.user.first_name : "",
            last_name: this.$auth.loggedIn ? this.$auth.user.last_name : "",
            company: "",
            address1: "",
            address2: "",
            country: "",
            city: "",
            post_code: "",
            vat_number: "",
            loading: false,
          };
        })
        .catch((error) => {
          this.newAddress.loading = false;
          this.$toast.error(error.response.data.error.message);
        });
    },

    getPurchaseInfo() {
      let info = {};
      info.pkg = this.pkg.key;
      info.price = this.init.pricing[`${this.pkg.key}_${this.pkg.index == 0 ? "min" : "max"}_count`] * this.init.pricing[`${this.pkg.key}_${this.pkg.index == 0 ? "min" : "max"}_price`];
      info.package_type = this.pkg.index == 0 ? "min" : "max";
      info.billingDetails = this.billingAddress ? [
        this.billingAddress.first_name + " " + this.billingAddress.last_name,
        this.billingAddress.company,
        this.billingAddress.address1,
        this.billingAddress.address2,
        this.billingAddress.post_code,
        this.billingAddress.city,
        this.billingAddress.country,
      ] : "";
      info.billingDetails = this.billingAddress ? info.billingDetails.join(", ") : null;
      info.vatNumber = this.billingAddress ? this.billingAddress.vat_number : null;
      return info;
    },

    updatePayingStatus(status) {
      this.paying = status;
    },

    checkCoupon() {
      this.coupon.loading = true;
      this.coupon.amount = null;
      this.$axios.$get(`/coupons/${this.coupon.code}`)
        .then((response) => {
          this.coupon.loading = false;
          this.coupon.amount = response.amount;
          this.updateWechat();
        }).catch((error) => {
          this.coupon.loading = false;
          this.$toast.error(error.response.data.error.message);
        });
    },

    updateWechat() {
      if (this.$refs.wechat)
        setTimeout(() => { this.$refs.wechat.init(); }, 500);
    },

    buyBraintree(nonce) {
      let purchaseInfo = this.getPurchaseInfo();
      this.paying = true;

      this.$axios.$post("/payments/braintree/buy", {
          nonce,
          amount: purchaseInfo.price,
          package: purchaseInfo.pkg,
          package_type: purchaseInfo.package_type,
          billing_details: purchaseInfo.billingDetails,
          vat_number: purchaseInfo.vatNumber,
          coupon: this.coupon.code
        })
        .then((response) => {
          this.paying = false;
          this.$bvModal.hide("modal-payments");

          this.addBillingCheck = false;
          this.billingAddress = null;

          this.$store.commit("app/setQuota", response);
          this.$bvModal.show("modal-quota");

          this.$nuxt.$emit("payment-success", { package: this.pkg.key });
        })
        .catch((error) => {
          this.$refs.braintree.getToken();
          this.paying = false;
          this.$toast.error(error.response.data.error.message);
        });
    },

    handleModalClose() {
      this.paymentMethod = 'braintree';

      this.addBillingCheck = false;
      this.mode = "default";
      this.billingAddress = null;

      this.coupon.loading = false;
      this.coupon.code = '';
      this.coupon.amount = null;
    },
  },
  watch: {
    addBillingCheck(newValue, oldValue) {
      if (newValue) this.mode = "billing";
      else this.billingAddress = null;
    }
  },
};
</script>

<style lang="scss">
.info-row p {
  margin-left: 14px;
  margin-bottom: 8px;
}
.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  border-radius: 32px;
  border: 1px solid #e8e8e8;
  background: #fff;
  font-size: 14px;
}

.multiselect__span {
  color: #757d85;
}

#modal-payments {
  .btn-modal-payments-close {
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

      & > div {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .package-details {
        flex-grow: 1;

        .license-name {
          text-align: center;
          font-size: 25px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .license-description {
          margin-top: 20px;
          text-align: center;
          font-size: 20px;

          p {
            margin: 5px 0;
            padding: 0;
          }
        }
      }
      .payments-made {
        display: flex;
        align-items: center;
        padding: 0px 46px;
        margin-top: 27px;
        justify-content: center;
      }

      .package-prices {
        text-align: center;

        button {
          display: inline-block;
          margin: 0 7px;
          width: 45%;
          height: 190px;
          color: $black;
          background: #fff;
          border: 1px solid $black;
          border-radius: 5px;
          outline: none;
          box-shadow: none;

          .quantity {
            font-size: 18px;
            font-weight: 600;
          }

          .price {
            font-size: 50px;
            font-weight: 700;
          }

          .per {
            font-size: 14px;
          }

          &.active {
            background: $black;
            color: #fff;
            box-shadow: 0 0 10px $black;
          }
        }
      }
    }

    .right {
      padding-left: 50px;
      padding-right: 100px;
      @media screen and (max-width: 768px) {
        padding-left: 0px;
        padding-right: 0px;
      }

      .total {
        font-size: 25px;
        font-weight: 700;
      }

      .total-details {
        font-size: 18px;
        margin: 5px 0;
      }

      .coupon-container {
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        input {
          width: 200px;
          height: 30px;
          font-size: 16px;
          border-radius: 30px;
          border: 1px solid $black;
          padding: 0 10px;
          outline: none;
          box-shadow: none;
        }

        button {
          height: 30px;
          font-size: 12px;
          color: $black;
          font-weight: bold;
          border-radius: 30px;
          border: 1px solid $black;
          padding: 3px 25px;
          outline: none;
          box-shadow: none;
          background-color: #fff;
          margin-left: 15px;
        }

        .result {
          margin-left: 15px;
          font-weight: bold;
          color: lightseagreen;
        }
      }

      .methods {
        display: flex;
        margin-top: 15px;
        font-size: 16px;

        div {
          margin-right: 20px;
          cursor: pointer;
          opacity: 0.5;

          &.active {
            opacity: 1;
          }
        }
      }

      .billingAddress {
        width: 300px;
        position: relative;
        border: 1px solid #ddd;
        padding: 5px;
        border-radius: 10px;
        margin: 5px;
        font-size: 12px;
        cursor: pointer;
        transition: border-color 0.2s;

        .badge {
          position: absolute;
          bottom: 5px;
          right: 5px;
        }

        &:hover {
          border-color: $black;
        }

        p {
          margin: 0;
          padding: 0;
        }
      }

      .billing {
        display: flex;

        .actions {
          width: 50px;

          button {
            padding: 10px;
            font-size: 18px;
            color: #aaa;
            background: transparent;
            outline: none;
            box-shadow: none;
          }
        }

        .addresses {
          width: calc(100% - 20px);

          .title {
            font-size: 20px;
            padding-top: 10px;
          }

          .list {
            .address-list {
              margin-top: 20px;
              display: flex;
              flex-wrap: wrap;

              .address {
                position: relative;
                width: 45%;
                border: 1px solid #ddd;
                padding: 5px;
                border-radius: 10px;
                margin: 5px;
                font-size: 14px;
                cursor: pointer;
                transition: border-color 0.2s;

                .badge {
                  position: absolute;
                  bottom: 5px;
                  right: 5px;
                }

                &:hover {
                  border-color: $black;
                }

                p {
                  margin: 0;
                  padding: 0;
                }
              }
            }
          }

          .newAddress {
            .title {
              margin-bottom: 20px;
            }

            input {
              margin-bottom: 10px;
              border-radius: 20px;

              &.postCode {
                width: 300px;
              }
            }

            button {
              border: none;
              outline: none;
              width: 200px;
              padding: 5px;
              background: $black;
              color: #fff;
              font-size: 18px;
              font-weight: 700;
              border-radius: 30px;

              &:active {
                box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
              }
            }
          }
        }
      }
    }
  }
}
</style>
