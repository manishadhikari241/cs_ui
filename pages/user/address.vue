<template>
    <div class="page user">
        <b-container>
            <b-row>
                <b-col md="3">
                    <UserMenu/>
                </b-col>
                <b-col md="9">
                    <div class="content">
                        <div class="address-container">
                            <div class="title" v-if="mode === null">
                                <span>{{$t('address_book')}}</span>
                                <div class="button">
                                    <button style="outline:none" class="button-white" size="sm"
                                            @click="setEditMode(-1)"><i
                                            class="fa fa-plus"></i>&nbsp;&nbsp;{{$t('new_address')}}
                                    </button>
                                </div>

                            </div>
                            <div class="title" v-if="mode === -1">
                                <span>{{$t('new_address')}}</span>
                                <button style="outline: none" class="back" size="sm" @click="setEditMode(null)">
                                    <b-icon-chevron-left></b-icon-chevron-left>&nbsp;{{$t('back')}}
                                </button>
                            </div>
                            <!--

                            <div class="title" v-if="mode !== null && mode >= 0">
                              <span>Update Address</span>
                              <b-button size="sm" variant="light" @click="setEditMode(null)"><i class="fas fa-chevron-left"></i>&nbsp;&nbsp;Back</b-button>
                            </div> -->

                            <br>

                            <b-table class="address-list" v-if="mode === null" :items="init.addresses" :fields="fields"
                                     :responsive="'md'"

                                     :busy="!init.addresses" striped>
                                     
                                <template v-slot:cell(is_default)="data">
                                    <b-badge variant="success" v-if="data.item.is_default">{{$t('default')}}</b-badge>
                                </template>
                                <template v-slot:cell(edit)="data">
                                    <button class="button-actions" style="outline:none;" size="sm"
                                            @click="setEditMode(data.index)">{{$t('edit')}}
                                    </button>
                                </template>
                                <template v-slot:cell(delete)="data">
                                    <button style="outline:none;" class="button-actions" size="sm"
                                            @click="deleteAddress(data.item.id, data.index)">{{$t('delete')}}
                                    </button>
                                </template>
                            </b-table>

                            <div v-if="mode === -1" class="new-address-form">
                                <form @submit.prevent="createAddress">
                                    <div class="info-row">
                                        <div class="prop">{{$t('first_name')}}</div>
                                        <div class="value">
                                            <b-input v-model="newAddress.first_name" required></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('last_name')}}</div>
                                        <div class="value">
                                            <b-input v-model="newAddress.last_name" required></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('company')}}</div>
                                        <div class="value">
                                            <b-input v-model="newAddress.company"></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('address_1')}}</div>
                                        <div class="value">
                                            <b-input v-model="newAddress.address1" required></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('address_2')}}</div>
                                        <div class="value">
                                            <b-input v-model="newAddress.address2"></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('city')}}</div>
                                        <div class="value">
                                            <b-input v-model="newAddress.city" required></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('post_code')}}</div>
                                        <div class="value">
                                            <b-input class="mb-0" v-model="newAddress.post_code" required></b-input>
                                             <p class="ml-0" style="font-size: 12px;">{{$t('if_your_region')}}</p>

                                        </div>
                                    </div>
                               
                                    <div class="info-row">
                                        <!--<div class="prop">{{$t('country_region')}}</div>-->
                                        <!--<div class="value d-flex">-->
                                        <!--<multiselect-->
                                        <!--:select-label="$t('enter_to_select')"-->
                                        <!--:deselect-label="$t('enter_to_remove')"-->
                                        <!--:selected-label="$t('selected')"-->
                                        <!--:class="'country_select'"-->
                                        <!--v-model="newAddress.country"-->
                                        <!--:placeholder="$t('select_option')"-->
                                        <!--:options="countries"-->
                                        <!--track-by="id"-->
                                        <!--:searchable="true"-->
                                        <!--:custom-label="countryLabel"-->
                                        <!--:multiple="false">-->
                                        <!--</multiselect>-->
                                        <!--</div>-->
                                        <div class="row">
                                            <b-col md="4" lg="3">
                                                <div class="prop">{{$t('country_region')}}</div>
                                            </b-col>
                                            <b-col md="8" lg="9">
                                                <div class="value">
                                                    <multiselect
                                                            :select-label="$t('enter_to_select')"
                                                            :deselect-label="$t('enter_to_remove')"
                                                            :selected-label="$t('selected')"
                                                            :class="'country_select'"
                                                            v-model="newAddress.country"
                                                            :placeholder="$t('select_option')"
                                                            :options="countries"
                                                            track-by="id"
                                                            :searchable="true"
                                                            :custom-label="countryLabel"
                                                            :multiple="false">
                                                    </multiselect>
                                                </div>
                                            </b-col>
                                        </div>


                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('vat_number')}}</div>
                                        <div class="value">
                                            <b-input v-model="newAddress.vat_number"></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('default_address')}}</div>
                                        <div class="value">
                                            <b-form-checkbox v-model="newAddress.is_default"></b-form-checkbox>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">
                                            <button type="submit" class="button-submit" :disabled="loading">
                                                {{$t('submit')}}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div v-if="mode !== null && mode >= 0" class="new-address-form">
                                <form @submit.prevent="updateAddress">
                                    <div class="info-row">
                                        <div class="prop">{{$t('first_name')}}</div>
                                        <div class="value">
                                            <b-input v-model="updateRequest.first_name" required></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('last_name')}}</div>
                                        <div class="value">
                                            <b-input v-model="updateRequest.last_name" required></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('company')}}</div>
                                        <div class="value">
                                            <b-input v-model="updateRequest.company"></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('address_1')}}</div>
                                        <div class="value">
                                            <b-input v-model="updateRequest.address1" required></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('address_2')}}</div>
                                        <div class="value">
                                            <b-input v-model="updateRequest.address2"></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('city')}}</div>
                                        <div class="value">
                                            <b-input v-model="updateRequest.city" required></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('post_code')}}</div>
                                        <div class="value">
                                            <b-input v-model="updateRequest.post_code" required></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">&nbsp;</div>
                                        <div class="value" style="font-size: 12px;">{{$t('if_your_region')}}
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('country_region')}}</div>
                                        <div class="value">
                                            <b-input v-model="updateRequest.country" required></b-input>
                                        </div>

                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('vat_number')}}</div>
                                        <div class="value">
                                            <b-input v-model="updateRequest.vat_number"></b-input>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">{{$t('default')}}</div>
                                        <div class="value">
                                            <b-form-checkbox v-model="updateRequest.is_default"></b-form-checkbox>
                                        </div>
                                    </div>
                                    <div class="info-row">
                                        <div class="prop">
                                            <button type="submit" class="button-submit" :disabled="loading">
                                                {{$t('update')}}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import UserMenu from "~/components/menus/user-menu";
    import Multiselect from "vue-multiselect";
    import "vue-multiselect/dist/vue-multiselect.min.css";
    import {BIconChevronLeft} from "bootstrap-vue";

    export default {
        middleware: "auth",
        components: {
            UserMenu,
            Multiselect,
            BIconChevronLeft
        },
        computed: {
            ...mapState("app", ["init"])
        },
        data() {
            return {
                fields: [
                    {
                        key: "first_name",
                        label: this.$t("first_name"),
                        tdClass: 'show-data',
                        thClass: 'show-head'
                    },
                    {
                        key: "last_name",
                        label: this.$t("last_name"),
                        tdClass: 'show-data',
                        thClass: 'show-head'
                    },
                    {
                        key: "company",
                        label: this.$t("company"),
                        tdClass: 'show-data',
                        thClass: 'show-head'
                    },
                    {
                        key: "is_default",
                        label: this.$t("default"),
                        tdClass: 'show-data',
                        thClass: 'show-head'
                    },
                    {
                        key: "edit",
                        label: this.$t("edit"),
                        tdClass: 'show-data',
                        thClass: 'show-head'
                    },
                    {
                        key: "delete",
                        label: this.$t("delete"),
                        tdClass: 'show-data',
                        thClass: 'show-head'
                    }
                ],
                mode: null,
                loading: false,
                newAddress: {
                    first_name: "",
                    last_name: "",
                    company: "",
                    address1: "",
                    address2: "",
                    city: "",
                    country: "",
                    post_code: "",
                    vat_number: "",
                    is_default: false
                },
                countries: [],
                updateRequest: {}
            };
        },
        methods: {
       
            loadCountries() {
                this.$axios.$get("/countries?all=1").then(response => {
                    this.countries = response;
                });
            },

            setEditMode(mode) {
                this.mode = mode;

                if (mode !== null && mode >= 0) {
                    this.updateRequest = JSON.parse(
                        JSON.stringify(this.init.addresses[mode])
                    );
                }
            },

            countryLabel({translations}) {
                return translations[0].name;
            },

            createAddress() {
                let request = JSON.parse(JSON.stringify(this.newAddress));
                request.country = this.newAddress.country
                    ? this.newAddress.country.translations[0].name
                    : null;
                this.loading = true;
                this.$axios
                    .$post("/addresses", request)
                    .then(response => {
                        this.$toast.success(this.$t("new_address_added"));

                        this.newAddress = {
                            first_name: "",
                            last_name: "",
                            company: "",
                            address1: "",
                            address2: "",
                            city: "",
                            country: "",
                            post_code: "000000",
                            vat_number: "",
                            is_default: false
                        };

                        this.loading = false;
                        this.setEditMode(null);

                        this.$store.commit("app/setAddresses", response);
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$toast.error(error.response.data.error.message);
                    });
            },

            deleteAddress(id, index) {
                this.$axios
                    .$delete(`/addresses/${id}`)
                    .then(response => {
                        this.$toast.success(this.$t("address_deleted"));
                        this.$store.commit("app/setAddresses", response);
                    })
                    .catch(error => {
                        this.$toast.error(error.response.data.error.message);
                    });
            },

            updateAddress() {
                this.loading = true;
                this.$axios
                    .$patch(`/addresses/${this.updateRequest.id}`, this.updateRequest)
                    .then(response => {
                        this.$toast.success(this.$t("address_updated"));

                        this.loading = false;
                        this.setEditMode(null);
                        this.updateRequest = {};

                        this.$store.commit("app/setAddresses", response);
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$toast.error(error.response.data.error.message);
                    });
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
    .button-white {
        background-color: #363636;
        font-size: 13px;
        color: #363636;
        border: 1px solid #363636;
        border-radius: 30px;
        padding: 5px 30px;
        margin-left: 20px;
        background-color: white;
        font-weight: 700;
        margin-right: 20px;
        text-transform: uppercase;
             @media screen and (max-width: 550px) {
        margin-left: 0px;
        margin-top:10px
                }

        /*#left{*/
        /*display: none;*/
        /*}*/
    }

    .back {
        border-radius: 30px;
        background-color: white;
        color: #363636;
        width: 87px;
        font-weight: 700;
        margin-right: 10px;
        margin-bottom: 10px;
        margin-left: 15px;
        text-transform: uppercase;
        border: 1px solid #363636;
        font-size: 13px;
        line-height: 27px;
    }

    .button-actions {
        background-color: #363636;
        font-size: 13px;
        color: white;
        border: 1px solid #363636;
        border-radius: 30px;
        padding: 5px 24px;
        background-color: #363636;
        font-weight: 700;
        display: flex;
        outline: none;
        border: none;
        @media screen and (max-width: 768px) {
            font-size: 12px;

        }
    }

    .page.user {
        .address-container {
            .title {
                font-size: 25px;
                font-weight: 700;
                color: $black;
                display: flex;
                align-items: center;
                justify-content: space-between;
                     @media screen and (max-width: 550px) {
display: block                }

            }
            .address-list .show-head {
                @media screen and (max-width: 768px) {
                    font-size: 14px;
                }
            }
            .address-list .show-data {
                @media screen and (max-width: 768px) {
                    font-size: 12px;
                }
            }
            .table {
                font-size: 14px;
            }
            .info-rows-country {
    font-size: 16px;
                font-weight: 600;

            }
            .info-row {
                display: flex;
                padding: 5px 0;
                width: 100%;
                @media screen and (max-width: 500px) {
                    display: block;
                }

                .prop {
                    width: 200px;
                    font-size: 16px;
                    font-weight: 600;
                    @media screen and (max-width: 768px) {
                        font-size: 14px;
                    }
                }
                .button-submit {
                    font-size: 13px;
                    color: white;
                    border-radius: 30px;
                    padding: 5px 62px;
                    background-color: #363636;
                    font-weight: 700;
                    display: flex;
                    border: none;
                    outline: none;
                    margin-left: 7px;
                }

                .value {
                    input,
                    textarea,
                    select {
                        width: 300px;
                        @media screen and (min-width: 1024px) {
                            width: 400px
                        }
                        @media screen and (max-width: 768px) {
                            width: 300px;
                            font-size: 12px;
                        }
                        @media screen and (max-width: 500px) {
                            width: 100%;
                        }
                    }
                }

                /*.country_select {*/
                /*@media screen and (min-width: 1024px) {*/
                /*width: 440px;*/
                /*}*/

                /*}*/
            }
        }
    }
</style>