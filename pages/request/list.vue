<template>
  <div class="page request-list">
    <div class="component pageinfo">
      <div class="pageinfo-head">
        <h1 class="pageinfo-title">{{ $t('your_requests') }}</h1>
      </div>
      <p class="pageinfo-description-freereq">{{ $t('view_request_status') }}</p>
      <br><br>
      <div style="text-align: center" v-if="loading"><b-spinner type="grow" label="Loading..."></b-spinner></div>
      <div class="list" v-if="!loading">
        <b-row>

      <b-col md="3" sm="4">
        <a class="new-request" href="javascript:void(0)" @click="checkAndRedirect(localePath('/request/create'))">
            <div class="request_new" style="height:93%">
              <div class="icon">  <img src="~/assets/icons/add_symbol.jpeg" style="height:150px; width:150px"  />

              </div>
            </div>
         </a>
      </b-col>
          <b-col md="3" sm="4" v-for="request in requests" :key="request.id">
            <div :class="`request ${ request.status == 0 ? 'pending' : (request.status == 2 ? 'approved' : 'rejected') }`">
              <div class="icon" v-if="request.status == 0"><i class="fas fa-hourglass-end"></i></div>
              <div class="icon" v-if="request.status == 8"><i class="fas fa-times-circle"></i></div>
              <div v-if="request.status == 2">
                <nuxt-link v-if="request.status == 2" :to="localePath(`/collections/${request.collections[0].id}`)">

                <img v-if="request.collections.length && request.collections[0].moodboards.length" :src="`${cloudfrontURL}/uploads/lib/feed/moodboard${request.collections[0].moodboards[0].moodboard}`">
                  </nuxt-link>

              </div>
              <div v-if="request.status == 2" class="name-overlay">{{ request.name }}</div>
              <div v-if="request.status == 8" class="name-overlay">{{ request.name }}</div>
              <div v-if="request.status == 0" class="name-overlay">{{ request.name }}</div>
       
              <b-button class="btn-info" @click="showInfo(request)"><i class="fas fa-info"></i></b-button>
             <b-button v-if="request.status == 8" class="btn-delete" @click="deleteRequest(request.id)"><i class="fas fa-times"></i></b-button>

            </div>
          </b-col>
        </b-row>
      </div>
    </div>

    <RequestModal :request="selected" />
  </div>
</template>

<script>
import RequestModal from "~/components/modals/request";

export default {
  middleware: "auth",

  components: {
    RequestModal
  },
  data() {
    return {
      loading: false,
      requests: [],
      selected: {},
      cloudfrontURL: process.env.NUXT_ENV_CLOUDFRONT
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
      } else if (this.$auth.loggedIn && url == "/request/create") {
        this.$axios
          .$get(`/requests/collection/hasPending`)
          .then(response => {
            this.$router.push(url);
          })
          .catch(
            function(error) {
              this.$toast.error(error.response.data.error.message);
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
          centered: true,
          bodyClass: "confirm-box-body-confirm",
          footerClass: "confirm-box-footer-confirm",
            okTitle: this.$t('btn_no'),
          cancelTitle: this.$t('btn_no'),
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
    color: #bbb;
    font-size: 20px;

    a {
      color: #000 !important;
      font-weight: 700;
      text-decoration: none;
      display: inline-block;
    }
  }
}
.modal-content{
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
    .request_new {
      width: 100%;
      min-height: 265px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 20px;
    }

    .request {
      width: 100%;
      min-height: 265px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 20px;

      &:not(.approved) {
        border: 2px solid #ddd;
        height: 93%;
      }

      .icon {
        font-size: 80px;
      }

      .btn-info {
        position: absolute;
        bottom: 10px;
        right: 10px;
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
      .btn-delete {
        position: absolute;
        top: 8px;
        right: 16px;
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
      }
    }
  }
}
</style>