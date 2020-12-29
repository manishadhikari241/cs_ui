<template>
  <div class="component quickdisplay-fullscreen" v-if="design && mode">
    <b-button class="closeQDFS" @click="$emit('fullscreen', null)"><b-icon-x-circle-fill></b-icon-x-circle-fill></b-button>

    <div class="mainframe">
      <DesignSlider :id="'designSliderBase'" :designCode="design.code" :mode="'fs'" v-if="mode == 1" />
      <Simulator :design="design" :mode="'fs'" v-if="mode == 2" />
      <b-button class="navigate-qdfs back" @click="$emit('navigate', false)"><b-icon-chevron-left></b-icon-chevron-left></b-button>
      <b-button class="navigate-qdfs forward" @click="$emit('navigate', true)"><b-icon-chevron-right></b-icon-chevron-right></b-button>
    </div>
  </div>
</template>

<script>
import DesignSlider from '~/components/designslider';
import Simulator from '~/components/simulator';
import {BIconXCircleFill, BIconChevronLeft, BIconChevronRight} from 'bootstrap-vue'

export default {
  props: ['design', 'mode'],
  components: {
    DesignSlider,
    Simulator,
    BIconXCircleFill,
    BIconChevronLeft,
    BIconChevronRight
  }
}
</script>

<style lang="scss">
.component.quickdisplay-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 99999;

  .closeQDFS {
    position: absolute;
    top: 20px;
    right: 20px;
    color: $black;
    border: none;
    background: transparent;
    outline: none;
    box-shadow: none;

    &:hover {
      background: transparent;
    }
  }

  .mainframe {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .navigate-qdfs {
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
        right: 10px;
      }
    }
  }

  .designContainer {
    .empty, .mask-container {
      /*width: 575px;*/
    }
  }
}
</style>