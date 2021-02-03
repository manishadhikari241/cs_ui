<template>
  <div>
    <b-modal id="modal-certificate" modal-class="cert-modal" size="lg" header-bg-variant="dark" header-text-variant="light" body-class="p-0" centered hide-footer>
<!--      <template #modal-title>-->
<!--        <span class="ml-5 ignorePrint">Exclusive Design Ownership Certificate</span>-->
<!--      </template>-->
      <template #modal-header="{ close }">
        <span class="modal-title">{{$t('exclusive_design_ownership_certificate')}}</span>
        <div class="action-buttons">
          <b-button @click="close()"><b-icon-x-circle-fill></b-icon-x-circle-fill></b-button>
        </div>
      </template>
      <template #default="{close}">
        <div class="title">
          <div class="row buttons d-flex">
            <button class="btn-back ignorePrint" @click="close()"><i
              class="fa fa-arrow-left" aria-hidden="true"></i> {{ $t('back') }}
            </button>
            <button size="sm" @click="print" :disabled="disabled" class="btn-print ignorePrint">{{$t('print_invoice')}}
              <img src="~/assets/icons/print_black.png" style="height:auto; width:20px"/>
            </button>
          </div>
        </div>

<!--        <div class="cert-header">-->
<!--          <div class="logo"><img alt="logo" src="~/assets/logo.svg"></div>-->
<!--          <div class="text mt-4"> <b>{{$t('cert_title')}}</b> </div>-->
<!--        </div>-->

<!--        <br>-->
        <!--      <hr>-->
        <div class="cert" v-if="cert">
          <b-container class="cert-header">
              <span class="logo"> <img alt="logo" src="~/assets/logo.png"> </span>
              <p class="text"> <b>{{$t('cert_title')}}</b> </p>
          </b-container>

          <b-container class="cert-details">
            <b-row>
              <b-col md="6">
                <img class="img-icons" :src="`${cert.img}`">
              </b-col>
              <b-col md="6" class="details">
                <div class="prop pt-0">{{ $t('cert_design') }}</div>
                <div class="value">{{ cert.design }}</div>
                <div class="prop">{{ $t('delivery_date') }}</div>
                <div class="value">{{ cert.delivery_date }}</div>
                <div class="prop">{{ $t('cert_owner') }}</div>
                <div class="value">{{ cert.first_name }} {{ cert.last_name }}</div>
                <div class="value">{{ cert.company }}</div>
                <div class="value">{{ cert.address1 }}</div>
                <div class="value">{{ cert.address2 }}</div>
                <div class="value">{{ cert.post_code }} {{ cert.city }}</div>
                <div class="value">{{ cert.country }}</div>
                <div class="value">{{ cert.email }}</div>
                <br>
              </b-col>
            </b-row>
          </b-container>

          <div class="cert-footer">
            <b-col>
              <div class="text mt-3"> <b>{{$t('important_ownership')}}</b> </div>
              <div class="text">
               {{$t('because_the_design_was_created')}}
              </div>
              <div class="text">
               {{$t('it_is_also_your_obligation')}}
              </div>
              <div class="text">
               {{$t('you_agree_to_accept_the_exclusive')}}
              </div>
            </b-col>
          </div>
        </div>

        <br>

<!--        <div class="cert-footer">-->
<!--          <b-container>-->
<!--            <b-col>-->
<!--              <div class="text mt-3"> <b>{{$t('important')}}</b> </div>-->
<!--              <div class="text">-->
<!--                Because the design was created on your specific request, you agree to the fullest extent permitted by law, to indemnify and keep the Studio indemnified, against any liabilities, costs, expenses, damages and losses (including any direct, indirect or consequential losses, loss of profit, loss of reputation and all interest, penalties and legal costs and all other professional costs and expenses) suffered or incurred by you arising out of the use of this Design, including any claim made against you for actual or alleged infringement of a third party intellectual property rights arising out of or in connection therewith.-->
<!--              </div>-->
<!--              <div class="text">-->
<!--                It is also your obligation and responsibility, as being the Owner of the Design, to check the possibility of copyright infringement before commercialising and/or bringing the design into the market.-->
<!--              </div>-->
<!--              <div class="text">-->
<!--                You agree to accept the Exclusive Request Terms and Conditions.-->
<!--              </div>-->
<!--            </b-col>-->
<!--          </b-container>-->
<!--        </div>-->
      </template>
    </b-modal>
  </div>
</template>

<script>
import { BIconXCircleFill } from 'bootstrap-vue'
import jspdf from 'jspdf'

export default {
  components: {
    BIconXCircleFill,
  },
  props: [
    'cert'
  ],
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    print () {
      // this.disabled = true
      // const width = document.querySelector('.modal-dialog').clientWidth
      // const height = document.querySelector('.modal-dialog').clientHeight
      // const pdf = new jspdf('p', 'px', [width, height]);
      // pdf.html(document.querySelector('.cert'), {
      //   callback: doc => {
      //     doc.save(`Exclusive Design ${this.cert.design}`)
      //     this.disabled = false
      //   }
      // })

      if (process.client) {
        document.title = `Exclusive Design ${this.cert.design}`
        window.print()
      }
    },
  }
}
</script>

<style lang="scss" scoped>

@media print {
  /deep/ .cert-modal > .modal-header {
   display: none;
  }

  /deep/ .cert-modal > .modal-dialog {
    max-width: 100%;
    margin: 0;
    top: 300px;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
    position: fixed;
    z-index: 100000;
  }
}

.title {
  font-size: 25px;
  font-weight: 700;
  color: $black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 15px;
  @media screen and (max-width: 767px) {
    font-size: 15px;
  }
}

.action-buttons {
  position: absolute;
  top: 6px;
  right: 20px;

  button {
    margin: 10px 0 0 10px;
    padding: 0;
    outline: none;
    border: none;
    background: transparent;
    font-size: 16px;
  }
}

.btn-print {
  background-color: white;
  color: $black;
  font-size: 16px;
  opacity: 1;
  border: 1px solid #363636;
  border-radius: 30px;
  padding: 2px 15px;
  font-weight: 700;
  text-transform: uppercase;
  outline: none;
  margin-right: 20px;
}

.btn-back {
  font-size: 16px;
  color: $black;
  border: 1px solid $black;
  border-radius: 30px;
  padding: 5px 19px;
  background-color: #fff;
  font-weight: 700;
  margin-right: 10px;
  outline: none;
}


.cert-header {
  padding-top: 15px;
  text-align: center;

  .logo {
    margin-bottom: 10px;

    img {
      height: 70px;
    }
  }

  .text {
    margin-top: 1rem;
  }
}

.cert-details {
  font-size: 14px;
.details{
  
  @media screen and (min-width: 990px) {
  margin-left:-45px;

  }
}
  .prop {
    font-weight: 700;
    padding: 10px;
  }

  .value {
    padding: 10px;
    margin-top: -18px;

    p {
      margin: 0;
      padding: 0;
    }

    .capitalize {
      text-transform: capitalize;
    }
  }
}

.cert-footer {
  padding: 10px;
  border-style: solid;
  border-color: #ebebeb;
    margin: 5px 47px;
      @media screen and (max-width: 768px) {
    margin: 5px 23px;

  }
    
  .logo {
    margin-bottom: 10px;

    img {
      height: 70px;
    }
  }

  .text {
    margin-bottom: 20px;
    color: #4a4a4a;
    font-size: 14px;
  }
}

.img-icons {
height: 275px;
    width: 275px;
  display: block;
    margin: 6px 34px;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    height: 200px;
    width: 200px;
    margin: 6px auto;
  }

  @media screen and (max-width: 767px) {
height: 292px;
    width: 96%;
    margin: 10px;
  }
}


//.modal-title {
//  width: 100%;
//  text-align: center;
//  font-weight: bold;
//  @media screen and (max-width: 768px) {
//    font-size: 18px;
//  }
//}

//#modal-request {
//  header {
//    background-color: $black;
//    color: #fff;
//
//    button {
//      color: #fff;
//    }
//  }
//
//
//  .detail {
//    padding: 10px 0;
//    border-bottom: 1px solid #ddd;
//    font-size: 14px;
//    color: #000;
//    display: flex;
//    @media screen and (max-width: 768px) {
//      font-size: 12px;
//    }
//
//    &:last-child {
//      border-bottom: none;
//    }
//
//    .prop {
//      width: 60%;
//      flex-grow: 1;
//      @media screen and (max-width: 500px) {
//        width: 30%;
//        margin-right: 20px;
//
//      }
//    }
//
//    .value {
//      width: 40%;
//      flex-grow: 1;
//      word-break: break-all;
//      display: flex;
//      overflow: auto;
//    }
//
//    img {
//      max-width: 100%;
//    }
//  }
//}
</style>
