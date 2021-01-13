   <template>
  <div class="page extra">
    <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>

    <div v-if="item">
      <div class="cover-container d-none d-sm-block" :style="`background-image: url('${baseURL}/storage/${item.main_cover}')`"></div>
      <div class="cover-container d-block d-sm-none" :style="`background-image: url('${baseURL}/storage/${item.cover}')`"></div>
   

      <!-- <div class="title">{{ item.translations[($i18n.locale == 'en' ? 0 : 1)].title }}</div> -->
      <!-- <div class="author">{{ item.author.first_name }} {{ item.author.last_name }}</div> -->
      <!-- <div class="date">{{ $moment(item.created_at).format('DD/MM/YYYY') }}</div> -->

      <div class="content">
         <div class="row">
      <div class="col-md-2">
        </div>
           <div class="col-md-10 mb-4">
             
      <div class="title top-description-container">{{ item.translations[($i18n.locale == 'en' ? 0 : 1)].title }}</div>
      <div class="author top-description-container">{{ item.author.first_name }} {{ item.author.last_name }}</div>
      <div class="date top-description-container">{{ $moment(item.created_at).format('DD/MM/YYYY') }}</div>
        </div>
      </div>
        <div class="row">
          <div class="col-md-2">
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

          </div>
          <div class="col-md-10">
            <div class="description-container" v-html="item.translations[($i18n.locale == 'en' ? 0 : 1)].description"></div>

          </div>
        </div>

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
      @media screen and (max-width: 550px) {
    padding: 0px 20px;
      }

    .cover-container {
      height: 400px;
      border-radius: 5px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      @media screen and (max-width: 550px) {
        height: 180px;
      }
      @media screen and (max-width: 768px) {
        height: 215px;
      }
    }

    .title {
      margin-top: 20px;
      font-size: 40px;
      color: $black;
      text-align: left;
      font-weight: 600;
      @media screen and (max-width: 768px) {
        font-size: 20px;
      }
      
    }

    .author {
      margin-top: 10px;
      font-size: 20px;
      color: $black;
      text-align: left;
      @media screen and (max-width: 768px) {
        font-size: 15px;
      }
    }

    .date {
      font-size: 14px;
      color: $black;
      text-align: left;
      @media screen and (max-width: 768px) {
        font-size: 12px;
      }
    }

    .content {
      margin-top: 30px;
      position: relative;
      min-height: 300px;
      overflow:hidden;

      .description-container {
        margin: 0 auto;
        font-size: 18px;
        color: #aaa;
        letter-spacing: .08em;
        @media screen and (min-width: 1025px) {
          width: 800px;
        }
        @media screen and (max-width: 768px) {
          font-size: 12px;
        }
      }
      .top-description-container{
              margin: 0 auto;
        // font-size: 18px;
        // color: #aaa;
        letter-spacing: .08em;
        @media screen and (min-width: 1025px) {
          width: 800px;
        }
       
      }

      .socialBox {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        text-align: center;

        @media screen and (max-width: 550px) {
          position: relative;
          left: 0;
          top: 0;
          text-align: center;
          display: flex;
          justify-content: center;      }


        .social-title {
          font-size: 18px;
          color: $black;
          font-weight: 600;
          margin-bottom: 10px;
          @media screen and (max-width: 768px) {
            font-size: 12px;
          }
          @media screen and (max-width: 550px) {
            margin-right: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
          }


        }

        .social {
          font-size: 30px;
          color: $black;
          margin-bottom: 10px;
          cursor: pointer;
          @media screen and (max-width: 768px) {
            font-size: 25px;
          }
          @media screen and (max-width: 550px) {
            margin-right: 30px      }

        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .page.extra {
      .socialBox {
        /*display: none;*/
      }
    }
  }
</style>