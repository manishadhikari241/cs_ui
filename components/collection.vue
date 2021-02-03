<template>
    <div class="component collection">
        <b-container>
            <b-row>
                <b-col md="5" :order="slideShowLeft ? 1 : 2" class="slideshow-col">
                    <div>
                        <b-carousel :interval="0" indicators controls>
                            <b-carousel-slide v-if="hasMoodBoard()"
                                              :img-src="`/cloudfront/uploads/lib/feed/moodboard${getMoodBoardURL()}`"></b-carousel-slide>
                            <b-carousel-slide v-for="design in data.designs" :key="design.id"
                                              :img-src="`/api/v1/image/thumbnail/design/${design.code}/large`"></b-carousel-slide>
                        </b-carousel>
                    </div>
                </b-col>
                <b-col md="7" :order="slideShowLeft ? 2 : 1" class="description-col">
                    <div class="basic">
                        <div class="designer">
                            <div class="designer-avatar">
                                <img v-if="data.user.avatar"
                                     :src="`/cloudfront/uploads/user/${parseDesignerAvatarURL()}`">
                            </div>
                            <div class="name-published">
                                <p class="designer-name">{{ data.user.first_name }}</p>
                                <p class="published-date">{{ $moment(data.published_at).format('DD/MM/YYYY') }}</p>
                            </div>
                        </div>
                        <h2 class="title">{{ getTitle() }}</h2>
                        <div class="properties">
                            <div>
                                <span class="prop">{{ $t('category') }}: </span>
                                <a v-for="(category, $index) in data.categories" :key="category.id"
                                   @click="searchKeyword(category.translations[$i18n.locale == 'en' ? 0 : 1].name)">{{
                                    category.translations[$i18n.locale == 'en' ? 0 : 1].name }}{{
                                    data.categories.length-1 > $index ? ', ' : '' }}</a>
                            </div>
                            <div>
                                <span class="prop">{{ $t('apply_on') }}: </span>
                                <a v-for="(good, $index) in data.goods" :key="good.id"
                                   @click="searchKeyword(good.translations[$i18n.locale == 'en' ? 0 : 1].name)">{{
                                    good.translations[$i18n.locale == 'en' ? 0 : 1].name }}{{ data.goods.length-1 >
                                    $index ? ', ' : '' }}</a>
                            </div>
                        </div>
                        <div class="short-description" v-html="getDescription()"></div>
                    
                    </div>
                    <div class="read-more">
                        <nuxt-link :to="localePath(`/collections/${data.id}`)">{{$t('read_more')}}
                            <b-icon-chevron-right></b-icon-chevron-right>
                        </nuxt-link>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import {BIconChevronRight} from 'bootstrap-vue';

    export default {
        props: [
            'data',
            'slideShowLeft'
        ],
        components: {
            BIconChevronRight
        },
        data() {
            return {
                
            }
        },

        methods: {
            hasMoodBoard() {
                return this.data.moodboards.length
            },

            getMoodBoardURL() {
                if (this.data.moodboards.length == 1 || this.$i18n.locale == 'en')
                    return this.data.moodboards[0].moodboard
                return this.data.moodboards[1].moodboard
            },

            hasDesigns() {
                return this.data.designs.length
            },

            parseDesignerAvatarURL() {
                let avatar = this.data.user.avatar;
                return avatar.substring(avatar.lastIndexOf('/') + 1);
            },

            getTitle() {
                return this.data.translations[this.$i18n.locale == 'en' ? 0 : 1].title;
            },

            getDescription() {
                return this.data.translations[this.$i18n.locale == 'en' ? 0 : 1].description.substring(0,345) + '...';
            },
            //             getDescription() {
            //     var description=  this.data.translations[this.$i18n.locale == 'en' ? 0 : 1].description;
            //     return description.substring(0,description.lastIndexOf(' ', 345)) + '...';
            // },


            searchKeyword(keyword) {
                this.$store.dispatch('search/search', {
                    searchDesigns: false,
                    term: keyword,
                    localePathFunction: this.localePath
                });
            }
        }
    }
</script>

<style lang="scss">
    .component.collection {
        & > .container {
            margin: 0;
            padding: 0;
            max-width: 100% !important;
        }

        .carousel .carousel-inner {
            width: 100%;
            height: 100%;
            min-height: 300px;

            .carousel-item {
                height: 100%;

                img {
                    height: 100%;
                    pointer-events: none;
                }
            }
        }

        .description-col {
            display: flex;
            flex-direction: column;

            .basic {
                // flex-grow: 1;
            }

            .designer {
                display: flex;
                align-items: center;

                .designer-avatar {
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                        width: 65px;
                        height: 65px;
                        @media screen and (max-width: 768px) {
                            width: 55px;
                            height: 55px;
                        }
                    }
                }

                .name-published {
                    margin-left: 10px;

                    .designer-name {
                        font-size: 18px;
                        color: #4a4a4a;
                        margin: 0;
                        @media screen and (max-width: 1024px) {
                            font-size: 12.75px;
                        }
                    }

                    .published-date {
                        font-size: 18px;
                        color: #969696;
                        margin: 0;
                        @media screen and (max-width: 1024px) {
                            font-size: 12.75px;
                        }
                    }
                }
            }

            .title {
                margin: 25px 0;
                color: #363636;
                font-size: 1.75em;
                @media screen and (max-width: 1024px) {
                    font-size: 16.5px;
                }
                font-weight: 700;
            }

            .properties {
                @media screen and (max-width: 1024px) {
                    font-size: 12.75px;
                }
                .prop {
                    font-size: 18px;
                    color: #363636;
                    font-weight: 700;
                    @media screen and (max-width: 1024px) {
                        font-size: 12.75px;
                    }

                }

                a {
                    text-decoration: none;
                    color: #898586;
                    font-size: 18px;
                    cursor: pointer;
                    @media screen and (max-width: 1024px) {
                        font-size: 12.75px;
                    }

                    &:hover {
                        color: #231f20;
                    }
                }
            }

            .short-description {
                margin-top: 40px;
                max-height: 150px;
                overflow: hidden;

                @media screen and (max-width: 1024px) {
                    margin-top: 20px;
                    font-size: 12.75px;
                }
            }

            .read-more {
                margin-top: 30px;

                a {
                    display: inline-block;
                    border: 1px solid #000;
                    border-radius: 30px;
                    padding: 5px 30px;
                    color: #363636;
                    font-weight: 700;
                    text-decoration: none;
                    @media screen and (max-width: 1024px) {
                        font-size: 14px;
                    }
                    @media screen and (max-width: 768px) {
                      font-size: 12.75px;
                    }

                    svg {
                        position: relative;
                        right: -10px;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 767px) {
        .component.collection {
            .description-col {
                padding-top: 20px;

                &.order-1 {
                    order: 2 !important;
                }
            }
        }
    }
</style>