<template>
  <div>

    <div class="component quickdisplay ignorePrint" id="quickdisplay">
      <div class="quickdisplay-arrow" :style="`left: ${getArrowPositionClass()}%`"><b-icon-triangle-fill></b-icon-triangle-fill></div>
      <div class="component-container design-component">
        <div class="header">
          <span>{{$t('design_detail')}}</span>
          <div class="action-buttons">
            <b-button @click="$emit('fullscreen', 1)"><b-icon-arrows-fullscreen></b-icon-arrows-fullscreen></b-button>
            <b-button @click="close"><b-icon-x-circle-fill></b-icon-x-circle-fill></b-button>
          </div>
        </div>
        <div class="design-component-container">
          <Design :design="design" />
          <b-button class="navigate-qd back" @click="$emit('navigate', false)"><b-icon-chevron-left></b-icon-chevron-left></b-button>
          <b-button class="navigate-qd forward" @click="$emit('navigate', true)"><b-icon-chevron-right></b-icon-chevron-right></b-button>
        </div>
      </div>
      <div class="component-container simulator-component">
        <div class="header">
          <span>{{$t('try_design_on_product')}}</span>
          <div class="action-buttons">
            <b-button @click="$emit('fullscreen', 2)"><b-icon-arrows-fullscreen></b-icon-arrows-fullscreen></b-button>
            <b-button @click="toggleSimulator">
              <b-icon-arrow-bar-up v-show="simulatorVisible"></b-icon-arrow-bar-up>
              <b-icon-arrow-bar-down v-show="!simulatorVisible"></b-icon-arrow-bar-down>
            </b-button>
          </div>
        </div>
        <div class="simulator-component-container" v-show="simulatorVisible">
          <Simulator :design="design" />
          <b-button class="navigate-qd back" @click="$emit('navigate', false)"><b-icon-chevron-left></b-icon-chevron-left></b-button>
          <b-button class="navigate-qd forward" @click="$emit('navigate', true)"><b-icon-chevron-right></b-icon-chevron-right></b-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Design from '~/components/design';
import Simulator from '~/components/simulator';
import {BIconXCircleFill, BIconArrowBarUp, BIconArrowBarDown, BIconTriangleFill, BIconChevronLeft, BIconChevronRight, BIconArrowsFullscreen} from 'bootstrap-vue'

export default {
  components: {
    Design,
    Simulator,
    BIconXCircleFill,
    BIconArrowBarUp,
    BIconArrowBarDown,
    BIconTriangleFill,
    BIconChevronLeft,
    BIconChevronRight,
    BIconArrowsFullscreen
  },
  props: [
    'design',
    'selectedIndex'
  ],
  data() {
    return {
      simulatorVisible: true,
      fullScreenMode: null
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },

    toggleSimulator() {
      this.simulatorVisible = !this.simulatorVisible;
    },

    getArrowPositionClass() {
      return (this.selectedIndex%4)*26+10;
    }
  }
}
</script>

<style lang="scss" scoped>
.component.quickdisplay {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, .5);
  border-radius: 8px;

  .quickdisplay-arrow {
    position: absolute;
    top: -18px;
    left: 0;
    font-size: 20px;
  }

  .component-container {
    position: relative;

    .header {
      position: relative;
      background: $black;
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      padding: 10px 0;
      border-radius: 6px;

      .action-buttons {
        position: absolute;
        top: 6px;
        right: 20px;

        button {
          margin: 0;
          margin-left: 10px;
          padding: 0;
          outline: none;
          border: none;
          background: transparent;
          font-size: 16px;
        }
      }
    }

    .design-component-container {
      padding: 20px 0;
      position: relative;

      .component.design {
        padding: 0 60px !important;
      }

      .navigate-qd {
        position: absolute;
        top: 40%;
        font-size: 30px;
        padding: 0;
        color: $black;
        border: none;
        background: transparent;
        box-shadow: none;
        outline: none;

        &.back {
          left: 5px;
        }

        &.forward {
          right: 5px;
        }
      }
    }

    .simulator-component-container {
      padding: 20px 0;

      .component.simulator {
        padding: 0 20px !important;
      }

      .navigate-qd {
        position: absolute;
        top: 40%;
        font-size: 30px;
        padding: 0;
        color: $black;
        border: none;
        background: transparent;
        box-shadow: none;
        outline: none;

        &.back {
          left: 5px;
        }

        &.forward {
          right: 5px;
        }
      }
    }
  }
}
</style>