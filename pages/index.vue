<template>
  <div class="page home">
    <client-only>
      <PageInfo :slug="'home'"/>
      <br><br>
      <div style="text-align: center" v-if="loading">
        <b-spinner type="grow" label="Loading..."></b-spinner>
      </div>
      <PageBlocks :blocks="blocks" v-if="!loading"/>
    </client-only>
  </div>
</template>

<script>
import PageInfo from '~/components/pageinfo'
import PageBlocks from '~/components/pageblocks'

export default {
  components: {
    PageInfo,
    PageBlocks
  },
  asyncData (context) {
    return context.$axios.get('/pages/home')
      .then((res) => {
        return { pageData: res.data }
      })
  },
  head () {
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.pageData.translations[this.$i18n.locale].meta_description
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.pageData.translations[this.$i18n.locale].meta_keywords
        },
      ]
    }
  },
  data () {
    return {
      loading: false,
      blocks: []
    }
  },
  methods: {
    toggleLoading () {
      this.loading = !this.loading
    },

    loadPageBlocks() {
      this.toggleLoading();
      this.$axios.$get('/pages/home/blocks')
        .then((response) => {
          this.toggleLoading()
          this.blocks = response
        })
    }
  },
  mounted () {
    this.loadPageBlocks()
  }
}
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
</style>
