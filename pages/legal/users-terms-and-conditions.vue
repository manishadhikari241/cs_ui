<template>
  <div class="page legal users-terms-and-conditions">
    <b-container>
      <b-row>
        <b-col md="4">
          <LegalMenu />
        </b-col>
        <b-col md="8">
          <Legal :slug="'users-terms-and-conditions'" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LegalMenu from '~/components/menus/legal-menu';
import Legal from '~/components/legal';

export default {
  components: {
    LegalMenu,
    Legal
  },
  asyncData (context) {
    return context.$axios.get('/pages/users-terms-and-conditions')
      .then((res) => {
        return { pageData: res.data }
      })
  },
  head() {
    return {
      meta: [
        { hid: 'description', name: 'description', content: this.pageData.translations[this.$i18n.locale].meta_description },
        { hid: 'keywords', name: 'keywords', content: this.pageData.translations[this.$i18n.locale].meta_keywords },
      ]
    }
  }
}
</script>

<style lang="scss">
.page.legal {
  .content {
    font-size: 14px;

    a {
      color: $brand !important;
    }

    h1 {
      font-size: 30px;
      font-weight: 700;
    }

    .tnc ol li:before {
      content: counters(item,".") " ";
      counter-increment: item;
      width: 25px;
      margin-left: -20px;
      display: inline-block;
    }
  }
}
</style>