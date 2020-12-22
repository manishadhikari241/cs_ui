<template>
  <div class="cmscomponent item newpage create">
    <div class="title">
      <span><i class="fas fa-plus"></i>&nbsp;&nbsp;ID: Add new Page</span>
      <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
    </div>
    <hr>
    <form @submit.prevent="create">
      <div class="item-content">
        <div class="item-row">
          <div class="prop">Slug</div>
          <div class="value">
            <b-input type="text" name="slug" v-model="item.slug" required></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Title (EN)</div>
          <div class="value">
            <b-input type="text" name="titleEN" v-model="item.titleEN" required></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Title (CH)</div>
          <div class="value">
            <b-input type="text" name="titleCH" v-model="item.titleCH" required></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="value">
            <div class="prop">Body (EN)</div><br>
            <wysiwyg style="background: #fff;" v-model="item.bodyEN" />
          </div>
        </div>
        <div class="item-row">
          <div class="value">
            <div class="prop">Body (CH)</div><br>
            <wysiwyg style="background: #fff;" v-model="item.bodyCH" />
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Info Title (EN)</div>
          <div class="value">
            <b-input type="text" name="infoTitleEN" v-model="item.infoTitleEN"></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Info Title (CH)</div>
          <div class="value">
            <b-input type="text" name="infoTitleCH" v-model="item.infoTitleCH"></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="value">
            <div class="prop">Info Body (EN)</div><br>
            <wysiwyg style="background: #fff;" v-model="item.infoBodyEN" />
          </div>
        </div>
        <div class="item-row">
          <div class="value">
            <div class="prop">Info Body (CH)</div><br>
            <wysiwyg style="background: #fff;" v-model="item.infoBodyCH" />
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Meta Description (EN)</div>
          <div class="value">
            <b-input type="text" name="metaDescriptionEN" v-model="item.metaDescriptionEN"></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Meta Description (CH)</div>
          <div class="value">
            <b-input type="text" name="metaDescriptionCH" v-model="item.metaDescriptionCH"></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Meta Keywords (EN)</div>
          <div class="value">
            <b-input type="text" name="metaKeywordsEN" v-model="item.metaKeywordsEN"></b-input>
          </div>
        </div>
        <div class="item-row">
          <div class="prop">Meta Keywords (CH)</div>
          <div class="value">
            <b-input type="text" name="metaKeywordsCH" v-model="item.metaKeywordsCH"></b-input>
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
import "vue-wysiwyg/dist/vueWysiwyg.css";

export default {
  data() {
    return {
      loading: false,
      item: {
        slug: '',
        titleEN: '',
        titleCH: '',
        bodyEN: '',
        bodyCH: '',
        infoTitleEN: '',
        infoTitleCH: '',
        infoBodyEN: '',
        infoBodyCH: '',
        metaDescriptionEN: '',
        metaDescriptionCH: '',
        metaKeywordsEN: '',
        metaKeywordsCH: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('updated', {clearItemFrame: true});
    },

    create() {
      this.loading = true;
      this.$axios.$post('/cms/pages', this.item)
        .then((response) => {
          this.loading = false;
          this.$toast.success('New page added successfully');
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

</style>