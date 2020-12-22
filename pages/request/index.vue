<template>
  <div class="page request" d-flex>
    <PageInfo :slug="'request'"/>
    <br>
    <div class="buttons">
      <b-button v-if="requestButton" @click="checkAndRedirect(localePath('/request/list'))">{{
          $t('your_requests')
        }}
      </b-button>
      <b-button v-if="requestButton" @click="checkAndRedirect(localePath('/request/create'))" class="primary">
        {{ $t('send_a_request_btn') }}
      </b-button>

    </div>
    <br><br><br>
    <div style="text-align: center" v-if="loading">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    <PageBlocks :blocks="blocks" :changedirection="true" v-if="!loading"/>
  </div>
</template>

<script>
import { mapState } from "vuex";

import PageInfo from "~/components/pageinfo";
import PageBlocks from "~/components/pageblocks";

export default {
  components: {
    PageInfo,
    PageBlocks
  },
  asyncData(context) {
    return context.$axios.get("/pages/request").then(res => {
      return { pageData: res.data };
    });
  },
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageData.translations[this.$i18n.locale]
            .meta_description
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.pageData.translations[this.$i18n.locale].meta_keywords
        }
      ]
    };
  },
  data() {
    return {
      loading: false,
      blocks: [],
      requestButton: false
    };
  },
  computed: {
    ...mapState("app", ["init"])
  },
  methods: {
    toggleLoading() {
      this.loading = !this.loading;
    },
    checkRequestButton() {
      if (this.$auth.loggedIn) {
        this.$axios
          .$get(
            `/requests/collection?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group`
          )
          .then(response => {
            if (response.data.length == 0) {
              this.$store.commit("app/requestButton", { request: false });
              this.requestButton = false;
            } else {
              this.$store.commit("app/requestButton", { request: true });
              this.requestButton = true;
            }
          });
      } else {
        this.requestButton = false;
      }
    },

    loadPageBlocks() {
      this.toggleLoading();
      this.$axios.$get("/pages/request/blocks").then(response => {
        this.toggleLoading();
        this.blocks = response;
      });
    },

    checkAndRedirect(url) {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show("modal-auth");
      } else if (this.$auth.loggedIn && url == "/request/create") {
        this.$axios
          .$get(`/requests/collection/hasPending`)
          .then(response => {
            this.$router.push(url);
          })
          .catch(
            function(error) {
              if (error.response.data.error.code == 4008) {
             this.$toast.error(this.$t('request_per_time'));
              }
            }.bind(this)
          );
      } else {
        this.$router.push(url);
      }
    }
  },
  mounted() {
    this.loadPageBlocks();
    this.checkRequestButton();
  },
  created() {
    this.$nuxt.$on("login", () => {
      this.checkRequestButton();
    });
    this.$nuxt.$on("logout", () => {
      this.checkRequestButton();
    });
  }
};
</script>

<style lang="scss" scoped>
.page.request {
  .buttons {
    button {
      display: inline-block;
      padding: 10px 25px;
      background-color: $black;
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 30px;
      margin-right: 20px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
      transition: all 0.2s;
      border: none;
      text-transform: uppercase;

      &.primary {
        background-color: $brand;
      }

      &:active {
        box-shadow: none;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .page.request {
    .buttons {
      text-align: center;

      a {
        margin: 10px !important;
      }
    }
  }
}
</style>
