<template>
  <div class="page exclusive">
    <div class="row">
      <div class="col-md-6">
            <PageInfo :slug="'exclusive'" />
    <br />
    <div class="intro">
      <div class="intro-row">
        <div class="row">
               <div class="col-md-1 col-1">
                 <span class="icon"><i class="fas fa-pen"></i></span>
              </div>
              <div class="col-md-10 col-10 exclusive-desription">
                <span class="text">{{ $t("exclusive_1") }}</span>
              </div>
          </div>
      </div>
      <div class="intro-row">
                <div class="row">
               <div class="col-md-1 col-1 ">
        <span class="icon"><i class="fas fa-key"></i></span>
              </div>
              <div class="col-md-10 col-10 exclusive-desription">
        <span class="text">{{ $t("exclusive_2") }}</span>
              </div>
          </div>
      </div>
      <div class="intro-row">
                      <div class="row">
               <div class="col-md-1 col-1">
        <span class="icon"><i class="fas fa-copyright"></i></span>
              </div>
              <div class="col-md-10 col-10 exclusive-desription">
        <span class="text">{{ $t("exclusive_3") }}</span>
              </div>
          </div>
      </div>
      <div class="intro-row">
                            <div class="row">
               <div class="col-md-1 col-1">
        <span class="icon"><i class="fas fa-fingerprint"></i></span>
              </div>
              <div class="col-md-10 col-10 exclusive-desription">
        <span class="text">{{ $t("exclusive_4") }}</span>
              </div>
          </div>
      </div>
    </div>
    <br />
    <div class="buttons">
      <b-button
        v-if="yourDesignButton"
        @click="checkAndRedirect(localePath('/exclusive/list'))"
        >{{ $t("your_designs") }}</b-button
      >
      <b-button
        @click="
          checkQuota(() => {
            checkAndRedirect(localePath('/exclusive/create'));
          })
        "
        class="primary"
        >{{ $t("order_a_design") }}
        <span v-if="init.quota">({{ init.quota.exclusive }})</span></b-button
      >
    </div>
</div>
      <div class="col-md-6  exclusive-image d-none d-md-block">
        <img class="img-fluid" src="~/assets/static/version_2_C.png"/>

      </div>

      </div>

    <br /><br /><br />

    <div class="price-info" v-if="init.pricing">
      <b-row>
        <b-col md="7">
          <div class="component pageinfo">
            <div class="pageinfo-head">
              <h1 class="pageinfo-title">{{ $t("exclusively") }}</h1>
            </div>
            <p class="description">{{ $t("just_for_you") }}</p>
          </div>
          <br />
          <p class="description">
            {{ $t("exclusive_body") }}
            <b>{{ $t("exclusive_ownership_certificate_bold") }}</b>
          </p>
        </b-col>
       <b-col md="5">
          <div class="plan">
            <div class="title">{{ $t("our_pricing") }}</div>
            <br /><br />
            <div class="buttons ">
              <div class="">
                <b-button
                  class=" mb-2 mr-0"
                  @click="plan.selected = 0"
                  :class="{ active: plan.selected == 0 }"
                >
                  {{ init.pricing.exclusive_min_count }}
                  {{ $t("single_design_exclusive") }}
                </b-button>
              </div>
              <div class="">
                <b-button
                  class=" mb-2 mr-0"
                  @click="plan.selected = 1"
                  :class="{ active: plan.selected == 1 }"
                >
                  {{ init.pricing.exclusive_max_count }}
                  {{ $t("five_designs") }}
                </b-button>
              </div>
            </div>
            <div class="price">
              <p class="large">
                ${{
                  init.pricing[
                    `exclusive_${plan.selected == 0 ? "min" : "max"}_price`
                  ] *
                    init.pricing[
                      `exclusive_${plan.selected == 0 ? "min" : "max"}_count`
                    ]
                }}
              </p>
              <p class="small">
                ${{
                  init.pricing[
                    `exclusive_${plan.selected == 0 ? "min" : "max"}_price`
                  ]
                }}
                / {{ $t("design") }}
              </p>
            </div>
            <div class="btn-buy-container">
              <b-button class="btn-buy" @click="buy">{{
                $t("buy_now")
              }}</b-button>
              <p class="payments-are-made">{{$t('payments_are_made_in_usd')}}
              </p>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>

    <br /><br /><br />

    <div class="why-exclusive">
      <div class="component pageinfo">
        <div class="pageinfo-head">
          <h1 class="pageinfo-title">{{ $t("why_exclusive") }}</h1>
        </div>
        <p class="pageinfo-description">{{ $t("why_exclusive_body") }}</p>
      </div>
      <br />
      <div class="checklist">
        <div>
          <table
            role="table"
            aria-busy="false"
            aria-colcount="3"
            class="table b-table"
          >
            <thead role="rowgroup">
            <tr role="row">
              <th role="columnheader" scope="col" aria-colindex="1">
                <div>&nbsp;</div>
              </th>
              <th role="columnheader" scope="col" aria-colindex="2">
                <div class="standard text-center columnheader d-md-none d-sm-flex">
                  {{ $t("std") }}
                </div>
                <div class="standard text-center columnheader d-none d-md-block">
                  {{ $t("standard") }}
                </div>
              </th>
              <th role="columnheader" scope="col" aria-colindex="3">
                <div class="extended text-center columnheader d-md-none d-sm-flex">
                  {{ $t("ext") }}
                </div>
                <div class="extended text-center columnheader d-none d-md-block">
                  {{ $t("extended") }}
                </div>
              </th>
              <th role="columnheader" scope="col" aria-colindex="4">
                <div class="extended text-center columnheader d-md-none d-sm-flex">
                  {{ $t("exc") }}
                </div>
                <div class="exclusive text-center columnheader d-none d-md-block">
                  {{ $t("exclusive") }}
                </div>
              </th>
            </tr>
            </thead>
            <tbody role="rowgroup">
              <tr role="row">
                <td style="width: 10px;" aria-colindex="1" role="cell">
                  <span>{{ $t("editorial") }}</span>
                </td>
                <td aria-colindex="2" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="4" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t("advertising") }}</span>
                </td>
                <td aria-colindex="2" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="4" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t("web_design") }}</span>
                </td>
                <td aria-colindex="2" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="4" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t("social_media") }}</span>
                </td>
                <td aria-colindex="2" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="4" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t("edit_and_modify") }}</span>
                </td>
                <td aria-colindex="2" role="cell" class="text-center">
                  <b-icon-check class="check"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="4" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t("multi_user") }}</span>
                </td>
                <td aria-colindex="2" role="cell" class="text-center">
                  <b-icon-check class="check"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="4" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t("resale_items") }}</span>
                </td>
                <td aria-colindex="2" role="cell" class="text-center">
                  <b-icon-check class="check"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
                <td aria-colindex="4" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t("tailor_made") }}</span>
                </td>
                <td aria-colindex="2" role="cell" class="text-center">
                  <b-icon-check class="check"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" class="text-center">
                  <b-icon-check class="check"></b-icon-check>
                </td>
                <td aria-colindex="4" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
              <tr role="row">
                <td aria-colindex="1" role="cell">
                  <span>{{ $t("copyright_owned") }}</span>
                </td>
                <td aria-colindex="2" role="cell" class="text-center">
                  <b-icon-check class="check"></b-icon-check>
                </td>
                <td aria-colindex="3" role="cell" class="text-center last-col">
                  <b-icon-check class="check"></b-icon-check>
                </td>
                <td aria-colindex="4" role="cell" class="text-center">
                  <b-icon-check class="check active"></b-icon-check>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PageInfo from "~/components/pageinfo";
import { BIconCheck } from "bootstrap-vue";

export default {
  components: {
    PageInfo,
    BIconCheck
  },
  asyncData(context) {
    return context.$axios.get("/pages/exclusive").then(res => {
      return { pageData: res.data };
    });
  },
  head() {
    return {
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.pageData.meta_description
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.pageData.meta_keywords
        }
      ]
    };
  },
  computed: {
    ...mapState("app", ["init"])
  },
  data() {
    return {
      yourDesignButton: false,

      plan: {
        selected: 1
      }
    };
  },
  mounted() {
    this.checkDesignButton();
    this.$nuxt.$on("login", () => {
      this.checkDesignButton();
    });
  },
  methods: {
    checkDesignButton() {
      if (this.$auth.loggedIn) {
        this.$axios.$get(`/requests/exclusive/check`).then(response => {
          if (
            response.data.length == 0 ||
            Object.keys(response.data).length == 0
          ) {
            this.yourDesignButton = false;
          } else {
            this.yourDesignButton = true;
          }
        });
      } else {
        this.yourDesignButton = false;
      }
    },
    buy() {
      if (!this.$auth.loggedIn) this.$bvModal.show("modal-auth");
      else {
        this.$bvModal.show("modal-payments");
        this.$store.commit("payments/setPackage", {
          key: "exclusive",
          index: this.plan.selected
        });
      }
    },

    checkQuota(callback) {
      if (!this.$auth.loggedIn) this.$bvModal.show("modal-auth");
      else {
        if (this.init.quota["exclusive"] <= 0) {
          // this.$toast.error(this.$t("not_enough_quota"));
          this.buy();
        } else callback();
      }
    },

    checkAndRedirect(url) {
      if (!this.$auth.loggedIn) this.$bvModal.show("modal-auth");
      else this.$router.push(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.page.exclusive {
     .row .exclusive-image{
       @media screen and (max-width: 768px) {
         padding-top: 61px;
       }
       .img-fluid {
         @media screen and (min-width: 1281px) {
    padding: 64px 103px 10px 45px;
         }
 
         @media screen and (min-width: 1024px) and (max-width: 1280px) {
    padding: 64px 103px 10px 45px;
         }
         @media screen and (min-width: 768px) and (max-width: 1023px) {
           padding: 0 40px;
           margin-top: 50px;
         }
       }
      }
  .intro {
    margin-bottom: 20px;
    .intro-row {
           .row .exclusive-desription {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }


      margin: 5px 0;
          margin-bottom: 13px;


      .icon {
        font-size: 40px;
        vertical-align: middle;
        @media screen and (max-width: 768px) {
          font-size: 27px;
        }
      }

      .text {
        margin-left: 20px;
        font-size: 20px;
        color: #666;
        @media screen and (max-width: 768px) {
          font-size: 14px;
        }
      }
    }
  }

  .buttons {
    @media screen and (min-width: 425px) and (max-width: 768px) {
      display: flex;
    }
    button {
      display: inline-block;
      padding: 10px 25px;
      background-color: $black;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 30px;
      margin-right: 20px;
      margin-bottom: 8px;
      // box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
      transition: all 0.2s;
      border: none;
      white-space: nowrap;
      &.primary {
        background-color: $brand;
      }

      &:active {
        box-shadow: none;
      }
      @media screen and (max-width: 768px) {
        font-size: 14px;
        width: 200px;
      }
    }
  }

  .price-info {
    .description {
      font-size: 18px;
      color: $black;
      text-align: justify;
      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }

    .plan {
      width: 100%;
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid $black;
      border-radius: 5px;

      .title {
        text-transform: uppercase;
        font-size: 25px;
        color: $black;
        font-weight: 700;
        text-align: center;
      }

      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          width: 50%;
          margin: 0 10px;
          text-align: center;
        }
        button {
          max-width: 250px;

          border: 1px solid $black;
          border-radius: 30px;
          color: $black;
          background-color: #fff;
          padding: 10px 10px;
          font-weight: 700;
          font-size: 16px;
          outline: none;
          box-shadow: none;
          width: 100%;
          @media screen and (max-width: 768px) {
            font-size: 14px;
            width: 100px;
          }

          &.active {
            background-color: $black;
            color: #fff;
          }
        }
      }

      .price {
        text-align: center;
        margin-top: 25px;

        p {
          margin: 0;
          padding: 0;
        }

        .large {
          font-size: 60px;
          color: #363636;
          font-weight: 600;
          @media screen and (max-width: 768px) {
            font-size: 50px;
          }
        }

        .small {
          font-size: 20px;
          color: $black;
          @media screen and (max-width: 768px) {
            font-size: 16px;
          }
        }
      }

      .btn-buy-container {
        .payments-are-made {
          margin-top: 19px;
          font-size: 13px;
          margin-bottom: 0px;
          @media screen and (max-width: 768px) {
            font-size: 10px;
          }
        }
        text-align: center;
        margin-top: 20px;

        button {
          border: none;
          background: $brand;
          color: #fff;
          padding: 10px;
          width: 150px;
          font-weight: 700;
          outline: none;
          box-shadow: none;
          border-radius: 30px;
          font-size: 16px;

          @media screen and (max-width: 768px) {
            font-size: 14px;
            width: 135px;
          }
        }
      }
    }
  }

  .why-exclusive {
    .checklist {
      border: 1px solid $black;
      padding: 20px;
      border-radius: 5px;
      overflow-y: scroll;
      th,
      td {
        border: none;
      }

      th {
        font-size: 18px;
        @media screen and (max-width: 768px) {
          font-size: 16px;
        }
        @media screen and (max-width: 500px) {
          font-size: 12px;
        }
      }

      td {
        span {
          font-size: 18px;
          font-weight: 600;
          white-space: nowrap;
          @media screen and (max-width: 768px) {
            font-size: 16px;
          }
          @media screen and (max-width: 500px) {
            font-size: 12px;
          }
        }

        .check {
          font-size: 20px;
          color: #666;
          font-weight: 700;

          &.active {
            color: $brand;
          }
        }
      }
    }
  }
}
</style>
