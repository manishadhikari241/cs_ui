<template>
  <div class="component design">
    <b-container v-if="design">
      <b-row>
        <b-col md="5">
          <DesignSlider :id="'designSliderBase'" :designCode="design.code" />
          <br>
        </b-col>
        <b-col md="7">
          <b-container class="details">
            <div class="details-row">
              <div class="prop">
                <p class="large-text" style="text-transform: capitalize">{{ $t('design') }}</p>
              </div>
              <div class="value">
                <div class="large-text">
                  <span>{{ design.design_name }}</span>
                  <nuxt-link :to="localePath('/designs?keyword=Top%20100')" class="top100" v-if="isTop()">{{ $t('top_100') }}</nuxt-link>
                </div>
              </div>
            </div>
            <div class="details-row">
              <div class="prop">
                <p class="large-text">{{ $t('license') }}</p>
                <b-button class="small-text" :id="`design-page-${design.id}-learn-more-btn`" v-if="design.licence_type != 'exclusive'">{{ $t('learn_more') }}</b-button>
                <LicensePopover :target="`design-page-${design.id}-learn-more-btn`" :selected="choice" v-if="design.licence_type != 'exclusive'" />
              </div>
              <div class="value" v-if="design.licence_type == 'exclusive'">
                <div :class="`choice flex active`">
                  <div class="choice-details">
                    <p class="title">{{ $t('exclusive_ownership') }}</p>
                    <p class="detail">{{ getSupportedFiles() }}</p>
                    <p class="detail">{{ $t('all_copyright_belongs_to_you') }}</p>
                  </div>
                </div>
              </div>
              <div class="value" v-else>
                <div :class="`choice flex${choice === 1 ? ' active' : ''}`" @click="changeChoice(1)">
                  <div class="choice-icon">
                    <b-icon-circle v-show="choice !== 1"></b-icon-circle>
                    <b-icon-circle-fill v-show="choice === 1"></b-icon-circle-fill>
                  </div>
                  <div class="choice-details">
                    <p class="title">{{ $t('standard') }}{{ init.quota ? ` (${init.quota.standard})` : '' }}</p>
                    <p class="detail">{{ $t('jpg_only') }}</p>
                    <p class="detail">{{ $t('for_editorial_avertising_web') }}</p>
                  </div>
                </div>
                <br>
                <div :class="`choice flex${choice === 2 ? ' active' : ''}`" @click="changeChoice(2)">
                  <div class="choice-icon">
                    <b-icon-circle v-show="choice !== 2"></b-icon-circle>
                    <b-icon-circle-fill v-show="choice === 2"></b-icon-circle-fill>
                  </div>
                  <div class="choice-details">
                    <p class="title">{{ $t('extended') }}{{ init.quota ? ` (${init.quota.extended})` : '' }}</p>
                    <p class="detail">{{ getSupportedFiles() }}</p>
                    <p class="detail">{{ $t('for_resale_items_can_edit_modify') }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="details-row action-buttons-row">
              <div class="prop md-hide">
                <p class="large-text">&nbsp;</p>
              </div>
              <div class="value">
                <div class="action-buttons">
                  <DownloadBTN :code="design.code" :pkg="'exclusive'" :className="'btn-download'" :text="$t('download')" v-if="design.licence_type == 'exclusive'" />
                  <DownloadBTN :code="design.code" :pkg="`${choice == 1 ? 'standard' : 'extended'}`" :className="'btn-download'" :text="$t('download')" v-else />
                  <b-button class="btn-add-to-list" :id="`design-page-${design.id}-list-btn`" @click="checkList"><b-icon-check></b-icon-check>&nbsp;&nbsp;{{ $t('add_to_list') }}</b-button>
                  <ListsPopover :design="design" :target="`design-page-${design.id}-list-btn`" />
                </div>
              </div>
            </div>
            <div class="details-row" v-if="design.licence_type != 'exclusive'">
              <div class="prop">
                <p class="large-text">{{ $t('related') }}</p>
              </div>
              <div class="value">
                <div class="related-tags">
                  <a v-for="(tag, $index) in design.tags" :key="tag.id" @click="searchKeyword(translateTag(tag))">{{ translateTag(tag) }}{{ design.tags.length > $index+1 ? ', ' : '' }}</a>
                </div>
              </div>
            </div>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DesignSlider from '~/components/designslider'
import ListsPopover from '~/components/popovers/lists'
import {BIconCircle, BIconCircleFill, BIconCheck} from 'bootstrap-vue'
import LicensePopover from '~/components/popovers/license'
import DownloadBTN from '~/components/download'

export default {
  props: [
    'design'
  ],
  components: {
    DesignSlider,
    BIconCircle,
    BIconCircleFill,
    BIconCheck,
    ListsPopover,
    LicensePopover,
    DownloadBTN
  },
  computed: {
    ...mapState('app', ['init'])
  },
  data() {
    return {
      choice: 1
    }
  },
  methods: {
    changeChoice(choice) {
      this.choice = choice;
    },

    getSupportedFiles() {
      let files = [];
      if (this.design.has_jpg) files.push('JPG');
      if (this.design.has_pdf) files.push('PDF');
      if (this.design.has_ai) files.push('Ai');
      if (this.design.has_eps) files.push('EPS');
      if (this.design.has_psd) files.push('PSD');
      return files.join(', ');
    },

    searchKeyword(keyword) {
      this.$store.dispatch('search/search', {searchDesigns: true, term: keyword, localePathFunction: this.localePath});
    },

    isTop() {
      return this.design.pseudo_downloads >= this.init.top100;
    },

    checkList() {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show('modal-auth');
      }
    },

    translateTag(tag) {
      if (this.$i18n.locale == 'en')
        return tag.translations[0].name;
      
      return tag.translations[1] ? tag.translations[1].name : tag.translations[0].name;
    }
  }
}
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
        margin: 0;
        padding: 0;
        font-size: 25px;
        font-weight: 600;
      }

      .prop {
        width: 200px;

        .small-text {
          color: inherit;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
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
          margin-left: 20px;
          display: inline-block;
          border: 1px solid $black;
          color: $black;
          text-decoration: none;
          font-size: 16px;
          border-radius: 30px;
          padding: 5px 30px;
          font-weight: 700;
          transition: all .2s;

          &:active {
            box-shadow: inset 0 0 10px rgba(0, 0, 0, .5);
          }
        }

        .choice {
          padding-top: 10px;
          cursor: pointer;
          opacity: .5;
          transition: all .2s;

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
            .title {
              margin: 0;
              padding: 0;
              font-size: 20px;
              font-weight: 700;
              text-transform: uppercase;
            }

            .detail {
              margin: 5px 0 0 0;
              padding: 0;
              font-size: 18px;
            }
          }
        }

        .action-buttons {
          white-space: nowrap;

          .btn-download {
            width: 180px;
            border: none;
            border-radius: 30px;
            background: $brand;
            color: #fff;
            font-size: 18px;
            font-weight: 700;
            padding: 10px 0;
            text-transform: uppercase;
            box-shadow: 0 7px 10px rgba(0, 0, 0, .5);
            transition: all .2s;

            &:active {
              box-shadow: none;
            }
          }

          .btn-add-to-list {
            width: 180px;
            margin-left: 15px;
            border: 1px solid $black;
            border-radius: 30px;
            background: #fff;
            color: $black;
            font-size: 18px;
            font-weight: 700;
            padding: 8px 0;
            text-transform: uppercase;
            transition: all .2s;

            &:active {
              box-shadow: inset 0 0 10px rgba(0, 0, 0, .5);
            }
          }
        }

        .related-tags {
          padding-top: 7px;
          max-width: 400px;
          
          a {
            font-size: 16px;
            color: $black;
            text-transform: capitalize;
            text-decoration: none;
            opacity: .8;
            transition: opacity .2s;
            cursor: pointer;

            &:hover {
              opacity: 1;
            }
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
            font-size: 12px;
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