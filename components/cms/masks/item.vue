<template>
  <div class="cmscomponent item mask">
    <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>
    <div v-if="item">
      <div class="title">
        <span><i class="far fa-edit"></i>&nbsp;&nbsp;ID: {{ item.id }}</span>
        <div>
          <b-button variant="outline-danger" size="sm" @click="deleteItem"><i class="fas fa-trash"></i>&nbsp;&nbsp;Delete</b-button>
          <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
        </div>
      </div>
      <hr>
      <form @submit.prevent="update">
        <div class="item-content">
          <div class="item-row">
            <div class="prop">Name (EN)</div>
            <div class="value">
              <b-input type="text" name="nameEN" v-model="item.translations[0].name" required></b-input>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Name (CH)</div>
            <div class="value">
              <b-input type="text" name="nameCH" v-model="item.translations[1].name" required></b-input>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Image</div>
            <div class="value">
              <div class="design-preview">
                <img :src="`/cloudfront/uploads/good/${item.image}`">
              </div>
              <b-form-file v-model="image.item" placeholder="Upload/Replace Image" @change="uploadImage($event)" v-show="!image.loading"></b-form-file>
              <b-spinner label="Loading..." v-show="image.loading"></b-spinner>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Sort Index</div>
            <div class="value">
              <b-input type="number" name="sort_order" v-model="item.sort_order" required></b-input>
            </div>
          </div>
        </div>
        <div class="item-actions">
          <b-button variant="primary" type="submit" :disabled="loading"><i class="far fa-edit"></i>&nbsp;&nbsp;Update</b-button>
        </div>
      </form>
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
      image: {
        item: null,
        loading: false
      }
    }
  },
  methods: {
    load() {
      this.$axios.$get(`/cms/goods/masks/${this.itemId}`)
        .then((response) => {
          this.item = response;
        });
    },

    cancel() {
      this.$emit('updated', { clearItemFrame: true });
    },

    uploadImage(e) {
      let formData = new FormData();
      formData.append('image', e.target.files[0]);

      this.image.loading = true;

      this.$axios.$post(`/cms/goods/masks/${this.itemId}/image`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.item = null;
          this.load();
          this.$toast.success('Image updated successfully');
          this.image.file = null;
          this.image.loading = false;
          this.$emit('updated', { refresh: true });
        }).catch((error) => {
          this.$toast.error(error.response.data.error.message);
        });
    },

    update(e) {
      this.loading = true;
      this.$axios.$patch(`/cms/goods/masks/${this.itemId}`, {
        sort_order: this.item.sort_order,
        nameEN: this.item.translations[0].name,
        nameCH: this.item.translations[1].name
      }).then((response) => {
        this.loading = false;
        this.$toast.success('Mask updated successfully');
        this.$emit('updated', { refresh: true });
      }).catch((error) => {
        this.loading = false;
        this.$toast.error(error.response.data.error.message);
      });
    },

    deleteItem() {
      this.$bvModal.msgBoxConfirm('Are you sure?', {centered: true, bodyClass: 'confirm-box-body', footerClass: 'confirm-box-footer'})
          .then(value => {
            if (value) {
              let itemId = this.itemId;
              this.$axios.$delete(`/cms/goods/masks/${itemId}`)
                .then((response) => {
                  this.$toast.success('Mask deleted successfully');
                  this.cancel();
                }).catch((error) => {
                  this.$toast.error(error.response.data.error.message);
                });
            }
          })
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
.cmscomponent.mask.item {
  .design-preview {
    margin-bottom: 5px;

    img {
      height: 100px;
    }
  }
}
</style>