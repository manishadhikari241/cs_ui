<template>
    <div class="page request-list">
        <div class="component pageinfo">
            <div class="pageinfo-head">
                <h1 class="pageinfo-title">{{ $t('your_requests') }}</h1>
            </div>
            <p class="pageinfo-description-freereq">{{ $t('view_request_status') }}</p>
            <br><br>
            <div style="text-align: center" v-if="loading">
                <b-spinner type="grow" label="Loading..."></b-spinner>
            </div>
            <div class="list row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" v-if="!loading">
                <!-- <div class="d-flex flex-wrap justify-content-md-start justify-content-center"> -->

                    <div class="resp-block d-flex justify-content-center align-items-center">
                        <a class="new-request" href="javascript:void(0)"
                           @click="checkAndRedirect(localePath('/request/create'))">
                            <div class="request border-0">
                                <div class="icon"><img src="~/assets/icons/add_symbol.jpeg"/>

                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="resp-block" v-for="request in requests" :key="request.id">
                        <div :class="`request ${ request.status == 0 ? 'pending' : (request.status == 2 ? 'approved' : 'rejected') }`">
                            
                            <div class="icon" v-if="request.status == 0">

                                <i class="fas fa-hourglass-end"></i>
                                </div>
                            <div class="icon" v-if="request.status == 8"><i class="fas fa-times-circle"></i></div>
                            <div v-if="request.status == 2">
                                <nuxt-link v-if="request.status == 2"
                                           :to="localePath(`/collections/${request.collections[0].id}`)">

                                    <img v-if="request.collections.length && request.collections[0].moodboards.length"
                                         :src="`/cloudfront/uploads/lib/feed/moodboard${request.collections[0].moodboards[0].moodboard}`">
                                </nuxt-link>

                            </div>
                            <div v-if="request.status == 2" class="name-overlay">{{ request.name.substring(0, 10) }}</div>
                            <div v-if="request.status == 8" class="name-overlay">{{ request.name.substring(0, 10) }}</div>
                            <div v-if="request.status == 0" class="name-overlay">{{ request.name.substring(0, 10) }}</div>

                            <b-button class="btn-info" @click="showInfo(request)"><i class="fas fa-info"></i></b-button>
                            <b-button v-if="request.status == 8" class="btn-delete" @click="deleteRequest(request.id)">
                                       <b-icon-x></b-icon-x>
</b-button>

                        </div>
                    </div>
                       <!-- <div class="my-3 my-sm-2 mx-2 d-block d-sm-none">
                        <a class="new-request" href="javascript:void(0)"
                           @click="checkAndRedirect(localePath('/request/create'))">
                            <div class="request border-0">
                                <div class="icon"><img src="~/assets/icons/add_symbol.jpeg"
                                                       style="height:150px; width:150px"/>

                                </div>
                            </div>
                        </a>
                    </div> -->
                </div>
            <!-- </div> -->
        </div>

        <RequestModal :request="selected"/>
    </div>
</template>

<script>

import { BIconCheck, BIconDownload, BIconInfo, BIconX } from "bootstrap-vue";
import RequestModal from "~/components/modals/request";


export default {
  middleware: "auth",

  components: {
    RequestModal,
        BIconX
  },
  data() {
    return {
      loading: false,
      requests: [],
      selected: {}
    };
  },
  methods: {
    load() {
      this.loading = true;
      this.$axios
        .$get(
          `/requests/collection?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group`
        )
        .then(response => {
          this.loading = false;
          this.requests = response.data;
        });
    },

    checkAndRedirect(url) {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show("modal-auth");
      } else if (
        (this.$auth.loggedIn && url == "/request/create") ||
        url == "/ch/request/create"
      ) {
        this.$axios
          .$get(`/requests/collection/hasPending`)
          .then(response => {
            this.$router.push(url);
          })
          .catch(
            function(error) {
              this.$toast.error(this.$t("request_per_time"));
            }.bind(this)
          );
      } else {
        this.$router.push(url);
      }
    },
    showInfo(request) {
      this.selected = request;
      this.$bvModal.show("modal-request");
    },
    deleteRequest(id) {
      var message = this.$t("are_you_sure");

      this.$bvModal
        .msgBoxConfirm(message, {
          title: "a",
          hideHeaderClose: false,
          centered: true,
          headerClass: "confirm-box-header-confirm",
          bodyClass: "confirm-box-body-confirm",
          footerClass: "confirm-box-footer-confirm",
          okTitle: this.$t("btn_yes"),
          cancelTitle: this.$t("btn_no"),
          buttonSize: "sm"
        })
        .then(value => {
          if (value) {
            this.$axios
              .delete(`requests/collection/${id}/delete`)
              .then(response => {
                // this.$toast.success(response.data.message);
                this.load();
              });
          }
        });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  }
};
</script>

<style lang="scss" scoped>
.component.pageinfo {
  .pageinfo-description-freereq {
    max-width: 98%;
    margin: 0;
    padding: 0;
    // color: #bbb;
    font-size: 20px;

    a {
      color: #000 !important;
      font-weight: 700;
      text-decoration: none;
      display: inline-block;
    }
  }
  .pageinfo-title {
    font-weight: 700;
    font-size: 48.2px;
  }
}

@media screen and (max-width: 768px) {
  .component.pageinfo {
    .pageinfo-title {
      font-size: 30px;
      // white-space: break-spaces;
    }

    .pageinfo-description-freereq {
      font-size: 16px;
      max-width: 100%;
      @media screen and (max-width: 768px) {
        width: 100% !important;
      }
    }
  }
}

.modal-content {
  height: 200px;
}

.btn-sm {
  margin-right: 70px;
}

.page.request-list {
  .new-request {
    color: #212529;
  }
  .list {
    .resp-block {
      margin-bottom: 20px;
      @media screen and (max-width: 500px) {
        margin-bottom: 10px;
      }
    }
    .request_new {
      width: 100%;
      // min-height: 265px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 20px;
    }

    .request {
      // min-height: 265px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 20px;
      padding-left: 10px;
      padding-right: 10px;
      height: auto;
      width: 100%;
      margin: 0 auto;
      @media screen and (max-width: 500px) {
        height: auto;
        width: 100%;
        padding-left: 5px;
        padding-right: 5px;
      }
      //          @media screen and (max-width: 400px) and (min-width: 321px) {
      //     height: 328px;
      //     width: 328px;
      // }
      //     @media screen and (max-width: 470px) and (min-width: 401px) {
      //     height: 358px;
      //     width: 358px;
      // }

      //   @media screen and (max-width: 768px) and (min-width: 500px) {
      //     height: auto;
      //     width: 100%;
      //   }

      &:not(.approved) {
        border: 2px solid #ddd;
        height: 100%;
      }

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 80px;
        margin: 23px;

        img {
          max-width: 55%;
          height: auto;
        }
      }

      .btn-info {
        position: absolute;
        bottom: 10px;
        right: 15px;
        border: none;
        background: none;
        color: rgba(0, 0, 0, 0.5);
        transition: color 0.2s;
        outline: none;
        box-shadow: none;
        z-index: 999;
        font-size: 12px;
        &:hover {
          color: $black;
        }
              @media screen and (max-width: 500px) {
        right: 2px;
      }
      }
      .btn-delete {
        position: absolute;
        top: 0;
        right: 0;
        // font-size: 30px;
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

      .btn-visit-collection {
        position: absolute;
        bottom: 10px;
        left: 10px;
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

      img {
        width: 100%;
        height: 100%;
      }

      .name-overlay {
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
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .component.pageinfo {
    .pageinfo-title {
      font-size: 30px;
      // white-space: break-spaces;
    }

    .pageinfo-description-freereq {
      font-size: 16px;
      max-width: 100%;
      width: 100% !important;
    }
  }
}
</style>