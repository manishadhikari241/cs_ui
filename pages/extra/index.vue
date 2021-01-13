<template>
    <div class="page extra">
        <PageInfo :slug="'extra'"/>

        <br/>

        <client-only>
            <nuxt-link
                    v-if="first"
                    class="post cover"
                    :to="localePath(`/extra/${first.id}`)"
            >
                <img :src="`${imgBaseURL}/storage/${first.main_cover}`" class="w-100 d-none d-sm-block image-container"/>
                <img :src="`${imgBaseURL}/storage/${first.cover}`" class="w-100 d-block d-sm-none image-container"/>
                <!--<div class="image-container" :style="`background-image: url('${imgBaseURL}/storage/${first.cover}')`"></div>-->
                <div class="title">
                    {{ first.translations[$i18n.locale == "en" ? 0 : 1].title }}
                </div>
            </nuxt-link>

            <br/><br/>

            <div class="posts-list">
                <b-row>
                    <b-col md="4" v-for="post in data" :key="post.id">
                        <nuxt-link class="post " :to="localePath(`/extra/${post.id}`)">
                            <img
                                    :src="`${imgBaseURL}/storage/${post.cover}`"
                                    class="w-100 image-container"
                            />
                            <!--<div-->
                            <!--class="image-container" :style="`background-image: url('${imgBaseURL}/storage/${post.cover}')` "-->
                            <!--&gt;</div>-->
                            <div class="title font-weight-bold">
                                {{ post.translations[$i18n.locale == "en" ? 0 : 1].title }}
                            </div>
                        </nuxt-link>
                    </b-col>
                </b-row>
            </div>

            <infinite-loading @infinite="loadMore" ref="infload"></infinite-loading>
        </client-only>
    </div>
</template>

<script>
    import PageInfo from "~/components/pageinfo";

    export default {
        components: {
            PageInfo
        },
        data() {
            return {
                itemsPerPage: 20,
                page: 0,
                maxPage: 100,
                total: 0,
                data: [],
                first: null,

                imgBaseURL: process.env.NUXT_ENV_SERVER
            };
        },
        asyncData(context) {
            return context.$axios.get("/pages/extra").then(res => {
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
                    }
                ]
            };
        },
        methods: {
            loadMore() {
                this.$axios.$get(`posts`).then(response => {
                    this.page = response.current_page;
                    this.maxPage = response.last_page;
                    this.total = response.total;

                    if (response.data.length) {
                        this.first = response.data.shift();
                        this.data.push(...response.data);
                    }

                    this.$refs.infload.stateChanger.loaded();
                    if (this.page >= this.maxPage)
                        this.$refs.infload.stateChanger.complete();
                });
            },

            resetList() {
                this.page = 0;
                this.maxPage = 100;
                this.total = 0;
                this.data = [];
                this.first = null;
                this.$refs.infload.stateChanger.reset();
            }
        },
        mounted() {
            this.$nextTick(() => {
                if (this.$refs.infload) this.resetList();
            });
        }
    };
</script>

<style lang="scss" scoped>
    .page.extra {
        /*padding: 0px 45px;*/
        .content {
            margin-top: 30px;
            position: relative;
            min-height: 300px;
            overflow: hidden;
        }
        .post {
            margin-bottom: 30px;
            display: block;
            text-decoration: none;

            .image-container {
                // height: 300px;
                border-radius: 5px;
                // background-repeat: no-repeat;
                // background-position: center;
                // background-size: 100%;
            }

            .title {
                margin-top: 15px;
                font-size: 20px;
                color: $black;
                text-decoration: none;
                @media screen and (max-width: 768px) {
                    font-size: 16px;
                }
            }

            &.cover {
                margin-bottom: 0;

                .image-container {
                    // height: 400px;
                    @media screen and (mi-width: 768px) {
                        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
                    }
                }

                .title {
                    margin-top: 25px;
                    font-size: 30px;
                    font-weight: 600;
                    @media screen and (max-width: 768px) {
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>
