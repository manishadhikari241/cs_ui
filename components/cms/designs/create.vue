<template>
  <div class="cmscomponent item design create">
    <div class="title">
      <span><i class="fas fa-plus"></i>&nbsp;&nbsp;ID: Add new design</span>
      <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
    </div>
    <hr>
    <form @submit.prevent="create">
      <div class="item-content">
        <div class="item-row">
          <div class="prop">Design Name</div>
          <div class="value">
            <b-input type="text" v-model="item.design_name" required></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">JPG Image</div>
          <div class="value">
            <div class="design-preview" v-if="previewURL">
              <img :src="previewURL">
            </div>
            <b-form-file placeholder="Upload JPG Image" v-model="item.image" @change="generatePreview" required></b-form-file>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">ZIP File</div>
          <div class="value">
            <b-form-file placeholder="Upload ZIP" v-model="item.file" required></b-form-file>
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
        <div class="item-row">
          <div class="prop">Licence Type</div>
          <div class="value">
            <b-form-group>
              <b-form-radio v-model="item.licence_type" name="some-radios" value="all">Extended</b-form-radio>
              <b-form-radio v-model="item.licence_type" name="some-radios" value="exclusive">Exclusive</b-form-radio>
            </b-form-group>
          </div>
        </div>
        <div class="item-row" v-show="item.licence_type == 'all'">
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
        <div class="item-row" v-show="item.licence_type == 'all'">
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
        <b-button variant="primary" type="submit" :disabled="loading"><i class="fas fa-plus"></i>&nbsp;&nbsp;Create</b-button>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      tags: [],
      colors: [],

      loading: false,
      previewURL: null,
      item: {
        design_name: "",
        image: null,
        file: null,
        has_eps: false,
        has_pdf: false,
        has_ai: false,
        has_jpg: false,
        has_psd: false,
        licence_type: "all",
        tags: [],
        colors: []
      }
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

    create() {
      let selectedTags = this.item.tags.map(tag => {
        return tag.id;
      });
      let selectedColors = this.item.colors.map(color => {
        return color.id;
      });

      let formData = new FormData();
      formData.append("design_name", this.item.design_name);
      formData.append("image", this.item.image);
      formData.append("file", this.item.file);
      formData.append("has_eps", this.item.has_eps ? 1 : 0);
      formData.append("has_pdf", this.item.has_pdf ? 1 : 0);
      formData.append("has_ai", this.item.has_ai ? 1 : 0);
      formData.append("has_jpg", this.item.has_jpg ? 1 : 0);
      formData.append("has_psd", this.item.has_psd ? 1 : 0);
      formData.append("licence_type", this.item.licence_type);
      formData.append("tags", selectedTags);
      formData.append("colors", selectedColors);

      this.loading = true;
      this.$axios.$post('/cms/design', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.loading = false;
          this.$toast.success("New design added successfully");
          this.cancel();
        })
        .catch(error => {
          this.loading = false;
          this.$toast.error(error.response.data.error.message);
        });
    },

    generatePreview(e) {
      const file = e.target.files[0];
      this.previewURL = URL.createObjectURL(file);
    }
  },
  mounted() {
    this.$nextTick(response => {
      this.load();
    });
  }
};
</script>

<style lang="scss" scoped>
.cmscomponent.design {
  .design-preview {
    margin-bottom: 5px;

    img {
      height: 100px;
    }
  }
}
</style>