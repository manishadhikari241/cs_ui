<template>
  <div class="component designtile" @click="navigateOrQuickDisplay">
    <img :src="`${serverURL}/api/v1/image/thumbnail/design/${design.code}/tiny`"
         :srcset="`${serverURL}/api/v1/image/thumbnail/design/${design.code}/tiny 400w, ${serverURL}/api/v1/image/thumbnail/design/${design.code} 800w`"
         sizes="(max-width: 479px) 48vw, 25vw">

    <div class="top100" v-if="isTop()">
      <span v-if="!topIndex">Top 100</span>
      <span v-if="topIndex">{{ topIndex }}</span>
    </div>
    <div class="overlay">
      <div class="actions-wrapper">
        <div class="actions md-hide">
          <button @click.stop="openList" :id="`design-list-${design.id}`">
            <b-icon-check></b-icon-check>
          </button>
          <button @click.stop="navigateOrQuickDisplay" :id="`design-download-${design.id}`">
            <b-icon-download></b-icon-download>
          </button>
        </div>
      </div>
    </div>
    <ListsPopover :design="design" :target="`design-list-${design.id}`"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BIconCheck, BIconDownload } from 'bootstrap-vue'
import ListsPopover from '~/components/popovers/lists'
import DownloadBTN from '~/components/download'

export default {
  props: [
    'design',
    'topIndex'
  ],
  components: {
    BIconCheck,
    BIconDownload,
    ListsPopover,
    DownloadBTN
  },
  computed: {
    ...mapState('app', ['init'])
  },
  data () {
    return {
      serverURL: process.env.NUXT_ENV_SERVER
    }
  },
  methods: {
    isTop () {
      return this.design.pseudo_downloads >= this.init.top100
    },

    checkAuth () {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show('modal-auth')
        return false
      }
      return true
    },

    openList () {
      if (this.checkAuth()) {
      }
    },

    download () {
      if (this.checkAuth()) {

      }
    },

    navigateToDesignPage () {
      this.$router.push(`${this.$i18n.locale == 'en' ? '/' : '/ch/'}designs/${this.design.code}`)
    },

    navigateOrQuickDisplay () {
      if (window.innerWidth <= 767) {
        this.navigateToDesignPage()
      } else {
        this.$emit('quickDisplay', this.design.id)
      }
    }
  }
}
</script>

<style lang="scss">
.component.designtile {
  position: relative;
  cursor: pointer;
  height: 100%;

  img {
    width: 100%;
    height: auto;
  }

  .top100 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 24px;
    line-height: 50px;
    color: #000;
    background-color: rgba(255, 255, 255, .7);
  }

  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .actions-wrapper {
    opacity: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    transition: all .2s;
  }

  .actions {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    background-color: rgba(255, 255, 255, .8);

    button {
      border: none;
      background: none;
      color: rgba(0, 0, 0, .5);
      font-size: 25px;
      font-weight: 600;
      outline: none;
      transition: color .2s;

      &:hover {
        color: #000;
      }
    }
  }

  &:hover {
    .actions-wrapper {
      opacity: 100;
    }
  }
}


@media screen and (max-width: 767px) {
  .component.designtile {
    .actions-wrapper {
      display: none;
    }
  }
}
</style>
