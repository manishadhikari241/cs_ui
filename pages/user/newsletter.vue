<template>
    <div class="page user">
        <b-container>
            <b-row>
                <b-col md="3" class="ignorePrint">
                    <UserMenu/>
                </b-col>
                <b-col md="9">
                    <div class="content">
                        <div class="newsletter-container">
                            <div class="title">{{ $t('news_letter') }}</div>
                            <br>
                         <div class="description">
                 <p>{{$t('here_you_can')}}</p>
                 <p>{{$t('your_current_status')}}</p>
                                                      
                   </div>
                                               <br>

                      <h5 v-if="current != ''" class="date">
                        <strong class="m3-3">{{ $moment(current.created_at).format('DD-MM-YYYY') }} </strong> 
          <strong>{{current.subscribe == 1 ? $t('active_newsletter'):$t('inactive_newsletter')}}</strong> 
                        </h5>
                  <form @submit.prevent="addNewsletterStatus" class="form"><p class="control"><button type="submit" name="submit" class="button">
      {{current != '' ? current.subscribe == 1 ?$t('inactivate_newsletter'):$t('activate_newsletter'):$t('activate_newsletter')}}
      </button></p>

      </form>
            <h3  v-if="current != ''"  class="title-history">
    <p>{{$t('your_news_letter_history')}}</p>
  </h3>
             <b-table v-if="current != ''" class="payment-history" :items="newsletter" :fields="fields" :responsive="'md'" striped>

                                 <template v-slot:cell(created_at)="data">
                                    <span>{{ $moment(data.item.created_at).format('DD-MM-YYYY') }}</span>
                                </template>
                                <template v-slot:cell(subscribe)="data">
                                 <span v-if="data.item.subscribe==1" >{{ data.index == 0 ? $t('active_newsletter') + $t('current') :$t('active_newsletter')}}</span>
                                 <span v-if="data.item.subscribe==0" >{{ data.index == 0 ? $t('inactive_newsletter') + $t('current') :$t('inactive_newsletter')}}</span>


                                </template> 

                            </b-table>
            
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { BIconChevronLeft } from "bootstrap-vue";
import UserMenu from "~/components/menus/user-menu";

export default {
  middleware: "auth",
  components: {
    UserMenu,
    BIconChevronLeft
  },
  data() {
    return {
      newsletter: [],
      current: "",
      fields: [
        {
          key: "created_at",
          label: this.$t("newsletter_date")
        },
        {
          key: "subscribe",
          label: this.$t("newsletter_status")
        }
      ]
    };
  },
  methods: {
    load() {
      this.$axios
        .$get(`/users/${this.$auth.user.id}/newsletter`)
        .then(response => {
          this.newsletter = response;
          this.current = response[0] ? response[0] : "";
        });
    },
    addNewsletterStatus() {
      var message = this.current != '' ? this.current.subscribe == 1 ?this.$t('inactivate_message'):this.$t('activate_message'):this.$t('activate_message')

      this.$bvModal
        .msgBoxConfirm(message, {
          title: "a",
          hideHeaderClose: false,
          centered: true,
          headerClass: "confirm-box-header-confirm",
          bodyClass: "confirm-box-body-confirm",
          footerClass: "confirm-box-footer-confirm",
          okTitle: this.$t("btn_confirm"),
          cancelTitle: this.$t("btn_cancel"),
          buttonSize: "sm",
        })
        .then(value => {
          if (value) {
            this.$axios
              .$post(`/users/${this.$auth.user.id}/newsletter`)
              .then(response => {
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
.title-history {
  p {
    font-weight: 700;
    font-size: 25px;
  }
  margin: 35px 0px;
}

.page.user {
  .newsletter-container {
    .title {
      font-weight: 700;
      font-size: 25px;
    }

    button {
      font-size: 16px;
      color: #fff;
      border: 1px solid #363636;
      border-radius: 30px;
      padding: 5px 59px;
      background-color: #363636;
      font-weight: 700;
      outline: none;
      margin-top: 18px;
      @media screen and (max-width: 550px) {
        padding: 5px 33px;
      }
    }
  }
}
</style>
