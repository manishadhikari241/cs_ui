<template>
  <div>
    <b-modal id="modal-request" :title="request.name" size="md" centered hide-footer>
      <b-container>
        <div class="detail" v-if="request.status == 8">
          <div class="prop">Reject Message</div>
          <div class="value" style="color: #f30;">{{ request.message }}</div>
        </div>
        <div class="detail">
          <div class="prop">{{ $t('style_of_design') }}</div>
          <div class="value">{{ request.style }}</div>
        </div>
        <div class="detail" v-if="request.other_style">
          <div class="prop">{{ $t('other_styles') }}</div>
          <div class="value">{{ request.other_style }}</div>
        </div>
        <div class="detail">
          <div class="prop">{{ $t('your_detailed_briefing') }}</div>
          <div class="value">{{ request.briefing }}</div>
        </div>
        <div class="detail" v-if="request.tpx">
          <div class="prop">{{ $t('color_preferences_tpx') }}</div>
          <div class="value">{{ request.tpx }}</div>
        </div>
        <div class="detail" v-if="request.color_limit">
          <div class="prop">{{ $t('color_limitations_for_printing') }}</div>
          <div class="value">{{ request.color_limit }}</div>
        </div>
        <div class="detail">
          <div class="prop">{{ $t('your_product') }}</div>
          <div class="value">{{ request.product }}</div>
        </div>
        <div class="detail">
          <div class="prop">{{ $t('your_customers') }}</div>
          <div class="value">{{ request.age }}</div>
        </div>
        <div class="detail">
          <div class="prop">{{ $t('target_gender') }}</div>
          <div class="value">{{ request.gender }}</div>
        </div>
        <div class="detail">
          <div class="prop">{{ $t('your_market') }}</div>
          <div class="value">{{ request.country }}</div>
        </div>
        <div class="detail">
          <div class="prop">{{ $t('your_business') }}</div>
          <div class="value">{{ request.business }}</div>
        </div>
        <div class="detail">
          <div class="prop">{{ $t('reference_file') }}:</div>
          <div class="value file" v-if="request && request.files">
            <img v-for="(key,value) in request.files" :src="`${cloudfrontURL}/uploads/user/lib-request/${request.files[value].name}`">
          </div>
        </div>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: [
    'request'
  ],
  data() {
    return {
      cloudfrontURL: process.env.NUXT_ENV_CLOUDFRONT
    }
  }
}
</script>

<style lang="scss">
  .modal-title {
    width: 100%;
    text-align: center;
    font-weight: bold;
  }
#modal-request {
  header {
    background-color: $black;
    color: #fff;

    button {
      color: #fff;
    }
  }


  .detail {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    color: #000;
    display: flex;

    &:last-child {
      border-bottom: none;
    }

    .prop {
      width: 60%;
      flex-grow: 1;
    }

    .value {
      width: 40%;
      flex-grow: 1;
      word-break: break-all;
      display: flex;
    overflow: auto;
    }

    img {
      max-width: 100%;
    }
  }
}
</style>