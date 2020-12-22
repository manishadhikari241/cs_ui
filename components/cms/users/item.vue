<template>
  <div class="cmscomponent item user">
    <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>
    <div v-if="item">
      <div class="title ignorePrint">
        <span><i class="far fa-edit"></i>&nbsp;&nbsp;ID: {{ item.id }}</span>
        <div>
          <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
        </div>
      </div>
      <hr class="ignorePrint">
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="General" active>
              <b-card-text>
                <div class="general">
                  <div class="info-row">
                    <div class="prop">First Name</div>
                    <div class="value">{{ item.first_name }}</div>
                  </div>
                  <div class="info-row">
                    <div class="prop">Last Name</div>
                    <div class="value">{{ item.last_name }}</div>
                  </div>
                  <div class="info-row">
                    <div class="prop">Email</div>
                    <div class="value">{{ item.email }}</div>
                  </div>
                  <div class="info-row">
                    <div class="prop">Email Verified</div>
                    <div class="value">
                      <b-badge variant="success" v-if="item.email_verified_at">Verified</b-badge>
                      <b-badge variant="danger" v-else>Not Verified</b-badge>
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="prop">Mobile</div>
                    <div class="value">{{ item.mobile }}</div>
                  </div>
                  <div class="info-row">
                    <div class="prop">Joined</div>
                    <div class="value">{{ $moment(item.created_at).format('DD/MM/YYYY') }}</div>
                  </div>
                  <div class="info-row">
                    <div class="prop">Language Preference</div>
                    <div class="value">{{ item.lang_pref }}</div>
                  </div>
                  <div class="info-row" style="border-bottom: none;">
                    <div class="prop">Role</div>
                    <div class="value">
                      <b-badge variant="primary" v-if="item.role_id == 1">Admin</b-badge>
                      <b-badge variant="info" v-if="item.role_id == 2">Creator</b-badge>
                      <b-badge variant="warning" v-else>Regular</b-badge>

                      <b-button size="sm" variant="success" v-if="item.role_id == 0" @click="toggleCreatorPrivileges" :disabled="creatorPrivileges.loading">Give creator privileges</b-button>
                      <b-button size="sm" variant="danger" v-if="item.role_id == 2" @click="toggleCreatorPrivileges" :disabled="creatorPrivileges.loading">Remove creator privileges</b-button>
                    </div>
                  </div>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Password">
              <b-card-text>
                <form @submit.prevent="updatePassword">
                  <b-input name="password" type="password" placeholder="New Password" v-model="password.value"></b-input>
                  <br>
                  <div style="text-align: right;">
                    <b-button type="submit" variant="primary" :disabled="password.loading"><i class="fas fa-edit"></i>&nbsp;&nbsp;Update</b-button>
                  </div>
                </form>
              </b-card-text>
            </b-tab>
            <b-tab title="Quota">
              <b-card-text>
                <div class="quota" v-if="quota.item">
                  <div class="input-row">
                    <div class="prop">Standard:</div>
                    <div class="value">
                      <div style="display: flex; align-items: center; justify-content: space-between;">
                        <span>{{ quota.item.standard }}</span>
                        <b-input-group size="sm" style="margin-left: 20px;">
                          <b-form-input type="number" v-model="quota.tmpValues.standard"></b-form-input>
                          <b-input-group-append>
                            <b-button variant="primary" :disabled="quota.loading || quota.tmpValues.standard <= 0" @click="updateQuota('standard')">Add</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </div>
                    </div>
                  </div>
                  <div class="input-row">
                    <div class="prop">Extended:</div>
                    <div class="value">
                      <div style="display: flex; align-items: center; justify-content: space-between;">
                        <span>{{ quota.item.extended }}</span>
                        <b-input-group size="sm" style="margin-left: 20px;">
                          <b-form-input type="number" v-model="quota.tmpValues.extended"></b-form-input>
                          <b-input-group-append>
                            <b-button variant="primary" :disabled="quota.loading || quota.tmpValues.extended <= 0" @click="updateQuota('extended')">Add</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </div>
                    </div>
                  </div>
                  <div class="input-row">
                    <div class="prop">Simulator:</div>
                    <div class="value">
                      <div style="display: flex; align-items: center; justify-content: space-between;">
                        <span>{{ quota.item.simulator }}</span>
                        <b-input-group size="sm" style="margin-left: 20px;">
                          <b-form-input type="number" v-model="quota.tmpValues.simulator"></b-form-input>
                          <b-input-group-append>
                            <b-button variant="primary" :disabled="quota.loading || quota.tmpValues.simulator <= 0" @click="updateQuota('simulator')">Add</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </div>
                    </div>
                  </div>
                  <div class="input-row">
                    <div class="prop">Exclusive:</div>
                    <div class="value">
                      <div style="display: flex; align-items: center; justify-content: space-between;">
                        <span>{{ quota.item.exclusive }}</span>
                        <b-input-group size="sm" style="margin-left: 20px;">
                          <b-form-input type="number" v-model="quota.tmpValues.exclusive"></b-form-input>
                          <b-input-group-append>
                            <b-button variant="primary" :disabled="quota.loading || quota.tmpValues.exclusive <= 0" @click="updateQuota('exclusive')">Add</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </div>
                    </div>
                  </div>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab title="Payments">
              <b-card-text>
                <div class="payments-container" v-show="!payments.invoice">
                  <b-table :items="payments.payments" :fields="payments.fields" striped>
                    <template v-slot:cell(package)="data">
                      <span class="capitalize">{{ data.item.package }}</span>
                    </template>
                    <template v-slot:cell(amount)="data">
                      <span v-if="data.item.channel != 'coupon'">{{ data.item.amount }} USD</span>
                      <b-badge variant="primary" v-if="data.item.channel == 'coupon'">Coupon</b-badge>
                    </template>
                    <template v-slot:cell(quantity)="data">
                      {{ data.item.quantity }} {{ data.item.package == 'standard' || data.item.package == 'extended' ? 'designs' : 'requests' }}
                    </template>
                    <template v-slot:cell(actions)="data">
                      <b-button @click="showInvoice(data.item)">View</b-button>
                    </template>
                  </b-table>
                </div>

                <div class="invoice-container" v-if="payments.invoice">
                  <div class="title">
                    <span>Invoice # {{ payments.invoice.id }}</span>
                         <b-button class="back ignorePrint" @click="showInvoice(null)"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</b-button>
                    <b-button size="sm" @click="print" class="btn-print ignorePrint">Print Invoice &nbsp;&nbsp;<i class="fas fa-print"></i></b-button>
                  </div>
                  <div class="invoice-header">
                    <div class="logo"><img alt="logo" src="~/assets/logo.svg"></div>
                    <div class="text">Unit 611, Kinetic Industrial Center, No.7 Wang Kwong Road, Kowloon Bay, Hong Kong</div>
                    <div class="text">www.collectionstock.com</div>
                  </div>
                  <br><hr>
                  <div class="invoice-details">
                    <div class="prop">Invoice Date</div>
                    <div class="value">{{ $moment(payments.invoice.created_at).format('DD/MM/YYYY') }}</div>
                    <div class="prop">Payment Method</div>
                    <div class="value">
                      <span v-if="payments.invoice.channel != 'coupon'">Credit Card</span>
                      <span v-if="payments.invoice.channel == 'coupon'">Coupon</span>
                    </div>
                    <div class="prop">{{ $t('billing_details') }}</div>
                    <div class="value" v-if="payments.invoice.billing_details">{{ payments.invoice.billing_details }}</div>
                    <div class="prop" v-if="payments.invoice.channel != 'coupon'">Transaction ID</div>
                    <div class="value" v-if="payments.invoice.channel != 'coupon'">{{ payments.invoice.transaction_id }}</div>
                    <div class="prop">Package</div>
                    <div class="value">
                    <div v-if="payments.invoice.package == 'standard' || payments.invoice.package == 'extended'">
                      <p><span class="capitalize">{{ $t(payments.invoice.package) }}</span> {{ payments.invoice.package == 'standard' || payments.invoice.package == 'extended' ? 'License' : 'Requests' }} - ${{ payments.invoice.amount }} for {{ payments.invoice.quantity }} {{ payments.invoice.package == 'standard' || payments.invoice.package == 'extended' ? 'designs' : 'requests' }}</p>
                      <p v-if="payments.invoice.package == 'standard'">{{ $t('jpg_only') }}</p>
                      <p v-if="payments.invoice.package == 'extended'">{{ $t('jpg_pdf_ai_eps') }}</p>
                      <p v-if="payments.invoice.package == 'standard'">{{ $t('for_print_advertising_design') }}</p>
                      <p v-if="payments.invoice.package == 'extended'">{{ $t('for_resale_items_or_reproduction') }}</p>
                    </div>
                    <div v-else-if="payments.invoice.package == 'simulator'">
                      <p>PRODUCT SIMULATOR - ${{ payments.invoice.amount }} for {{ payments.invoice.quantity }} products</p>
                      <p>Add your own products into the simulator</p>
                    </div>
                    <div v-else>
                      <p>Exclusive Designs - ${{ payments.invoice.amount }} for {{ payments.invoice.quantity }} designs</p>
                      <p>JPG, PDF, AI, EPS</p>
                      <p>Ownership Certificate</p>
                      <p>Tailor-made on request</p>
                    </div>
                    <p>{{ $t('to_be_used_within') }}</p>
                  </div>
                    <div class="prop">Period</div>
                    <div class="value">1 year : {{ $moment(payments.invoice.created_at).format('DD/MM/YYYY') }} - {{ $moment(payments.invoice.created_at).add('years', 1).format('DD/MM/YYYY') }}</div>
                    <div class="prop">Contract Start Date</div>
                    <div class="value">{{ $moment(payments.invoice.created_at).format('DD/MM/YYYY') }}</div>
                    <div class="prop">Total</div>
                    <div class="value">US$ {{ payments.invoice.amount }}</div>
                    <div class="prop">IMPORTANT</div>
                    <div class="value">
                      <p>* Payment are made in USD</p>
                      <p>* No VAT applies - For EU customers Reverse Charge applies (VAT 0%).</p>
                      <p>* On all designs you download and use on Collectionstock the Extended License Terms will apply.</p>
                    </div>
                    <br>
               
                  </div>
                </div>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["itemId"],
  data() {
    return {
      item: null,
      loading: false,
      creatorPrivileges: {
        loading: false
      },
      verify: {
        loading: false
      },
      password: {
        value: "",
        loading: false
      },
      quota: {
        item: null,
        loading: false,
        tmpValues: {
          standard: 0,
          extended: 0,
          simulator: 0,
          exclusive: 0
        }
      },
      payments: {
        payments: [],
        fields: [
          {
            key: "package",
            label: "Package"
          },
          {
            key: "amount",
            label: "Price"
          },
          {
            key: "quantity",
            label: "Quantity"
          },
          {
            key: "actions",
            label: "Details"
          }
        ],
        invoice: null
      }
    };
  },
  methods: {
    load() {
      this.$axios.$get(`/cms/users/${this.itemId}`).then(response => {
        this.item = response;
      });

      this.$axios.$get(`/cms/users/${this.itemId}/quota`).then(response => {
        this.quota.item = response;
      });

      this.$axios.$get(`/cms/users/${this.itemId}/payments`).then(response => {
        this.payments.payments = response;
      });
    },

    cancel() {
      this.$emit("updated", { clearItemFrame: true });
    },

    toggleCreatorPrivileges() {
      this.creatorPrivileges.loading = true;
      this.$axios
        .$patch(`/cms/users/${this.itemId}/toggleCreatorPrivileges`)
        .then(response => {
          this.creatorPrivileges.loading = false;
          this.$toast.success("User updated successfully");
          this.item = response;
        })
        .catch(error => {
          this.creatorPrivileges.loading = false;
          this.$toast.error(error.response.data.error.message);
        });
    },

    updatePassword(e) {
      this.password.loading = true;
      this.$axios
        .$patch(`/cms/users/${this.itemId}/updatePassword`, {
          new_password: e.target.password.value
        })
        .then(response => {
          this.password.loading = false;
          this.password.value = "";
          this.$toast.success("Password updated successfully");
        })
        .catch(error => {
          this.password.loading = false;
          this.$toast.error(error.response.data.error.message);
        });
    },

    updateQuota(pkg) {
      this.quota.loading = true;
      this.$axios
        .$patch(`/cms/users/${this.itemId}/updateQuota`, {
          pkg,
          quantity: this.quota.tmpValues[pkg]
        })
        .then(response => {
          this.quota.loading = false;
          this.quota.tmpValues[pkg] = 0;
          this.$toast.success("Quota added successfully");
          this.load();
        })
        .catch(error => {
          this.quota.loading = false;
          this.$toast.error(error.response.data.error.message);
        });
    },

    showInvoice(item) {
      this.payments.invoice = item;
    },

    print() {
      if (process.client) {
        window.print();
      }
    }
  },
  watch: {
    itemId() {
      this.item = null;
      this.load();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  }
};
</script>

<style lang="scss">
.cmscomponent.item.user {
  .general {
    .info-row {
      display: flex;
      padding: 10px 0;
      margin-bottom: 10px;
      border-bottom: 1px dashed #ccc;
      font-size: 14px;

      .prop {
        width: 200px;
        font-weight: 600;
      }
    }
  }

  .quota {
    .input-row {
      display: flex;
      padding: 10px 0;
      margin-bottom: 10px;
      border-bottom: 1px dashed #ccc;
      align-items: center;

      .prop {
        width: 200px;
        font-weight: 600;
      }
    }
  }

  .payments-container {
    .title {
      font-size: 25px;
      font-weight: 700;
      color: $black;
    }

    .capitalize {
      text-transform: capitalize;
    }

    button {
      font-size: 14px;
      color: $black;
      border: 1px solid $black;
      border-radius: 30px;
      padding: 5px 20px;
      background-color: #fff;
      font-weight: 700;
    }
  }

  .invoice-container {
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
  }
}

@media print {
  .cmscomponent.item.user {
    .card-header-tabs {
      display: none;
    }
  }

  .cmspage .contentframe .itemframe {
    border-left: none !important;
  }

  .cmscomponent.item.user * {
    border: none !important;
  }

  .cmspage .contentframe .itemframe {
    width: 100% !important;
  }
}
</style>