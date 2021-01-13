<template>
    <div class="page create-request">
        <div class="component pageinfo">
            <div class="pageinfo-head">
                <h1 class="pageinfo-title">{{ $t("send_a_request") }}</h1>
            </div>
            <p class="pageinfo-description-free">{{ $t("complete_this_form") }}</p>
            <p class="pageinfo-description-free">
                {{ $t("a_new_collection_will_be") }}
            </p>

            <p class="pageinfo-description-free">{{ $t("you_can_follow_the") }}</p>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <form class="designRequestForm" @submit.prevent="submitRequest">
                        <b-row>
                            <b-col md="3">{{ $t("name_of_request") }}</b-col>
                            <b-col md="9">
                                <b-input
                                        :placeholder="$t('give_us_the_name')"
                                        v-model="request.name"
                                        required
                                ></b-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="3">{{ $t("style_of_design") }}</b-col>
                            <b-col md="9">
                                <multiselect
                                        :class="
                    `mltselect${
                      request.style == null || request.style.length == 0
                        ? ` invalid${
                            activateDynamicValidation ? '' : '_disable'
                          }`
                        : ' '
                    }`
                  "
                                        :select-label="$t('enter_to_select')"
                                        :deselect-label="$t('enter_to_remove')"
                                        :selected-label="$t('selected')"
                                        v-model="request.style"
                                        :options="styleOptions"
                                        :multiple="true"
                                        track-by="en"
                                        :label="$i18n.locale"
                                        :placeholder="$t('select_option')"
                                ></multiselect>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="3">{{ $t("other_styles") }}</b-col>
                            <b-col md="9">
                                <b-input v-model="request.other"></b-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="3">{{ $t("your_detailed_briefing") }}</b-col>
                            <b-col md="9">
                                <b-textarea v-model="request.briefing" required></b-textarea>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="3">{{ $t("reference_file") }}</b-col>
                            <b-col md="9">
                                <b-form-file
                                        class="ref_file"
                                        ref="file"
                                        v-model="request.file"
                                        :state="Boolean(request.preview)"
                                        :browse-text="$t('browse')"
                                        :placeholder="$t('upload_drop_free_req')"
                                        drop-placeholder="Drop file here..."
                                        @change="generatePreview"
                                        required
                                ></b-form-file>
                                <small class="d-block d-md-none">{{
                                    $t("upload_drop_free_req")
                                    }}
                                </small>
                            </b-col>
                        </b-row>
                        <b-row v-if="request.file != null">
                            <b-col md="3">&nbsp;</b-col>
                            <b-col md="9">
                                <img class="preview" :src="request.preview"/>
                            </b-col>
                        </b-row>

                        <!-- <b-row>
                                          <b-col md="3">{{ $t('color_preferences_tpx') }}</b-col>
                                          <b-col md="9">
                                            <b-input v-model="request.tpx" required></b-input>
                                          </b-col>
                                        </b-row> -->
                        <!-- <b-row>
                                          <b-col md="3">{{ $t('color_limitations_for_printing') }}</b-col>
                                          <b-col md="9">
                                            <multiselect
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
                                        </b-row> -->
                        <b-row>
                            <b-col md="3">{{ $t("your_product") }}</b-col>
                            <b-col md="9">
                                <b-input
                                        :placeholder="$t('cushion')"
                                        v-model="request.product"
                                        required
                                ></b-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="3">{{ $t("your_customers") }}</b-col>
                            <b-col md="9">
                                <multiselect
                                        :class="
                    `mltselect${
                      request.age == null || request.age.length == 0
                        ? ` invalid${
                            activateDynamicValidation ? '' : '_disable'
                          }`
                        : ' '
                    }`
                  "
                                        v-model="request.age"
                                        :select-label="$t('enter_to_select')"
                                        :deselect-label="$t('enter_to_remove')"
                                        :selected-label="$t('selected')"
                                        :placeholder="$t('select_option')"
                                        :multiple="true"
                                        :options="[
                    `${$t('infant')}`,
                    `${$t('children')}`,
                    `${$t('teenagers')}`,
                    `${$t('adults')}`,
                    `${$t('seniors')}`
                  ]"
                                >
                                </multiselect>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="3">{{ $t("target_gender") }}</b-col>
                            <b-col md="9">
                                <multiselect
                                        :class="
                    `mltselect${
                      request.gender == null || request.gender.length == 0
                        ? ` invalid${
                            activateDynamicValidation ? '' : '_disable'
                          }`
                        : ' '
                    }`
                  "
                                        :select-label="$t('enter_to_select')"
                                        :deselect-label="$t('enter_to_remove')"
                                        :selected-label="$t('selected')"
                                        v-model="request.gender"
                                        :placeholder="$t('select_option')"
                                        :multiple="true"
                                        :options="[`${$t('male')}`, `${$t('female')}`]"
                                >
                                </multiselect>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="3">{{ $t("your_market") }}</b-col>
                            <b-col md="9">
                                <multiselect
                                        :class="
                    `mltselect${
                      request.country == null || request.country.length == 0
                        ? ` invalid${
                            activateDynamicValidation ? '' : '_disable'
                          }`
                        : ' '
                    }`
                  "
                                        v-model="request.country"
                                        :select-label="$t('enter_to_select')"
                                        :deselect-label="$t('enter_to_remove')"
                                        :selected-label="$t('selected')"
                                        :placeholder="$t('select_option')"
                                        :options="countries"
                                        track-by="id"
                                        :searchable="true"
                                        :custom-label="countryLabel"
                                        :multiple="true"
                                >
                                </multiselect>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="3">{{ $t("your_business") }}</b-col>
                            <b-col md="9">
                                <multiselect
                                        :class="
                    `mltselect${
                      request.business == null || request.business.length == 0
                        ? ` invalid${
                            activateDynamicValidation ? '' : '_disable'
                          }`
                        : ' '
                    }`
                  "
                                        :select-label="$t('enter_to_select')"
                                        :deselect-label="$t('enter_to_remove')"
                                        :selected-label="$t('selected')"
                                        v-model="request.business"
                                        :placeholder="$t('select_option')"
                                        :options="[
                    `${$t('retailer')}`,
                    `${$t('brand')}`,
                    `${$t('manufacturer')}`,
                    `${$t('other')}`
                  ]"
                                >
                                </multiselect>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="11">
                                <div class="important-request-message">
                                    <p class="important-title">{{ $t("important") }}</p>
                                    <p class="important-description">
                                        {{ $t("the_design_we_create_free") }}
                                    </p>
                                    <p class="important-description">
                                        {{ $t("the_request_is_for_free") }}
                                    </p>
                                    <p class="important-description">
                                        {{ $t("one_request_at_time") }}
                                    </p>
                                </div>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col>
                                <b-form-checkbox name="accept" v-model="accept" required
                                ><span v-html="$t('accept_request_terms')"></span
                                ></b-form-checkbox>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col>
                                <div class="actions">
                                    <button
                                            class="send_application"
                                            type="submit"
                                            :disabled="submitting"
                                    >
                                        {{ $t("send_request") }}
                                    </button>
                                    <button class="back" :disabled="submitting">
                                        <nuxt-link :to="localePath('/request')">{{
                                            $t("back")
                                            }}
                                        </nuxt-link>
                                    </button>
                                </div>
                            </b-col>
                        </b-row>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Multiselect from "vue-multiselect";
    import "vue-multiselect/dist/vue-multiselect.min.css";

    export default {
        middleware: "auth",

        components: {
            Multiselect
        },

        data() {
            return {
                file1: "",
                countries: [],
                request: {
                    is_collection: 1,
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
                    try: false,
                    preview: "",
                    file: null
                },
                accept: false,
                submitting: false,

                activateDynamicValidation: false,

                styleOptions: [
                    {en: "Menswear", ch: "男装"},
                    {en: "Womenswear", ch: "女装"},
                    {en: "Kidswear", ch: "童装"},
                    {en: "Swimwear", ch: "游泳衣"},
                    {en: "Casual Wear", ch: "休闲装"},
                    {en: "Houseware", ch: "家居用品"},
                    {en: "Home", ch: "家"},
                    {en: "Stationary", ch: "文具"},
                    {en: "Gifts", ch: "礼物"},
                    {en: "Traditional", ch: "传统"},
                    {en: "Abstract", ch: "抽象"},
                    {en: "Aquarelle", ch: "水彩画"},
                    {en: "Ethnic", ch: "民族风"},
                    {en: "Geometric", ch: "几何"},
                    {en: "Paisleys", ch: "涡旋花纹"},
                    {en: "Floral", ch: "花"},
                    {en: "Nature", ch: "自然"},
                    {en: "Tropical", ch: "热带"},
                    {en: "Animals", ch: "动物"},
                    {en: "Kids", ch: "儿童"},
                    {en: "Love", ch: "爱情"},
                    {en: "Easter", ch: "复活节"},
                    {en: "Halloween", ch: "万圣节"},
                    {en: "Christmas", ch: "圣诞节"},
                    {en: "Spring", ch: "春天"},
                    {en: "Summer", ch: "夏天"},
                    {en: "Fall", ch: "秋天"},
                    {en: "Winter", ch: "冬天"}
                ]
            };
        },

        methods: {
            requestButton() {
                this.$store
                    .dispatch("app/requestButton")
                    .then(success => {
                    })
                    .catch(error => {
                        this.$router.push("/request");
                    });
            },
            loadCountries() {
                this.$axios.$get("/countries?all=1").then(response => {
                    this.countries = response;
                });
            },

            countryLabel({translations}) {
                return translations[0].name;
            },

            generatePreview(e) {
                const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
                this.request.file = file;
                var self = this;

                // validate mimetype
                if (file.type != "image/jpeg" && file.type != "image/png") {
                    this.$refs.file.reset();
                    self.request.preview = "";
                    self.request.file = null;
                    this.$toast.error(this.$t("file_format_incorrect"));
                    e.preventDefault();
                    return false;
                }
                // validate filesize
                var fileSize = (file.size / (1024 * 1024)).toFixed(2);
                if (fileSize > 5) {
                    this.$refs.file.reset();

                    self.request.preview = "";
                    self.request.file = null;
                    this.$toast.error(this.$t("file_format_incorrect"));
                    e.preventDefault();
                    return false;
                }
                this.request.preview = URL.createObjectURL(file);
            },

            submitRequest() {
                if (
                    !this.request.style ||
                    !this.request.age ||
                    !this.request.gender ||
                    !this.request.country ||
                    !this.request.business
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

                    let formData = new FormData();
                    for (var key in formRequest) formData.append(key, formRequest[key]);
                    formData.append("files[0]", this.request.file);

                    this.submitting = true;
                    this.$axios
                        .$post("/requests", formData, {
                            headers: {"Content-Type": "multipart/form-data"}
                        })
                        .then(response => {
                            this.submitting = false;
                            //this.$toast.success(this.$t("application_submitted_successfully"));
                            this.$router.push(this.localePath("/request/list"));
                        })
                        .catch(error => {
                            this.submitting = false;
                            if (error.response.status == 422) {
                                if (error.response.data.errors) {
                                    this.$toast.error("File format incorrect");
                                }
                            } else {
                                this.$toast.error(error.response.data.error.message);
                            }
                        });
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.loadCountries();
            });
        },
        created() {
            this.requestButton();
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
            font-size: 16px;
            @media screen and (max-width: 1024px) {
                font-size: 12.75px;
            }
        }
        .important-description {
            max-width: 98%;
            margin: 0;
            padding: 0;
            color: #bbb;
            font-size: 16px;
            @media screen and (max-width: 1024px) {
                font-size: 12.75px;
            }
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
        .pageinfo-description-free {
            max-width: 98%;
            margin: 0;
            padding: 0;
            color: #bbb;
            font-size: 20px;
            @media screen and (max-width: 1024px) {
                font-size: 15px;
            }

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
            @media screen and (max-width: 500px) {
                .ref_file label span {
                    color: transparent;
                }
            }
            ::placeholder {
                font-size: 16px;
            }
            font-size: 16px;
            width: 100%;
            .row {
                margin: 10px 0;
            }
            @media screen and (max-width: 1024px) {
                font-size: 12.75px;
                ::placeholder {
                    font-size: 12.75px;
                }
            }

            .preview {
                max-width: 200px;
            }

            .actions {
                button {
                    height: 36px;
                    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                    font-size: 16px;
                    @media screen and (max-width: 768px) {
                        font-size: 14px;
                    }
                }
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
                    @media screen and (max-width: 500px) {
                        width: 220px;
                        margin-left: 0px;

                    }

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
