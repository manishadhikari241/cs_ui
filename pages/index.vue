<template>
    <div>
        <div class="page home">
            <!-- <div class="container"> -->
            <client-only>
                <div class="row">
                    <div class="col-md-6 col-sm-12 col-lg-6">
                        <PageInfo :slug="'home'"/>
                        <!--<b-button class="action-btn rounded-btn bg-white text-black "-->
                        <!--&gt;button-->
                        <!--</b-button>-->
                        <br>
                        <br>
                        <div class="row resp-row">
                            <div class="col-lg-6 col-md-7 d-flex">
                                <div class="d-flex align-items-end">
                                    <p class="starts-from">{{$t('starts_from')}}</p>&nbsp;

                                </div>
                                <p class="starts-from-price">{{$t('starts_price')}}</p>
                                <p class="starts-from-design">{{$t('design_homepage')}}</p>

                            </div>
                            <div class="col-lg-4 col-md-5 d-flex align-items-center">
                                <nuxt-link class="view-pricing" :to="localePath('/pricing')">{{
                                    $t("view_pricing")
                                    }}</nuxt-link>
                            </div>
                        </div>
                    </div>


                    <div class="col-md-6 col-sm-12 col-lg-6">
                        <div class="container">
                            <img
                                    src="~/assets/static/homebanner.png"
                                    class="img-fluid rounded-corners"
                                    alt=""
                            />
                        </div>

                    </div>
                </div>

                <br/><br/>
                <div style="text-align: center" v-if="loading">
                    <b-spinner type="grow" label="Loading..."></b-spinner>
                </div>
            </client-only>
        </div>
        <!-- <div> -->
        <!-- <div class="pagecontainer"> -->
        <PageBlocks :blocks="blocks" v-if="!loading"/>
        <!-- </div> -->
        <!-- </div> -->
    </div>
</template>

<script>
    import PageInfo from "~/components/pageinfo";
    import PageBlocks from "~/components/pageblocks";

    export default {
        components: {
            PageInfo,
            PageBlocks
        },
        asyncData(context) {
            return context.$axios.get("/pages/home").then(res => {
                return {pageData: res.data};
            });
        },
        head() {
            return {
                meta: [
                    {
                        hid: "description",
                        name: "description",
                        content: this.pageData.translations[this.$i18n.locale]
                            .meta_description
                    },
                    {
                        hid: "keywords",
                        name: "keywords",
                        content: this.pageData.translations[this.$i18n.locale].meta_keywords
                    },
                    {
                        hid: "og:image",
                        name: "og:image",
                        content: "https://dev.collectionstock.com/images/email/logo.png"
                    },
                    {    property: 'og:image', 
                        content: 'https://dev.collectionstock.com/images/email/logo.png'
                        },
    
                ]
            };
        },
        data() {
            return {
                loading: false,
                blocks: []
            };
        },
        methods: {
            toggleLoading() {
                this.loading = !this.loading;
            },

            loadPageBlocks() {
                this.toggleLoading();
                this.$axios.$get("/pages/home/blocks").then(response => {
                    this.toggleLoading();
                    this.blocks = response;
                });
            }
        },
        mounted() {
            this.loadPageBlocks();
        }
    };
</script>

<style lang="scss" scoped>
    .page.home {
        .resp-row {
            @media screen and (max-width: 550px) {
                margin-bottom: 30px;
                margin-top: -30px;
            }
        }

        .view-pricing {
            display: inline-block;
            padding: 6px 22px;
            border: 1px solid #000;
            border-radius: 30px;
            text-transform: uppercase;
            color: #000;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);

            @media screen and (max-width: 768px) {
                font-size: 9px;
            }

        }
        .starts-from {
            font-size: 14px;
            @media screen and (max-width: 768px) {
                font-size: 10px;
                padding-top: 22px;
            }
        }
        .starts-from-price {
            font-size: 50px;
            font-weight: 700;
            margin-bottom: 4px;
            @media screen and (max-width: 768px) {
                font-size: 30px;
            }
        }
        .starts-from-design {
            font-size: 34px;
            font-weight: 700;
            margin-bottom: 4px;
            padding-top: 17px;
            @media screen and (max-width: 768px) {
                font-size: 15px;
            }
        }
        .rounded-corners {
            border-radius: 10px;
        }
        .container {
            margin: 0;
            padding: 0;

            .row {
                margin-bottom: 100px;

            }
        }

        .block {
            display: flex;
            align-items: center;

            &.text {
                h1 {
                    margin: 0;
                    padding: 0;
                    font-size: 40px;
                    font-weight: 700;
                    color: #000;
                    text-transform: uppercase;
                }

                p {
                    margin: 0;
                    margin-top: 20px;
                    padding: 0;
                    font-size: 20px;
                    color: #000;
                }

                a {
                    margin-top: 30px;
                    display: inline-block;
                    padding: 10px 40px;
                    border: 1px solid #000;
                    border-radius: 30px;
                    text-transform: uppercase;
                    color: #000;
                    font-size: 18px;
                    font-weight: 700;
                    text-decoration: none;
                }
            }

            img {
                max-width: 90%;
                @media screen and (max-width: 426px) {
                    max-width: 100%;
                }
            }
        }
    }

    @media screen and (max-width: 767px) {
        .page.home {
            .block {
                justify-content: center;
                text-align: center;

                &.text {
                    padding-top: 30px;

                    h1 {
                        font-size: 30px;
                    }

                    p {
                        font-size: 18px;
                    }

                    a {
                        font-size: 14px;
                    }
                }
            }
        }
    }

    .rounded-btn {
        background: white;
        color: grey;
        border-radius: 20px;
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.4);
        border: none;
        outline: none;
    }
    #app-content-wrapper {
        padding-bottom: 140px;
    }
</style>
