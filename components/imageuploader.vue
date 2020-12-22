<template>
  <div class="component imageUploader">
    <div class="imageContainter" @click="revokeFileUploader">
      <img v-if="url " :src="`${baseURL || imgBaseURL}/${url}`">
      <b-form-file class="fileInput" ref="fileInput" v-model="request.image" plain @change="upload" accept="image/*"></b-form-file>
      <div class="loadingOverlay" v-if="submitting">
        <b-spinner variant="primary" type="grow" label="Loading..."></b-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconUpload } from 'bootstrap-vue';

export default {
  props: ['id', 'baseURL', 'url', 'folder', 'action'],
  components: {
    BIconUpload
  },
  data() {
    return {
      imgBaseURL: process.env.NUXT_ENV_SERVER+'/storage',
      submitting: false,
      request: {
        image: null
      }
    }
  },
  methods: {
    revokeFileUploader() {
      this.$refs.fileInput.$el.click();
    },

    validate() {
      return this.request.image.type.startsWith('image');
    },

    upload() {
      this.submitting = true;

      setTimeout(() => {
        if (this.validate()) {
          let formData = new FormData();
          for (var key in this.request)
            formData.append(key, this.request[key]);
          if (this.url)
            formData.append('url', this.url);
          if (this.folder)
            formData.append('folder', this.folder);
          
          this.$axios.$post(`${this.action || '/cms/upload/local/image'}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then((response) => {
              this.submitting = false;
              this.request.image = null;
              this.$emit('uploaded', {id: this.id, url: response.url});
            }).catch((error) => {
              this.submitting = false;
              this.$toast.error(error.response.data.error.message);
              this.request.image = null;
            });
        } else {
          this.submitting = false;
          this.$toast.error('Unsopported type. Please, select image');
        }
      }, 500);
    }
  }
}
</script>

<style lang="scss" scoped>
.component.imageUploader {
  .imageContainter {
    position: relative;
    border: 1px dashed #ccc;
    display: inline-block;
    padding: 5px;
    border-radius: 4px;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color .2s;
    background: url('~@/assets/placeholder.jpg') no-repeat center;
    background-size: 60%;

    &:hover {
      border-color: #000;
    }

    img {
      max-width: 90px;
      max-height: 90px;
    }

    .fileInput {
      display: none;
    }

    .loadingOverlay {
      position: absolute;
      top: 0; 
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      background: rgba(0, 0, 0, .3);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>