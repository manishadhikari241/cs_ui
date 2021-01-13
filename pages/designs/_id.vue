<template>
  <div class="page designs">
    <div v-if="!design" style="text-align: center"><b-spinner type="grow" label="Spinning"></b-spinner></div>
    <client-only>
      <div class="design-container" v-if="design">
        <Design :design="design" />
        <div class="design-simulator-separator">
          <div class="line d-none d-sm-none d-md-block"></div>
          <div class="text">{{ $t('try_design_on_product') }}</div>
        </div>
        <Simulator :design="design" />
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Design from '~/components/design';
import Simulator from '~/components/simulator';

export default {
  components: {
    Design,
    Simulator
  },
  asyncData (context) {
    return context.$axios.get('/pages/designs')
      .then((res) => {
        return { pageData: res.data }
      })
  },
  head() {
    return {
      meta: [
        { hid: 'description', name: 'description', content: this.pageData.translations[this.$i18n.locale].meta_description },
        { hid: 'keywords', name: 'keywords', content: this.pageData.translations[this.$i18n.locale].meta_keywords }
      ]
    }
  },
  data() {
    return {
      design: null
    }
  },
  methods: {
    load() {
      this.$axios.$get(`/design/${this.$route.params.id}?scope[]=designer.profile&scope[]=keywords&scope[]=studio&scope[]=freeDesign`)
        .then((response) => {
          this.design = response;
        }).catch((error) => {
          this.$toast.error(error.response.data.error.message);
          setTimeout(() => {
            this.$router.push(this.localePath('/designs'));
          }, 1000);
        });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    })
  }
}
</script>

<style lang="scss" scoped>
.page{
      margin: 25px auto 0;
}
.page.designs {
  .design-simulator-separator {
    height: 100px;
    font-size: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
        @media screen and (max-width: 767px) {
      justify-content:flex-start;
    }

    .text {
      background: #fff;
      padding: 10px 20px;
      position: relative;
    }

    .line {
      width: 100%;
      border-top: 1px solid #ccc;
      position: absolute;
      top: 50%;
      left: 0;
    }
  }
}


@media screen and (max-width: 767px) {
  .page.designs {
    .design-simulator-separator {
      font-size: 20px;
    }
  }
}
</style>