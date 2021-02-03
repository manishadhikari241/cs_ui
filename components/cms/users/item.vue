<template>
  <div class="cmscomponent item user">
    <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>
    <div v-if="item">
      <div class="title ignorePrint">
        <span><i class="far fa-edit"></i>&nbsp;&nbsp;ID: {{ item.id }}</span>
        <div>
          <b-button variant="primary" size="sm" @click="loginAs" v-if="$auth.user.role_id == 1" :disabled="impersonating">Login As</b-button>
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
                      <b-badge variant="info" v-if="item.role_id == 1">Admin</b-badge>
                      <b-badge variant="warning" v-else-if="item.role_id == 2">Creator</b-badge>
                      <b-badge v-else>Regular</b-badge>

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
                        <span v-if="quota.item.standard" style="margin-left: 20px;">{{ $moment(quota.item.standard_expiry).format('DD/MM/YYYY') }}</span>
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
                        <span v-if="quota.item.extended" style="margin-left: 20px;">{{ $moment(quota.item.extended_expiry).format('DD/MM/YYYY') }}</span>
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
                        <span v-if="quota.item.simulator" style="margin-left: 20px;">{{ $moment(quota.item.simulator_expiry).format('DD/MM/YYYY') }}</span>
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
                        <span v-if="quota.item.exclusive" style="margin-left: 20px;">{{ $moment(quota.item.exclusive_expiry).format('DD/MM/YYYY') }}</span>
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
                      <span class="capitalize" v-if="data.item.lib_plan_user">{{ data.item.lib_plan_user.lib_plan.key.replaceAll('_', ' ') }}</span>
                      <span class="capitalize" v-else>{{ $t(data.item.package) }}</span>
                    </template>
                    <template v-slot:cell(amount)="data">
                      <span v-if="data.item.channel != 'coupon'">{{ data.item.amount }} USD</span>
                      <b-badge variant="primary" v-if="data.item.channel == 'coupon'">Coupon</b-badge>
                    </template>
                    <template v-slot:cell(quantity)="data">
                      <template v-if="!data.item.lib_plan_user">
                        {{ data.item.quantity }}
                        <span>{{ data.item.package == 'standard' || data.item.package == 'extended' ? 'designs' : 'requests' }}</span>
                      </template>
                      <template v-else>
                        {{ data.item.lib_plan_user.lib_plan.quota }} designs
                      </template>
                    </template>
                    <template v-slot:cell(actions)="data">
                      <b-button @click="showInvoice(data.item)">View</b-button>
                    </template>
                  </b-table>
                </div>

                <div class="invoice-container" v-if="payments.invoice">
                  <template v-if="!payments.invoice.lib_plan_user">
                    <CmsInvoice :payment="payments.invoice"/>
                  </template>
                  <template v-else>
                    <div>---INVOICE FOR EXISTING USERS</div>
                  </template>
                </div>


              </b-card-text>
            </b-tab>
            <b-tab title="Member" v-if="item.is_existing_user">
              <b-card-text>
                <div class="general">
                  <div class="info-row">
                    <div class="prop">Plan</div>
                    <div class="value" style="text-transform: capitalize;">{{ item.plan.lib_plan.key.replaceAll('_', ' ') }}</div>
                  </div>
                  <div class="info-row">
                    {{item.plan}}
                    <div class="prop">Payment Method</div>
                    <div class="value">{{ item.plan.subscription_id ? ' (Auto)' : 'Manual' }}</div>
                  </div>
                  <div class="info-row">
                    <div class="prop">Amount</div>
                    <div class="value">${{ item.plan.lib_plan.price }}</div>
                  </div>
                  <div class="info-row" v-if="item.plan.lib_plan.month_cycle == 12">
                    <div class="prop">Expiry Date</div>
                    <div class="value">{{ $moment(item.plan.next_billing_at).format('DD/MM/YYYY') }}</div>
                  </div>
                  <div class="info-row" v-if="item.plan.lib_plan.month_cycle == 12 && !item.plan.subscription_id">
                    <div class="prop">Extend Membership</div>
                    <div class="value">
                      <form @submit.prevent="extendMembership">
                        <b-input-group>
                          <b-form-input placeholder="Reference number" v-model="members.reference"></b-form-input>
                          <b-input-group-append>
                            <b-button variant="outline-success" :disabled="!members.reference.length" type="submit">Renew</b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </form>
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="prop">Reset Account</div>
                    <div class="value">
                      <b-button variant="danger" @click="resetExistingAccount">Reset</b-button>
                    </div>
                  </div>
                </div>
              </b-card-text>
            </b-tab>
                  <b-tab  title="Newsletter">
              <b-card-text>
                <div class="general">
            <b-table  class="payment-history" :items="item.concent_histories" :fields="fields" :responsive="'md'" striped>

                                 <template v-slot:cell(created_at)="data">
                                    <span>{{ $moment(data.item.created_at).format('DD-MM-YYYY') }}</span>
                                </template>
                                <template v-slot:cell(subscribe)="data">
                                 <span v-if="data.item.subscribe==1" >{{ data.index == 0 ? $t('active_newsletter') + $t('current') :$t('active_newsletter')}}</span>
                                 <span v-if="data.item.subscribe==0" >{{ data.index == 0 ? $t('inactive_newsletter') + $t('current') :$t('inactive_newsletter')}}</span>


                                </template> 

                            </b-table>
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
import CmsInvoice from '~/components/cms/cmsinvoice'
export default {
  props: ["itemId"],
  components: {
    CmsInvoice,
  },
  data() {
    return {
      item: null,
            fields: [
        {
          key: "created_at",
          label: this.$t("newsletter_date")
        },
        {
          key: "subscribe",
          label: this.$t("newsletter_status")
        }
      ],
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
      },

      members: {
        reference: ''
      },

      impersonating: false
    };
  },
  methods: {
    async load() {
      this.$axios.$get(`/cms/users/${this.itemId}/quota`).then(response => {
        this.quota.item = response;
      });

      this.item = await this.$axios.$get(`/cms/users/${this.itemId}`);

      this.$axios.$get(`/cms/users/${this.itemId}/payments`).then(response => {
        if (this.item.is_existing_user) {
          this.payments.payments = response.payments.concat(response.planPayments);
          this.payments.payments.sort(function (a, b) {
              if (a.created_at < b.created_at)
                  return 1;
              else if (a.created_at > b.created_at)
                  return -1;
              return 0;
          });
        } else {
          this.payments.payments = response.payments;
        }
      });

      this.payments.invoice = null;
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

    async transferToExisting() {
      let response = await this.$axios.$post(`/cms/users/existing/${this.itemId}/transferToExisting`);
      window.location.reload();
    },

    extendMembership() {
      this.$axios.$post(`/cms/users/existing/${this.itemId}/extend`, { reference: this.members.reference })
        .then(response => {
          this.$toast.success("Membership extended successfully");
          window.location.reload();
        })
        .catch(error => {
          this.$toast.error(error.response.data.error.message);
        });
    },

    resetExistingAccount() {
      this.$axios.$post(`/cms/users/existing/${this.itemId}/reset`)
        .then(response => {
          this.$toast.success("Membership reset successfully");
          window.location.reload();
        })
        .catch(error => {
          this.$toast.error(error.response.data.error.message);
        });
    },

    loginAs() {
      this.impersonating = true;
      this.$axios.$post(`/cms/users/${this.itemId}/impersonate`)
        .then((response) => {
          this.impersonating = false;
          this.$auth.setUserToken(response.token)
            .then(() => {
              window.location.href = this.localePath('/');
            });
        })
        .catch(error => {
          this.impersonating = false;
          this.$toast.error(error.response.data.error.message);
        });
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
