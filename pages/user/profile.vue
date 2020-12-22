<template>
  <div class="page user">
    <b-container>
      <b-row>
        <b-col md="3">
          <UserMenu />
        </b-col>
        <b-col md="9">
          <div class="content">
            <div class="profile-container">
              <div class="title">{{ $t('user_information') }}</div>
              <br>
              <form @submit.prevent="updateUser">
                <div class="info-row">
                  <div class="prop">{{ $t('user_id') }}</div>
                  <div class="value">{{ $auth.user.id }}</div>
                </div>
                <div class="info-row">
                  <div class="prop">{{ $t('email') }}</div>
                  <div class="value">
                    <b-input v-model="user.email" required></b-input>
                  </div>
                </div>
                <div class="info-row">
                  <div class="prop">{{ $t('first_name') }}</div>
                  <div class="value">
                    <b-input v-model="user.first_name" required></b-input>
                  </div>
                </div>
                <div class="info-row">
                  <div class="prop">{{ $t('last_name') }}</div>
                  <div class="value">
                    <b-input v-model="user.last_name" required></b-input>
                  </div>
                </div>
                <div class="info-row">
                  <div class="prop">{{ $t('phone') }}</div>
                  <div class="value">
                    <!-- <b-input v-model="user.mobile" required></b-input> -->
                    <vue-tel-input v-model="user.mobile" :placeholder="$t('mobile')" :enabledCountryCode="true" :validCharactersOnly="true" :disabledFetchingCountry="true" :defaultCountry="user.country" v-on:country-changed="countryChanged"></vue-tel-input>
                  </div>
                </div>
                <div class="info-row">
                  <div class="prop">{{ $t('company') }}</div>
                  <div class="value">
                    <b-input v-model="user.company"></b-input>
                  </div>
                </div>
                <div class="info-row">
                  <div class="prop">{{ $t('industry') }}</div>
                  <div class="value">
                    <b-textarea v-model="user.industry"></b-textarea>
                  </div>
                </div>
            
                <button type="submit" :disabled="updating">{{ $t('update') }}</button>
              </form>
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
import { VueTelInput } from 'vue-tel-input'

export default {
  middleware: 'auth',
  components: {
    UserMenu,
    VueTelInput
  },
  data() {
    return {
      user: {
        email: this.$auth.user.email,
        first_name: this.$auth.user.first_name,
        last_name: this.$auth.user.last_name,
        country: this.$auth.user.country,
        mobileCode: '',
        mobile: this.$auth.user.mobile.split(' ')[1],
        company: this.$auth.user.company,
        industry: this.$auth.user.industry,
        lang_pref: this.$auth.user.lang_pref,
      },
      updating: false
    }
  },
  methods: {
    countryChanged(country) {
      this.user.country = country.iso2;
      this.user.mobileCode = country.dialCode;
    },

    updateUser() {
      let request = JSON.parse(JSON.stringify(this.user));
      if (this.$auth.user.email == this.user.email)
        delete request.email;

      this.updating = true;
      this.$axios.$patch(`/users/${this.$auth.user.id}`, request)
        .then((response) => {
          this.updating = false;
          this.$toast.success(this.$t('user_updated_successfully'));
          if (response.email_updated) {
            this.$toast.success(this.$t('please_confirm_your_email'));
            this.$auth.logout();
          } else {
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          }
        }).catch((error) => {
          this.updating = false;
          this.$toast.error(error.response.data.error.message);
        });
    }
  }
}
</script>

<style lang="scss">
.page.user {
  .profile-container {
    .title {
      font-size: 25px;
      font-weight: 700;
      color: $black;
    }

    .info-row {
      display: flex;
      padding: 10px 0;
      width: 100%;

      .prop {
        width: 200px;
        font-size: 16px;
        font-weight: 600;
      }

      .value {
        input, textarea, select {
          width: 300px;
        }
      }
    }

    .vue-tel-input {
      outline: none;
      box-shadow: none;
      font-size: 16px;

      .vti__dropdown {
        .vti__country-code {
          font-size: 16px;
        }
      }

      input {
        margin-bottom: 0;
        width: 210px !important;
      }
    }

    button {
      margin-top: 40px;
      padding: 5px 40px;
      border: none;
      color: #fff;
      background: $black;
      border-radius: 30px;
      font-weight: 600;
      text-decoration: none;
      outline:none;
    }
  }
}
</style>