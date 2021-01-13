<template>
  <div class="component design">
    <b-container class="pr-0 pl-0" v-if="design" >
      <b-row>
        <b-col md="5">
          <DesignSlider :designCode="design.code" />
          <br />
        </b-col>
        <b-col md="7">
          <b-container class="details">
            <!-- <div class="details-row ">
              <div class="prop">
                <p class="large-text" style="text-transform: capitalize">{{ $t('design') }}</p>
              </div>
              <div class="value">
                <div class="large-text">
                  <span>{{ design.design_name }}</span>
                  <nuxt-link :to="localePath('/designs?keyword=Top%20100')" class="top100" v-if="isTop()">{{ $t('top_100') }}</nuxt-link>
                </div>
              </div>
            </div> -->
            <div class="details-row row">
              <div class="prop col-md-4">
                <p class="large-text" style="text-transform: capitalize">
                  {{ $t("design") }}
                </p>
              </div>
              <div class="value col-md-8">
                <div class="large-text">
                  <span>{{ design.design_name }}</span>
                  <nuxt-link
                    :to="localePath('/designs?keyword=new')"
                    class="top100"
                    v-if="isNew()"
                  >{{ $t("new") }}</nuxt-link
                  >
                  <nuxt-link
                    :to="localePath('/designs?keyword=new')"
                    class="top100"
                    v-if="isNew()"
                  >{{ $t("top_100") }}</nuxt-link
                  >
                  <nuxt-link
                    :to="localePath('/designs?keyword=Top%20100')"
                    class="top100"
                    v-if="isTop()"
                  >{{ $t("top_100") }}</nuxt-link
                  >
                </div>
              </div>
            </div>
            <div class="details-row row">
              <div class="prop col-md-4">
                <p class="large-text">{{ $t("license") }}</p>
                <b-button
                  class="small-text"
                  :id="`design-page-${design.id}-learn-more-btn`"
                  v-if="design.licence_type != 'exclusive'"
                  >{{ $t("learn_more") }}</b-button
                >
                <LicensePopover
                  :target="`design-page-${design.id}-learn-more-btn`"
                  :selected="choice"
                  v-if="design.licence_type != 'exclusive'"
                />
              </div>
              <div
                class="value col-md-8"
                v-if="design.licence_type == 'exclusive'"
              >
                <div :class="`choice flex active`">
                  <div class="choice-details">
                    <p class="title">{{ $t("exclusive_ownership") }}</p>
                    <p class="detail">{{ getSupportedFiles() }}</p>
                    <p class="detail">
                      {{ $t("all_copyright_belongs_to_you") }}
                    </p>
                    <p @click="showCert(design)" class="h5 cert"><b-icon-file-earmark-arrow-down></b-icon-file-earmark-arrow-down><u class="ml-2">Ownership Certificate</u></p>
                  </div>
                </div>
              </div>
              <div class="value col-md-8" v-else>
                <div
                  :class="`choice flex${choice === 1 ? ' active' : ''}`"
                  @click="changeChoice(1)"
                >
                  <div class="choice-icon">
                    <b-icon-circle v-show="choice !== 1"></b-icon-circle>
                    <b-icon-circle-fill
                      v-show="choice === 1"
                    ></b-icon-circle-fill>
                  </div>
                  <div class="choice-details">
                    <p class="title">
                      {{ $t("standard")
                      }}{{ init.quota ? ` (${init.quota.standard})` : "" }}
                    </p>
                    <p class="detail">{{ $t("jpg_only") }}</p>
                    <p class="detail">
                      {{ $t("for_editorial_avertising_web") }}
                    </p>
                  </div>
                </div>
                <br />
                <div
                  :class="`choice flex${choice === 2 ? ' active' : ''}`"
                  @click="changeChoice(2)"
                >
                  <div class="choice-icon">
                    <b-icon-circle v-show="choice !== 2"></b-icon-circle>
                    <b-icon-circle-fill
                      v-show="choice === 2"
                    ></b-icon-circle-fill>
                  </div>
                  <div class="choice-details">
                    <p class="title" v-if="$auth.loggedIn && $auth.user.is_existing_user">
                      {{ $t("extended")}}{{ init.quota ? ` (${init.plan_quota})` : "" }}
                    </p>
                    <p class="title" v-else>
                      {{ $t("extended")}}{{ init.quota ? ` (${init.quota.extended})` : "" }}
                    </p>
                    <p class="detail">{{ getSupportedFiles() }}</p>
                    <p class="detail">
                      {{ $t("for_resale_items_can_edit_modify") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="details-row action-buttons-row row">
              <div class="prop md-hide col-md-4">
                <p class="large-text">&nbsp;</p>
              </div>
              <div class="value col-md-8">
                <div class="action-buttons">
                  <DownloadBTN
                    :code="design.code"
                    :pkg="'exclusive'"
                    :className="'btn-download'"
                    :text="this.$i18n.locale == 'en' ? $t('download') : $t('download').slice(-2)"
                    v-if="design.licence_type == 'exclusive'"
                  />
                  <DownloadBTN
                    :code="design.code"
                    :pkg="`${choice == 1 ? 'standard' : 'extended'}`"
                    :className="'btn-download'"
                    :text="this.$i18n.locale == 'en' ? $t('download') : $t('download').slice(-2)"
                    v-else
                  />
                  <b-button
                    class="btn-add-to-list"
                    :id="`design-page-${design.id}-list-btn`"
                    @click="checkList"
                    ><b-icon-check></b-icon-check>&nbsp;&nbsp;{{
                      $t("add_to_list")
                    }}</b-button
                  >
                  <ListsPopover
                    :design="design"
                    :target="`design-page-${design.id}-list-btn`"
                  />
                </div>
              </div>
            </div>
            <div class="details-row" v-if="design.licence_type != 'exclusive'">
              <div class="prop">
                <p class="large-text">{{ $t("related") }}</p>
              </div>
              <div class="value">
                <div class="related-tags">
                  <a
                    v-for="(tag, $index) in design.tags"
                    :key="tag.id"
                    @click="searchKeyword(translateTag(tag))"
                    >{{ translateTag(tag)
                    }}{{ design.tags.length > $index + 1 ? ", " : "" }}</a
                  >
                </div>
              </div>
            </div>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
    <CertificateModal :cert="certInfo"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DesignSlider from "~/components/designslider";
import ListsPopover from "~/components/popovers/lists";
import { BIconCircle, BIconCircleFill, BIconCheck, BIconFileEarmarkArrowDown } from "bootstrap-vue";
import LicensePopover from "~/components/popovers/license";
import DownloadBTN from "~/components/download";
import CertificateModal from "~/components/modals/certificate";

export default {
  props: ["design"],
  components: {
    DesignSlider,
    BIconCircle,
    BIconCircleFill,
    BIconCheck,
    BIconFileEarmarkArrowDown,
    ListsPopover,
    LicensePopover,
    DownloadBTN,
    CertificateModal
  },
  computed: {
    ...mapState("app", ["init"])
  },
  data() {
    return {
      choice: 1,
      certInfo: {}
    };
  },
  methods: {
    changeChoice(choice) {
      this.choice = choice;
    },

    getSupportedFiles() {
      let files = [];
      if (this.design.has_jpg) files.push("JPG");
      if (this.design.has_pdf) files.push("PDF");
      if (this.design.has_ai) files.push("Ai");
      if (this.design.has_eps) files.push("EPS");
      if (this.design.has_psd) files.push("PSD");
      return files.join(", ");
    },

    searchKeyword(keyword) {
      this.$store.dispatch("search/search", {
        searchDesigns: true,
        term: keyword,
        localePathFunction: this.localePath
      });
    },

    isNew() {
      return this.$moment().subtract(1, 'month') < this.$moment(this.design.published_at)
    },

    isTop() {
      return this.design.pseudo_downloads >= this.init.top100;
    },

    checkList() {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show("modal-auth");
      }
    },

    translateTag(tag) {
      if (this.$i18n.locale == "en") return tag.translations[0].name;

      return tag.translations[1]
        ? tag.translations[1].name
        : tag.translations[0].name;
    },

    showCert(design) {
      const certInfo = {}
      certInfo.img = `/api/v1/image/thumbnail/design/${design.code}/tiny`
      certInfo.design = design.design_name
      certInfo.delivery_date = design.approved_at
      certInfo.first_name = this.$auth.user.first_name
      certInfo.last_name = this.$auth.user.last_name
      certInfo.company = this.$auth.user.company
      certInfo.email = this.$auth.user.email

      this.$axios.$get('/addresses').then(response => {
        if (response.length) {
          response.forEach(address => {
            if (address.is_default) {
              certInfo.address1 = address.address1
              certInfo.address2 = address.address2
              certInfo.post_code = address.post_code
              certInfo.city = address.city
              certInfo.country = address.country
              this.certInfo = certInfo
            }
          })
        }
      })
      this.$bvModal.show("modal-certificate");
    }
  }
};
</script>

<style lang="scss" scoped>
.component.design {
  .flex {
    display: flex;
  }

  .details {
    color: $black;

    .details-row {
      display: flex;
      margin-bottom: 30px;

      .large-text {
        @media screen and (min-width: 768px) and (max-width: 1439px) {
          font-size: 16.5px;
          display: flex;
        }
        margin: 0;
        padding: 0;
        font-size: 20px;
        font-weight: 600;
      }

      .prop {
        width: 200px;

        .small-text {
          color: inherit;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          @media screen and (max-width: 1023px) {
            text-align: left;
            font-size: 9px;
          }

        }

        button.small-text {
          border: none;
          background: transparent;
          margin: 0;
          padding: 0;
          outline: none;
          text-decoration: none;
          box-shadow: none;
        }
      }

      .value {
        .top100 {
          margin-left: 10px;
          display: inline-block;
          border: 1px solid $black;
          color: $black;
          text-decoration: none;
          font-size: 16px;
          border-radius: 30px;
          padding: 5px 20px;
          font-weight: 700;
          transition: all 0.2s;

          &:active {
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
          }

          @media screen and (max-width: 1023px) {
            font-size: 10px;
            padding: 5px 10px;
            white-space: nowrap;
          }
        }

        .choice {
          //padding-top: 10px;
          cursor: pointer;
          opacity: 0.5;
          transition: all 0.2s;

          &.active {
            opacity: 1;
          }

          &:hover {
            opacity: 1;
          }

          .choice-icon {
            padding-right: 15px;
            font-size: 20px;
            font-weight: 600;
          }

          .choice-details {
            @media screen and (max-width: 1023px) {
              font-size: 14px;
            }
            .title {
              @media screen and (max-width: 1023px) {
                font-size: 14px;
              }
              margin: 0;
              padding: 0;
              font-size: 20px;
              font-weight: 700;
            }

            .detail {
              @media screen and (max-width: 1023px) {
                font-size: 14px;
              }
              margin: 5px 0 0 0;
              padding: 0;
              font-size: 18px;
            }
          }
        }

        .action-buttons {

          @media screen and (min-width: 1024px) {
            width: 360px;
            display: flex;
          }

            // white-space: nowrap;

          .btn-download {
            width: 180px;

            margin-right: 15px;
            border: none;
            border-radius: 30px;
            background: $brand;
            color: #fff;
            font-size: 16px;
            font-weight: 700;
            padding: 10px 0;
            text-transform: uppercase;
            box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
            transition: all 0.2s;

            &:active {
              box-shadow: none;
            }
            @media screen and (max-width: 1023px) {
              font-size: 14px;
              margin-bottom: 14px;
            }
            }

          .btn-add-to-list {
            @media screen and (max-width: 1023px) {
              font-size: 14px;
            }
            width: 180px;

            border: 1px solid $black;
            border-radius: 30px;
            background: #fff;
            color: $black;
            font-size: 16px;
            font-weight: 700;
            padding: 8px 0;
            text-transform: uppercase;
            transition: all 0.2s;
            box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
            &:active {
              box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
            }
          }
        }

        .related-tags {
          /*padding-top: 7px;*/
          max-width: 400px;

          a {
            @media screen and (max-width: 1023px) {
              font-size: 14px;
              padding-left: 10px;
            }
            font-size: 16px;
            color: $black;
            text-transform: capitalize;
            text-decoration: none;
            opacity: 0.8;
            transition: opacity 0.2s;
            cursor: pointer;

            &:hover {
              opacity: 1;
            }
          }
        }

        .cert {
          margin-top: 40px;
          margin-bottom: 30px;
          @media screen and (max-width: 1023px) {
            font-size: 14px;
            margin-top: 20px;
            margin-bottom: 15px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .component.design {
    .details {
      .details-row {
        .large-text {
          font-size: 18px;
          font-weight: 400;
        }

        &.action-buttons-row {
          .value {
            width: 100%;
          }
        }

        .prop {
          width: 150px;

          .small-text {
            font-weight: 600;
            font-size: 10px;
          }
        }

        .value {
          .top100 {
            font-size: 14px;
            padding: 5px 20px;
          }

          .choice {
            .choice-icon {
              font-size: 16px;
            }

            .choice-details {
              .title {
                font-size: 16px;
              }

              .detail {
                font-size: 14px;
              }
            }
          }

          .action-buttons {
            button {
              display: block;
              width: 100% !important;
            }

            .btn-add-to-list {
              margin-left: 0;
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
