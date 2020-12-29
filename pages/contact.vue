<template>
  <div class="page contact">
    <PageInfo :slug="'contact'" />
    <br><br>
    <b-container  v-if="!loading">
      <b-row>
        <b-col lg="12" class="icons-col">
          <b-container>
            <b-row>
              <b-col>
                <div class="contact-item email">
                  <div class="icon-container">
                    <img src="~@/assets/icons/whatsapp.jpg">
                  </div>
                  <p class="prop">{{ $t('email') }}</p>
                  <p class="value">{{item.email.email}}</p>
                </div>
              </b-col>
              <b-col>
                <div class="contact-item whatsapp">
                  <div class="icon-container">
                    <img src="~@/assets/icons/whatsapp.jpg">
                  </div>
                  <p class="prop">{{$t('whatsapp')}}</p>
                  <p class="value">{{item.email.whatsapp}}</p>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="contact-item wechat">
                  <div class="icon-container">
                    <img src="~@/assets/icons/wechat.png">
                  </div>
                  <p class="prop">{{$t('wechat')}}</p>
                  <p class="value">{{item.email.wechat}}</p>

                </div>
              </b-col>
              <b-col>
                <div class="contact-item tencent">
                  <div class="icon-container">
                    <img src="~@/assets/icons/tencent.jpg">
                  </div>
                  <p class="prop">{{$t('qq')}}</p>
                  <p class="value">{{item.email.qq}}</p>
                </div>
                
              </b-col>
            </b-row>
          </b-container>
        </b-col>
        <!--<b-col lg="6" class="support-col">-->
            <!--<img :src="`${imgBaseURL}/storage/${item.email.image}`">-->
        <!--</b-col>-->
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PageInfo from "~/components/pageinfo";

export default {
  components: {
    PageInfo
  },
  asyncData(context) {
    return context.$axios.get("/pages/contact").then(res => {
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
      item: null,
      imgBaseURL: process.env.NUXT_ENV_SERVER,
      loading: false
    };
  },
  methods: {
    loadPages() {
      this.loading = true;

      this.$axios.$get("/pages/contact").then(response => {
        this.item = response;
        this.loading = false;
      });
    }
  },
  created() {
    this.loadPages();
  }
};
</script>

<style lang="scss" scoped>
.page.contact {
  .support-col {
    img {
      width: 100%;
    }
  }

  .icons-col {
    .contact-item {
      text-align: center;
      margin-bottom: 30px;

      p {
        margin: 0;
        padding: 0;
        color: $black;
      }

      .prop {
        font-size: 20px;
        font-weight: 600;
      }

      .value {
        font-size: 18px;
      }

      .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;
      }

      &.email {
        img {
          height: 80px;
        }
      }

      &.whatsapp {
        img {
          height: 100px;
        }
      }

      &.wechat {
        img {
          height: 100px;
        }
      }

      &.tencent {
        img {
          height: 100px;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .page.contact {
    .support-col {
      margin-top: 30px;
    }

    .icons-col {
      .contact-item {
        .icon-container {
          img {
            height: 60px;
          }
        }
      }
    }
  }
}
</style>