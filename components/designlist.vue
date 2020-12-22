<template>
  <div class="component designlist">
    <b-row cols="2" cols-sm="2" cols-md="5" cols-lg="5">
      <template v-for="(design, $index) in designs">
        <b-col class="md-hide" style="flex: 0 0 100%; max-width: 100%;" v-if="design.quickDisplay" :key="`quickdisplay${$index}`">
          <div class="quick-display-container">
            <QuickDisplay :design="selected.design" :selectedIndex="selected.index" @close="closeQuickDisplay" @navigate="navigateQD" @fullscreen="changeFSMode" />
          </div>
        </b-col>
        <b-col v-if="!design.quickDisplay" class="design-container" :key="design.id">
          <DesignTile :design="design" @quickDisplay="quickDisplay" :topIndex="showTop ? ($index+(selected.quickIndex !== null && selected.quickIndex < $index ? 0 : 1)) : null" />
        </b-col>
      </template>
    </b-row>

    <QuickDisplayFS :design="selected.design" :mode="fsMode" @navigate="navigateQD" @fullscreen="changeFSMode" />
  </div>
</template>

<script>
import DesignTile from '~/components/designtile';
import QuickDisplay from '~/components/quickdisplay';
import QuickDisplayFS from '~/components/quickdisplayfs';

export default {
  props: [
    'designs',
    'showTop'
  ],
  components: {
    DesignTile,
    QuickDisplay,
    QuickDisplayFS
  },
  data() {
    return {
      selected: {
        index: null,
        design: null,
        quickIndex: null
      },
      fsMode: null
    }
  },
  methods: {
    quickDisplay(id, i, isNavigation) {
      var qd = document.getElementById('quickdisplay');
      var isPrevQD = qd ? true : false;
      var qdHeight = 0;
      var qdPos = null;
      if (qd) {
        qdHeight = qd.clientHeight;
        qdPos = qd.getBoundingClientRect().top + window.scrollY - 100;
      }


      let index = (i == undefined ? this.getDesignIndexById(id) : i);
      this.closeQuickDisplay();
      this.selected.index = index;
      this.selected.design = this.designs[index];
      this.selected.quickIndex = (index < 5 ? 5 : Math.ceil((index+1)/5)*5);
      if (this.selected.quickIndex >= this.designs.length)
        this.selected.quickIndex = this.designs.length;
      this.designs.splice(this.selected.quickIndex, 0, {quickDisplay: true});

      
      this.$nextTick(() => {
        var qd = document.getElementById('quickdisplay');
        if (qd) {
          let speed = 500;
          let nextPos = qd.getBoundingClientRect().top + window.scrollY - 100;
          let from = window.scrollY;
          let to = nextPos;
          if (isPrevQD && nextPos > qdPos)
            from -= qdHeight/2;
          if (isNavigation === true)
            speed = 0;
          this.animate(document.scrollingElement || document.documentElement, "scrollTop", "", from, to, speed, true);
        }
      });
    },

    getDesignIndexById(id) {
      let index = 0;
      for (let i = 0; i < this.designs.length; i++) {
        if (this.designs[i].quickDisplay === undefined) {
          if (this.designs[i].id == id)
            break;
          index++;
        }
      }
      return index;
    },

    closeQuickDisplay() {
      if (this.selected.quickIndex !== null) {
        this.designs.splice(this.selected.quickIndex, 1);
        this.selected.index = null;
        this.selected.design = null;
        this.selected.quickIndex = null;
      }
    },

    navigateQD(forward) {
      var nextIndex = (forward ? this.selected.index+1 : this.selected.index-1);
      if (nextIndex >=0 && nextIndex < this.designs.length)
        this.quickDisplay(null, nextIndex, true);
    },

    animate(elem, style, unit, from, to, time, prop) {
      if (!elem)
        return;
      var start = new Date().getTime();
      var timer = setInterval(function () {
        var step = Math.min(1, (new Date().getTime() - start) / time);
        if (prop) {
          elem[style] = (from + step * (to - from))+unit;
        } else {
          elem.style[style] = (from + step * (to - from))+unit;
        }
        if (step === 1) {
          clearInterval(timer);
        }
      }, 25);
      if (prop) {
        elem[style] = from+unit;
      } else {
        elem.style[style] = from+unit;
      }
    },

    changeFSMode(mode) {
      this.fsMode = mode;
    }
  }
}
</script>

<style lang="scss" scoped>
.component.designlist {
  .design-container {
    margin-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
  }

  .quick-display-container {
    margin-top: 10px;
    margin-bottom: 30px;
  }
}
</style>