<template>
  <div class="page simulator">
    <PageInfo :slug="'simulator'" />
    <span class="mb-2 d-block"></span>
    <Simulator ref="simulator" :designURL="url" @loaded="simulatorLoaded" />
    <div v-show="isSimulatorLoaded">
      <div class="simulator-footer">
        <br><br>
        <b-row>
          <b-col md="5" class="upload-download-col">
            <input id="simulatorFileUploader" type="file" @change="onUploadChange">
            <b-button @click="revokeFileUploader" class="btn-upload-design"><b-icon-upload></b-icon-upload>&nbsp;&nbsp;{{ $t('upload_design') }}</b-button>
            <b-button @click="saveResult" class="btn-save-result" :disabled="!uploadedFile"><i class="far fa-save"></i>{{$t('save_result')}}</b-button>
          </b-col>
          <b-col md="7" class="drag-to-board-col">
            <b-button @click="dragToBoard" class="btn-drag-to-board" :disabled="!uploadedFile">{{$t('drag_to_board')}}</b-button>
          </b-col>
        </b-row>
      </div>
      <br><br><br>
      <Board ref="board" />
    </div>
  </div>
</template>

<script>
import PageInfo from "~/components/pageinfo";
import Simulator from "~/components/simulator";
import Board from "~/components/board";
import { BIconUpload } from "bootstrap-vue";

export default {
  components: {
    PageInfo,
    Simulator,
    Board,
    BIconUpload
  },
  data() {
    return {
      isSimulatorLoaded: false,
      uploadedFile: null,
      url: require("~/assets/empty.jpg"),
      canvas: null
    };
  },
  methods: {
    simulatorLoaded() {
      this.isSimulatorLoaded = true;
    },

    revokeFileUploader() {
      document.getElementById("simulatorFileUploader").click();
    },

    onUploadChange(e) {
      const file = e.target.files[0];
      if (!file) return false;

      // validate mimetype
      if (file.type != "image/jpeg" && file.type != "image/png") {
        this.$toast.error(this.$t("file_format_incorrect"));
        e.preventDefault();
        return false;
      }
      // validate filesize
      var fileSize = (file.size / (1024 * 1024)).toFixed(2);
      if (fileSize > 5) {
        this.$toast.error(this.$t("file_format_incorrect"));
        e.preventDefault();
        return false;
      }
      // validate constraints
      var self = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function() {
          var height = this.height;
          var width = this.width;
          if (width != height) {
            self.$toast.error(self.$t("file_format_incorrect"));
          } else {
            self.uploadedFile = file;
            self.url = URL.createObjectURL(file);
          }
        };
      };
    },

    async saveResult() {
      const el = document.querySelector('.component.designSlider .designContainer');
      const options = {type: 'dataURL'};
      let data = await this.$html2canvas(el, options);

      var a = document.createElement("a");
      a.href = data;
      a.download = "CollectionStock_simulator.png";
      a.click();
    },

    dragToBoard() {
      this.$refs.board.addItem();
    }
  }
};
</script>

<style lang="scss" scoped>
#simulatorFileUploader {
  display: none;
}

.page.simulator {
  .upload-download-col, .drag-to-board-col {
    display: flex;
    align-items: center;
    justify-content: center;
  }


  button {
    margin-left: 15px;
    border: 1px solid $black;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 700;
    padding: 8px 20px;
    text-transform: uppercase;
    transition: all 0.2s;

    &:active {
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
    }

    &.btn-upload-design {
      background: #fff;
      color: $black;
    }

    &.btn-save-result {
      background: $brand;
      color: #fff;
      border: none;
    }

    &.btn-drag-to-board {
      background: $black;
      color: #fff;
      border: none;
    }
  }
}
</style>
