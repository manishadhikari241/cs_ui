<template>
  <div>
    <div class="page home">
      <!-- <div class="container"> -->
      <client-only>
        <div class="row">
          <div class="col-md-6 col-sm-12 col-lg-6">
            <PageInfo :slug="'home'" />
            <b-button class="action-btn rounded-btn bg-white text-black "
              >button
            </b-button>
          </div>
          <div class="col-md-6 col-sm-12 col-lg-6">
            <img
              src="https://scontent.fktm3-1.fna.fbcdn.net/v/t1.15752-9/p1080x2048/138576217_252274512983308_531208600061513378_n.jpg?_nc_cat=101&ccb=2&_nc_sid=ae9488&_nc_ohc=7SDrZAzfsoAAX-nHp2i&_nc_ht=scontent.fktm3-1.fna&tp=6&oh=709c2e1973bb7a171c4b8332ad625dc8&oe=6023B45E"
              class="img-fluid"
              alt=""
            />
          </div>
        </div>

        <br /><br />
        <div style="text-align: center" v-if="loading">
          <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
      </client-only>
    </div>
    <!-- <div> -->
    <!-- <div class="pagecontainer"> -->
    <PageBlocks :blocks="blocks" v-if="!loading" />
    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import PageInfo from "~/components/pageinfo";
import PageBlocks from "~/components/pageblocks";

export default {
  components: {
    PageInfo,
    PageBlocks
  },
  asyncData(context) {
    return context.$axios.get("/pages/home").then(res => {
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
      loading: false,
      blocks: []
    };
  },
  methods: {
    toggleLoading() {
      this.loading = !this.loading;
    },

    loadPageBlocks() {
      this.toggleLoading();
      this.$axios.$get("/pages/home/blocks").then(response => {
        this.toggleLoading();
        this.blocks = response;
      });
    }
  },
  mounted() {
    this.loadPageBlocks();
  }
};
</script>

<style lang="scss" scoped>
.page.home {
  .container {
    margin: 0;
    padding: 0;

    .row {
      margin-bottom: 100px;
    }
  }

  .block {
    display: flex;
    align-items: center;

    &.text {
      h1 {
        margin: 0;
        padding: 0;
        font-size: 40px;
        font-weight: 700;
        color: #000;
        text-transform: uppercase;
      }

      p {
        margin: 0;
        margin-top: 20px;
        padding: 0;
        font-size: 20px;
        color: #000;
      }

      a {
        margin-top: 30px;
        display: inline-block;
        padding: 10px 40px;
        border: 1px solid #000;
        border-radius: 30px;
        text-transform: uppercase;
        color: #000;
        font-size: 18px;
        font-weight: 700;
        text-decoration: none;
      }
    }

    img {
      max-width: 90%;
      @media screen and (max-width: 426px) {
        max-width: 100%;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .page.home {
    .block {
      justify-content: center;
      text-align: center;

      &.text {
        padding-top: 30px;

        h1 {
          font-size: 30px;
        }

        p {
          font-size: 18px;
        }

        a {
          font-size: 14px;
        }
      }
    }
  }
}
.rounded-btn {
  background: white;
  color: grey;
  border-radius: 20px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.4);
  border: none;
  outline: none;
}
</style>
