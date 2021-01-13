<template>
  <div class="cmscomponent item request">
    <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>
    <div v-if="item">
      <div class="title ignorePrint">
        <span><i class="far fa-edit"></i>&nbsp;&nbsp;ID: {{ item.id }}</span>
        <div>
          <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
        </div>
      </div>
      <hr class="ignorePrint">
      <div class="invoice-container" v-if="item">
          <CmsInvoice :payment="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import CmsInvoice from '~/components/cms/cmsinvoice'
export default {
  props: ['itemId'],
  components: {
    CmsInvoice,
  },
  data() {
    return {
      item: null,
      loading: false,
      reject: {
        message: ''
      },
      approve: {
        id: ''
      }
    }
  },
  methods: {
    load() {
      this.$axios.$get(`/cms/payments/${this.itemId}`)
        .then((response) => {
          this.item = response;
        });
    },

    cancel() {
      this.$emit('updated', { clearItemFrame: true });
    },

  },
  watch: {
    itemId() {
      this.item = null;
      this.load();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
    });
  }
}
</script>

<style lang="scss" scoped>
.cmscomponent.item.request {}
</style>
