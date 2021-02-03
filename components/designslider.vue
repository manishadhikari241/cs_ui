<template>
  <div :class="`component designSlider ${mode}`">
    <div ref="designContainer" class="designContainer" :style="{'background-position': (sliderValue >= 100 ? '100% 100%' : '-100% -100%'), 'background-size': (sliderValue)+'%', 'background-image': `url(${getBackgroundURL()})`}">
      <img class="empty" src="~/assets/empty.jpg">
      <div v-if="mask === null" class="pending"></div>
      <div class="mask-container" v-if="mask" :style="`background-image: url('/cloudfront/uploads/good/${mask.image}')`"></div>
      <div class="socialBox" v-if="mode != 'simulator' && mode != 'fs'">
        <div>
          
          <div class="social fb">
            <ShareNetwork :popup="{width: 400, height: 300}"
              network="facebook"
                            :title="``"

              :url="`${baseUrl}/api/social/design/${$i18n.locale}/${designCode}`"
            >
              <i class="fab fa-facebook-f"></i>
            </ShareNetwork>
          </div>
          <div class="social twitter">
            <ShareNetwork :popup="{width: 400, height: 300}"
              network="twitter"
              :url="`${baseUrl}/api/social/design/${$i18n.locale}/${designCode}`"
              :title="``"
              :quote="`Design Code: ${designCode}`"
            >
              <i class="fab fa-twitter"></i>
            </ShareNetwork>
          </div>
          <div class="social twitter">
            <ShareNetwork :popup="{width: 400, height: 300}"
              network="pinterest"
              :url="`${baseUrl}/api/social/design/${$i18n.locale}/${designCode}`"
              :title="``"
              :quote="``"
              :media="`${baseUrl}/api/media/preview/${this.designCode}`"
            >
              <i class="fab fa-pinterest"></i>
            </ShareNetwork>
          </div>
        </div>
        <a :href="`/api/media/preview/${designCode}`" class="preview">{{ $t('preview') }}</a>
      </div>
    </div>
    <range-slider
      class="slider"
      min="1"
      max="200"
      step="1"
      v-model="sliderValue">
    </range-slider>
    <div class="rangeSliderIndicators">
      <b-icon-dash @click="sliderDown"></b-icon-dash>
      <b-icon-chevron-up @click="sliderReset"></b-icon-chevron-up>
      <b-icon-plus @click="sliderUp"></b-icon-plus>
    </div>
  </div>
</template>

<script>
import RangeSlider from "vue-range-slider";
import "vue-range-slider/dist/vue-range-slider.css";
import { BIconChevronUp, BIconPlus, BIconDash } from "bootstrap-vue";

export default {
  props: ["designCode", "mask", "designURL", "mode"],
  components: {
    RangeSlider,
    BIconChevronUp,
    BIconPlus,
    BIconDash
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      sliderValue: 100,
      bgPositionX: 100,
      bgPositionY: 100
    };
  },
  watch: {
    sliderValue: function() {
        this.initDragging();

    }
  },
  methods: {
    sliderUp: function() {
      if (this.sliderValue < 200) this.sliderValue += 10;
    },
    sliderDown: function() {
      if (this.sliderValue === 10) this.sliderValue = 1;
      else if (this.sliderValue > 0) this.sliderValue -= 10;
    },
    sliderReset: function() {
      this.sliderValue = 100;
      this.bgPositionX = 100;
      this.bgPositionY = 100;
    },

    getBackgroundURL() {
      if (this.designCode)
        return `/api/v1/image/detail/design/${this.designCode}`;
      if (this.mask === null) return null;
      return this.designURL;
    },

    initDragging() {
      console.log(this.sliderValue);

      if (this.sliderValue != 100) {
        var container = this.$refs.designContainer;
        if (!container) return false;

        container.addEventListener("touchstart", dragStart,  { passive: false });
        container.addEventListener("mousedown", dragStart,  { passive: false });
        document.addEventListener("touchend", dragEnd, { passive: false });
        document.addEventListener("mouseup", dragEnd,  { passive: false });

        let self = this;

        function dragEnd(e) {
          document.removeEventListener("touchmove", dragging);
          document.removeEventListener("mousemove", dragging);
        }

        var containerSize,
          elepos,
          mousedown,
          patternBackground,
          patternBackgroundWidth,
          zoomLevel;

        function dragStart(e) {
          e.preventDefault();
          patternBackground = container;
          patternBackgroundWidth = container.clientWidth;
          mousedown = {
            x: e.pageX || e.touches[0].pageX,
            y: e.pageY || e.touches[0].pageY
          };
          elepos = {
            x: parseFloat(
              patternBackground.style.backgroundPosition
                .split(" ")[0]
                .replace("%", "")
            ),
            y: parseFloat(
              patternBackground.style.backgroundPosition
                .split(" ")[1]
                .replace("%", "")
            )
          };
          zoomLevel = parseInt(self.sliderValue);
          containerSize = parseInt(patternBackgroundWidth);

          document.addEventListener("touchmove", dragging, false);
          document.addEventListener("mousemove", dragging, false);
        }

        function dragging(e) {
          var actualMovePercentage, mousepos, movePercentage;
          mousepos = {
            x: e.pageX || e.changedTouches[0].pageX || mousedown.x,
            y: e.pageY || e.changedTouches[0].pageY || mousedown.y
          };
          if (mousedown !== mousepos) {
            movePercentage = {
              x: 100 * (mousepos.x - mousedown.x) / patternBackgroundWidth,
              y: 100 * (mousepos.y - mousedown.y) / patternBackgroundWidth
            };

            actualMovePercentage = {
              x: 0.7 / (1 - zoomLevel / 100) * movePercentage.x,
              y: 0.7 / (1 - zoomLevel / 100) * movePercentage.y
            };

            patternBackground.style.backgroundPosition = `${elepos.x +
              actualMovePercentage.x}% ${elepos.y + actualMovePercentage.y}%`;
          }
        }
      }
        if (this.sliderValue == 100) {
        var container = this.$refs.designContainer;
        if (!container) return false;

      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initDragging();
    });
  }
};
</script>

<style lang="scss">
.component.designSlider {
  .designContainer {
    position: relative;
    width: 100%;
    height: auto;
    background-repeat: repeat;
    cursor: grab;

    .pending {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      background: #fff url("~@/assets/icons/pending.png") no-repeat center;
      background-size: 60%;
    }

    .mask-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      // background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
      //   @media screen and (max-width: 550px) {
      //  background-repeat: unset;

      //   }
    }

    img {
      width: 100%;
      height: auto;
      visibility: hidden;
    }

    .socialBox {
      background: rgba(255, 255, 255, 0.9);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 5px 0;

      & > div {
        display: flex;
      }

      .social {
        font-size: 25px;
        margin-left: 20px;
        color: $black;
        cursor: pointer;

        a {
          color: inherit;
        }

        @media screen and (max-width: 1023px) {
          font-size: 15px;
          margin-left: 10px;
        }
      }

      .preview {
        text-decoration: none;
        font-size: 13px;
        color: $black;
        margin-right: 20px;
        margin-top: 7px;
        font-weight: 600;
        @media screen and (max-width: 1023px) {
          font-size: 10px;
          margin-right: 10px;
          margin-top: 3px;
        }
      }
    }
  }

  .range-slider-fill {
    background-color: transparent;
  }

  .range-slider {
    width: 100%;
    margin-top: 10px;
  }

  .rangeSliderIndicators {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    font-size: 25px;
    font-weight: 700;

    > * {
      cursor: pointer;
    }
  }
}
</style>
