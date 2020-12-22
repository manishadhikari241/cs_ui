<template>
  <div class="cmscomponent item collection">
    <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>
    <div v-if="item">
      <div class="title">
        <span><i class="far fa-edit"></i>&nbsp;&nbsp;ID: {{ item.id }}</span>
        <div>
          <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
        </div>
      </div>
      <hr>
      <form @submit.prevent="update">
        <div class="item-content">
          <div class="item-row">
            <div class="prop">Creator</div>
            <div class="value">
              <nuxt-link :to="`/cms/users?id=${item.user.id}`">{{ item.user.first_name }} {{ item.user.last_name }}</nuxt-link>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Created At</div>
            <div class="value">{{ $moment(item.created_at).format('DD/MM/YYYY') }}</div>
          </div>
          <div class="item-row">
            <div class="prop">Active</div>
            <div class="value">
              <b-badge variant="success" v-if="item.is_active">Active</b-badge>
              <b-badge variant="danger" v-if="!item.is_active">Not Active</b-badge>
              <b-button size="sm" variant="danger" v-if="item.is_active" @click="toggleActive">Disable</b-button>
              <b-button size="sm" variant="success" v-if="!item.is_active" @click="toggleActive">Enable</b-button>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Title (EN)</div>
            <div class="value">
              <b-input type="text" name="titleEN" v-model="item.translations[0].title"></b-input>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Title (CH)</div>
            <div class="value">
              <b-input type="text" name="titleCH" v-model="item.translations[1].title"></b-input>
            </div>
          </div>
          <div class="item-row">
            <div class="value">
              <div class="prop">Description (EN)</div><br>
              <wysiwyg style="background: #fff;" v-model="item.translations[0].description" />
            </div>
          </div>
          <div class="item-row">
            <div class="value">
              <div class="prop">Description (CH)</div><br>
              <wysiwyg style="background: #fff;" v-model="item.translations[1].description" />
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Moodboard (EN)</div>
            <div class="value">
              <div class="moodboard" v-if="item.moodboards[0]">
                <img :src="`${cloudfrontURL}/uploads/lib/feed/moodboard${item.moodboards[0].moodboard}`">
                <b-button size="sm" variant="danger" @click="deleteMoodboard(item.moodboards[0].id)">delete</b-button>
              </div>
              <br>
              <b-form-file placeholder="Upload/Replace Moodboard" @change="uploadMoodboard($event, 'en')" v-model="moodboards.en.item" v-show="!moodboards.en.loading"></b-form-file>
              <b-spinner label="Loading..." v-show="moodboards.en.loading"></b-spinner>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Moodboard (CH)</div>
            <div class="value">
              <div class="moodboard" v-if="item.moodboards[1]">
                <img :src="`${cloudfrontURL}/uploads/lib/feed/moodboard${item.moodboards[1].moodboard}`">
                <b-button size="sm" variant="danger" @click="deleteMoodboard(item.moodboards[1].id)">delete</b-button>
              </div>
              <br>
              <b-form-file placeholder="Upload/Replace Moodboard" @change="uploadMoodboard($event, 'ch')" v-model="moodboards.ch.item" v-show="!moodboards.ch.loading"></b-form-file>
              <b-spinner label="Loading..." v-show="moodboards.ch.loading"></b-spinner>
            </div>
          </div>
          <div class="item-row">
            <div class="prop">Designs</div>
            <div class="value">
              <div class="designs-list">
                <div class="design" v-for="design in item.designs" :key="design.id">
                  <img :src="`${serverURL}/api/v1/image/thumbnail/design/${design.code}/tiny`">
                  <b-button size="sm" variant="danger" @click="removeDesign(design.id)">unlink</b-button>
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
                v-model="item.categories"
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
                v-model="item.goods"
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
            <div class="prop">Seasons</div>
            <div class="value">
              <multiselect
                v-model="item.season"
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
          <b-button variant="primary" type="submit" :disabled="loading"><i class="far fa-edit"></i>&nbsp;&nbsp;Update</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  props: ['itemId'],
  components: {
    Multiselect
  },
  data() {
    return {
      cloudfrontURL: process.env.NUXT_ENV_CLOUDFRONT,
      serverURL: process.env.NUXT_ENV_SERVER,
      categories: [],
      goods: [],
      seasons: [],
      linkDesignId: '',

      moodboards: {
        en: {
          item: null,
          loading: false
        },
        ch: {
          item: null,
          loading: false
        }
      },

      item: null,
      loading: false
    }
  },
  methods: {
    load() {
      this.$axios.$get(`/cms/collections/${this.itemId}?scope[]=user&scope[]=designs&scope[]=moodboards&scope[]=categories&scope[]=goods&scope[]=season&cms=true`)
        .then((response) => {
          this.item = response;
        });

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

    cancel() {
      this.$emit('updated', { clearItemFrame: true });
    },

    toggleActive() {
      this.$axios.$post(`/cms/collections/${this.itemId}/toggle`)
        .then((response) => {
          this.load();
          this.$toast.success('Collection updated successfully');
          this.$emit('updated', { refresh: true });
        }).catch((error) => {
          this.$toast.error(error.response.data.error.message);
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

    update(e) {
      var selectedCategories = [];
      this.item.categories.forEach((category) => { selectedCategories.push(category.id) });
      var selectedGoods = [];
      this.item.goods.forEach((good) => { selectedGoods.push(good.id) });
      var selectedSeason = this.item.season ? this.item.season.id : null;

      this.loading = true;
      this.$axios.$patch(`/cms/collections/${this.itemId}`, {
        titleEN: this.item.translations[0].title,
        titleCH: this.item.translations[1].title,
        descriptionEN: this.item.translations[0].description,
        descriptionCH: this.item.translations[1].description,
        categories: selectedCategories,
        goods: selectedGoods,
        season: selectedSeason
      }).then((response) => {
        this.loading = false;
        this.$toast.success('Collection updated successfully');
        this.$emit('updated', { refresh: true });
      }).catch((error) => {
        this.loading = false;
        this.$toast.error(error.response.data.error.message);
      });
    },

    addDesign() {
      this.$axios.$post(`/cms/collections/${this.itemId}/designs`, { designId: this.linkDesignId })
        .then((response) => {
          this.load();
          this.linkDesignId = '';
          this.$toast.success('Design added successfully');
        }).catch((error) => {
          this.$toast.error(error.response.data.error.message);
          this.linkDesignId = '';
        });
    },

    removeDesign(id) {
      this.$axios.$delete(`/cms/collections/${this.itemId}/designs/${id}`)
        .then((response) => {
          this.load();
          this.$toast.success('Design removed successfully');
        }).catch((error) => {
          this.$toast.error(error.response.data.error.message);
        });
    },

    uploadMoodboard(e, lang) {
      let formData = new FormData();
      formData.append('moodboard', e.target.files[0]);
      formData.append('lang', lang);

      this.moodboards[lang].loading = true;

      this.$axios.$post(`/cms/collections/${this.itemId}/moodboards`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          this.load();
          this.$toast.success('Moodboard added successfully');
          this.moodboards[lang].item = null;
          this.moodboards[lang].loading = false;
        }).catch((error) => {
          this.$toast.error(error.response.data.error.message);
        });
    },

    deleteMoodboard(id) {
      this.$axios.$delete(`/cms/collections/${this.itemId}/moodboards/${id}`)
        .then((response) => {
          this.load();
          this.$toast.success('Moodboard removed successfully');
        }).catch((error) => {
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