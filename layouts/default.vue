<template>
  <div id="app-container">
    <div id="app-content-wrapper">
      <CSHeader class="ignorePrint" />
      <CSNavigation class="ignorePrint" />
      <BTT class="ignorePrint" />
      <ListBoard v-if="$auth.loggedIn" v-show="displayListBoard" />
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
import ListBoard from "~/components/listboard";
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
    ListBoard,
    CSFooter,
    AuthModal,
    PaymentsModal,
    QuotaModal
  },
  data() {
    return {
      displayListBoard: false
    };
  },
  methods: {
    init() {
      this.$axios.$get("/app/init").then(response => {
        this.$store.commit("app/setInit", response);
      });
    },

    checkListBoardDisplay() {
      var listRoutes = [
        "lists___en",
        "lists___ch",
        "lists-id___en",
        "lists-id___ch"
      ];
      this.displayListBoard = listRoutes.indexOf(this.$route.name) !== -1;
    }
  },

  watch: {
    $route() {
      this.checkListBoardDisplay();
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.init();
      this.checkListBoardDisplay();
      if (
        this.$auth.loggedIn &&
        (typeof this.$auth.user != "object" ||
          !("first_name" in this.$auth.user))
      ) {
        this.$auth.logout();
      }
    });

    if (this.$route.query.ERROR) {
      this.$toast.error(this.$route.query.ERROR);
    } else if (this.$route.query.AP == 1) {
      this.$bvModal.show("modal-quota");
    }
  },

  created() {
    this.$nuxt.$on("login", () => {
      this.init();
    });

    this.$nuxt.$on("logout", () => {
      this.$nextTick(() => {
        setTimeout(() => {
          window.location.href = this.localePath('/');
        }, 500);
      });
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

/* .pagecontainer {
  width: 1200px;
  margin: 50px auto 0;
  @media screen and (max-width: 1220px) {
    width: 90%;
    padding: 0 20px;
  }
  @media screen and (max-width: 767px) {
    width: 98%;
    padding: 0 20px;
}
} */

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
  .page {
    width: 98%;
    padding: 0 20px;
  }
}

@media print {
  .ignorePrint {
    display: none !important;
  }
}
@media only screen and (max-width: 600px){
.toasted-container.bottom-left .toasted, .toasted-container.bottom-right .toasted, .toasted-container.top-left .toasted, .toasted-container.top-right .toasted {
    display: flex;
    justify-content: center;
    float:none;
}
}

</style>
