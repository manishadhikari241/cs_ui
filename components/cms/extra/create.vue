<template>
    <div class="cmscomponent item extra create">
        <div class="title">
            <span><i class="fas fa-plus"></i>&nbsp;&nbsp;ID: Add new post</span>
            <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
        </div>
        <hr>
        <form @submit.prevent="create">

            <div class="item-content">
                <small>Dimension : 379 * 300</small>

                <div class="item-row">
                    <div class="prop">Overview Image</div>
                    <div class="value">
                        <ImageUploader :id="-1" :url="item.cover" :folder="'posts'" @uploaded="coverUploaded"/>
                    </div>
                </div>
                <small>Dimension : 1200 * 400</small>

                <div class="item-row">

                    <div class="prop">Content Image</div>
                    <div class="value">
                        <ImageUploader :id="-1" :url="item.cover_2" :folder="'posts'" @uploaded="coverUploaded2"/>
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
                        <div class="prop">Description (EN)</div>
                        <br>
                        <wysiwyg style="background: #fff;" v-model="item.descriptionEN"/>
                    </div>
                </div>
                <div class="item-row">
                    <div class="value">
                        <div class="prop">Description (CH)</div>
                        <br>
                        <wysiwyg style="background: #fff;" v-model="item.descriptionCH"/>
                    </div>
                </div>
            </div>
            <div class="item-actions">
                <b-button variant="primary" type="submit" :disabled="loading"><i class="fas fa-plus"></i>&nbsp;&nbsp;Create
                </b-button>
            </div>
        </form>
    </div>
</template>

<script>
import ImageUploader from "~/components/imageuploader";

export default {
  components: {
    ImageUploader
  },
  data() {
    return {
      loading: false,
      item: {
        cover: "",
        cover_2: "",
        titleEN: "",
        titleCH: "",
        descriptionEN: "",
        descriptionCH: ""
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("updated", { clearItemFrame: true });
    },

    coverUploaded({ url }) {
      this.item.cover = url;
    },
    coverUploaded2({ url }) {
      this.item.cover_2 = url;
    },

    create() {
      this.loading = true;
      this.$axios
        .$post("/cms/posts", this.item)
        .then(response => {
          this.loading = false;
          this.$toast.success("New post added successfully");
          this.cancel();
        })
        .catch(error => {
          this.loading = false;
          error.response.data.errors.map(
            function(error) {
              this.$toast.error(error);
            }.bind(this)
          );
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>