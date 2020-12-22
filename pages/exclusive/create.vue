<template>
    <div class="page create-request">
        <div class="component pageinfo">
            <div class="pageinfo-head">
                <h1 class="pageinfo-title">{{ $t('order_exclusive_request') }}</h1>
            </div>
            <p class="pageinfo-description-exclusive">{{ $t('complete_this_form') }}</p>
            <p class="pageinfo-description-exclusive">{{ $t('the_design_we_create') }}</p>
            <p class="pageinfo-description-exclusive">{{ $t('you_will_have_full_copyright') }}</p>


        </div>
        <br><br>

        <div style="text-align: center; color: #f30;" v-if="init.quota && init.quota['exclusive'] <= 0">{{
            $t('not_enough_quota') }}
        </div>

        <form class="designRequestForm" @submit.prevent="submitRequest">
            <b-row>
                <b-col md="2">{{ $t('name_of_design') }}</b-col>
                <b-col md="9">
                    <b-input :placeholder="$t('give_us_the_name_design')" v-model="request.name" required></b-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="2">{{ $t('style_of_design') }}</b-col>
                <b-col md="9">
                    <multiselect
                            :class="`mltselect${request.style == null || request.style.length == 0 ? ` invalid${activateDynamicValidation ? '' : '_disable'}` : ' '}`"
                            :select-label="$t('enter_to_select')"
                            :deselect-label="$t('enter_to_remove')"
                            :selected-label="$t('selected')"
                            v-model="request.style" :options="styleOptions" :multiple="true" track-by="en"
                            :label="$i18n.locale" :placeholder="$t('select_option')"></multiselect>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="2">{{ $t('other_styles') }}</b-col>
                <b-col md="9">
                    <b-input v-model="request.other"></b-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="2">{{ $t('your_detailed_briefing') }}</b-col>
                <b-col md="9">
                    <b-textarea v-model="request.briefing" required></b-textarea>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="2">{{ $t('reference_file') }}</b-col>
                <b-col md="9">
                    <b-form-file ref="file" @change="generatePreview"
                          :browse-text="$t('browse')"
                                 :state="Boolean(request.preview)"
                                 :placeholder="$t('upload_or_drop_design')"
                                 drop-placeholder="Drop file here..." required></b-form-file>
                </b-col>
            </b-row>
            <b-row v-if="file">
                <b-col md="2">&nbsp;</b-col>
                <b-col md="9" class="image-columns" v-if="file.length > 0" >
                  <div v-for="(image,key) in request.preview" :key="key" class="image-container d-flex">

                  <figure>
                    <img :src="image" style="height:200px; width:200px"><button class="remove-image"@click="deleteItem(key,$event)"><i class="fa fa-times-circle"></i></button>
                </figure>
                </div>
                </b-col>
            </b-row>
            <b-row>
              <b-col md="2">{{ $t('color_preferences_tpx') }}</b-col>
              <b-col md="9">
                <b-input v-model="request.tpx" required></b-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="2">{{ $t('color_limitations_for_printing') }}</b-col>
              <b-col md="9">
                <multiselect
                  :class="`mltselect${request.color_limit == null || request.color_limit.length == 0 ? ` invalid${activateDynamicValidation ? '' : '_disable'}` : ' '}`"
                  v-model="request.color_limit"
                  :placeholder="$t('select_option')"
                  :options="[
                    `1 ${ $t('color') }`,
                    `2 ${ $t('colors') }`,
                    `3 ${ $t('colors') }`,
                    `4 ${ $t('colors') }`,
                    `5 ${ $t('colors') }`,
                    `6 ${ $t('colors') }`,
                    `7 ${ $t('colors') }`,
                    `8 ${ $t('colors') }`,
                    `9 ${ $t('colors') }`,
                    `10 ${ $t('colors') }`
                  ]">
                  </multiselect>
              </b-col>
            </b-row>
            <b-row>
                <b-col md="2">{{ $t('your_product') }}</b-col>
                <b-col md="9">
                    <b-input :placeholder="$t('cushion')" v-model="request.product" required></b-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="2">{{ $t('your_customers') }}</b-col>
                <b-col md="9">
                    <multiselect
                            :class="`mltselect${request.age == null || request.age.length == 0 ? ` invalid${activateDynamicValidation ? '' : '_disable'}` : ' '}`"
                            v-model="request.age"
                            :select-label="$t('enter_to_select')"
                            :deselect-label="$t('enter_to_remove')"
                            :selected-label="$t('selected')"
                            :placeholder="$t('select_option')"
                            :multiple="true"
                            :options="[
              `${ $t('infant') }`,
              `${ $t('children') }`,
              `${ $t('teenagers') }`,
              `${ $t('adults') }`,
              `${ $t('seniors') }`,
            ]">
                    </multiselect>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="2">{{ $t('target_gender') }}</b-col>
                <b-col md="9">
                    <multiselect
                            :class="`mltselect${request.gender == null || request.gender.length == 0 ? ` invalid${activateDynamicValidation ? '' : '_disable'}` : ' '}`"
                            v-model="request.gender"
                            :placeholder="$t('select_option')"
                            :select-label="$t('enter_to_select')"
                            :deselect-label="$t('enter_to_remove')"
                            :selected-label="$t('selected')"
                            :multiple="true"
                            :options="[
              `${ $t('male') }`,
              `${ $t('female') }`
            ]">
                    </multiselect>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="2">{{ $t('your_market') }}</b-col>
                <b-col md="9">
                    <multiselect
                            :class="`mltselect${request.country == null || request.country.length == 0 ? ` invalid${activateDynamicValidation ? '' : '_disable'}` : ' '}`"
                            v-model="request.country"
                            :select-label="$t('enter_to_select')"
                            :deselect-label="$t('enter_to_remove')"
                            :selected-label="$t('selected')"
                            :placeholder="$t('select_option')"
                            :options="countries"
                            track-by="id"
                            :searchable="true"
                            :custom-label="countryLabel"
                            :multiple="true">
                    </multiselect>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="2">{{ $t('your_business') }}</b-col>
                <b-col md="9">
                    <multiselect
                            :class="`mltselect${request.business == null || request.business.length == 0 ? ` invalid${activateDynamicValidation ? '' : '_disable'}` : ' '}`"
                            v-model="request.business"
                            :placeholder="$t('select_option')"
                            :select-label="$t('enter_to_select')"
                            :deselect-label="$t('enter_to_remove')"
                            :selected-label="$t('selected')"
                            :options="[
              `${ $t('retailer') }`,
              `${ $t('brand') }`,
              `${ $t('manufacturer') }`,
               `${ $t('other') }`

            ]">
                    </multiselect>
                </b-col>
            </b-row>
            <!-- <b-row>
                <b-col md="2">{{ $t('your_website') }}</b-col>
                <b-col md="9">
                    <b-input placeholder="www.example.com" v-model="request.website"></b-input>
                </b-col>
            </b-row> -->
                     <b-row>
              <b-col md="11">
   <div class="important-request-message">
              <p class="important-title">{{ $t('important') }}</p>
              <p class="important-description">{{ $t('design_created_cannot_refunded') }}</p>
              <p class="important-description">{{ $t('to_make_further') }}</p>
              <p class="important-description">{{ $t('we_will_inform_you') }}</p>


            </div>              </b-col>
            </b-row>
               
            <b-row>
                <b-col>
                    <b-form-checkbox name="accept" v-model="accept" required><span
                            v-html="$t('accept_exclusive_terms')"></span></b-form-checkbox>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div class="actions">
                        <button class="send_application" type="submit" :disabled="submitting">{{
                            $t('send_application') }}
                        </button>
                        <button class="back" :disabled="submitting">
                            <nuxt-link :to="localePath('/exclusive')">{{ $t('back') }}</nuxt-link>
                        </button>
                    </div>
                </b-col>
            </b-row>
        </form>

    </div>
</template>

<script>
import { mapState } from "vuex";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  middleware: "auth",
  components: {
    Multiselect
  },
  computed: {
    ...mapState("app", ["init"])
  },
  data() {
    return {
      countries: [],
      request: {
        is_collection: 0,
        name: "",
        style: null,
        other: "",
        briefing: "",
        tpx: "",
        color_limit: "",
        product: "",
        age: null,
        gender: null,
        country: null,
        business: null,
        website: "",
        preview: []
      },
      file: [],
      accept: false,
      submitting: false,

      activateDynamicValidation: false,

      styleOptions: [
        { en: "Menswear", ch: "男装" },
        { en: "Womenswear", ch: "女装" },
        { en: "Kidswear", ch: "童装" },
        { en: "Swimwear", ch: "游泳衣" },
        { en: "Casual Wear", ch: "休闲装" },
        { en: "Houseware", ch: "家庭用品" },
        { en: "Home", ch: "家" },
        { en: "Stationary", ch: "固定式" },
        { en: "Gifts", ch: "赠品" },
        { en: "Traditional", ch: "传统的" },
        { en: "Abstract", ch: "抽象" },
        { en: "Aquarelle", ch: "水彩画" },
        { en: "Ethnic", ch: "民族" },
        { en: "Geometric", ch: "几何" },
        { en: "Paisleys", ch: "佩斯利" },
        { en: "Floral", ch: "花香" },
        { en: "Nature", ch: "性质" },
        { en: "Tropical", ch: "热带" },
        { en: "Animals", ch: "动物" },
        { en: "Kids", ch: "孩子们" },
        { en: "Love", ch: "爱" },
        { en: "Easter", ch: "复活节" },
        { en: "Halloween", ch: "万圣节" },
        { en: "Christmas", ch: "圣诞" },
        { en: "Spring", ch: "弹簧" },
        { en: "Summer", ch: "夏季" },
        { en: "Fall", ch: "秋季" },
        { en: "Winter", ch: "冬季" }
      ]
    };
  },
  methods: {
    loadCountries() {
      this.$axios.$get("/countries?all=1").then(response => {
        this.countries = response;
      });
    },

    countryLabel({ translations }) {
      return translations[0].name;
    },

    generatePreview(e) {
      // const files = e.target.files ? e.target.files : e.dataTransfer.files;

      // var i = 0;
      // if (files.length > 5) {
      //   this.request.file = null;
      //   self.request.preview = "";
      //   this.$refs.file.reset();
      //   this.$toast.error(this.$t("file_format_incorrect"));
      //   e.preventDefault();
      //   return false;
      // }
      // var image_array = [];
      // for (i = 0; i < files.length; i++) {
      //   const file = files[i];
      //   var self = this;

      //   // validate mimetype
      //   if (file.type != "image/jpeg" && file.type != "image/png") {
      //     this.request.file = null;
      //     self.request.preview = "";
      //     this.$refs.file.reset();
      //   this.$toast.error(this.$t("file_format_incorrect"));
      //     e.preventDefault();
      //     return false;
      //   }
      //   // validate filesize
      //   var fileSize = (file.size / (1024 * 1024)).toFixed(2);
      //   if (fileSize > 5) {
      //     this.request.file = null;
      //     self.request.preview = "";
      //     this.$refs.file.reset();
      //   this.$toast.error(this.$t("file_format_incorrect"));
      //     e.preventDefault();
      //     return false;
      //   }
      //   image_array.push(URL.createObjectURL(file));
      // }
      // this.request.preview = image_array;
      // const files = e.target.files ? e.target.files : e.dataTransfer.files;

      const fileRef = e.target.files
        ? e.target.files[0]
        : e.dataTransfer.files[0];
      var self = this;
      // validate mimetype
      if (fileRef) {
        if (fileRef.type != "image/jpeg" && fileRef.type != "image/png") {
          this.$toast.error(this.$t("file_format_incorrect"));
          e.preventDefault();
          return false;
        }
        // validate filesize
        var fileSize = (fileRef.size / (1024 * 1024)).toFixed(2);
        if (fileSize > 5) {
          this.$toast.error(this.$t("file_format_incorrect"));
          e.preventDefault();
          return false;
        }
        if (this.file.length >= 5) {
          this.$toast.error(this.$t("file_format_incorrect"));
          e.preventDefault();
          return false;
        }
        this.request.preview.push(URL.createObjectURL(fileRef));
        this.file.push(fileRef);
      }
    },
    deleteItem(index,event) {
            event.preventDefault()

      this.request.preview.splice(index, 1);
      this.file.splice(index,1);
      if (this.request.preview.length < 1) {
        this.$refs.file.reset();
      }
    },
    submitRequest() {
      if (
        !this.request.style ||
        !this.request.age ||
        !this.request.gender ||
        !this.request.country ||
        !this.request.business
        // !this.request.color_limit
      ) {
        this.activateDynamicValidation = true;
        this.$toast.error(this.$t("fill_required_fields"));
      } else {
        let formRequest = JSON.parse(JSON.stringify(this.request));
        formRequest.age = formRequest.age.join(",");
        formRequest.gender = formRequest.gender.join(",");
        let joinedCountries = formRequest.country.map(arg => {
          return arg.translations[0].name;
        });
        formRequest.country = joinedCountries.join(",");
        let joinedStyles = formRequest.style.map(arg => {
          return arg.en;
        });
        formRequest.style = joinedStyles.join(",");
        formRequest.color_limit = parseInt(formRequest.color_limit);

        let formData = new FormData();
        for (var key in formRequest) formData.append(key, formRequest[key]);
        this.submitting = true;
        // for (var i = 0; i < this.$refs.file.files.length; i++) {
        //   let file = this.$refs.file.files[i];
        //   formData.append("files[" + i + "]", file);
        // }
        for (var i = 0; i < this.file.length; i++) {
          let file = this.file[i];
          formData.append("files[" + i + "]", file);
        }

        this.$axios
          .$post("/requests/exclusive", formData, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(response => {
            this.submitting = false;
            this.$store.commit("app/updateQuota", {
              key: "exclusive",
              delta: -1
            });
            //this.$toast.success(this.$t("application_submitted_successfully"));
            this.$router.push(this.localePath("/exclusive/list"));
          })
          .catch(error => {
            if (error.response.status == 422) {
              if (error.response.data.errors) {
                this.$toast.error("File format incorrect");
              }
            } else {
              this.$toast.error(error.response.data.error.message);
            }
            this.submitting = false;
            this.$toast.error(error.response.data.error.message);
            if (error.response.data.error.code == 4006) {
              this.$bvModal.show("modal-payments");
              this.$store.commit("payments/setPackage", {
                key: "exclusive",
                index: 0
              });
            }
          });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadCountries();
    });
  }
};
</script>

<style lang="scss">
.important-request-message {
  padding: 15px 20px;
  border: 1px solid #f5f5f5;
  border-radius: 4px;

  .important-title {
    font-weight: 700;
  }
  .important-description {
    max-width: 98%;
    margin: 0;
    padding: 0;
    color: #bbb;
    font-size: 20px;
  }
  .important-terms {
    a {
      color: inherit;
      text-decoration: none;
      border-bottom: 1px solid $black;
    }
  }
}
.component.pageinfo {
  .pageinfo-description-exclusive {
    max-width: 98%;
    margin: 0;
    padding: 0;
    color: #bbb;
    font-size: 20px;

    a {
      color: #000 !important;
      font-weight: 700;
      text-decoration: none;
      display: inline-block;
    }
  }
}

.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 8px 40px 0 8px;
  border-radius: 0px;
  border: 1px solid #e8e8e8;
  background: #fff;
  font-size: 14px;
}

.page.create-request {
  .designRequestForm {
    .row {
      margin: 10px 0;
    }
    .image-columns {
      display: flex;
      flex-wrap: wrap;
    }
    .image-container {
      width: auto;
      border-radius: 25px;

      margin: 20px 20px 20px 20px;
      overflow: visible;
      position: relative;
    }

    .remove-image {
      position: absolute;
      background: #363636;
      color: white;
      top: -10px;
      right: -10px;
      border-radius: 20px;
      border: none;
    }

    .preview {
      max-width: 200px;
    }

    .actions {
      margin-top: 30px;
      text-align: center;

      .send_application {
        border-radius: 30px;
        background-color: #363636;
        color: #fff;
        width: 220px;
        font-weight: 650;
        margin-right: 10px;
        margin-bottom: 10px;
        text-transform: uppercase;
        outline: none;
        border: none;
        height: 38px;
      }

      .back {
        border-radius: 30px;
        background-color: white;
        color: #363636;
        width: 165px;
        font-weight: 700;
        margin-right: 10px;
        margin-bottom: 10px;
        margin-left: 15px;
        text-transform: uppercase;
        outline: none;
        border: none;
        border: 1px solid #363636;
        height: 38px;

        a {
          color: inherit;
          text-decoration: none;
        }
      }
    }
  }

  .mltselect.invalid {
    border: 1px solid #f30;
    border-radius: 4px;
  }
}
</style>