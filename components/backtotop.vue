<template>
  <div class="component btt" @click="backToTop" v-show="visible">
    <b-icon-chevron-up></b-icon-chevron-up>
  </div>
</template>

<script>
import { BIconChevronUp } from 'bootstrap-vue';

export default {
  components: {
    BIconChevronUp
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 500)
        this.visible = true;
      else
        this.visible = false;
    },

    backToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss" scoped>
.component.btt {
  position: fixed;
  bottom: 70px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #000;
  text-align: center;
  color: #FFF;
  font-size: 30px;
  font-weight: 700;
  outline: none;
  box-shadow: 0 3px 6px rgba(0,0,0,.175);
  z-index: 9999;
  transition: all 1s;
  cursor: pointer;
}
</style>