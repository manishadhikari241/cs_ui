<template>
  <div :class="`component designtile designtile-${isExclusive}`" @click="navigateOrQuickDisplay">
    <div v-if="!isExclusive" class="img-exclusive-false">
      <img v-if="!isExclusive" :src="`/api/v1/image/thumbnail/design/${design.code}/tiny`"
           :srcset="`/api/v1/image/thumbnail/design/${design.code}/tiny 400w, /api/v1/image/thumbnail/design/${design.code} 800w`"
           sizes="(max-width: 479px) 48vw, 25vw">
    </div>

    <div v-else class="img-exclusive-true">
      <!-- exclusive designs -->
      <img v-if="typeof design.id === 'number'" :src="`/api/v1/image/thumbnail/design/${design.code}/tiny`"
           :srcset="`/api/v1/image/thumbnail/design/${design.code}/tiny 400w, /api/v1/image/thumbnail/design/${design.code} 800w`"
           sizes="(max-width: 479px) 48vw, 25vw">
      <template v-else>
        <!-- pseudo design-->
        <!-- <img v-if="design.status == 0" src="~/assets/icons/hourglass.png" class="img-icons"> -->
        <div class="icon">
        <i  v-if="design.status == 0" class="fas fa-hourglass-end"></i>
        <i  v-if="design.status == 8" class="fas fa-times-circle"></i>
          </div>
      </template>
    </div>

    <div class="top100" v-if="isTop()">
      <span v-if="!topIndex">{{$t('top_100')}}</span>
      <span v-if="topIndex">{{ topIndex }}</span>
    </div>

    <div class="overlay">
      <div v-if="!isExclusive" class="actions-wrapper">
        <div class="actions md-hide">
          <button @click.stop="openList" :id="`design-list-${design.id}`">
            <b-icon-check></b-icon-check>
          </button>
          <button @click.stop="navigateOrQuickDisplay" :id="`design-download-${design.id}`">
            <b-icon-download></b-icon-download>
          </button>
        </div>
      </div>
      <template v-else>
        <div class="actions-wrapper-exclusive">
          <div class="actions md-hide">
            <div class="exclusive-bar" v-if="isExclusive">
              <span >{{ design.request_name.substring(0, 10) }}</span>
            </div>
            <button class="btn-info" @click.stop="showInfo">
<i class="fas fa-info"></i>
            </button>
          </div>
        </div>
        <button v-if="design.status == 8" class="btn-delete" @click.stop="deleteDesign">
          <b-icon-x></b-icon-x>
        </button>
      </template>
    </div>
    <ListsPopover :design="design" :target="`design-list-${design.id}`"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { BIconCheck, BIconDownload, BIconInfo, BIconX } from "bootstrap-vue";
import ListsPopover from "~/components/popovers/lists";
import DownloadBTN from "~/components/download";

export default {
  props: ["design", "topIndex", "isExclusive"],
  components: {
    BIconCheck,
    BIconDownload,
    BIconInfo,
    BIconX,
    ListsPopover,
    DownloadBTN
  },
  computed: {
    ...mapState("app", ["init"])
  },
  data() {
    return {};
  },
  methods: {
    isTop() {
      return this.design.pseudo_downloads >= this.init.top100;
    },

    checkAuth() {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show("modal-auth");
        return false;
      }
      return true;
    },

    openList() {
      if (this.checkAuth()) {
      }
    },

    download() {
      if (this.checkAuth()) {
      }
    },

    navigateToDesignPage() {
      this.$router.push(
        `${this.$i18n.locale == "en" ? "/" : "/ch/"}designs/${this.design.code}`
      );
    },

    navigateOrQuickDisplay() {
      if (typeof this.design.id === "number") {
        window.innerWidth <= 767
          ? this.navigateToDesignPage()
          : this.$emit("quickDisplay", this.design.id);
      }
    },

    showInfo() {
      console.log("hi");
      this.$emit("showInfo", this.design.request_id);
    },

    deleteDesign() {
      this.$emit("deleteDesign", this.design.request_id);
    }
  }
};
</script>

<style lang="scss" scoped>
.component.designtile {
  //position: relative;
  cursor: pointer;
  width: 100%;

  @media screen and (max-width: 767px) {
    margin: 0 auto;
  }

  //.designtile-true {
  //  @media screen and (max-width: 767px) {
  //    width: 250px;
  //  }
  //}

  .img-exclusive-true {
    display: flex;
    justify-content: center;
       img {
      width: 100%;
      height: auto;
    }

    .icon {
font-size: 80px;
    }
  }

  .img-exclusive-false {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .top100 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.7);
    line-height: 50px;
    font-size: 16px;
    font-weight: 700;
    color: $black;
    text-align: center;
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
    @media screen and (max-width: 550px) {
      justify-content: center;
      height: 28px;
      align-items: center;
      display: flex;
    }
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
    transition: all 0.2s;
  }

  .actions {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    background-color: rgba(255, 255, 255, 0.8);

    button {
      border: none;
      background: none;
      color: rgba(0, 0, 0, 0.5);
      font-size: 25px;
      font-weight: 600;
      outline: none;
      transition: color 0.2s;

      &:hover {
        color: #000;
      }
    }

    .btn-info {
      position: absolute;
      // bottom: 10px;
      right: 7px;
      font-size: 12px;
      border: none;
      background: none;
      color: rgba(0, 0, 0, 0.5);
      transition: color 0.2s;
      outline: none;
      box-shadow: none;
      z-index: 999;

      &:hover {
        color: $black;
      }
    }
  }

  &:hover {
    .actions-wrapper {
      opacity: 100;
    }
  }

  .actions-wrapper-exclusive {
    opacity: 90%;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    transition: all 0.2s;
    .actions {
      justify-content: center;
      align-items: center;
      display: flex;
      .exclusive-bar{
        font-size: 16px;
        font-weight: 700;
           @media screen and (max-width: 768px) {
        font-size: 14px;
    }
      }
    }
    @media screen and (max-width: 767px) {
      margin: 0 auto;
      //width: 250px;
    }
  }

  .btn-delete {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 30px;
    border: none;
    background: none;
    color: rgba(0, 0, 0, 0.5);
    transition: color 0.2s;
    outline: none;
    box-shadow: none;
    z-index: 999;

    &:hover {
      color: $black;
    }

    @media screen and (max-width: 768px) {
      font-size: 20px;
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
