<template>
  <div class="page extra">
    <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>

    <div v-if="item">
      <div class="cover-container" :style="`background-image: url('${baseURL}/storage/${item.main_cover}')`"></div>
      <div class="title">{{ item.translations[($i18n.locale == 'en' ? 0 : 1)].title }}</div>
      <div class="author">{{ item.author.first_name }} {{ item.author.last_name }}</div>
      <div class="date">{{ $moment(item.created_at).format('DD/MM/YYYY') }}</div>

      <div class="content">
        <div class="socialBox">
          <div class="social-title">Share It</div>
          <div class="social fb">
            <ShareNetwork :popup="{width: 400, height: 300}"
              network="facebook"
              :url="'https://new.collectionstock.com'"
              :title="item.translations[($i18n.locale == 'en' ? 0 : 1)].title"
              :quote="item.translations[($i18n.locale == 'en' ? 0 : 1)].title"
            >
              <i class="fab fa-facebook-f"></i>
            </ShareNetwork>
          </div>
          <div class="social twitter">
            <ShareNetwork :popup="{width: 400, height: 300}"
              network="twitter"
              :url="'https://new.collectionstock.com'"
              :title="item.translations[($i18n.locale == 'en' ? 0 : 1)].title"
              :quote="item.translations[($i18n.locale == 'en' ? 0 : 1)].title"
            >
              <i class="fab fa-twitter"></i>
            </ShareNetwork>
          </div>
          <div class="social twitter">
            <ShareNetwork :popup="{width: 400, height: 300}"
              network="pinterest"
              :url="'https://new.collectionstock.com'"
              :title="item.translations[($i18n.locale == 'en' ? 0 : 1)].title"
              :quote="item.translations[($i18n.locale == 'en' ? 0 : 1)].title"
            >
              <i class="fab fa-pinterest"></i>
            </ShareNetwork>
          </div>
        </div>

        <div class="description-container" v-html="item.translations[($i18n.locale == 'en' ? 0 : 1)].description"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: null,
      baseURL: process.env.NUXT_ENV_SERVER
    }
  },
  methods: {
    load() {
      this.$axios.$get(`/posts/${this.$route.params.id}`)
        .then((response) => {
          this.item = response;
        })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    })
  }
}
</script>

<style lang="scss" scoped>
.page.extra {
    padding: 0px 45px;

  .cover-container {
    height: 400px;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }

  .title {
    margin-top: 20px;
    font-size: 40px;
    color: $black;
    text-align: center;
    font-weight: 600;
  }

  .author {
    margin-top: 10px;
    font-size: 20px;
    color: $black;
    text-align: center;
  }

  .date {
    font-size: 14px;
    color: $black;
    text-align: center;
  }

  .content {
    margin-top: 30px;
    position: relative;
    min-height: 300px;
    overflow:hidden;

    .description-container {
      width: 800px;
      margin: 0 auto;
      font-size: 22px;
      color: #aaa;
      letter-spacing: .08em;
    }

    .socialBox {
      width: 80px;
      position: absolute;
      left: 0;
      top: 0;
      text-align: center;

      .social-title {
        font-size: 20px;
        color: $black;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .social {
        font-size: 40px;
        color: $black;
        margin-bottom: 10px;
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .page.extra {
    .socialBox {
      display: none;
    }
  }
}
</style>