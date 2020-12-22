<template>
  <div class="component pageblocks">
    <b-container class="pageblock-container">
      <b-row v-for="(block, $index) in blocks" :key="block.id">
        <b-col md="6" :order="$index%2===0?(changedirection?2:1):(changedirection?1:2)">
          <div class="pageblock image">
            <img :src="`${imgBaseURL}/storage/${block.image_url}`">
          </div>
        </b-col>
        <b-col md="6" :order="$index%2===0?(changedirection?1:2):(changedirection?2:1)">
          <div class="pageblock text">
            <div>
              <h1>{{ block.translations[$i18n.locale].title }}</h1>
              <p>{{ block.translations[$i18n.locale].description }}</p>
              <nuxt-link :to="localePath(block.button_url)" v-if="block.button_url && block.translations[$i18n.locale].button_text">{{ block.translations[$i18n.locale].button_text }}</nuxt-link>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: ['blocks', 'changedirection'],
  data() {
    return {
      imgBaseURL: process.env.NUXT_ENV_SERVER
    }
  }
}
</script>

<style lang="scss" scoped>
.component.pageblocks {
  .pageblock-container {
    margin: 0;
    padding: 0;

    .row {
      margin-bottom: 100px;
      align-items: center;
      justify-content: center;
    }
  }

  .pageblock {
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
    }
  }
}

@media screen and (max-width: 767px) {
  .component.pageblocks {

    .order-1 {
      order: 2 !important;
    }

    .pageblock {
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