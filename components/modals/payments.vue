<template>
  <div>
    <b-modal id="modal-payments" size="xl" @hidden="handleModalClose" centered hide-header hide-footer>
      <button class="btn-modal-payments-close" @click="$bvModal.hide('modal-payments')"><b-icon-x></b-icon-x></button>
      <b-container v-if="init.pricing">
        <b-row>
          <b-col md="5" class="left lg-hide">
            <div>
              <div class="package-details">
                <div class="license-name">{{ $t(licenseTitles[pkg.key]) }}</div>
                <div class="license-description">
                  <div v-if="pkg.key == 'standard'">
                    <p>{{ $t('jpg_only') }}</p>
                    <p>{{ $t('for_editorial_avertising_web') }}</p>
                    <p>{{ $t('to_be_used_within') }}</p>
                  </div>
                  <div v-if="pkg.key == 'extended'">
                    <p>{{ $t('jpg_pdf_ai_eps') }}</p>
                    <p>{{ $t('for_resale_items_can_edit_modify') }}</p>
                    <p>{{ $t('to_be_used_within') }}</p>
                  </div>
                  <div v-if="pkg.key == 'exclusive'">
                    <p>{{ $t('jpg_pdf_ai_eps') }}</p>
                    <p>{{ $t('ownership_certificate') }}</p>
                    <p>{{ $t('tailor_made_on_request') }}</p>
                    <p>{{ $t('to_be_used_within') }}</p>
                  </div>
                  <div v-if="pkg.key == 'simulator'">
                    <p>{{ $t('add_your_own_product_into') }}</p>
                    <p>{{ $t('simulator_by_request') }}</p>
                    <p>{{ $t('to_be_used_within') }}</p>
                  </div>
                </div>
                <br><br>
              </div>
              <div class="package-prices">
                <b-button :class="{'active': pkg.index == 0}" @click="selectPackage(pkg.key, 0)">
                  <div class="quantity">{{ init.pricing[`${pkg.key}_min_count`] }} {{ pkg.key == 'standard' || pkg.key == 'extended' ? $t('design') : $t('request') }}</div>
                  <div class="price">${{ init.pricing[`${pkg.key}_min_count`] * init.pricing[`${pkg.key}_min_price`] }}</div>
                  <div class="per">${{ init.pricing[`${pkg.key}_min_price`] }} / {{ pkg.key == 'standard' || pkg.key == 'extended' ? $t('design') : $t('request') }}</div>
                </b-button>
                <b-button :class="{'active': pkg.index == 1}" @click="selectPackage(pkg.key, 1)">
                  <div class="quantity">{{ init.pricing[`${pkg.key}_max_count`] }} {{ pkg.key == 'standard' || pkg.key == 'extended' ? $t('design') : $t('request') }}</div>
                  <div class="price">${{ init.pricing[`${pkg.key}_max_count`] * init.pricing[`${pkg.key}_max_price`] }}</div>
                  <div class="per">${{ init.pricing[`${pkg.key}_max_price`] }} / {{ pkg.key == 'standard' || pkg.key == 'extended' ? $t('design') : $t('request') }}</div>
                </b-button>
              </div>
              <div class="payments-made">
              <p>{{$t('payments_are_made_in_usd')}}</p>
              </div>
            </div>
          </b-col>
          <b-col class="right">
            <div v-show="mode == 'default'">
              <div class="total">TOTAL ${{ init.pricing[`${pkg.key}_${pkg.index == 0 ? 'min' : 'max'}_count`] * init.pricing[`${pkg.key}_${pkg.index == 0 ? 'min' : 'max'}_price`] }}</div>
              <div class="total-details">{{ $t(licenseTitles[pkg.key]) }} - {{ init.pricing[`${pkg.key}_${pkg.index == 0 ? 'min' : 'max'}_count`] }} {{ pkg.key == 'standard' || pkg.key == 'extended' ? $t('design') : $t('request') }}</div>
              <div class="methods">
                <div class="active">
                  <b-icon-circle-fill></b-icon-circle-fill>
                  <span>&nbsp;{{ $t('credit_card') }}</span>
                </div>
                <div>
                  <b-icon-circle></b-icon-circle>
                  <span>&nbsp;{{ $t('wechat') }}</span>
                </div>
                <div>
                  <b-icon-circle></b-icon-circle>
                  <span>&nbsp;{{ $t('alipay') }}</span>
                </div>
              </div>

              <br>

              <b-form-checkbox v-model="addBillingCheck">{{$t('add_billing_address_to')}}</b-form-checkbox>
              <div v-if="billingAddress" class="billingAddress" @click="mode = 'billing'">
                <p>{{ billingAddress.first_name }}</p>
                <p>{{ billingAddress.last_name }}</p>
                <p>{{ billingAddress.company }}</p>
                <p>{{ billingAddress.address1 }}</p>
                <p>{{ billingAddress.address2 }}</p>
                 <p>{{ billingAddress.city }}</p>
                <p>{{ billingAddress.post_code }}</p>
              <p>{{ billingAddress.country }}</p>
 <p>{{ billingAddress.vat_number }}</p>
                <b-badge class="badge" variant="primary">{{$t('change')}}</b-badge>
              </div>
              
              <Braintree ref="braintree" @onSuccess="buy" v-show="!paying" />
              <div style="text-align: center" v-if="paying"><b-spinner type="grow" label="Loading..."></b-spinner></div>
            </div>
            
            <div class="billing" v-show="mode == 'billing' || mode == 'newbilling'">
              <div class="actions">
                <b-button variant="light" @click="addBillingCheck = (billingAddress ? true : false); mode = 'default'"><i class="fas fa-chevron-left"></i></b-button>
              </div>
              <div class="addresses">
                <div class="list" v-show="mode == 'billing'">
                  <div class="title">{{$t('pick_address')}}</div>
                  <div class="address-list">
                    <div class="address" v-for="address in init.addresses" :key="address.id" @click="selectBillingAddress(address)">
                      <p>{{ address.first_name }}</p>
                      <p>{{ address.last_name }}</p>
                      <p>{{ address.company }}</p>
                      <p>{{ address.address1 }}</p>
                      <p>{{ address.address2 }}</p>
                      <p>{{ address.city }}</p>
                       <p>{{ address.post_code }}</p>
                        <p>{{ address.country }}</p>
                      <p>{{ address.vat_number }}</p>
                      <b-badge class="badge" variant="success" v-if="address.is_default">{{$t('default')}}</b-badge>
                    </div>
                    <div class="address" @click="mode = 'newbilling'">
                      <p>&nbsp;</p><p>&nbsp;</p><p style="text-align: center; font-size: 16px; font-weight: 600;"><i class="fas fa-plus"></i>&nbsp;&nbsp;{{$t('add_new_address')}}</p><p>&nbsp;</p><p>&nbsp;</p>
                    </div>
                  </div>
                </div>

                <div class="newAddress" v-show="mode == 'newbilling'">
                  <div class="title">{{$t('billing_details')}}</div>
                  <form @submit.prevent="addNewAddress">
                      <b-input v-model="newAddress.first_name" :placeholder="$t('first_name')" required></b-input>
                    <b-input v-model="newAddress.last_name" :placeholder="$t('first_name')" required></b-input>
  <b-input v-model="newAddress.company" :placeholder="$t('company')" required></b-input>
                    <b-input v-model="newAddress.address1" :placeholder="$t('address_1')" required></b-input>
                    <b-input v-model="newAddress.address2" :placeholder="$t('address_2')"></b-input> 
                                     <b-input v-model="newAddress.city" :placeholder="$t('city')" required></b-input>
                    <b-input v-model="newAddress.post_code" :placeholder="$t('post_code')" class="postCode" required></b-input>
                      <div class="info-row">
                    <div class="value" style="font-size: 12px;">{{$t('if_your_region')}}</div>
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
                        :multiple="false">
                      </multiselect>    
                                            <br>

                    <b-input v-model="newAddress.vat_number" :placeholder="$t('vat_number')" class="postCode">
                    </b-input>

                      <br>
                    <b-button type="submit" :disabled="newAddress.loading">{{$t('confirm')}}</b-button>
                  </form>
                </div>
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
import { BIconX, BIconCircleFill, BIconCircle } from "bootstrap-vue";
import Braintree from "~/components/braintree";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
export default {
  components: {
    BIconX,
    BIconCircleFill,
    BIconCircle,
    Braintree,
    Multiselect
  },
  computed: {
    ...mapState("app", ["init"]),
    ...mapState("payments", ["pkg"])
  },
  data() {
    return {
      licenseTitles: {
        standard: "standard_license",
        extended: "extended_license",
        exclusive: "exclusive_design",
        simulator: "product_simulator"
      },
      paying: false,
      addBillingCheck: false,
      mode: "default",
      billingAddress: null,
      countries: [],

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
        loading: false
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.loadCountries();
    });
  },
  methods: {
    selectPackage(key, index) {
      this.$store.commit("payments/setPackage", { key, index });
    },
    loadCountries() {
      this.$axios.$get("/countries?all=1").then(response => {
        this.countries = response;
      });
    },
    countryLabel({ translations }) {
      return translations[0].name;
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
      console.log(request);
      this.$axios
        .$post("/addresses", request)
        .then(response => {
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
            loading: false
          };
        })
        .catch(error => {
          this.newAddress.loading = false;
          this.$toast.error(error.response.data.error.message);
        });
    },

    buy(nonce) {
      let price =
        this.init.pricing[
          `${this.pkg.key}_${this.pkg.index == 0 ? "min" : "max"}_count`
        ] *
        this.init.pricing[
          `${this.pkg.key}_${this.pkg.index == 0 ? "min" : "max"}_price`
        ];
      let package_type = this.pkg.index == 0 ? "min" : "max";

      let billingDetails = this.billingAddress
        ? [
            this.billingAddress.first_name +
              " " +
              this.billingAddress.last_name,
            this.billingAddress.company,
            this.billingAddress.address1,
            this.billingAddress.address2
          ]
        : "";
      billingDetails = this.billingAddress ? billingDetails.join(", ") : null;

      this.paying = true;
      this.$axios
        .$post("/quota/buy", {
          nonce,
          amount: price,
          package: this.pkg.key,
          package_type,
          billing_details: billingDetails
        })
        .then(response => {
          this.paying = false;
          this.$bvModal.hide("modal-payments");

          this.addBillingCheck = false;
          this.billingAddress = null;

          this.$store.commit("app/setQuota", response);
          this.$bvModal.show("modal-quota");

          this.$nuxt.$emit("payment-success", { package: this.pkg.key });
        })
        .catch(error => {
          this.$refs.braintree.getToken();
          this.paying = false;
          this.$toast.error(error.response.data.error.message);
        });
    },

    handleModalClose() {
      this.addBillingCheck = false;
      this.mode = "default";
      this.billingAddress = null;
    }
  },
  watch: {
    addBillingCheck(newValue, oldValue) {
      if (newValue) this.mode = "billing";
      else this.billingAddress = null;
    }
  }
};
</script>

<style lang="scss">
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
      .payments-made{
            display: flex;
    align-items: center;
    padding: 0px 46px;
    margin-top: 27px;
    justify-content: center
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

      .total {
        font-size: 25px;
        font-weight: 700;
      }

      .total-details {
        font-size: 18px;
        margin: 5px 0;
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