<template>
  <div :id="id" class="component designSlider">
    <div class="designContainer" :style="{'background-position': (sliderValue >= 100 ? '100% 100%' : '-100% -100%'), 'background-size': (sliderValue)+'%', 'background-image': `url(${getBackgroundURL()})`}">
      <img class="empty" src="~/assets/empty.jpg">
      <div v-if="mask === null" class="pending"></div>
      <div class="mask-container" v-if="mask" :style="`background-image: url('${cloudfrontURL}/uploads/good/${mask.image}')`"></div>
      <div class="socialBox" v-if="mode != 'simulator' && mode != 'fs'">
        <div>
          <div class="social fb">
            <ShareNetwork :popup="{width: 400, height: 300}"
              network="facebook"
              :url="'https://new.collectionstock.com'"
              :title="`Design Code: ${designCode}`"
              :quote="`Design Code: ${designCode}`"
            >
              <i class="fab fa-facebook-f"></i>
            </ShareNetwork>
          </div>
          <div class="social twitter">
            <ShareNetwork :popup="{width: 400, height: 300}"
              network="twitter"
              :url="'https://new.collectionstock.com'"
              :title="`Design Code: ${designCode}`"
              :quote="`Design Code: ${designCode}`"
            >
              <i class="fab fa-twitter"></i>
            </ShareNetwork>
          </div>
          <div class="social twitter">
            <ShareNetwork :popup="{width: 400, height: 300}"
              network="pinterest"
              :url="'https://new.collectionstock.com'"
              :title="`Design Code: ${designCode}`"
              :quote="`Design Code: ${designCode}`"
            >
              <i class="fab fa-pinterest"></i>
            </ShareNetwork>
          </div>
        </div>
        <a :href="`${serverURL}/api/media/preview/${designCode}`" class="preview">{{ $t('preview') }}</a>
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
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
import {BIconChevronUp, BIconPlus, BIconDash} from 'bootstrap-vue'

export default {
  props: [
    'id',
    'designCode',
    'mask',
    'designURL',
    'mode'
  ],
  components: {
    RangeSlider,
    BIconChevronUp,
    BIconPlus,
    BIconDash
  },
  data() {
    return {
      cloudfrontURL: process.env.NUXT_ENV_CLOUDFRONT,
      serverURL: process.env.NUXT_ENV_SERVER,
      sliderValue: 100,
      bgPositionX: 100,
      bgPositionY: 100
    }
  },
  methods: {
    sliderUp: function() {
      if (this.sliderValue < 200)
        this.sliderValue += 10;
    },
    sliderDown: function() {
      if (this.sliderValue === 10)
        this.sliderValue = 1;
      else if (this.sliderValue > 0)
        this.sliderValue -= 10;
    },
    sliderReset: function() {
      this.sliderValue = 100;
      this.bgPositionX = 100;
      this.bgPositionY = 100;
    },

    getBackgroundURL() {
      if (this.designCode) return `${this.serverURL}/api/v1/image/detail/design/${this.designCode}`;
      if (this.mask === null) return null;
      return this.designURL;
    },


    initDragging() {
      var container = document.querySelector(`#${this.id} .designContainer`);

      container.addEventListener("touchstart", dragStart, false);
      container.addEventListener("mousedown", dragStart, false);
      document.addEventListener("touchend", dragEnd, false);
      document.addEventListener("mouseup", dragEnd, false);

      let self = this;

      function dragEnd(e) {
        document.removeEventListener('touchmove', dragging);
        document.removeEventListener('mousemove', dragging);
      }

      var containerSize, elepos, mousedown, patternBackground, patternBackgroundWidth, zoomLevel;

      function dragStart(e) {
        e.preventDefault();
        patternBackground = container;
        patternBackgroundWidth = container.clientWidth;
        mousedown = {
          x: e.pageX || e.touches[0].pageX,
          y: e.pageY || e.touches[0].pageY
        };
        elepos = {
          x: parseFloat(patternBackground.style.backgroundPosition.split(" ")[0].replace('%', '')),
          y: parseFloat(patternBackground.style.backgroundPosition.split(" ")[1].replace('%', ''))
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
            y: 100 * (mousepos.y - mousedown.y) / patternBackgroundWidth };

          actualMovePercentage = {
            x: 0.7 / (1 - zoomLevel / 100) * movePercentage.x,
            y: 0.7 / (1 - zoomLevel / 100) * movePercentage.y };

          patternBackground.style.backgroundPosition = `${elepos.x + actualMovePercentage.x}% ${elepos.y + actualMovePercentage.y}%`;
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initDragging();
    });
  }
}
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
      background: #fff url('~@/assets/icons/pending.png') no-repeat center;
      background-size: 60%;
    }

    .mask-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
    }

    img {
      width: 100%;
      height: auto;
      visibility: hidden;
    }

    .socialBox {
      background: rgba(255, 255, 255, .9);
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
      }

      .preview {
        text-decoration: none;
        font-size: 14px;
        color: $black;
        margin-right: 20px;
        margin-top: 7px;
        font-weight: 600;
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