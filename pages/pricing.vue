<template>
  <div class="page pricing" v-if="init.pricing">
    <PageInfo :slug="'pricing'"/>
    <br/><br/>
    <b-container>
      <b-row>
        <template v-for="plan in plans">
          <b-col :md="$auth.loggedIn && $auth.user.is_existing_user && plan.package == 'standard' ? '12' : '6' " :key="plan.package" v-if="!($auth.loggedIn && $auth.user.is_existing_user && plan.package == 'extended')">
            <div class="plan">
              <div class="title">{{ $t(plan.title) }}</div>
              <div class="description">
                <div>
                  <p
                          v-for="(desc, $index) in plan.descriptions"
                          :key="`plan_description_${$index}`"
                  >
                    {{ $t(desc) }}
                  </p>
                </div>
              </div>
                    <div class="buttons">
                            <b-button class="mb-2 mr-0" @click="plan.selected = 0"
                                      :class="[{ active: plan.selected == 0 },plan.package=='simulator' || plan.package =='exclusive' ? 'resp' :'']">                                      
                                {{ init.pricing[`${plan.package}_min_count`] }}
                                {{ plan.package =='standard' || plan.package =='extended' ? $t('download') :
                                plan.package=='exclusive'?$t('single_design')
                                :$t('product')}}{{init.pricing[`${plan.package}_min_count`] > 1 ? $i18n.locale == "en" ?
                                "s" : "" : "" }}
                            </b-button>
                            <b-button
                                    class="mb-2 mr-0"
                                    @click="plan.selected = 1"
                                    :class="[{ active: plan.selected == 1 },plan.package=='simulator' || plan.package =='exclusive' ? 'resp' :'']"
                            >
                                {{ init.pricing[`${plan.package}_max_count`] }}
                                {{ plan.package =='standard' || plan.package =='extended' ? $t('download') :
                                plan.package=='exclusive'?  $t('single_design')
                                :$t('product')}}{{init.pricing[`${plan.package}_max_count`] > 1 ? $i18n.locale == "en" ?
                                "s" : "" : "" }}
                            </b-button>
                        </div>
                  <div class="price">
                            <p class="large">
                                ${{
                                init.pricing[
                                `${plan.package}_${
                                plan.selected == 0 ? "min" : "max"
                                }_price`
                                ] *
                                init.pricing[
                                `${plan.package}_${
                                plan.selected == 0 ? "min" : "max"
                                }_count`
                                ]
                                }}
                            </p>
                            <p class="small">
                                ${{
                                init.pricing[
                                `${plan.package}_${
                                plan.selected == 0 ? "min" : "max"
                                }_price`
                                ]
                                }}
                                / {{ plan.package =='standard' || plan.package =='extended' ? $t('download') :
                                plan.package=='exclusive'?$t('single_design') :$t('product')}}
                            </p>
                        </div>
              <div class="btn-buy-container">
                <b-button
                        class="btn-buy"
                        @click="buy(plan.package, plan.selected)"
                >{{ $t("buy") }}
                </b-button
                >
              </div>
            </div>
          </b-col>
        </template>
          <div class="payments-made-in container">
                    <p>
                        {{$t('all_payments_are_to_be')}}<br>
                        {{$t('all_quota_is_to_be')}}
                    </p>

                </div>
      </b-row>
    </b-container>

    <br/><br/>

    <div class="component pageinfo">
      <div class="pageinfo-head">
        <h1 class="pageinfo-title">{{ $t("about_our_licenses") }}</h1>
      </div>
      <p class="pageinfo-description">
        {{ $t("the_type_of_license_deteremines") }}
      </p>
    </div>

    <br/><br/>

    <b-container class="checklist">
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
            <td aria-colindex="1" role="cell">
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
    </b-container>
  </div>
</template>

<script>
    import {mapState} from "vuex";
    import {BIconCheck} from "bootstrap-vue";
    import PageInfo from "~/components/pageinfo";

    export default {
        components: {
            PageInfo,
            BIconCheck
        },
        asyncData(context) {
            return context.$axios.get("/pages/pricing").then(res => {
                return {
                    pageData: res.data
                };
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
        computed: {
            ...mapState("app", ["init"])
        },
        data() {
            return {
                plans: [
                    {
                        title: this.$t("standard_license_pricing"),
                        item: this.$t("item_design"),
                        descriptions: ["jpg_only", "for_editorial_avertising_web"],
                        package: "standard",
                        selected: 1
                    },
                    {
                        title: this.$t("extended_license_pricing"),
                        item: this.$t("item_design"),
                        descriptions: ["jpg_pdf_ai_eps", "for_resale_items_can_edit_modify"],
                        package: "extended",
                        selected: 1
                    },
                    {
                        title: "exclusive_design",
                        item: this.$t("item_request"),
                        descriptions: [
                            "jpg_pdf_ai_eps",
                            "ownership_certificate",
                            "tailor_made_on_request"
                        ],
                        package: "exclusive",
                        selected: 1
                    },
                    {
                        title: "product_simulator",
                        item: this.$t("item_request"),
                        descriptions: ["add_your_own_product_into"],
                        package: "simulator",
                        selected: 1
                    }
                ]
            };
        },
   
        methods: {
            buy(pkg, index) {
                if (!this.$auth.loggedIn) this.$bvModal.show("modal-auth");
                else {
                    this.$bvModal.show("modal-payments");
                    this.$store.commit("payments/setPackage", {
                        key: pkg,
                        index
                    });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
  .page.pricing {
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
        @media screen and (max-width: 768px) {
          font-size: 20px;
        }
      }

      .description {
        height: 100px;
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: center;

        p {
          margin: 0;
          padding: 0;
          text-align: center;
          font-size: 20px;
          color: $black;
          @media screen and (max-width: 768px) {
            font-size: 16px;
          }
        }
      }

      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;

.resp{
  padding-left: 20px;
  padding-right: 20px;
}
        button {
          margin: 0 15px;
          border: 1px solid $black;
          border-radius: 30px;
          color: $black;
          background-color: #fff;
          padding: 10px 35px;
          font-weight: 700;
          font-size: 16px;
          outline: none;
          box-shadow: none;
          @media screen and (max-width: 768px) {
            font-size: 14px;
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
          font-size: 50px;
          color: $black;
          font-weight: 700;
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
        text-align: center;
        margin-top: 20px;

        button {
          border: none;
          background: $brand;
          color: #fff;
          padding: 10px;
          width: 130px;
          font-weight: 700;
          outline: none;
          box-shadow: none;
          border-radius: 30px;
          font-size: 16px;
        }
      }
    }
    .payments-made-in {
      p {
        margin-top: -21px;
        font-size: 13px;
        @media screen and (max-width: 768px) {
          font-size: 11px;
        }
        @media screen and (max-width: 550px) {
          font-size: 10px;
        }
      }
    }
    .checklist {
      border: 1px solid $black;
      padding: 20px;
      border-radius: 5px;
      @media screen and (max-width: 768px) {
        overflow-y: scroll;
      }
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

  @media screen and (max-width: 767px) {
    .page.pricing {
      .plan {
        .title {
          font-size: 20px;
        }

        .description {
          margin: 10px 0;

          p {
            font-size: 16px;
          }
        }

        .buttons {
          button {
            padding: 8px;
            font-size: 14px;
          }
        }

        .price {
          .large {
            font-size: 40px;
          }

          .small {
            font-size: 16px;
          }
        }

        .btn-buy-container {
          text-align: center;
          margin-top: 20px;

          button {
            border: none;
            background: $brand;
            color: #fff;
            padding: 10px;
            font-weight: 700;
            outline: none;
            box-shadow: none;
            border-radius: 30px;
            font-size: 14px;
            width: 115px;
          }
        }
      }

      .checklist {
        th {
          font-size: 12px;
        }

        td {
          span {
            font-size: 12px;
          }
        }
      }
    }
  }

  .buttons {
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
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
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
          @media screen and (max-width: 768px) {
            font-size: 14px;
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
        }

        .small {
          font-size: 20px;
          color: $black;
        }
      }

      .btn-buy-container {
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

  @media screen and (max-width: 992px) and (min-width: 768px) {
    .buttons {
      button {
        width: 107px;
        text-align: center;
        align-items: center;
        justify-content: center;
        display: flex;
      }
    }
  }
</style>
