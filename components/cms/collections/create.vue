<template>
  <div class="cmscomponent item collection">
    <div class="title">
      <span><i class="fas fa-plus"></i>&nbsp;&nbsp;ID: Add new country</span>
      <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
    </div>
    <hr>
    <form @submit.prevent="create">
      <div class="item-content">
        <div class="item-row">
          <div class="prop">Title (EN)</div>
          <div class="value">
            <b-input type="text" name="titleEN" v-model="request.titleEN"></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Title (CH)</div>
          <div class="value">
            <b-input type="text" name="titleCH" v-model="request.titleCH"></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="value">
            <div class="prop">Description (EN)</div><br>
            <wysiwyg style="background: #fff;" v-model="request.descriptionEN" />
          </div>
        </div>
        <div class="item-row">
          <div class="value">
            <div class="prop">Description (CH)</div><br>
            <wysiwyg style="background: #fff;" v-model="request.descriptionCH" />
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Moodboard (EN)</div>
          <div class="value">
            <div class="design-preview" v-if="moodboardPreview.en">
              <img :src="moodboardPreview.en">
            </div>
            <b-form-file placeholder="Upload Moodboard" v-model="request.moodboardEN" @change="generatePreview($event, 'en')"></b-form-file>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Moodboard (CH)</div>
          <div class="value">
            <div class="design-preview" v-if="moodboardPreview.ch">
              <img :src="moodboardPreview.ch">
            </div>
            <b-form-file placeholder="Upload Moodboard" v-model="request.moodboardCH" @change="generatePreview($event, 'ch')"></b-form-file>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Designs</div>
          <div class="value">
            <div class="designs-list">
              <div class="design" v-for="(design, $index) in request.designs" :key="design.id">
                <img :src="`${serverURL}/api/v1/image/thumbnail/design/${design.code}/tiny`">
                <b-button size="sm" variant="danger" @click="removeDesign($index)">unlink</b-button>
              </div>
            </div>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Link a design</div>
          <div class="value">
            <b-input-group size="sm">
              <b-form-input placeholder="Search by ID" v-model="linkDesignId" v-on:keydown.enter.prevent="addDesign"></b-form-input>
              <b-input-group-append>
                <b-button variant="primary" :disabled="!linkDesignId" @click="addDesign">Link</b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Categories</div>
          <div class="value">
            <multiselect
              v-model="request.categories"
              placeholder="Categories"
              :options="categories"
              track-by="id"
              :searchable="true"
              :custom-label="categoryLabel"
              :multiple="true">
            </multiselect>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Apply Ons</div>
          <div class="value">
            <multiselect
              v-model="request.goods"
              placeholder="Apply Ons"
              :options="goods"
              track-by="id"
              :searchable="true"
              :custom-label="goodLabel"
              :multiple="true">
            </multiselect>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Season</div>
          <div class="value">
            <multiselect
              v-model="request.season"
              placeholder="Seasons"
              :options="seasons"
              track-by="id"
              :searchable="true"
              :custom-label="seasonLabel"
              :multiple="false">
            </multiselect>
          </div>
        </div>
      </div>
      <div class="item-actions">
        <b-button variant="primary" type="submit" :disabled="loading"><i class="far fa-edit"></i>&nbsp;&nbsp;Create</b-button>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      cloudfrontURL: process.env.NUXT_ENV_CLOUDFRONT,
      serverURL: process.env.NUXT_ENV_SERVER,

      loading: false,

      categories: [],
      goods: [],
      seasons: [],

      linkDesignId: '',

      moodboardPreview: {
        en: null,
        ch: null
      },

      request: {
        titleEN: '',
        titleCH: '',
        descriptionEN: '',
        descriptionCH: '',
        moodboardEN: null,
        moodboardCH: null,
        designs: [],
        categories: [],
        goods: [],
        season: null
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('updated', {clearItemFrame: true});
    },

    load() {
      this.$axios.$get('/cms/libCategories')
        .then((response) => {
          this.categories = response;
        });

      this.$axios.$get('/cms/goods/masks?all=true')
        .then((response) => {
          this.goods = response;
        });

      this.$axios.$get('/cms/seasons?all=true')
        .then((response) => {
          this.seasons = response;
        });
    },

    categoryLabel({ translations }) {
      return translations[0].name;
    },

    goodLabel({ translations }) {
      return translations[0].name;
    },

    seasonLabel({ translations }) {
      return translations[0].name;
    },

    addDesign() {
      this.$axios.$get(`/cms/design/${this.linkDesignId}`)
        .then((response) => {
          if (response.licence_type == 'exclusive' || response.buyer_id || response.owner_id) {
            this.$toast.error("Exclusive designs can not be linked to a collection");
          } else {
            this.request.designs.push(response);
          }
          this.linkDesignId = '';
        }).catch((error) => {
          this.$toast.error(error.response.data.error.message);
        });
    },

    removeDesign($index) {
      this.request.designs.splice($index, 1);
    },

    create() {
      let selectedDesigns = this.request.designs.map((design) => { return design.id });
      let selectedCategories = this.request.categories.map((category) => { return category.id });
      let selectedGoods = this.request.goods.map((good) => { return good.id });
      let selectedSeason = this.request.season ? this.request.season.id : null;

      let formData = new FormData();
      formData.append('titleEN', this.request.titleEN);
      formData.append('titleCH', this.request.titleCH);
      formData.append('descriptionEN', this.request.descriptionEN);
      formData.append('descriptionCH', this.request.descriptionCH);
      formData.append('moodboardEN', this.request.moodboardEN);
      formData.append('moodboardCH', this.request.moodboardCH);
      formData.append('designs', selectedDesigns);
      formData.append('categories', selectedCategories);
      formData.append('goods', selectedGoods);
      formData.append('season', selectedSeason);

      this.loading = true;

      this.$axios.$post('/cms/collections', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.loading = false;
          this.$toast.success('New collection added successfully');
          this.cancel();
        }).catch((error) => {
          this.$toast.error(error.response.data.error.message);
        });
    },

    generatePreview(e, lang) {
      const file = e.target.files[0];
      this.moodboardPreview[lang] = URL.createObjectURL(file);
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
.cmscomponent.collection {
  .moodboard {
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

  .design-preview {
    margin-bottom: 5px;

    img {
      height: 100px;
    }
  }

  .designs-list {
    .design {
      position: relative;
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
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
}
</style>