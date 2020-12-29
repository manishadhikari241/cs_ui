<template>
  <div class="page request-list">
    <div class="component pageinfo">
      <div class="pageinfo-head">
        <h1 class="pageinfo-title">{{ $t('your_designs_page') }}</h1>
      </div>
      <p class="pageinfo-description-exclusive">{{ $t('here_you_can_view') }}</p>
      <br><br>
      <div style="text-align: center" v-if="loading"><b-spinner type="grow" label="Loading..."></b-spinner></div>
      <div class="list" v-if="!loading">
        <b-row>
               <b-col md="3" sm="4">
        <a class="new-request" href="javascript:void(0)"  @click="checkQuota( () => { checkAndRedirect(localePath('/exclusive/create')) } )">
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
                         <nuxt-link  :to="localePath(`/designs/${request.designs[0].code}`)">
                               <img v-if="request.designs.length" :src="`${serverURL}/api/v1/image/thumbnail/design/${request.designs[0].code}/tiny`">
              </nuxt-link>
          
              </div>
              <div v-if="request.status == 2" class="name-overlay">{{ request.name }}</div>
                    <div v-if="request.status == 8" class="name-overlay">{{ request.name }}</div>
              <div v-if="request.status == 0" class="name-overlay">{{ request.name }}</div>
     
              <b-button class="btn-info" @click="showInfo(request)"><i class="fas fa-info"></i></b-button>
                 <b-button v-if="request.status == 8" class="btn-delete" @click="deleteDesign(request.id)"><i class="fas fa-times"></i></b-button>
            </div>
          </b-col>
        
        </b-row>
         <!-- <b-container class="designs">
           {{allDesign}}
      <client-only>
        <DesignList :designs="allDesign" v-if="mode == 'grid'" />
        <b-table :items="allDesign" :fields="fields" :responsive="'md'" striped v-if="mode == 'table'">
          <template v-slot:cell(design)="data">
            <img class="design-preview" :src="`https://dev.collectionstock.com/api/v1/image/thumbnail/design/${data.item.code}/tiny`">
          </template>
        </b-table>
        <infinite-loading @infinite="loadMore" ref="infload"></infinite-loading>
      </client-only>
    </b-container> -->
      </div>
    </div>

    <RequestModal :request="selected" />
  </div>
</template>

<script>
import RequestModal from "~/components/modals/request";
import { mapState } from "vuex";
import DesignList from "~/components/designlist";

export default {
  middleware: "auth",
  components: {
    RequestModal,
    DesignList
  },
  data() {
    return {
      loading: false,

      requests: [],
      selected: {},
      cloudfrontURL: process.env.NUXT_ENV_CLOUDFRONT,
      serverURL: process.env.NUXT_ENV_SERVER,
      plan: {
        selected: 0
      },
      mode: "grid",
      type: "all",
      fields: [
        {
          key: "design",
          label: "ITEMS"
        },
        {
          key: "code",
          label: "CS CODE"
        },
        {
          key: "designer_id",
          label: "CREATOR"
        },
        {
          key: "actions",
          label: ""
        }
      ],
      designs: [],
      allDesign:''
    };
  },
  methods: {
    load() {
      this.loading = true;
      this.$axios
        .$get(
          `/requests/exclusive?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group`
        )
        .then(response => {
          this.loading = false;
          this.requests = response.data;
          this.designs= response.data;
           let designs = [];
          response.data.forEach(element => {
            designs.push(element.designs[0]);
          });
          this.allDesign=designs;
        });
    },
    deleteDesign(id) {
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
              .delete(`requests/exclusive/${id}/delete-reject`)
              .then(response => {
                this.$toast.success(response.data.message);
                this.load();
              });
          }
        });
    },
    buy() {
      if (!this.$auth.loggedIn) this.$bvModal.show("modal-auth");
      else {
        this.$bvModal.show("modal-payments");
        this.$store.commit("payments/setPackage", {
          key: "exclusive",
          index: this.plan.selected
        });
      }
    },

    checkQuota(callback) {
      if (this.init.quota["exclusive"] <= 0) {
        this.$toast.error(this.$t("not_enough_quota"));
        this.buy();
      } else callback();
    },

    checkAndRedirect(url) {
      if (!this.$auth.loggedIn) this.$bvModal.show("modal-auth");
      else this.$router.push(url);
    },
    showInfo(request) {
      this.selected = request;
      this.$bvModal.show("modal-request");
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  },
  computed: {
    ...mapState("app", ["init"])
  }
};
</script>

<style lang="scss" scoped>
.component.pageinfo {

  .pageinfo-description-exclusive {
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
    .pageinfo-title {
        font-weight: 700;
        font-size: 48.2px;
    }
}
.page.request-list {
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
        border: 1px solid #ddd;
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

@media screen and (max-width: 768px) {
    .component.pageinfo {

        .pageinfo-title {
            font-size: 30px;
            // white-space: break-spaces;
        }

        .pageinfo-description-exclusive {
            font-size: 16px;
            max-width: 100%;
            @media screen and (max-width: 768px) {
                width: 100% !important;
            }
        }
    }

}
</style>