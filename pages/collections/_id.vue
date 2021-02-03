<template>
  <div class="page collection">
    <div v-if="!data" style="text-align: center"><b-spinner type="grow" label="Spinning"></b-spinner></div>
    <client-only>
      <div v-if="data">
        <div class="go-back">
          <button @click="goBack"><b-icon-chevron-left></b-icon-chevron-left> {{ $t('back') }}</button>
        </div>

          <b-row>
            <b-col sm="6" class="description-col order-1">
              <div class="basic">
                <div class="designer">
                  <div class="designer-avatar">
                    <img v-if="data.user.avatar" :src="`/cloudfront/uploads/user/${parseDesignerAvatarURL()}`">
                  </div>
                  <div class="name-published">
                    <p class="designer-name">{{ data.user.first_name }}</p>
                    <p class="published-date">{{ $moment(data.published_at).format('DD/MM/YYYY') }}</p>
                  </div>
                </div>
                <h2 class="title">{{ getTitle() }}</h2>
                <div class="properties">
                  <div>
                    <span class="prop">{{ $t('category') }}: </span>
                    <span v-for="(category, $index) in data.categories" :key="category.id">{{ category.translations[$i18n.locale == 'en' ? 0 : 1].name }}{{ data.categories.length-1 > $index ? ', ' : '' }}</span>
                  </div>
                  <div>
                    <span class="prop">{{ $t('apply_on') }}: </span>
                    <span v-for="(good, $index) in data.goods" :key="good.id">{{ good.translations[$i18n.locale == 'en' ? 0 : 1].name }}{{ data.goods.length-1 > $index ? ', ' : '' }}</span>
                  </div>
                </div>
                <div class="description" v-html="getDescription()"></div>
              </div>
            </b-col>
            <b-col sm="6" class="moodboard-col">
              <div v-if="hasMoodBoard()">
                <img :src="`/cloudfront/uploads/lib/feed/moodboard${getMoodBoardURL()}`">
                <p class="disclaimer">{{ $t('collections_disclaimer') }}</p>
              </div>
            </b-col>
          </b-row>

        <div class="designs">
          <h3 class="title">{{ $t('design_collection') }}</h3>
                <div class="sub-title">
 
  <b-tabs content-class="mt-3" align="left">
    <b-tab @click="switchMode('1')" :title="$t('view_by_design')" active>
        <DesignList v-if="mode==1" :designs="data.designs" />
    </b-tab>
     </b-tab>
      <b-tab disabled :title="'|'">
    </b-tab>
    <b-tab @click="switchMode('2')" :title="$t('view_by_product')">
                      <DesignList v-if="mode==2" :goods="data.byProduct" :isGoods="true" :designs="data.designs" />
      </b-tab>
  </b-tabs>
</div>

          <br>
          <!-- {{data.designs}} -->
    
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { BIconChevronLeft } from "bootstrap-vue";
import DesignList from "~/components/designlist";

export default {
  components: {
    BIconChevronLeft,
    DesignList
  },
  asyncData(context) {
    return context.$axios.get("/pages/collections").then(res => {
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
      data: null,
      mode:1
    };
  },
  methods: {
    switchMode(mode){
$nuxt.$emit('closequick');
this.mode=mode;
    },
    load() {
      this.$axios
        .$get(
          `/collections/${
            this.$route.params.id
          }?scope[]=user&scope[]=designs&scope[]=moodboards&scope[]=categories&scope[]=goods&scope[]=season`
        )
        .then(response => {
          this.data = response;
        })
        .catch(error => {
          this.$toast.error(error.response.data.error.message);
          setTimeout(() => {
            this.$router.push(this.localePath("/collections"));
          }, 1000);
        });
    },

    hasMoodBoard() {
      return this.data.moodboards.length;
    },

    getMoodBoardURL() {
      if (this.data.moodboards.length == 1 || this.$i18n.locale == "en")
        return this.data.moodboards[0].moodboard;
      return this.data.moodboards[1].moodboard;
    },

    hasDesigns() {
      return this.data.designs.length;
    },

    parseDesignerAvatarURL() {
      let avatar = this.data.user.avatar;
      return avatar.substring(avatar.lastIndexOf("/") + 1);
    },

    getTitle() {
      return this.data.translations[this.$i18n.locale == "en" ? 0 : 1].title;
    },

    getDescription() {
      return this.data.translations[this.$i18n.locale == "en" ? 0 : 1]
        .description;
    },

    goBack() {
      this.$router.back();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  }
};
</script>

<style lang="scss" scoped>
.page.collection {
  .container {
    max-width: 100% !important;
  }

  .go-back {
    margin-bottom: 35px;

    button {
      outline: none;
      background: none;
      border: 1px solid #000;
      border-radius: 30px;
      padding: 5px 30px;
      color: #363636;
      font-weight: 700;
      text-decoration: none;
      @media screen and (max-width: 1024px) {
        font-size: 12.75px;
      }

      svg {
        position: relative;
        left: -10px;
      }
    }
  }

  & > .container {
    margin: 0;
    padding: 0;
    max-width: 100% !important;
  }

  .moodboard-col {
    img {
      max-width: 100%;
      pointer-events: none;
    }

    .disclaimer {
      margin: 0;
      padding: 0;
      font-size: 12px;
      color: #969696;
      @media screen and (max-width: 768px) {
        font-size: 9px;
      }
    }
  }

  .description-col {
    display: flex;
    flex-direction: column;

    .basic {
      flex-grow: 1;
    }

    .designer {
      display: flex;
      align-items: center;

      .designer-avatar {
        border-radius: 50%;
        overflow: hidden;

        img {
          width: 65px;
          height: 65px;
        }
      }

      .name-published {
        margin-left: 10px;

        .designer-name {
          font-size: 20px;
          color: #4a4a4a;
          margin: 0;
          @media screen and (max-width: 1024px) {
            font-size: 12.75px;
          }
        }

        .published-date {
          font-size: 18px;
          color: #969696;
          margin: 0;
          @media screen and (max-width: 1024px) {
            font-size: 12.75px;
          }
        }
      }
    }

    .title {
      margin: 25px 0;
      color: #313131;
      font-size: 20px;
      font-weight: 700;

      @media screen and (max-width: 1024px) {
        font-size: 16.5px;
      }
    }

    .properties {
      font-size: 18px;
      @media screen and (max-width: 1024px) {
        font-size: 12.75px;
      }
      .prop {
        font-size: 18px;
        color: #363636;
        font-weight: 700;

        @media screen and (max-width: 1024px) {
          font-size: 12.75px;
        }
      }

      a {
        text-decoration: none;
        color: #898586;
        font-size: 18px;

        &:hover {
          color: #231f20;
        }
      }
    }

    .description {
      font-size: 18px;
      margin-top: 40px;
      color: #313131;

      @media screen and (max-width: 1024px) {
        margin-top: 20px;
        font-size: 12.75px;
      }
    }
  }

  .designs {
    margin-top: 30px;

    .title {
      font-size: 28px;
      font-weight: 600;

      @media screen and (max-width: 1024px) {
        font-size: 16.5px;
      }
    }
    .sub-title a {
      font-size: 25px;
      font-weight: 600;
      color: black;
    }
  }
}

@media screen and (max-width: 767px) {
  .page.collection {
    .description-col {
      padding-top: 20px;
    }
  }
}
</style>