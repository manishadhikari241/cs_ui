<template>
    <div class="cmscomponent settings">
        <b-modal id="modal-settings" size="md" centered hide-header hide-footer>
            <button class="btn-modal-settings-close" @click="$bvModal.hide('modal-settings')"><b-icon-x></b-icon-x></button>
            <b-container>
                <br><br>
                <b-form-file placeholder="Upload/Replace Avatar" @change="uploadAvatar" v-model="avatar.item" v-show="!avatar.loading"></b-form-file>
                <b-spinner label="Loading..." v-show="avatar.loading"></b-spinner>
            </b-container>
        </b-modal>
    </div>
</template>

<script>
import { BIconX } from 'bootstrap-vue';

export default {
  components: {
      BIconX
  },
  data() {
      return {
          avatar: {
              item: null,
              loading: false
          }
      }
  },
  methods: {
        uploadAvatar(e) {
            let formData = new FormData();
            formData.append('image', e.target.files[0]);
            this.avatar.loading = true;

            this.$axios.$post(`/cms/users/${this.$auth.user.id}/avatar`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    this.$toast.success('Avatar uploaded successfully');
                    this.avatar.loading = false;
                    window.location.reload();
                }).catch((error) => {
                    this.avatar.loading = false;
                    this.$toast.error(error.response.data.error.message);
                });
        }
  }
}
</script>

<style lang="scss">
#modal-settings {
    .btn-modal-settings-close {
        position: absolute;
        top: 0;
        right: 20px;
        border: none;
        background: transparent;
        outline: none;
        font-size: 35px;
        color: #aaa;
        cursor: pointer;
        z-index: 999;
    }

    .modal-content {
        padding: 15px 0;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    }
}
</style>