<template>
  <b-button :class="`component download ${className}`" @click="download" :disabled="processing">
    <span v-if="!icon && !processing">{{ text }}</span>
    <b-icon-download v-if="icon && !processing"></b-icon-download>
    <b-spinner small type="grow" v-if="processing"></b-spinner>
  </b-button>
</template>

<script>
import { mapState } from "vuex";
import { BIconDownload } from "bootstrap-vue";

export default {
  props: ["code", "pkg", "className", "text", "icon"],
  components: {
    BIconDownload
  },
  computed: {
    ...mapState("app", ["init"])
  },
  data() {
    return {
      processing: false,
      serverURL: process.env.NUXT_ENV_SERVER
    };
  },
  methods: {
    async download() {
      if (!this.$auth.loggedIn) {
        this.$bvModal.show("modal-auth");
      } else {
        var downloadDetails = await this.$axios.$get(
          `/downloads/${this.code}/${this.pkg}`
        );
        if (!downloadDetails.canDownload) {
          this.$toast.error("You do not have enough quota");
          this.$bvModal.show("modal-payments");
          this.$store.commit("payments/setPackage", {
            key: this.pkg,
            index: 0
          });
        } else {
          var packageName = this.pkg.charAt(0).toUpperCase() + this.pkg.slice(1) == 'Standard' ? this.$t('standard'): this.$t('extended');
          var message = `${this.$t(
            "confirm_to_download"
          )} ${packageName} ${this.$t("quota_will_be_consumed")}`;
          if (!downloadDetails.consumesQuota) {
            const h = this.$createElement;
            const redownloadMsg = h("div", {
              domProps: {
                innerHTML: `${this.$t("confirm_re_download")}<br>${this.$t(
                  "you_can_re_download"
                )}`
              }
            });
            if (redownloadMsg) {
              message = redownloadMsg;
            } else {
              message = `${this.$t("confirm_re_download")} ${this.$t(
                "you_can_re_download"
              )}`;
            }
          }

          this.$bvModal
            .msgBoxConfirm(message, {
              centered: true,
              bodyClass: "confirm-box-body-confirm",
              footerClass: "confirm-box-footer-confirm",
              okTitle: this.$t("btn_yes"),
              cancelTitle: this.$t("btn_no")
            })
            .then(value => {
              if (value) {
                if (downloadDetails.consumesQuota)
                  this.$store.commit("app/updateQuota", {
                    key: this.pkg,
                    delta: -1
                  });
                window.location.href = `${this.serverURL}/api/download/${
                  this.code
                }?package=${this.pkg}&token=${downloadDetails.token}`;
              }
            });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>