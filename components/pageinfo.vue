<template>
  <div class="component pageinfo">
    <div class="pageinfo-head">
      <h1 class="pageinfo-title" v-if="pageInfo">
        {{ pageInfo.translations[$i18n.locale].info_title }}
      </h1>
      <b-button
        class="action-btn"
        v-if="button"
        :id="buttonId"
        v-show="pageInfo"
        >{{ button }}</b-button
      >
    </div>
    <div class="d-flex description">
      <p
        class="pageinfo-description"
        v-if="pageInfo"
        v-html="pageInfo.translations[$i18n.locale].info_body"
      ></p>
      <b-button
        v-if="requestButton && routeCheck"
        @click="checkAndRedirect(localePath('/request/create'))"
        class="primary"
        >{{ $t("send_a_request_btn") }}</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["slug", "button", "buttonId"],
  data() {
    return {
      pageInfo: null,
      requestButton: false,
      routeCheck:
        this.$router.history.current.path == "/request" ||
        this.$router.history.current.path == "/ch/request"
          ? true
          : false
    };
  },
  methods: {
    load() {
      this.$axios.$get(`/pages/${this.slug}`).then(res => {
        this.pageInfo = res;
      });
    },

    checkAndRedirect(url) {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show("modal-auth");
      } else {
        this.$router.push(url);
      }
    },

    checkRequestButton() {
      if (this.$auth.loggedIn) {
        this.$axios
          .$get(
            `/requests/collection?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group`
          )
          .then(response => {
            console.log(response);
            if (
              response.data.length == 0 ||
              Object.keys(response.data).length == 0
            ) {
              this.requestButton = true;
            } else {
              this.requestButton = false;
            }
          });
      } else {
        this.requestButton = true;
      }
    }
  },

  created() {
    this.checkRequestButton();
    this.$nuxt.$on("login", () => {
      this.checkRequestButton();
    });
    this.$nuxt.$on("logout", () => {
      this.checkRequestButton();
    });
  },

  mounted() {
    console.log(this.$router.history.current.path);
    this.$nextTick(() => {
      this.load();
    });
  }
};
</script>

<style lang="scss">
.component.pageinfo {
  .pageinfo-head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .action-btn {
      border-radius: 30px;
      background-color: #000;
      color: #fff;
      width: 200px;
      height: 35px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 0;

      &.join-now-btn {
        background-color: $brand;
        border: none;
      }
    }
  }

  .description button {
    display: inline-block;
    padding: 10px 25px;
    background-color: #0e8dde;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    text-decoration: none;
    border-radius: 30px;
    /* margin-right: 20px; */
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
    transition: all 0.2s;
    border: none;
    margin: auto;
    /* width: 50%; */
    /* height: 55px; */
    margin-left: 38px;
  }

  .pageinfo-title {
    font-weight: 700;
    font-size: 50px;
  }

  .pageinfo-description {
    max-width: 65%;
    margin: 0;
    padding: 0;
    color: #bbb;
    font-size: 20px;
    br {
      display: none;
    }

    a {
      color: #000 !important;
      font-weight: 700;
      text-decoration: none;
      display: inline-block;
    }
  }
}

@media screen and (max-width: 768px) {
  .component.pageinfo {
    .pageinfo-head {
      display: block;
      text-align: center;

      .action-btn {
        margin: 10px 0 20px;
      }
    }

    .pageinfo-title {
      font-size: 30px;
      // white-space: break-spaces;
    }

    .pageinfo-description {
      font-size: 20px;
      max-width: 100%;
    }
  }
}
</style>
