<template>
  <div class="page simulator">
    <PageInfo :slug="'simulator'" />
    <br><br>
    <Simulator ref="simulator" :designURL="url" @loaded="simulatorLoaded" />
    <div class="simulator-footer" v-show="isSimulatorLoaded">
      <hr>
      <input id="simulatorFileUploader" type="file" @change="onUploadChange">
      <b-button @click="revokeFileUploader" class="btn-upload-design"><b-icon-upload></b-icon-upload>&nbsp;&nbsp;{{$t('upload_design')}}</b-button>
    </div>
  </div>
</template>

<script>
import PageInfo from "~/components/pageinfo";
import Simulator from "~/components/simulator";
import { BIconUpload } from "bootstrap-vue";

export default {
  components: {
    PageInfo,
    Simulator,
    BIconUpload
  },
  data() {
    return {
      isSimulatorLoaded: false,
      url: require("~/assets/empty.jpg"),
      canvas: null
    };
  },
  methods: {
    onUploadChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },

    simulatorLoaded() {
      this.isSimulatorLoaded = true;
    },

    // async downloadMaskedImage() {
    //   const el = document.querySelector('.component.designSlider .designContainer');
    //   const dimension = 1000;
    //   const options = {type: 'dataURL', width: dimension, height: dimension};
    //   let data = await this.$html2canvas(el, options);
    // },

    revokeFileUploader() {
      document.getElementById("simulatorFileUploader").click();
    }
  }
};
</script>

<style lang="scss" scoped>
#simulatorFileUploader {
  display: none;
}

.page.simulator {
  .btn-upload-design {
    width: 200px;
    margin-left: 15px;
    border: 1px solid $black;
    border-radius: 30px;
    background: #fff;
    color: $black;
    font-size: 16px;
    font-weight: 700;
    padding: 8px 0;
    text-transform: uppercase;
    transition: all 0.2s;

    &:active {
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>