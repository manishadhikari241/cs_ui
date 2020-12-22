<template>
  <div class="cmscomponent item mask create">
    <div class="title">
      <span><i class="fas fa-plus"></i>&nbsp;&nbsp;ID: Add new mask</span>
      <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
    </div>
    <hr>
    <form @submit.prevent="create">
      <div class="item-content">
        <div class="item-row">
          <div class="prop">Name (EN)</div>
          <div class="value">
            <b-input type="text" name="nameEN" v-model="item.nameEN" required></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Name (CH)</div>
          <div class="value">
            <b-input type="text" name="nameCH" v-model="item.nameCH" required></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Name (EN)</div>
          <div class="value">
            <div class="design-preview" v-if="previewURL">
              <img :src="previewURL">
            </div>
            <b-form-file v-model="item.image" @change="generatePreview" required></b-form-file>
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
        <b-button variant="primary" type="submit" :disabled="loading"><i class="fas fa-plus"></i>&nbsp;&nbsp;Create</b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      item: {
        sort_order: 0,
        nameEN: '',
        nameCH: '',
        image: null
      },
      previewURL: null
    }
  },
  methods: {
    cancel() {
      this.$emit('updated', {clearItemFrame: true});
    },

    generatePreview(e) {
      const file = e.target.files[0];
      this.previewURL = URL.createObjectURL(file);
    },

    create() {
      let formData = new FormData();
      formData.append('sort_order', this.item.sort_order);
      formData.append('nameEN', this.item.nameEN);
      formData.append('nameCH', this.item.nameCH);
      formData.append('image', this.item.image);


      this.loading = true;
      this.$axios.$post('/cms/goods/masks', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.loading = false;
          this.$toast.success('New mask added successfully');
          this.cancel();
        }).catch((error) => {
          this.loading = false;
          this.$toast.error(error.response.data.error.message);
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.cmscomponent.mask.create {
  .design-preview {
    margin-bottom: 5px;

    img {
      height: 100px;
    }
  }
}
</style>