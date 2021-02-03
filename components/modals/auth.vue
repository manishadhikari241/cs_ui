<template>
    <div>
        <b-modal id="modal-auth" size="xl" centered hide-header hide-footer>
            <button class="btn-modal-auth-close" @click="$bvModal.hide('modal-auth')">
                <b-icon-x></b-icon-x>
            </button>
            <b-container>
                <b-row>
                    <b-col md="5" class="left lg-hide">
                        <div>
                            <div class="intro">
                                <p>{{ $t('create_a_free_account_for_full_access_to') }}:</p>
                                <p></p>
                                <ul>
                                    <li>• {{ $t('market_and_trend_aware_collections') }}</li>
                                    <li>• {{ $t('prints_patterns_and_graphics') }}</li>
                                    <li>• {{ $t('product_simulator') }}</li>
                                    <li>• {{ $t('design_request') }}</li>
                                    <li>• {{ $t('exclusive_request') }}</li>

                                </ul>
                            </div>
                            <div class="sponsors">
                                <p><strong>{{ $t('some_of_our_clients') }}:</strong></p>
                                     <div class="d-flex">
                                             <div class="image mr-5" v-for="(client, index) in clients" :key="`client_${index}`" >
                   <img class="img-fluid" :src="client.image">

                    </div>
                                  </div> 
                          
                                <!-- <img src="~/assets/sponsors.png"> -->
                            </div>
                        </div>
                    </b-col>
                    <b-col class="right">
                        <div class="authentication" v-show="mode === 1">
                            <h1 class="title">{{ $t('login_now') }}</h1>
                            <br>
                            <form class="login" @submit.prevent="login">
                                <b-input type="email" name="email" v-model="loginInfo.email" :placeholder="$t('email')"
                                         required></b-input>
                                <b-input type="password" name="password" v-model="loginInfo.password"
                                         :placeholder="$t('password')" required></b-input>
                                <div class="buttons">
                                    <b-button type="submit" class="login_button" :disabled="loading">{{ $t('login') }}
                                    </b-button>
                                    <b-button type="button" class="forgot_password" @click="setAuthModalMode(3)"
                                              :disabled="loading">{{
                                        $t('forgot_password') }}
                                    </b-button>
                                </div>
                            </form>
                            <br><br>
                            <p style="margin-bottom:0rem;" class="notice">{{ $t('new_to_collectionstock') }} <a href="#"
                                                                                                                @click="setAuthModalMode(2)">{{
                                $t('join_now_for_free') }}</a></p>
                        </div>
                        <div class="registration" v-show="mode === 2">
                            <h1 class="title" v-show="!confirmAfterRegisterMode">{{ $t('join_now_for_free') }}!</h1>
                            <h1 class="title" v-show="confirmAfterRegisterMode">{{
                                $t('you_have_registered_successfully') }}</h1>
                            <br>
                            <form class="join_now" @submit.prevent="register" v-show="!confirmAfterRegisterMode">
                                <b-row>
                                    <b-col>
                                        <b-input type="text" name="first_name" v-model="registerInfo.first_name"
                                                 :placeholder="$t('first_name')" required></b-input>
                                    </b-col>
                                    <b-col>
                                        <b-input type="text" name="last_name" v-model="registerInfo.last_name"
                                                 :placeholder="$t('last_name')" required></b-input>
                                    </b-col>
                                </b-row>
                                <b-input type="email" name="email" v-model="registerInfo.email"
                                         :placeholder="$t('email')" required></b-input>
                                <!-- <b-input type="text" name="mobile" v-model="registerInfo.mobile" :placeholder="$t('mobile')"></b-input> -->
                                <vue-tel-input name="mobile" v-model="registerInfo.mobile" :placeholder="$t('mobile')"
                                               :dynamicPlaceholder="true" :enabledCountryCode="true" required
                                               :validCharactersOnly="true"
                                               v-on:country-changed="countryChanged"></vue-tel-input>
                                <b-input type="text" name="coupon" v-model="registerInfo.coupon"
                                         :placeholder="$t('coupon_code')"></b-input>
                                <b-input type="password" name="password" v-model="registerInfo.password"
                                         :placeholder="$t('create_a_password')" minlength="8" required></b-input>
                                <b-form-checkbox name="newsletter" v-model="registerInfo.newsletter">{{
                                    $t('accept_newsletter') }}
                                </b-form-checkbox>
                                <b-form-checkbox name="accept" v-model="registerInfo.accept" required>
                                    <span v-html="$t('accept_terms')"></span>
                                </b-form-checkbox>
                                <div class="buttons">
                                    <b-button type="submit" class="join-now-btn btn-primary" :disabled="loading">{{
                                        $t('join_now')
                                        }}
                                    </b-button>
                                    <span class="notice">{{ $t('already_have_an_account') }} <a href="#"
                                                                                                @click="setAuthModalMode(1)">{{ $t('log_in') }}</a></span>
                                </div>
                            </form>
                            <div class="confirm-after-register" v-show="confirmAfterRegisterMode">
                                <p>{{ $t('we_sent_a_confirmation_link') }}</p>
                                <p>{{ $t('please_confirm_your_email') }}</p>
                                <br><br>
                                <b-button @click="resendConfirmation" :disabled="loading">{{ $t('resend_confirmation')
                                    }}
                                </b-button>
                            </div>
                        </div>
                        <div class="forgot" v-show="mode === 3">
                            <h1 class="title">{{ $t('forgot_password') }}</h1>
                            <p class="help-text">{{ $t('we_can_help_with_reset') }}</p>
                            <br>
                            <form @submit.prevent="sendResetPasswordEmail">
                                <b-input type="email" name="email" v-model="forgotInfo.email" :placeholder="$t('email')"
                                         required></b-input>
                                <div class="buttons">
                                    <button class="reset-btn" type="submit" :disabled="loading">{{ $t('reset_password')
                                        }}
                                    </button>
                                </div>
                            </form>
                            <br><br>
                            <p class="notice"><strong><a href="#" @click="setAuthModalMode(1)">{{
                                $t('return_to_login_page') }}</a></strong></p>
                        </div>
                        <div class="reset" v-show="mode === 4">
                            <h1 class="title">{{ $t('reset_password') }}</h1>
                            <br>
                            <form @submit.prevent="resetPassword">
                                <b-input type="email" name="email" v-model="resetInfo.email" :placeholder="$t('email')"
                                         required></b-input>
                                <b-input
                                        :class="{'confirmed': resetInfo.password.length >= 8 && resetInfo.password == resetInfo.password_confirmation}"
                                        type="password" name="password" v-model="resetInfo.password"
                                        :placeholder="$t('new_password')" minlength="8" required></b-input>
                                <b-input
                                        :class="{'confirmed': resetInfo.password.length >= 8 && resetInfo.password == resetInfo.password_confirmation}"
                                        type="password" name="password_confirmation"
                                        v-model="resetInfo.password_confirmation" :placeholder="$t('confirm_new_password')"
                                        minlength="8" required></b-input>
                                <div class="buttons">
                                    <b-button class="reset-btn" type="submit" :disabled="loading">{{ $t('confirm') }}</b-button>
                                </div>
                            </form>
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
import { VueTelInput } from "vue-tel-input";

export default {
  components: {
    BIconX,
    VueTelInput
  },
  data: function() {
    return {
      clients:'',
      loading: false,
      share: null,
      loginInfo: {
        email: "",
        password: ""
      },
      registerInfo: {
        first_name: "",
        last_name: "",
        email: "",
        country: "",
        mobileCode: "",
        mobile: "",
        password: "",
        coupon: "",
        lang: this.$i18n.locale,
        newsletter: false,
        accept: false
      },
      forgotInfo: {
        email: "",
        lang: this.$i18n.locale == "ch" ? "zh-CN" : "en"
      },
      resetInfo: {
        lang: this.$i18n.locale == "ch" ? "zh-CN" : "en",
        email: "",
        password: "",
        password_confirmation: "",
        token: ""
      },
      confirmAfterRegisterMode: null
    };
  },
  computed: {
    ...mapState("authmodal", ["mode"]),
  },
  methods: {
        clientLoad() {
      this.$axios.$get(`/app/init`).then(res => {
        this.clients = res.clients;
      });
    },
    toggleLoading: function() {
      this.loading = !this.loading;
    },

    setAuthModalMode: function(arg) {
      if (!this.loading) this.$store.commit("authmodal/setMode", arg);
    },

    init: function() {
      this.$axios.$get("/app/init").then(response => {
        console.log(response);
        this.$store.commit("app/setInit", response);
      });
    },

    login: async function() {
      this.toggleLoading();
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginInfo
        });
        var path = this.$route.path;
        if (this.share != null) {
          var path = this.share;
        }
        this.$router.push(path);
        this.loginInfo.email = "";
        this.loginInfo.password = "";

        this.$bvModal.hide("modal-auth");
        this.$toast.success(this.$t("you_have_logged_in_successfully"));
        $nuxt.$emit("login");
        this.init();
      } catch (error) {
        if (error.response.data.error.code == 4009) {
          this.confirmAfterRegisterMode = this.loginInfo.email;
          this.$store.commit("authmodal/setMode", 2);
        } else if (error.response.data.error.code == 4007) {
          this.$toast.error(this.$t("email_is_not_registered"));
        } else if (error.response.data.error.code == 4001) {
          this.$toast.error(this.$t("invalid_credentials"));
        } else {
          this.$toast.error(error.response.data.error.message);
        }
      }
      this.toggleLoading();
    },

    countryChanged(country) {
      this.registerInfo.country = country.iso2;
      this.registerInfo.mobileCode = country.dialCode;

      setTimeout(() => {
        var placeholder = document.querySelector(".vue-tel-input input")
          .attributes.placeholder.value;
        var placeholderWithoutCode = placeholder.split(" ");
        placeholderWithoutCode.shift();
        placeholderWithoutCode = placeholderWithoutCode.join(" ");
        document.querySelector(
          ".vue-tel-input input"
        ).attributes.placeholder.value = placeholderWithoutCode;
      });
    },

    register: async function() {
      this.toggleLoading();
      try {
        let response = await this.$axios.$post(
          "/auth/register",
          this.registerInfo
        );

        this.confirmAfterRegisterMode = this.registerInfo.email;

        this.registerInfo.first_name = "";
        this.registerInfo.last_name = "";
        this.registerInfo.email = "";
        this.registerInfo.mobile = "";
        this.registerInfo.password = "";
        this.registerInfo.coupon = "";
        this.registerInfo.newsletter = false;
        this.registerInfo.accept = false;

        // this.$toast.success(this.$t('you_have_registered_successfully')+'. '+this.$t('please_confirm_your_email'));
        // this.$bvModal.hide('modal-auth');
      } catch (error) {
        if (error.response.data.error.code == 4002) {
          this.$toast.error(this.$t("email_already_exists"));
        } else this.$toast.error(error.response.data.error.message);
      }
      this.toggleLoading();
    },

    resendConfirmation: async function() {
      this.toggleLoading();
      try {
        let response = await this.$axios.$post("/auth/verify/resend", {
          email: this.confirmAfterRegisterMode
        });

        this.$toast.success(this.$t("email_confirmation_link_sent"));
      } catch (error) {
        this.$toast.error(error.response.data.error.message);
      }
      this.toggleLoading();
    },

    sendResetPasswordEmail: async function() {
      this.toggleLoading();
      try {
        let response = await this.$axios.$post("/auth/forgot", this.forgotInfo);

        this.forgotInfo.email = "";

        this.$bvModal.hide("modal-auth");
        this.$toast.success(this.$t("password_reset_link_sent"));
      } catch (error) {
        if (error.response.status == 429) {
          this.$toast.error(this.$t("try_again_in_minutes"));
        } else this.$toast.error(error.response.data.error.message);
      }
      this.toggleLoading();
    },

    resetPassword: async function() {
      if (this.resetInfo.password !== this.resetInfo.password_confirmation) {
        this.$toast.error(this.$t("passwords_do_not_match"));
        return false;
      }

      this.toggleLoading();
      try {
        let response = await this.$axios.$post("/auth/reset", this.resetInfo);

        this.resetInfo.email = "";
        this.resetInfo.password = "";
        this.resetInfo.password_confirmation = "";
        this.resetInfo.token = "";

        this.$store.commit("authmodal/setMode", 1);
        this.$toast.success(this.$t("password_updated_successfully"));
      } catch (error) {
        this.$toast.error(error.response.data.error.message);
      }
      this.toggleLoading();
    }
  },

  mounted: function() {
    this.clientLoad();

    if (!this.$auth.loggedIn) {
      if (this.$route.query.EV == 1) {
        this.$toast.success(this.$t("email_verified_login_now"));
        this.$bvModal.show("modal-auth");
      } else if (this.$route.query.EVI == 1) {
        this.$toast.error(this.$t("email_verification_link_expired"));
      } else if (
        this.$route.query.PR == 1 &&
        this.$route.query.token &&
        this.$route.query.email
      ) {
        this.setAuthModalMode(4);
        this.$bvModal.show("modal-auth");
        this.resetInfo.email = this.$route.query.email;
        this.resetInfo.token = this.$route.query.token;
      } else if (this.$route.query.SH && this.$route.query.SH != 1) {
        this.share = this.$route.query.SH;
        this.$bvModal.show("modal-auth");
      }
    }
  }
};
</script>

<style lang="scss">
.join_now {
  @media screen and (max-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
.authentication .login {
  margin-top: 20px;
  .buttons {
    margin: auto;
    width: 100%;
    padding: 7px;
  }
}

.join-now-btn {
  border-radius: 30px;
  width: 200px;
  font-weight: 600;
  margin-right: 10px;
  margin-bottom: 10px;
}

#modal-auth {
  .vti__dropdown {
    outline: none;
  }
  .btn-modal-auth-close {
    position: absolute;
    top: -31px;
    right: 13px;
    border: none;
    background: transparent;
    outline: none;
    font-size: 35px;
    color: #aaa;
    cursor: pointer;
    z-index: 999;
    @media screen and (max-width: 500px) {
      top: -37px;
      right: 2px;
    }
  }
  .vti__dropdown-list {
    z-index: 2;
    padding: 0px;
    margin: 13px 0px;
    text-align: left;
    list-style: none;
    max-height: 215px;
    overflow-y: scroll;
    position: absolute;
    left: -1px;
    background-color: #fff;
    border: 0px solid #ccc;
    width: 390px;
    border-radius: 3px;
    box-shadow: 10px 7px 9px 5px rgba(0, 0, 0, 0.15);
    height: 195px;
  }
  .vti__dropdown-list::-webkit-scrollbar {
    width: 13px;
    height: 8px;
    background-color: #fff;
  }
  .vti__dropdown-list::-webkit-scrollbar-thumb {
    background: #ebebeb;
    border-radius: 8px;
  }
  .modal-content {
    padding: 15px 0;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);

    .modal-body {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .left {
      font-size: 18px;
      border-right: 1px solid #000;

      & > div {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .intro {
        flex-grow: 1;

        ul {
          padding: 0;
          list-style-type: none;
        }
      }

      .sponsors {
        img {
          max-width: 100%;
        }
      }
    }

    .right {
      padding-left: 50px;
      padding-right: 100px;

      .title {
        font-size: 35px;
        font-weight: 700;
        @media screen and (max-width: 768px) {
          font-size: 25px;
          padding-left: 20px;
        }
        @media screen and (max-width: 550px) {
          font-size: 25px;
          padding-left: 10px;
        }
      }

      .help-text {
        margin-top: 1rem;
        margin-bottom: 0;
        font-size: 18px;
        color: #aaa;
        font-weight: 600;
      }

      .reset {
        input {
          transition: background-color 0.2s;

          &.confirmed {
            background-color: #cff7cc;
          }
        }
      }

      form {
        button.join-now-btn {
          background-color: #0e8dde;
          border: none;
        }
        .vue-tel-input {
          margin-bottom: 15px;
          border-radius: 30px;
          outline: none;
          box-shadow: none;
          font-size: 16px;

          .vti__dropdown {
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            outline:none .vti__country-code {
              font-size: 16px;
            }
          }

          input {
            margin-bottom: 0;
          }
        }

        input {
          margin-bottom: 15px;
          border-radius: 30px;
          outline: none;
          box-shadow: none;
          font-size: 16px;
        }

        .custom-checkbox {
          margin-bottom: 15px;
          @media screen and (max-width: 768px) {
            font-size: 14px;
          }

          a {
            color: #aaa;
            text-decoration: none;
          }
        }
        .login_button {
          border-radius: 30px;
          background-color: #363636;
          color: #fff;
          width: 220px;
          font-weight: 600;
          margin-right: 10px;
          margin-bottom: 10px;
          @media screen and (max-width: 320px) {
            width: 76px;
          }
        }
        .forgot_password {
          border-radius: 30px;
          background-color: white;
          color: #363636;
          width: 220px;
          font-weight: 600;
          margin-right: 10px;
          margin-bottom: 10px;
          margin-left: 15px;
        }
        .reset-btn {
          border-radius: 30px;
          background-color: #363636;
          color: #fff;
          width: 100%;
          font-weight: 600;
          margin-right: 10px;
          margin-bottom: 10px;
          height: 38px;
          font-size: 16px;
        }
      }

      .notice {
        font-size: 18px;

        a {
          color: $brand;
          outline: none;
          text-decoration: none;
        }
      }

      .confirm-after-register {
        p {
          margin: 0;
          padding: 0;
          font-size: 18px;
          @media screen and (max-width: 540px) {
            font-size: 16px;
            padding-left: 10px;
          }
        }

        button {
          border-radius: 30px;
          background-color: $brand;
          border: none;
          color: #fff;
          width: 200px;
          font-weight: 600;
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
}

@media screen and (max-width: 1199px) {
  #modal-auth {
    .modal-content {
      .right {
        .notice {
          display: block;
        }
        form {
          .login_button {
            border-radius: 30px;
            background-color: #363636;
            color: #fff;
            width: 220px;
            font-weight: 600;
            margin-right: 10px;
            margin-bottom: 10px;
          }
          .forgot_password {
            border-radius: 30px;
            background-color: white;
            color: #000;
            width: 220px;
            font-weight: 600;
            margin-right: 10px;
            margin-bottom: 10px;
            margin-left: 118px;
          }
        }
      }
    }
  }
  .authentication .login {
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    .buttons {
      margin: auto;
      width: 100%;
      padding: 7px;
    }
  }
}

@media screen and (max-width: 1024px) {
  #modal-auth {
    .modal-content {
      .right {
        padding-left: 0;
        padding-right: 0;

        form {
          .login_button {
            border-radius: 30px;
            background-color: #000;
            color: #fff;
            width: 290px;
            font-weight: 600;
            margin-right: 10px;
            margin-bottom: 10px;
            font-size: 14px;
          }
          .forgot_password {
            border-radius: 30px;
            background-color: white;
            color: #000;
            width: 290px;
            font-weight: 600;
            margin-right: 10px;
            margin-bottom: 10px;
            margin-left: 90px;
          }
        }

        .notice {
          font-size: 16px;
        }
      }
    }
  }
}

@media screen and (max-width: 990px) {
  #modal-auth {
    .modal-content {
      .right {
        padding-left: 0;
        padding-right: 0;

        form {
          .buttons {
            text-align: left;
            padding-left: 0px;
          }
        }
        form {
          .login_button {
            border-radius: 30px;
            background-color: #000;
            color: #fff;
            width: 190px;
            font-weight: 600;
            margin-right: 10px;
            margin-bottom: 10px;
            font-size: 14px;
          }
          .forgot_password {
            border-radius: 30px;
            background-color: white;
            color: #000;
            width: 190px;
            font-weight: 600;
            margin-right: 10px;
            margin-bottom: 10px;
            margin-left: 15px;
            font-size: 14px;
          }
        }
        .notice {
          font-size: 16px;
        }
      }
    }
  }
}

@media screen and (max-width: 540px) {
  .sponsors p {
    margin-bottom: 0em;
  }
  .authentication .login {
    margin-top: 20px;
    padding-left: 10px;
    padding-right: 10px;

    .buttons {
      margin: auto;
      width: 100%;
      padding: 7px;

      .forgot_password {
        margin-left: -10px;
      }
    }
  }
  #modal-auth {
    .modal-content {
      .right {
        padding-left: 0;
        padding-right: 0;

        form {
          .buttons {
            text-align: left;
          }
        }
        form {
          .login_button {
            font-size: 14px;

            border-radius: 30px;
            background-color: #000;
            color: #fff;
            width: 105px;
            font-weight: 600;
            margin-right: 10px;
            margin-bottom: 10px;
          }
          .forgot_password {
            font-size: 14px;
            border-radius: 30px;
            background-color: white;
            color: #000;
            width: 148px;
            font-weight: 600;
            margin-right: 10px;
            margin-bottom: 10px;
            margin-left: 2px;
          }
        }

        .notice {
          font-size: 16px;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
