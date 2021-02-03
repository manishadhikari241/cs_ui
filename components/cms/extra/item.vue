<template>
    <div class="cmscomponent item extra">
        <div style="text-align: center" v-if="!item">
            <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
        <div v-if="item">
            <div class="title">
                <span><i class="far fa-edit"></i>&nbsp;&nbsp;ID: {{ item.id }}</span>
                <div>
                    <b-button variant="outline-danger" size="sm" @click="deleteItem"><i class="fas fa-trash"></i>&nbsp;&nbsp;Delete
                    </b-button>
                    <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
                </div>
            </div>
            <hr>
            <form @submit.prevent="update">
                <div class="item-content">
                    <div class="item-row">
                        <div class="prop">Cover</div>
                        <div class="value">
                            <input type="hidden" name="cover" :value="item.cover">
                            <ImageUploader :id="-1" :url="item.cover" :folder="'posts'" @uploaded="coverUploaded"/>
                        </div>
                    </div>
                    <div class="item-row">
                        <div class="prop">Main Cover</div>
                        <div class="value">
                            <input type="hidden" name="cover_2" :value="item.main_cover">
                            <ImageUploader :id="-1" :url="item.main_cover" :folder="'posts'" @uploaded="coverUploaded2"/>
                        </div>
                    </div>

                    <div class="item-row">
                        <div class="prop">Title (EN)</div>
                        <div class="value">
                            <b-input type="text" name="titleEN" :value="item.translations[0].title" required></b-input>
                        </div>
                    </div>
                    <div class="item-row">
                        <div class="prop">Title (CH)</div>
                        <div class="value">
                            <b-input type="text" name="titleCH" :value="item.translations[1].title" required></b-input>
                        </div>
                    </div>
                    <div class="item-row">
                        <div class="value">
                            <div class="prop">Description (EN)</div>
                            <br>
                            <wysiwyg style="background: #fff;" v-model="item.translations[0].description"/>
                        </div>
                    </div>
                    <div class="item-row">
                        <div class="value">
                            <div class="prop">Description (CH)</div>
                            <br>
                            <wysiwyg style="background: #fff;" v-model="item.translations[1].description"/>
                        </div>
                    </div>
                </div>
                <div class="item-actions">
                    <b-button variant="primary" type="submit" :disabled="loading"><i class="far fa-edit"></i>&nbsp;&nbsp;Update
                    </b-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import ImageUploader from '~/components/imageuploader'

export default {
  props: ['itemId'],
  components: {
    ImageUploader
  },
  data() {
    return {
      item: null,
      loading: false
    }
  },
  methods: {
    load() {
      this.$axios.$get(`/cms/posts/${this.itemId}`)
        .then((response) => {
          this.item = response;
        });
    },

            cancel() {
                this.$emit('updated', {clearItemFrame: true});
            },

            coverUploaded({url}) {
                this.$axios.$patch(`cms/posts/${this.itemId}`, {cover: url})
                    .then((response) => {
                        this.$toast.success('Image updated successfully');
                        this.item.cover = response.cover;
                        this.$emit('updated', {refresh: true});
                    }).catch((error) => {
                    this.$toast.error(error.response.data.error.message);
                });
            },
            coverUploaded2({url}) {
                this.$axios.$patch(`cms/posts/${this.itemId}`, {cover_2: url})
                    .then((response) => {
                        this.$toast.success('Image updated successfully');
                        this.item.main_cover = response.main_cover;
                        this.$emit('updated', {refresh: true});
                    }).catch((error) => {
                    this.$toast.error(error.response.data.error.message);
                });
            },

            update(e) {
                this.loading = true;
                this.$axios.$patch(`cms/posts/${this.itemId}`, {
                    titleEN: e.target.elements.titleEN.value,
                    titleCH: e.target.elements.titleCH.value,
                    descriptionEN: this.item.translations[0].description,
                    descriptionCH: this.item.translations[1].description,
                }).then((response) => {
                    this.loading = false;
                    this.$toast.success('Post updated successfully');
                    this.$emit('updated', {refresh: true});
                }).catch((error) => {
                    this.loading = false;
                    error.response.data.errors.map(
                        function (error) {
                            this.$toast.error(error);
                        }.bind(this)
                    );
                });
            },

            deleteItem() {
                this.$bvModal.msgBoxConfirm('Are you sure?', {
                    centered: true,
                    bodyClass: 'confirm-box-body',
                    footerClass: 'confirm-box-footer'
                })
                    .then(value => {
                        if (value) {
                            let itemId = this.itemId;
                            this.$axios.$delete(`/cms/posts/${itemId}`)
                                .then((response) => {
                                    this.$toast.success('Post deleted successfully');
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

</style>