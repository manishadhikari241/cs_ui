<template>
  <div class="cmscomponent item request">
    <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>
    <div v-if="item">
      <div class="title">
        <span><i class="far fa-edit"></i>&nbsp;&nbsp;ID: {{ item.id }}</span>
        <div>
          <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
        </div>
      </div>
      <hr>
      <div class="general">
        <div class="info-row">
          <div class="prop">Requested By</div>
          <div class="value">{{ item.user.email }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Name</div>
          <div class="value">{{ item.name }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Remarks</div>
          <div class="value">{{ item.remarks }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Image</div>
          <div class="value">
            <img style="height: 200px;" :src="`/cloudfront/uploads/good-request/${item.image}`">
            <div>
              <a :href="`/cloudfront/uploads/good-request/${item.image}`" target="_blank">
                <b-button size="sm" variant="primary">
                  <b-icon-download></b-icon-download>&nbsp;&nbsp;
                  Download
                </b-button>
              </a>
            </div>
          </div>
        </div>
        <div class="info-row">
          <div class="prop">Status</div>
          <div class="value">
            <b-badge variant="success" v-if="getStatus() == 2">Approved</b-badge>
            <b-badge variant="info" v-else-if="getStatus() == 0">Pending</b-badge>
            <b-badge variant="danger" v-else>Rejected</b-badge>
          </div>
        </div>
        <div class="info-row" v-if="getStatus() == 2">
          <div class="prop">Mask</div>
          <div class="value">
            <img style="height: 200px;" :src="`/cloudfront/uploads/good/${item.good.image}`">
          </div>
        </div>
        <div class="info-row" v-if="getStatus() == 8">
          <div class="prop">Reject Message</div>
          <div class="value">
            <span>{{ item.message }}</span>
          </div>
        </div>
        <div class="info-row" v-if="getStatus() == 0">
          <div class="prop">Reject Message</div>
          <div class="value">
            <form @submit.prevent="rejectRequest">
              <div>
                <b-textarea v-model="reject.message" style="width: 300px;" required></b-textarea>
                <br>
                <div style="text-align: right;">
                  <b-button variant="danger" size="sm" type="submit"><i class="fas fa-minus-circle"></i>&nbsp;&nbsp;Reject</b-button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="info-row" v-if="getStatus() == 0">
          <div class="prop">Approve</div>
          <div class="value">
            <b-form-file v-model="approve.image" placeholder="Upload/Replace Image" @change="approveRequest($event)" v-show="!approve.loading"></b-form-file>
            <b-spinner label="Loading..." v-show="approve.loading"></b-spinner>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconDownload } from 'bootstrap-vue';

export default {
  props: ['itemId'],
  components: { BIconDownload },
  data() {
    return {
      item: null,
      loading: false,
      reject: {
        message: ''
      },
      approve: {
        image: null,
        loading: false
      }
    }
  },
  methods: {
    load() {
      this.$axios.$get(`/cms/goods/requests/${this.itemId}`)
        .then((response) => {
          this.item = response;
        });
    },

    cancel() {
      this.$emit('updated', { clearItemFrame: true });
    },

    getStatus() {
      if (this.item.good_id)
        return 2;
      if (!this.item.good_id && !this.item.message)
        return 0;
      return 8;
    },

    rejectRequest() {
      this.loading = true;
      this.$axios.$post(`/cms/goods/requests/${this.itemId}/reject`, { message: this.reject.message })
        .then((response) => {
          this.loading = false;
          this.$toast.success('Request rejected');
          this.$emit('updated', { refresh: true });
          this.load();
        }).catch((error) => {
          this.loading = false;
          this.$toast.error(error.response.data.error.message);
        });
    },

    approveRequest(e) {
      let formData = new FormData();
      formData.append('image', e.target.files[0]);

      this.approve.loading = true;
      this.$axios.$post(`/cms/goods/requests/${this.itemId}/approve`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.approve.loading = false;
          this.approve.image = null;
          this.$toast.success('Request approved');
          this.$emit('updated', { refresh: true });
          this.load();
        }).catch((error) => {
          this.approve.loading = false;
          this.approve.image = null;
          this.$toast.error(error.response.data.error.message);
        });
    }
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
.cmscomponent.item.request {
  .general {
    .info-row {
      display: flex;
      padding: 10px 0;
      margin-bottom: 10px;
      border-bottom: 1px dashed #ccc;
      font-size: 14px;

      .prop {
        width: 200px;
        font-weight: 600;
      }
    }
  }
}
</style>