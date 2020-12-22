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
          <div class="value">{{ item.group.user.email }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Name</div>
          <div class="value">{{ item.name }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Style</div>
          <div class="value">{{ item.style }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Other Style</div>
          <div class="value">{{ item.other_style }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Briefing</div>
          <div class="value">{{ item.briefing }}</div>
        </div>
        <div class="info-row">
          <div class="prop">TPX</div>
          <div class="value">{{ item.tpx }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Color Limit</div>
          <div class="value">{{ item.color_limit }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Product</div>
          <div class="value">{{ item.product }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Customers</div>
          <div class="value">{{ item.age }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Gender</div>
          <div class="value">{{ item.gender }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Country</div>
          <div class="value">{{ item.country }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Business</div>
          <div class="value">{{ item.business }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Website</div>
          <div class="value">{{ item.website }}</div>
        </div>
        <div class="info-row">
          <div class="prop">Status</div>
          <div class="value">
            <b-badge variant="success" v-if="item.status == 2">Approved</b-badge>
            <b-badge variant="info" v-else-if="item.status == 0">Pending</b-badge>
            <b-badge variant="danger" v-else>Rejected</b-badge>
          </div>
        </div>
        <div class="info-row">
          <div class="prop">File</div>
          <div class="value">
            <img v-if="item.files.length" style="height: 200px;" :src="`${cloudfrontURL}/uploads/user/lib-request/${item.files[0].name}`">
          </div>
        </div>
        <div class="info-row" v-if="item.status != 2">
          <div class="prop">Reject Message</div>
          <div class="value">
            <form v-if="item.status == 0" @submit.prevent="rejectRequest">
              <div>
                <b-textarea v-model="reject.message" style="width: 300px;" required></b-textarea>
                <br>
                <div style="text-align: right;">
                  <b-button variant="danger" size="sm" type="submit"><i class="fas fa-minus-circle"></i>&nbsp;&nbsp;Reject</b-button>
                </div>
              </div>
            </form>
            <div v-else>{{ item.message }}</div>
          </div>
        </div>
        <div class="info-row" v-if="item.status != 8">
          <div class="prop">Collection</div>
          <div class="value">
            <div v-if="item.status == 0">
              <b-input v-model="approve.id" style="width: 300px;" placeholder="Link Collection ID"></b-input>
              <br>
              <div style="text-align: right;">
                <b-button variant="success" size="sm" :disabled="!approve.id" @click="approveRequest"><i class="fas fa-thumbs-up"></i>&nbsp;&nbsp;Approve</b-button>
              </div>
            </div>
            <div v-else>
              <nuxt-link :to="`/cms/collections?id=${item.collections[0].id}`">
                <img v-if="item.collections.length && item.collections[0].moodboards.length" style="height: 200px;" :src="`${cloudfrontURL}/uploads/lib/feed/moodboard${item.collections[0].moodboards[0].moodboard}`">
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['itemId'],
  data() {
    return {
      item: null,
      loading: false,
      cloudfrontURL: process.env.NUXT_ENV_CLOUDFRONT,
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
      this.$axios.$get(`/cms/requests/collections/${this.itemId}`)
        .then((response) => {
          this.item = response;
        });
    },

    cancel() {
      this.$emit('updated', { clearItemFrame: true });
    },

    rejectRequest() {
      this.loading = true;
      this.$axios.$post(`/cms/requests/collections/${this.itemId}/reject`, { message: this.reject.message })
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

    approveRequest() {
      this.loading = true;
      this.$axios.$post(`/cms/requests/collections/${this.itemId}/approve`, { collectionID: this.approve.id })
        .then((response) => {
          this.loading = false;
          this.$toast.success('Request approved');
          this.$emit('updated', { refresh: true });
          this.load();
        }).catch((error) => {
          this.loading = false;
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