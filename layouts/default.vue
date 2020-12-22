<template>
  <div id="app-container">
    <div id="app-content-wrapper">
      <CSHeader class="ignorePrint" />
      <CSNavigation class="ignorePrint" />
      <BTT class="ignorePrint" />
      <nuxt />
    </div>
    <CSFooter />

    <!-- Modals -->
    <AuthModal v-if="!$auth.loggedIn" />
    <PaymentsModal v-if="$auth.loggedIn" />
    <QuotaModal v-if="$auth.loggedIn" />
  </div>
</template>

<script>
import CSHeader from "~/components/csheader";
import CSNavigation from "~/components/csnavigation";
import BTT from "~/components/backtotop";
import CSFooter from "~/components/csfooter";
import AuthModal from "~/components/modals/auth";
import PaymentsModal from "~/components/modals/payments";
import QuotaModal from "~/components/modals/quota";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

export default {
  components: {
    CSHeader,
    CSNavigation,
    BTT,
    CSFooter,
    AuthModal,
    PaymentsModal,
    QuotaModal
  },
  methods: {
    init() {
      this.$axios.$get("/app/init").then(response => {
        this.$store.commit("app/setInit", response);
      });
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.init();
      if (
        this.$auth.loggedIn &&
        (typeof this.$auth.user != "object" ||
          !("first_name" in this.$auth.user))
      ) {
        this.$auth.logout();
      }
    });
  }
};
</script>

<style>
html,
body {
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1rem;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

#app-container {
  position: relative;
  min-height: 100vh;
}

#app-content-wrapper {
  padding-bottom: 100px;
}

.page {
  width: 1200px;
  margin: 50px auto 0;
}

@media screen and (max-width: 1220px) {
  .page {
    width: 90%;
    padding: 0 20px;
  }
}

@media screen and (min-width: 1030px) {
  .lg-show {
    display: none;
  }
}

@media screen and (max-width: 1030px) {
  .lg-hide {
    display: none;
  }
}
@media screen and (max-width: 1219px) {
  .lg-hide {
    display: none;
  }
}

@media screen and (min-width: 767px) {
  .md-show {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .md-hide {
    display: none;
  }
}

@media print {
  .ignorePrint {
    display: none !important;
  }
}
</style>
