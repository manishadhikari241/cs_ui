<template>
    <div>
        <div style="text-align: center" v-if="!pageInfo">
            <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
        <div class="page about" v-if="pageInfo">
            <h1 class="title">{{ pageInfo.translations[$i18n.locale].info_title }}</h1>
            <p class="light-description" v-html="pageInfo.translations[$i18n.locale].info_body"></p>
            <br>
            <p class="description" v-html="pageInfo.translations[$i18n.locale].body"></p>
            <br><br>
            <h1 class="title">{{ $t('team') }}</h1>
            <p class="light-description">{{ $t('our_in_house_creative_team') }}</p>
            <br>
            <div class="team-members">
                <div v-for="(team, index) in pageInfo.team" :key="`team_${index}`" class="team-member">
                    <img class="avatar" :src="`/cloudfront/uploads/user/${team.avatar}`"/>
                    <div class="name">{{(team.first_name +' '+ team.last_name).substring(0,10)+""}}</div>
                </div>

                <div class="team-member">
                    <a href="mailto:recruitment@collectionstock.com">
                        <img class="join" src="~/assets/icons/add_symbol.jpeg"/>
                    </a>
                    <div class="name">{{$t('join_the_team')}}</div>
                </div>
            </div>
            <br><br>
            <h1 class="title">{{ $t('clients') }}</h1>
            <p class="light-description">{{ $t('we_serve_more_then') }}</p>
            <br>
            <div class="clients d-flex">
                <div class="image" v-for="(client, index) in pageInfo.clients.original" :key="`client_${index}`" >
                   <img class="img-fluid" :src="client.image">

                    </div>
            </div>

            <br><br>
        </div>
    </div>
</template>

<script>
export default {
  asyncData(context) {
    return context.$axios.get("/pages/about").then(res => {
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
      pageInfo: null
    };
  },
  methods: {
    load() {
      this.$axios.$get(`/pages/about`).then(res => {
        this.pageInfo = res;
      });
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
.page.about {
  .title {
    font-weight: 700;
    font-size: 48.2px;
  }

  .light-description {
    font-size: 20px;
    color: #313131;

    span {
      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }
  }

  .description {
    margin: 0;
    padding: 0;
    color: $black;
    font-size: 20px;

    a {
      color: #000 !important;
      font-weight: 700;
      text-decoration: none;
    }
  }

  .clients {
      flex-wrap: wrap;
    .image {
      margin-right: 50px;
                @media screen and (max-width: 768px) {
      margin-right: 40px;
      }
        @media screen and (max-width: 330px) {
      margin-right: 15px;
      }
   
         @media screen and (min-width: 331px) and (max-width: 550px) {
      margin-right: 32px;
      }
      

    }
     
  }

  .team-members {
    .team-member {
      display: inline-block;
      text-align: center;
      color: $black;
      font-size: 18px;
      margin-right: 30px;
      width: 135px;
      margin-bottom: 30px;

      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #5565;
        margin-bottom: 10px;
        display: inline-block;
      }
      .join {
        height: 112px;
        width: 114px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .page.about {
    .title {
      font-weight: 700;
      font-size: 30px;
    }

    .light-description {
      font-size: 16px;
      color: #313131;
    }

    .description {
      margin: 0;
      padding: 0;
      color: $black;
      font-size: 16px;

      a {
        color: #000 !important;
        font-weight: 700;
        text-decoration: none;
      }
    }

    // .clients {
    //     img {
    //         height: 30px;
    //     }
    // }

    .team-members {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .team-member {
        display: inline-block;
        text-align: center;
        color: $black;
        font-size: 16px;
        margin-right: 16px;
        width: 119px;
        margin-top: 10px;
        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #5565;
          margin-bottom: 10px;
          display: inline-block;
        }
        .join {
          height: 88px;
          width: 90px;
        }
      }
    }
  }
}
</style>