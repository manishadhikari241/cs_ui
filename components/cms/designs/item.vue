<template>
  <div class="cmscomponent item design">
    <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>
    <div v-if="item">
      <div class="title">
        <span><i class="far fa-edit"></i>&nbsp;&nbsp;ID: {{ item.id }}</span>
        <div>
          <b-button v-if="$auth.user.role_id == 1" variant="outline-danger" size="sm" @click="deleteItem"><i class="fas fa-trash"></i>&nbsp;&nbsp;Delete</b-button>
          <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
        </div>
      </div>
      <hr>
      <form @submit.prevent="update">
        <div class="item-content">
          <div class="item-row">
            <div class="prop">Design Name</div>
            <div class="value">
              <b-input type="text" v-model="item.design_name" required></b-input>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Creator</div>
            <div class="value">
              <nuxt-link :to="`/cms/users?id=${item.designer_id}`">{{ item.designer_id }}</nuxt-link>
            </div>
          </div>
          <div class="item-row" v-if="item.buyer_id">
            <div class="prop">Buyer</div>
            <div class="value">
              <nuxt-link :to="`/cms/users?id=${item.buyer_id}`">{{ item.buyer_id }}</nuxt-link>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">JPG Image</div>
            <div class="value">
              <div class="mainDesign">
                <img :src="`/api/v1/image/thumbnail/design/${item.code}/tiny`">
              </div>
              <br>
              <b-form-file placeholder="Upload/Replace JPG Image" @change="uploadImage($event)" v-model="image.item" v-show="!image.loading"></b-form-file>
              <b-spinner label="Loading..." v-show="image.loading"></b-spinner>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">ZIP File</div>
            <div class="value">
              <div><b-button size="sm" variant="primary" @click="downloadZip"><i class="fas fa-cloud-download-alt"></i>&nbsp;&nbsp;Download ZIP File</b-button></div>
              <br>
              <b-form-file placeholder="Upload/Replace ZIP" @change="uploadFile($event)" v-model="file.item" v-show="!file.loading"></b-form-file>
              <b-spinner label="Loading..." v-show="file.loading"></b-spinner>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">File Types</div>
            <div class="value">
              <b-form-checkbox v-model="item.has_jpg">JPG</b-form-checkbox>
              <b-form-checkbox v-model="item.has_ai">Ai</b-form-checkbox>
              <b-form-checkbox v-model="item.has_pdf">PDF</b-form-checkbox>
              <b-form-checkbox v-model="item.has_psd">PSD</b-form-checkbox>
              <b-form-checkbox v-model="item.has_eps">EPS</b-form-checkbox>
            </div>
          </div>
          <div class="item-row" v-show="item.licence_type == 'all' && !item.buyer_id && !item.owner_id">
            <div class="prop">Tags</div>
            <div class="value">
              <multiselect
                v-model="item.tags"
                placeholder="Tags"
                :options="tags"
                track-by="id"
                :searchable="true"
                :custom-label="tagLabel"
                :multiple="true"
                @search-change="tagSearch">
              </multiselect>
            </div>
          </div>
          <div class="item-row" v-show="item.licence_type == 'all' && !item.buyer_id && !item.owner_id">
            <div class="prop">Colors</div>
            <div class="value">
              <multiselect
                v-model="item.colors"
                placeholder="Colors"
                :options="colors"
                track-by="id"
                :searchable="true"
                :custom-label="colorLabel"
                :multiple="true">
              </multiselect>
            </div>
          </div>
        </div>
        <div class="item-actions">
          <b-button variant="primary" type="submit" :disabled="loading"><i class="fas fa-edit"></i>&nbsp;&nbsp;Update</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  props: ["itemId"],
  components: {
    Multiselect
  },
  data() {
    return {
      tags: [],
      colors: [],

      image: {
        item: null,
        loading: false
      },
      file: {
        item: null,
        loading: false
      },

      loading: false,
      item: null
    };
  },
  methods: {
    cancel() {
      this.$emit("updated", { clearItemFrame: true });
    },

    load() {
      this.$axios.$get('/cms/colors?all=true')
        .then((response) => {
          this.colors = response;
        })

      this.$axios.$get(`/cms/design/${this.itemId}?scope[]=designer.profile&scope[]=keywords`)
        .then((response) => {
          this.item = response;
          this.item.has_jpg = this.item.has_jpg ? true : false;
          this.item.has_ai = this.item.has_ai ? true : false;
          this.item.has_pdf = this.item.has_pdf ? true : false;
          this.item.has_psd = this.item.has_psd ? true : false;
          this.item.has_eps = this.item.has_eps ? true : false;
        });
    },

    tagSearch(query) {
      this.$axios.$get(`/cms/tags?term=${query}`)
        .then((response) => {
          this.tags = response.data;
        })
    },

    tagLabel({ translations }) {
      return translations[0].name;
    },

    colorLabel({ translations }) {
      return translations[0].name;
    },

    update() {
      let selectedTags = this.item.tags.map(tag => {
        return tag.id;
      });
      let selectedColors = this.item.colors.map(color => {
        return color.id;
      });

      this.loading = true;
      this.$axios.$patch(`/cms/design/${this.itemId}`, {
        design_name: this.item.design_name,
        has_eps: this.item.has_eps ? 1 : 0,
        has_pdf: this.item.has_pdf ? 1 : 0,
        has_ai: this.item.has_ai ? 1 : 0,
        has_jpg: this.item.has_jpg ? 1 : 0,
        has_psd: this.item.has_psd ? 1 : 0,
        tags: selectedTags,
        colors: selectedColors
      }).then((response) => {
          this.loading = false;
          this.$toast.success("Design updated successfully");
          this.$emit("updated", { refresh: true });
        })
        .catch(error => {
          this.loading = false;
          if (error.response.status == 422) {
            if (error.response.data.errors) {
              this.$toast.error(error.response.data.errors.tags);
            }
          } else {
            this.$toast.error(error.response.data.error.message);
          }
        });
    },

    uploadImage(e) {
      let formData = new FormData();
      formData.append("image", e.target.files[0]);

      this.image.loading = true;

      this.$axios.$post(`/cms/design/${this.itemId}/image`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.item = null;
          this.load();
          this.$toast.success("Image uploaded successfully");
          this.image.file = null;
          this.image.loading = false;
          this.$emit("updated", { refresh: true });
        })
        .catch(error => {
          this.$toast.error(error.response.data.error.message);
        });
    },

    uploadFile(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);

      this.file.loading = true;

      this.$axios.$post(`/cms/design/${this.itemId}/file`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.item = null;
          this.load();
          this.$toast.success("File uploaded successfully");
          this.file.file = null;
          this.file.loading = false;
          this.$emit("updated", { refresh: true });
        })
        .catch(error => {
          this.$toast.error(error.response.data.error.message);
        });
    },

    downloadZip() {
      this.$axios.$post('/token/generate')
        .then((response) => {
          window.location.href = `/api/download/${this.item.code}?package=extended&token=${response.token}`;
        })
    },

    deleteItem() {

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
};
</script>

<style lang="scss" scoped>
.cmscomponent.collection {
  .mainDesign {
    position: relative;
    width: 100px;
    height: 100px;
    background: #ddd;

    img {
      height: 100px;
    }

    button {
      position: absolute;
      bottom: 5px;
      left: 5px;
      font-size: 12px;
    }
  }
}
</style>