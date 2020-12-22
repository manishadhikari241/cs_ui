<template>
  <div class="component csheader">
    <nuxt-link to="/cms/pages" id="cmsIndicator" v-if="isCmsUser()">CMS</nuxt-link>
    <b-navbar style="justify-content: space-between;">
      <nuxt-link :to="localePath('/')" class="navbar-brand">
        <img id="logo" alt="logo" src="~/assets/logo.svg">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </nuxt-link>

      <Search class="md-hide" />

      <b-navbar-nav class="right-navigation">
        <li class="nav-item lg-hide change-lang" v-if="!$auth.loggedIn && $i18n.locale == 'en'"><a :href="switchLocalePath('ch')" class="nav-link">简体</a></li>
        <li class="nav-item lg-hide change-lang" v-if="!$auth.loggedIn && $i18n.locale == 'ch'"><a :href="switchLocalePath('en')" class="nav-link">English</a></li>

        <b-nav-item href="#" class="lg-hide sign-in" v-if="!$auth.loggedIn" @click="setAuthModalMode(1); $bvModal.show('modal-auth');">{{ $t('log_in') }}</b-nav-item>
        <b-nav-item href="#" class="lg-hide join-now" v-if="!$auth.loggedIn" @click="setAuthModalMode(2); $bvModal.show('modal-auth');">{{ $t('join_now') }}</b-nav-item>

        <li class="nav-item lg-hide" v-if="$auth.loggedIn"><nuxt-link :to="localePath('/lists')" class="nav-link">{{ $t('list') }}</nuxt-link></li>
        <li class="nav-item lg-hide" v-if="$auth.loggedIn"><nuxt-link :to="localePath('/user/downloads')" class="nav-link">{{ $t('downloads') }}</nuxt-link></li>
        <li class="nav-item lg-hide" v-if="$auth.loggedIn"><nuxt-link :to="localePath('/user/quota')" class="nav-link  d-flex" ><b-icon-person></b-icon-person>&nbsp;&nbsp;{{ $auth.user.first_name ?$auth.user.first_name.substring(0,6)+"" :'' }}</nuxt-link></li>

        <li class="nav-item lg-show" v-if="$auth.loggedIn"><nuxt-link :to="localePath('/lists')" class="nav-link"><b-icon-check></b-icon-check></nuxt-link></li>
        <b-nav-item href="#" class="lg-show" v-if="$auth.loggedIn"><nuxt-link :to="localePath('/user/downloads')" class="nav-link"><b-icon-download></b-icon-download></nuxt-link></b-nav-item>

        <b-nav-item-dropdown class="etc" right no-caret>
          <template slot="button-content"><b-icon-three-dots></b-icon-three-dots></template>
          <b-dropdown-item href="#" class="lg-show sign-in" v-if="!$auth.loggedIn" @click="setAuthModalMode(1); $bvModal.show('modal-auth');">{{ $t('log_in') }}</b-dropdown-item>
          <b-dropdown-item href="#" class="lg-show join-now" v-if="!$auth.loggedIn" @click="setAuthModalMode(2); $bvModal.show('modal-auth');">{{ $t('join_now') }}</b-dropdown-item>
          <li class="nav-item lg-show" v-if="$auth.loggedIn"><a :href="localePath('/user/quota')" class="nav-link">{{ $auth.user.first_name }}&nbsp;&nbsp;<b-icon-person></b-icon-person></a></li>

          <li class="nav-item"><a :href="localePath('/about')" class="nav-link">{{ $t('about_us') }}</a></li>
          <li class="nav-item"><a :href="localePath('/contact')" class="nav-link">{{ $t('contact') }}</a></li>
          <li class="nav-item"><a :href="localePath('/legal/terms-of-use')" class="nav-link">{{ $t('legal') }}</a></li>
          <li class="nav-item"><a :href="localePath('/pricing')" class="nav-link">{{ $t('pricing') }}</a></li>
          <li class="nav-item change-lang" v-if="$i18n.locale == 'en' && $auth.loggedIn"><a :href="switchLocalePath('ch')" class="nav-link">简体</a></li>
          <li class="nav-item change-lang" v-if="$i18n.locale == 'ch' && $auth.loggedIn"><a :href="switchLocalePath('en')" class="nav-link">English</a></li>
          <b-dropdown-item href="#" class="log-out" v-if="$auth.loggedIn" @click="logout()">{{ $t('log_out') }}&nbsp;&nbsp;<b-icon-power></b-icon-power></b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  BIconThreeDots,
  BIconPerson,
  BIconPower,
  BIconCheck,
  BIconDownload
} from "bootstrap-vue";
import Search from "~/components/search";

export default {
  components: {
    BIconThreeDots,
    BIconPerson,
    BIconPower,
    BIconCheck,
    BIconDownload,
    Search
  },
  methods: {
    isCmsUser() {
      return this.$auth.loggedIn && (this.$auth.user.role_id == 1 || this.$auth.user.role_id == 2);
    },

    setAuthModalMode(mode) {
      this.$store.commit("authmodal/setMode", mode);
    },

    logout() {
      this.$auth.logout();
      this.$toast.success(this.$t('logged_out_successfully'));
      $nuxt.$emit("logout");

      this.$axios.$get("/app/init").then(response => {
        this.$store.commit("app/setInit", response);
      });
    }
  
  },
  mounted(){
     if (this.$auth.loggedIn) {
       var lang= this.$i18n.locale == 'ch' ? 'zh-CN':'en';
           this.$axios.$patch(`/users/${this.$auth.user.id}/lang-pref`, {'lang':lang})
        .then((response) => {
       console.log(response);
        }).catch((error) => {
     
        });
      }
  }
};
</script>

<style lang="scss">
.component.csheader {
  #cmsIndicator {
    display: block;
    background: $brand;
    color: #fff;
    font-size: 14px;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    font-weight: 700;
  }

  > .navbar {
    max-width: 1280px;
    padding: 2rem 2rem;
    margin: 0 auto;
  }

  #logo {
    height: 65px;
  }

  .right-navigation a {
    color: #000;
    font-weight: 600;
    font-size: 16px;
    margin-left: 10px;
    padding: 3px 12px;
    outline: none;

    &:hover,
    &:active,
    &:focus {
      color: #000;
    }
  }

  .right-navigation > .join-now a {
    color: #fff;
    background-color: $brand;
    border-radius: 30px;
  }

  .right-navigation .etc {
    .dropdown-menu {
      background-color: #fff;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
      border: none;
      border-radius: 5px;
      padding: 10px 8px;
      padding-top: 3;

      li.join-now a {
        color: $brand;
      }

      a {
        color: #4a4a4a;
        font-weight: normal;
        font-size: 16px;

        &:hover,
        &:active,
        &:focus {
          background-color: transparent;
          color: #000;
        }
      }
    }
  }
}

@media screen and (max-width: 1244px) {
  .component.csheader > .navbar {
    padding: 1rem;

    .right-navigation a {
      font-size: 14px;
      margin-left: 5px;
      padding: 3px 8px;
    }
  }

  #logo {
    height: 60px;
  }
}

@media screen and (max-width: 767px) {
  #logo {
    height: 50px;
  }
}
</style>