<template>
  <div class="component pageblocks">
    <b-container class="pageblock-container">
      <b-row v-for="(block, $index) in blocks" :key="block.id">
        <!-- <b-row v-for="block in blocks" :key="block.id"> -->
        <b-col
          md="6"
          :order="
            $index % 2 === 0
              ? changedirection
                ? 2
                : 1
              : changedirection
              ? 1
              : 2
          "
        >
          <div class="pageblock image">
            <img :src="`${imgBaseURL}/storage/${block.image_url}`" />
          </div>
        </b-col>

        <b-col
          md="6"
          :order="
            $index % 2 === 0
              ? changedirection
                ? 1
                : 2
              : changedirection
              ? 2
              : 1
          "
        >
          <div class="pageblock text">
            <div class="d-flex align-items-center">
              <span class="increment-no" v-if="routeCheck">
                {{ $index + 1 }}
              </span>
              <div>
                <h1>{{ block.translations[$i18n.locale].title }}</h1>
                 <p v-if="!routeCheck">{{ block.translations[$i18n.locale].description }}</p>
                <nuxt-link
                  :to="localePath(block.button_url)"
                  v-if="
                    block.button_url &&
                      block.translations[$i18n.locale].button_text
                  "
                  >{{ block.translations[$i18n.locale].button_text }}</nuxt-link
                >
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <!-- <div class="container pageblock-container">
      <div class="d-flex flex-column" v-for="block in blocks" :key="block.id">
        <div class="pageblock image order-2" >
          <img :src="`${imgBaseURL}/storage/${block.image_url}`" />
        </div>
        <div class="pageblock text d-flex flex-column">
          <div class="order-1">
            <h1>{{ block.translations[$i18n.locale].title }}</h1>
            <p>{{ block.translations[$i18n.locale].description }}</p>
          </div>
          <nuxt-link
          class="order-3"
            :to="localePath(block.button_url)"
            v-if="
              block.button_url && block.translations[$i18n.locale].button_text
            "
            >{{ block.translations[$i18n.locale].button_text }}</nuxt-link
          >
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["blocks", "changedirection"],
  data() {
    return {
      imgBaseURL: process.env.NUXT_ENV_SERVER,
      routeCheck:
        this.$router.history.current.path == "/request" ||
        this.$router.history.current.path == "/ch/request"
          ? true
          : false
    };
  }
};
</script>

<style lang="scss" scoped>
.component.pageblocks {
  .pageblock-container {
    margin: 0;
    padding: 0;

    .row {

      align-items: center;
      justify-content: center;
          margin-bottom: 100px;

      @media screen and (max-width: 768px) {
        margin-bottom: 80px;
      }
    }
  }

  .pageblock {
    display: flex;
    align-items: center;

    &.text {
      h1 {
        margin: 0;
        padding: 0;
        font-size: 35px;
        font-weight: 700;
        color: #313131;
        @media screen and (max-width: 768px) {
font-size: 22px;        }
      }

      p {
        margin: 0;
        margin-top: 20px;
        padding: 0;
        font-size: 16px;
        color: #000;
        @media screen and (max-width: 768px) {
font-size: 14px        }
      }

      a {
        @media screen and (max-width: 768px) {
          font-size: 14px;
        }
        margin-top: 30px;
        display: inline-block;
        padding: 10px 40px;
        border: 1px solid #000;
        border-radius: 30px;
        text-transform: uppercase;
        color: #000;
        font-size: 16px;
        font-weight: 700;
        text-decoration: none;
      }
    }

    img {
      max-width: 90%;
      @media screen and (max-width: 768px) {
max-width: 100%      }
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
          font-size: 20px;
        }

        p {
          font-size: 14px;
        }

        a {
          font-size: 14px;
        }
      }
    }
  }
}

.increment-no {
  font-size: 4.8rem;
  font-weight: 700;
  margin-right: 28px;

  @media screen and (max-width: 768px) {
    font-size: 50px;
  }

}
</style>
