<template>
    <div class="component simulator">
        <div style="text-align: center" v-if="!loaded">
            <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
        <b-container v-if="loaded">
            <b-row>
                <b-col md="6">
                   <DesignSlider ref="designSlider" :mode="'simulator'" :designURL="designURL" :designCode="design ? design.code : null" :mask="byProductMask != '' ? byProductMask : currentMaskIndex !== null ? (tab === 1 ? goods[currentMaskIndex] : requests[currentMaskIndex]['good']) : null" />
                       <!-- <DesignSlider ref="designSlider" :mode="'simulator'" :designURL="designURL" :designCode="design ? design.code : null" :mask="currentMaskIndex !== null ? (tab === 1 ? goods[currentMaskIndex] : requests[currentMaskIndex]['good']) : null" /> -->
                    <br/>
                </b-col>
                <b-col md="6">
                    <div class="masks-container">
                <div class="upload-download-col d-md-none d-lg-none">
                    <input id="simulatorCanvasFileUploader" hidden type="file" @change="onCanvasUploadChange">
                    <b-button @click="revokeCanvasFileUploader" class="btn-upload-design" v-if="mode == 'simulator'">
                        <b-icon-upload></b-icon-upload>&nbsp;&nbsp;{{ $t('upload_design') }}
                    </b-button>
                    <b-button @click="saveCanvasResult" class="btn-save-result" :disabled="mode == 'simulator' && !canvas.uploadedFile">
                        <i class="far fa-save"></i>&nbsp;&nbsp;{{$t('save_result')}}
                    </b-button>
                     <b-button @click="dragToBoard" class="btn-drag-to-board" :disabled="!dragToBoardEnabled && !canvas.uploadedFile" v-if="mode == 'simulator' || dragToBoardEnabled">
                        {{$t('drag_to_board')}}
                    </b-button>
                </div>
                        <div class="tab-buttons">
                            <b-button @click="switchTab(1)" :class="{ active: tab === 1 }">{{ $t("library") }}</b-button>
                            <b-button @click="switchTab(2)" :class="{ active: tab === 2 }">{{ $t("your_products") }}</b-button>
                        </div>
                        <br class="break-slider"/>
                        <div class="goods-list" v-if="tab === 1">
                            <div class="good-container plus">
                                <b-button @click="plusButtonClicked = true; switchTab(2)">
                                    <b-spinner type="grow" label="Spinning" v-if="awaitingPlusButtonResolve"></b-spinner>
                                    <b-icon-plus-circle-fill v-else></b-icon-plus-circle-fill>
                                </b-button>
                            </div>
                            <div class="good-container" v-for="(good, $index) in goods" :key="`good-container-${$index}`" @click="setMask($index)" :style="`background-image: url(${getGoodBackgroundURL()})`">
                                <img class="img-fluid" :src="`/cloudfront/uploads/good/${good.image}`"/>
                            </div>
                        </div>
                        <div v-if="tab === 2">
                            <div v-if="!requestFormVisible">
                                <div class="requests-empty-cover" v-if="!requests.length">
                                    <div><img src="@/assets/simulator-empty.png"/></div>
                                    <br/>
                                    <p>{{ $t("do_you_want_to_simulate") }}</p>
                                    <p>{{ $t("buy_quota_and_simulate_now") }}</p>
                                    <br/>
                                    <b-button class="start-now" @click="showRequestForm()">{{ $t("start_now") }}</b-button>
                                </div>
                                <div class="goods-list" v-else>
                                    <div class="good-container plus">
                                        <b-button @click="showRequestForm()">
                                            <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
                                        </b-button>
                                    </div>
                                    <div class="good-container" v-for="(request, $index) in requests" :key="`request-container-${$index}`" @click="setMask($index)" :style="`background-image: url(${getGoodBackgroundURL()})`">
                                        <img v-if="request.good" :src="`/cloudfront/uploads/good/${request.good.image}`" />
                                        <img v-if="!request.good" :src="`/cloudfront/uploads/good-request/${request.image}`" />
                                        <img v-if="!request.good && !request.message" class="pending" src="~@/assets/icons/pending.png" />
                                        <img v-if=" !request.good && request.message && deletingGoodRequestIndex != $index" class="rejected" @click="showRequestDetails(request, $index)" src="~@/assets/icons/x.png" />
                                        <b-spinner v-if="!request.good && request.message && deletingGoodRequestIndex == $index" class="rejected" type="grow" label="Loading..."></b-spinner>
                                    </div>
                                </div>
                            </div>
                            <div v-if="requestFormVisible">
                                <form class="requestForm" @submit.prevent="submitRequest">
                                    <div>
                                        <b-button @click="requestFormVisible = false" class="go-back"><b-icon-chevron-left></b-icon-chevron-left>{{ $t("back") }}</b-button>
                                    </div>
                                    <br class="break-slider"/>
                                    <p class="title ">{{ $t("add_your_product_into_simulator") }}<b-icon-info @click="showGuide"></b-icon-info></p>
                                    <guideLine></guideLine>
                                    <div class="input-container">
                                        <b-input :placeholder="$t('product_name')" autocomplete="off" v-model="request.name"></b-input>
                                    </div>

                                    <div class="input-container">
                                        <b-form-file class="inputImage" v-model="request.image" :browse-text="$t('browse')" :state="Boolean(request.preview)" :placeholder="$t('upload_or_drop')" drop-placeholder="Drop file here..." @change="generatePreview"></b-form-file>
                                            <small class="d-block d-lg-none">{{
                                    $t("upload_or_drop")
                                    }}
                                </small>
                                    </div>

                                    <div class="input-container">
                                        <b-input :placeholder="$t('where_on_your_product')" autocomplete="off" v-model="request.remarks"></b-input>
                                    </div>
                                    <b-row>
                                        <b-col cols="8">
                                            <p class="notice">{{ $t("only_front_view_and_top") }}</p>
                                            <p class="notice">{{ $t("upload_a_square_image") }}</p>
                                        </b-col>
                                        <b-col cols="4">
                                            <div class="preview"><img :src="request.preview"/></div>
                                        </b-col>
                                    </b-row>
                                    <div class="actions">
                                        <b-button variant="success" class="upload" type="submit" :disabled="!formIsValid() || submitting">{{ $t("add_now") }}
                                            <span v-if="init.quota">({{ init.quota.simulator }})</span></b-button>
                                        <b-button class="reset" @click="resetRequest" :disabled="submitting">{{ $t("reset") }}</b-button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>

        <b-container class="simulator-footer" v-if="loaded">
<!--            <br class="break-slider">-->
<!--            <br class="break-slider">-->
            <b-row>
                <b-col md="6" class="upload-download-col">
                    <input id="simulatorCanvasFileUploader" type="file" @change="onCanvasUploadChange">
                    <b-button @click="revokeCanvasFileUploader" class="btn-upload-design" v-if="mode == 'simulator'">
                        <b-icon-upload></b-icon-upload>&nbsp;&nbsp;{{ $t('upload_design') }}
                    </b-button>
                    <b-button @click="saveCanvasResult" class="btn-save-result" :disabled="mode == 'simulator' && !canvas.uploadedFile">
                        <i class="far fa-save"></i>&nbsp;&nbsp;{{$t('save_result')}}
                    </b-button class="">
                            <b-button @click="dragToBoard" class="btn-drag-to-board d-md-block d-lg-none" :disabled="!dragToBoardEnabled && !canvas.uploadedFile" v-if="mode == 'simulator' || dragToBoardEnabled">
                        {{$t('drag_to_board')}}
                    </b-button>
                </b-col>
                <b-col md="6" class="drag-to-board-col d-none d-xl-flex d-lg-flex ">
                    <b-button @click="dragToBoard" class="btn-drag-to-board" :disabled="!dragToBoardEnabled && !canvas.uploadedFile" v-if="mode == 'simulator' || dragToBoardEnabled">
                        {{$t('drag_to_board')}}
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapState } from "vuex";
import DesignSlider from "~/components/designslider";
import {
  BIconPlusCircleFill,
  BIconChevronLeft,
  BIconUpload
} from "bootstrap-vue";
import { BIconInfo } from "bootstrap-vue";
import guideLine from "~/components/modals/guideline";
import Guideline from "./modals/guideline";

export default {
  props: ["design", "mode"],
  components: {
    Guideline,
    DesignSlider,
    BIconPlusCircleFill,
    BIconChevronLeft,
    BIconInfo,
    BIconUpload,
    guideLine
  },
  computed: {
    ...mapState("app", ["init"])
  },
  data() {
    return {
      loaded: false,
      byProductMask: "",

      designURL: require("~/assets/empty.jpg"),

      dragToBoardEnabled: false,

      tab: 1,
      currentMaskIndex: null,
      goods: null,
      requests: null,
      requestFormVisible: false,
      request: {
        name: "",
        image: null,
        remarks: "",
        preview: ""
      },
      submitting: false,
      deletingGoodRequestIndex: null,

      canvas: {
        uploadedFile: null
      },

      plusButtonClicked: false,
      awaitingPlusButtonResolve: false
    };
  },
  methods: {
    showGuide() {
      this.$bvModal.show("guide");
    },

    load() {
      this.$axios.$get("/goods").then(response => {
        this.goods = response.goods;
        this.requests = response.requests;
        this.setRandomMask();
        this.loaded = true;
        this.$emit("loaded");
      });
    },

    switchTab(tab) {
      if (tab == 2) {
        if (!this.$auth.loggedIn) {
          this.$bvModal.show("modal-auth");
          return false;
        } else {
          this.currentMaskIndex = null;
          if (!this.requests.length) {
            if (this.init.quota.simulator) this.showRequestForm();
          }
        }
      } else {
        this.currentMaskIndex = 0;
      }
      this.tab = tab;
    },

    setRandomMask() {
      this.currentMaskIndex = Math.floor(Math.random() * this.goods.length);
    },

    setMask(index) {
      this.currentMaskIndex = index;
      this.byProductMask = "";
    },

    getGoodBackgroundURL() {
      if (this.design) return `/api/v1/image/detail/design/${this.design.code}`;
      else return this.designURL;
    },

    showRequestForm() {
      let self = this;
      this.$store.dispatch("app/checkQuota", function(quota) {
        if (quota.simulator > 0) self.requestFormVisible = true;
        else {
          // self.$toast.error(self.$t("not_enough_quota"));
          self.$bvModal.show("modal-payments");
          self.$store.commit("payments/setPackage", {
            key: "simulator",
            index: 1
          });
        }
      });
    },

    showRequestDetails(request, index) {
      const h = this.$createElement;
      const message = h("div", {
        domProps: {
          innerHTML: `${this.$t("could_not_add_simulator")}.<br>${this.$t(
            "reason"
          )}: <strong>${request.message}</strong>`
        }
      });
      this.$bvModal
        .msgBoxConfirm(message, {
          title: "a",
          hideHeaderClose: false,
          centered: true,
          headerClass: "confirm-box-header-confirm",
          bodyClass: "confirm-box-body",
          footerClass: "confirm-box-footer",
          okVariant: "delete-btn",
          cancelVariant: "cancel-btn",
          okTitle: this.$t("delete"),
          cancelTitle: this.$t("cancel")
        })
        .then(value => {
          if (value) {
            this.deletingGoodRequestIndex = index;
            this.$axios
              .$delete(`/goods/request/${request.id}`)
              .then(response => {
                // this.$toast.success("Request deleted successfully");
                this.deletingGoodRequestIndex = null;
                this.requests.splice(index, 1);
                this.currentMaskIndex = null;
              })
              .catch(error => {
                this.$toast.error(error.response.data.error.message);
              });
          }
        });
    },

    generatePreview(e) {
      const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
      // validate mimetype
      if (file.type != "image/jpeg" && file.type != "image/png") {
        this.request.preview = "";
        this.request.image = null;
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
            self.request.preview = "";
            self.request.image = null;
          }
        };
      };
      this.request.preview = URL.createObjectURL(file);
    },

    formIsValid() {
      return (
        this.request.name &&
        this.request.image &&
        this.request.remarks &&
        Boolean(this.request.preview)
      );
    },

    resetRequest() {
      this.request.name = "";
      this.request.image = null;
      this.request.remarks = "";
      this.request.preview = "";
    },

    submitRequest() {
      let formData = new FormData();
      for (var key in this.request) formData.append(key, this.request[key]);
      this.submitting = true;
      this.$axios
        .$post("/goods/request", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
          this.submitting = false;
          // this.$toast.success("Request submitted successfully");
          this.$store.commit("app/updateQuota", {
            key: "simulator",
            delta: -1
          });
          this.resetRequest();
          this.requestFormVisible = false;
          this.requests.push(response);
          console.log(response);
        })
        .catch(error => {
          this.submitting = false;
          this.$toast.error(error.response.data.error.message);
          if (error.response.data.error.code == 4006) {
            this.$store.commit("payments/setPackage", {
              key: "simulator",
              index: 0
            });
            this.$bvModal.show("modal-payments");
          }
        });
    },

    paymentSuccess() {
      this.requestFormVisible = true;
    },

    revokeCanvasFileUploader() {
      document.getElementById("simulatorCanvasFileUploader").click();
    },

    onCanvasUploadChange(e) {
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
            self.canvas.uploadedFile = file;
            self.designURL = URL.createObjectURL(file);
          }
        };
      };
    },

    async saveCanvasResult() {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show("modal-auth");
        return false;
      }

      const el = this.$refs.designSlider.$refs.designContainer;
      const options = { type: "dataURL" };
      let data = await this.$html2canvas(el, options);

      var a = document.createElement("a");
      a.href = data;
      a.download = "Collectionstock_simulator.png";
      a.click();
    },

    dragToBoard() {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show("modal-auth");
        return false;
      }

      this.$emit("dragtoboard");
      if (this.dragToBoardEnabled)
        this.$store.commit("board/trigger", {
          container: this.$refs.designSlider.$refs.designContainer
        });
    },

    enableDragToBoard() {
      if (
        this.$route.name == "lists-id___en" ||
        this.$route.name == "lists-id___ch"
      ) {
        this.dragToBoardEnabled = true;
      } else {
        this.dragToBoardEnabled = false;
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.load();
      this.enableDragToBoard();
    });
  },
  created() {
    this.$nuxt.$on("setMaskGood", data => {
        console.log('pugiraxa')
        this.byProductMask = data;
    });

    this.$nuxt.$on("payment-success", this.paymentSuccess);
    this.$nuxt.$on("login", async () => {
      if (this.plusButtonClicked) this.awaitingPlusButtonResolve = true;
      await this.load();
      if (this.plusButtonClicked) {
        this.$store.dispatch("app/checkQuota", quota => {
          this.switchTab(2);
          if (quota.simulator > 0) this.requestFormVisible = true;
          this.plusButtonClicked = false;
          this.awaitingPlusButtonResolve = false;
        });
      }
    });
  }
};
</script>
<style lang="scss">
@media screen and (max-width: 768px) {
  .inputImage label span {
    color: transparent;
  }
  .break-slider {
    display: none;
  }
}
.simulator-footer {
  #simulatorCanvasFileUploader {
    display: none;
  }

  .upload-download-col {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    @media screen and (max-width: 768px) {
      justify-content: center;
      align-items: center;
      font-size: 12px;
      display: flex;
      flex-wrap: wrap;
      padding-right: 28px;
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  .drag-to-board-col {
    @media screen and (max-width: 768px) {
      align-items: flex-start;
    }
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 767px) {
      margin-right: 14px;
    }
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
    @media screen and (max-width: 768px) {
      margin-bottom: 10px;
      font-size: 14px;
    }

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
      @media screen and (max-width: 768px) {
        padding: 9px 37px;
      }
    }

    &.btn-drag-to-board {
      background: $black;
      color: #fff;
      border: none;
      @media screen and (max-width: 768px) {
        padding: 9px 34px;
      }
    }
  }
}

.modal-dialog {
  .confirm-box-body {
    text-align: center;
  }
  .confirm-box-body {
    text-align: center;
    padding-top: 40px;
  }
  .confirm-box-footer {
    height: 120px;
    padding-bottom: 50px;
    border-top: none;
    justify-content: center;
    .btn-cancel-btn {
      background-color: #363636;
      font-size: 13px;
      color: #363636;
      border: 1px solid #363636;
      border-radius: 30px;
      padding: 5px 45px;
      margin-left: -163px;
      background-color: white;
      font-weight: 700;
      margin-right: -163px;
      text-transform: uppercase;
      -webkit-appearance: none;
      outline: none !important;
    }
    .btn-delete-btn {
      background-color: #363636;
      font-size: 13px;
      color: white;
      border: 1px solid #363636;
      border-radius: 30px;
      padding: 5px 45px;
      margin-left: -163px;
      background-color: #363636;
      font-weight: 700;
      margin-right: -163px;
      text-transform: uppercase;
    }
  }
  .confirm-box-footer {
    border-top: none;
    justify-content: center;
    button {
      background: $black;
      color: #fff;
      border: none;
      outline: none;
    }
  }
}

.custom-file-label {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  color: #707070;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.custom-file .custom-file-label::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: block;
  height: calc(1.5em + 0.75rem);
  padding: 0.375rem 2.2rem;
  line-height: 1.5;
  color: #ffffff;
  content: "Browse";
  background-color: #9f9f9f;
  border-left: inherit;
  border-radius: 0 0.25rem 0.25rem 0;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #9f9f9f;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  @media screen and (max-width: 768px) {
    height: 31px;
  }
}

.component.simulator {
  //margin-top: 20px;
  .masks-container {
    .requests-empty-cover {
      text-align: center;
      padding-bottom: 20px;
      img {
        max-width: 100%;
      }
      p {
        margin: 2px;
        font-size: 18px;
        color: #bbb;
      }
      .start-now {
        width: 180px;
        border: none;
        border-radius: 30px;
        background: $brand;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        padding: 10px 0;
        text-transform: uppercase;
        box-shadow: 0 7px 10px rgba(0, 0, 0, 0.5);
        transition: all 0.2s;
        &:active {
          box-shadow: none;
        }
      }
    }
    .upload-download-col {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        margin-left: 15px;
        border: 1px solid $black;
        border-radius: 30px;
        font-size: 16px;
        font-weight: 700;
        padding: 8px 20px;
        text-transform: uppercase;
        transition: all 0.2s;
        @media screen and (max-width: 768px) {
          margin-bottom: 10px;
          font-size: 14px;
        }

        &:active {
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
        }

        &.btn-upload-design {
          background: #fff;
          color: $black;
        }
        &.btn-drag-to-board {
          @media screen and (max-width: 768px) {
            padding: 9px 34px;
          }
        }

        &.btn-save-result {
          background: $brand;
          color: #fff;
          border: none;
          @media screen and (max-width: 768px) {
            padding: 9px 37px;
          }
        }
      }
      @media screen and (max-width: 768px) {
        justify-content: center;
        align-items: center;
        font-size: 12px;
        display: flex;
        flex-wrap: wrap;
        margin-right: 14px;
        margin-bottom: 16px;
      }
    }
    .tab-buttons {
      border: 1px solid red;
      //   max-width: 480px;
      width: 100%;
      display: flex;
      border: 1px solid #aaa;
      border-radius: 6px;
      button {
        width: 50%;
        border-radius: 5px;
        border: none;
        outline: none;
        box-shadow: none;
        font-weight: 700;
        background-color: transparent;
        color: $black;
        &.active {
          color: #fff;
          background-color: $black;
        }
      }
    }
    .goods-list {
      //   max-width: 480px;
      width: 100%;
      max-height: 500px;
      overflow: auto;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .good-container {
        position: relative;
        width: 148px;
        height: 148px;
        margin-bottom: 11px;
        margin-right: 11px;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
        cursor: pointer;
        .pending,
        .rejected {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.7;
        }
        &.plus {
          button {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            border: none;
            background: none;
            outline: none;
            box-shadow: none;
            color: $black;
            font-size: 50px;
          }
        }
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .requestForm {
      @media screen and (max-width: 768px) {
        font-size: 11px;
        ::placeholder {
          font-size: 11px;
        }
      }
      .go-back {
        outline: none;
        background: none;
        border: 1px solid #000;
        border-radius: 30px;
        padding: 5px 30px;
        color: #363636;
        font-weight: 700;
        text-decoration: none;
        font-size: 14px;
        @media screen and (max-width: 768px) {
          font-size: 10px;
          width: 77px;
          height: 26px;
          padding: 5px 4px;
          margin-top: 5px;
        }

        svg {
          position: relative;
          left: -10px;
        }
      }
      .title {
        font-weight: 600;
        font-size: 18px;
        @media screen and (max-width: 768px) {
          font-size: 15px;
          margin-bottom: 0px;
          margin-top: 5px;
        }
        @media screen and (max-width: 550px) {
          font-size: 12px;
        }

        .bi-info {
          display: inline-block;
          overflow: visible;
          vertical-align: -0.15em;
          color: #818181;
          font-size: 23px;
          @media screen and (max-width: 550px) {
            font-size: 17px;
          }
        }
      }
      .input-container {
        width: 100%;
        margin: 5px 0;
        @media screen and (min-width: 1025px) {
          //   max-width: 80%;
        }
      }
      .notice {
        margin: 10px 0;
        font-size: 14px;
        @media screen and (max-width: 768px) {
          font-size: 11px;
        }
      }
      .preview {
        img {
          max-width: 100px;
          max-height: 100px;
        }
      }
      .actions {
        @media screen and (max-width: 768px) and (min-width: 600px) {
          display: flex;
          justify-content: center;
        }

        margin-top: 20px;
        text-align: center;
        button {
          border-radius: 30px;
          background-color: #000;
          color: #fff;
          width: 160px;
          font-weight: 600;
          margin-right: 10px;
          margin-bottom: 10px;
          border: none;
          text-transform: uppercase;
          outline: none;
          box-shadow: none;
          &.upload {
            background-color: $brand;
          }
          @media screen and (max-width: 768px) {
            font-size: 14px;
          }
        }
      }
    }
  }
}

.requestForm {
  ::placeholder {
    font-size: 16px;
  }
  font-size: 16px;

  @media screen and (max-width: 1024px) {
    font-size: 14px;
    ::placeholder {
      font-size: 14px;
    }
  }
  .preview {
    max-width: 200px;
  }

  .actions {
    button {
      height: 36px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
    margin-top: 30px;
    text-align: center;
    .send_application {
      border-radius: 30px;
      background-color: #363636;
      color: #fff;
      width: 220px;
      font-weight: 650;
      margin-right: 10px;
      margin-bottom: 10px;
      text-transform: uppercase;
      outline: none;
      border: none;
    }

    .back {
      border-radius: 30px;
      background-color: white;
      color: #363636;
      width: 165px;
      font-weight: 700;
      margin-right: 10px;
      margin-bottom: 10px;
      margin-left: 15px;
      text-transform: uppercase;
      outline: none;
      border: none;
      border: 1px solid #363636;

      a {
        color: inherit;
        text-decoration: none;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .component.simulator {
    .masks-container {
      .tab-buttons {
        width: 100%;
        margin-bottom: 5px;
        margin-top: 10px;

        button {
          font-size: 12.75px;
        }
      }
      .goods-list {
        width: 100%;
        max-height: 290px;
        .good-container {
          width: 87px;
          height: 87px;

          &.plus {
            button {
              font-size: 40px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
  .component.simulator {
    .masks-container {
      .tab-buttons {
        width: 100%;
      }
      .goods-list {
        width: 100%;
        max-height: 400px;
        .good-container {
          width: 123px;
          height: 123px;

          &.plus {
            button {
              font-size: 40px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 320px) {
  .component.simulator {
    .masks-container {
      .tab-buttons {
        width: 100%;

        button {
          font-size: 12.75px;
        }
      }
      .goods-list {
        width: 100%;
        .good-container {
          width: 110px;
          height: 110px;

          &.plus {
            button {
              font-size: 40px;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 500px) and (min-width: 321px) {
  .component.simulator {
    .masks-container {
      .tab-buttons {
        width: 100%;

        button {
          font-size: 12.75px;
        }
      }
      .goods-list {
        width: 100%;
        .good-container {
          width: 137px;
          height: 137px;

          &.plus {
            button {
              font-size: 40px;
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 1025px) {
  .component.simulator {
    .masks-container {
      .goods-list {
        width: 100%;
        max-height: 400px;
        .good-container {
          width: 160px;
          height: 169px;
        }
      }
    }
  }
}
</style>
