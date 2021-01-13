<template>
    <div class="component search">
        <b-navbar-nav>
            <b-nav-item-dropdown
                    ref="categoryDropdown"
                    id="category-dropdown"
                    no-caret
                    v-show="hideCategories != true"
            >
                <template slot="button-content"
                >{{ $t("category") }}&nbsp;&nbsp;<b-icon-chevron-down
                ></b-icon-chevron-down>&nbsp;
                </template>
                <template v-if="isCollectionRoute()">
                    <li class="group-title">{{ $t("by_category") }}</li>
                    <li>
                        <SearchCategories
                                :className="'inline'"
                                :tags="[
                {
                  label: { en: 'Fashion', ch: '时尚' },
                  value: { en: 'fashion', ch: '时尚' }
                },
                {
                  label: { en: 'Kids', ch: '儿童' },
                  value: { en: 'kids', ch: '孩子们' }
                },
                {
                  label: { en: 'Home', ch: '家居' },
                  value: { en: 'home', ch: '家' }
                },
                {
                  label: { en: 'Festive', ch: '节日' },
                  value: { en: 'festive', ch: '喜庆的' }
                }
              ]"
                                @tmpsearch="setSearchTmpTerm"
                                @search="search"
                        />
                    </li>
                    <li class="group-title">{{ $t("by_season") }}</li>
                    <li>
                        <SearchCategories
                                :className="''"
                                :tags="[
                {
                  label: { en: 'Autumn Winter 2020', ch: '秋冬2020' },
                  value: { en: '5', ch: '5' }
                },
                {
                  label: { en: 'Spring Summer 2021', ch: '春夏2021' },
                  value: { en: '6', ch: '6' }
                },
                {
                  label: { en: 'Autumn Winter 2021', ch: '秋冬2021' },
                  value: { en: '7', ch: '7' }
                },
                {
                  label: { en: 'Spring Summer 2022', ch: '春夏2022' },
                  value: { en: '9', ch: '9' }
                }
              ]"
                                @tmpsearch="setSearchSeasonTmpTerm"
                                @search="search"
                        />
                    </li>
                </template>
                <template v-if="!isCollectionRoute()">
                    <li class="group-title">{{ $t("by_popularity") }}</li>
                    <li>
                        <SearchCategories
                                :className="'flex'"
                                :tags="[
               // {
               //   label: { en: 'New', ch: '新发布' },
               //   value: { en: 'new', ch: '新发布' }
               // },
                {
                  label: { en: 'Top 100', ch: '热门下载' },
                  value: { en: 'top 100', ch: '热门下载' }
                },
              ]"
                                @tmpsearch="setSearchTmpTerm"
                                @search="search"
                        />
                    </li>
                    <li class="group-title">{{ $t("by_product") }}</li>
                    <li>
                        <SearchCategories
                                :className="'flex'"
                                :tags="[
                {
                  label: { en: 'Menswear', ch: '男装' },
                  value: { en: 'menswear', ch: '男装' }
                },
                {
                  label: { en: 'Womenswear', ch: '女装' },
                  value: { en: 'womenswear', ch: '女装' }
                },
                {
                  label: { en: 'Kidswear', ch: '童装' },
                  value: { en: 'kidswear', ch: '童装' }
                },
                {
                  label: { en: 'Swimwear', ch: '游泳衣' },
                  value: { en: 'swimwear', ch: '游泳衣' }
                },
                {
                  label: { en: 'Casual Wears', ch: '休闲装' },
                  value: { en: 'casualwears', ch: '休闲装' }
                },
                {
                  label: { en: 'Houseware', ch: '家居用品' },
                  value: { en: 'houseware', ch: '家居用品' }
                },
                {
                  label: { en: 'Home', ch: '家' },
                  value: { en: 'home', ch: '家' }
                },
                {
                  label: { en: 'Stationary', ch: '文具' },
                  value: { en: 'stationary', ch: '文具' }
                },
                {
                  label: { en: 'Gifts', ch: '礼物' },
                  value: { en: 'gifts', ch: '礼物' }
                }
              ]"
                                @tmpsearch="setSearchTmpTerm"
                                @search="search"
                        />
                    </li>
                    <li class="group-title">{{ $t("by_theme") }}</li>
                    <li>
                        <SearchCategories
                                :className="'flex'"
                                :tags="[
                {
                  label: { en: 'Traditional', ch: '传统' },
                  value: { en: 'traditional', ch: '传统' }
                },
                {
                  label: { en: 'Abstract', ch: '抽象' },
                  value: { en: 'abstract', ch: '抽象' }
                },
                {
                  label: { en: 'Aquarelle', ch: '水彩画' },
                  value: { en: 'aquarelle', ch: '水彩画' }
                },
                {
                  label: { en: 'Ethnic', ch: '民族风' },
                  value: { en: 'ethnic', ch: '民族风' }
                },
                {
                  label: { en: 'Geometric', ch: '几何' },
                  value: { en: 'geometric', ch: '几何' }
                },
                {
                  label: { en: 'Floral', ch: '花' },
                  value: { en: 'floral', ch: '花' }
                },
                {
                  label: { en: 'Paisleys', ch: '涡旋花纹' },
                  value: { en: 'paisleys', ch: '涡旋花纹' }
                },
                {
                  label: { en: 'Nature', ch: '自然' },
                  value: { en: 'nature', ch: '自然' }
                },
                {
                  label: { en: 'Tropical', ch: '热带' },
                  value: { en: 'tropical', ch: '热带' }
                },
                {
                  label: { en: 'Animals', ch: '动物' },
                  value: { en: 'animals', ch: '动物' }
                },
                {
                  label: { en: 'Kids', ch: '儿童' },
                  value: { en: 'kids', ch: '儿童' }
                },
                {
                  label: { en: 'Love', ch: '爱情' },
                  value: { en: 'love', ch: '爱情' }
                },
                {
                  label: { en: 'Easter', ch: '复活节' },
                  value: { en: 'easter', ch: '复活节' }
                },
                {
                  label: { en: 'Halloween', ch: '万圣节' },
                  value: { en: 'halloween', ch: '万圣节' }
                },
                {
                  label: { en: 'Christmas', ch: '圣诞节' },
                  value: { en: 'christmas', ch: '圣诞节' }
                },
                {
                  label: { en: 'Spring', ch: '春天' },
                  value: { en: 'spring', ch: '春天' }
                },
                {
                  label: { en: 'Summer', ch: '夏天' },
                  value: { en: 'summer', ch: '夏天' }
                },
                {
                  label: { en: 'Fall', ch: '秋天' },
                  value: { en: 'fall', ch: '秋天' }
                },
                {
                  label: { en: 'Winter', ch: '冬天' },
                  value: { en: 'winter', ch: '冬天' }
                }
              ]"
                                @tmpsearch="setSearchTmpTerm"
                                @search="search"
                        />
                    </li>
                </template>
            </b-nav-item-dropdown>
            <li v-show="hideSearchbox != true">
                <div class="searchbox">
                    <form @submit.prevent="search">
                        <autocomplete
                                ref="autocomplete"
                                :search="suggestions"
                                :get-result-value="getSuggestionValue"
                                @submit="suggestionSubmit"
                                :placeholder="
                `${
                  isCollectionRoute()
                    ? $t('search_collections')
                    : $t('search_designs')
                }`
              "
                        >
                        </autocomplete>
                        <div class="action-buttons">
                            <b-icon-x
                                    v-show="tmpTerm"
                                    @click="
                  setSearchTmpTerm('');
                  search();
                "
                                    class="btn-action btn-clear"
                            ></b-icon-x>
                            <b-icon-search
                                    class="btn-action btn-search"
                                    @click="search"
                            ></b-icon-search>
                        </div>
                    </form>
                </div>
            </li>
        </b-navbar-nav>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {BIconChevronDown, BIconX, BIconSearch} from "bootstrap-vue";
    import SearchCategories from "~/components/searchcategories";
    import Autocomplete from "@trevoreyre/autocomplete-vue";
    import "@trevoreyre/autocomplete-vue/dist/style.css";

    export default {
        props: ["hideCategories", "hideSearchbox"],
        components: {
            BIconChevronDown,
            BIconX,
            BIconSearch,
            Autocomplete,
            SearchCategories
        },
        computed: {
            ...mapState("search", ["term"])
        },
        data: function () {
            return {
                tmpTerm: null,
                tmpSeasonTerm: null
            };
        },
        methods: {
            isCollectionRoute() {
                return this.$route.name && this.$route.name.startsWith("collections");
            },

            setSearchTmpTerm(term) {
                this.tmpTerm = term;
                this.$refs.categoryDropdown.hide(true);
            },

            setSearchSeasonTmpTerm(term) {
                this.tmpSeasonTerm = term;
                this.$refs.categoryDropdown.hide(true);
            },

            suggestions(input) {
                this.setSearchTmpTerm(input);
                return new Promise(resolve => {
                    if (input.length < 2) {
                        return resolve([]);
                    }

                    let suggestionType = this.isCollectionRoute() ? "feed" : "tag";
                    this.$axios
                        .$get(`/search/suggestions/${suggestionType}?term=${input}`)
                        .then(data => {
                            resolve(data);
                        });
                });
            },

            getSuggestionValue(result) {
                return result.name;
            },

            suggestionSubmit(result) {
                if (result) {
                    this.setSearchTmpTerm(result.name);
                    this.search();
                }
            },

            search() {
                let searchDesigns = !this.isCollectionRoute();
                this.$store.dispatch("search/search", {
                    searchDesigns,
                    term: this.tmpTerm,
                    seasonTerm: this.tmpSeasonTerm,
                    localePathFunction: this.localePath
                });
                let autocompleteInput = document.querySelector(
                    ".searchbox .autocomplete-input"
                );
                autocompleteInput.blur();
            },

            onSearchKeywordUpdate() {
                let keyword = this.$route.query.keyword || "";
                let season = this.$route.query.season || "";
                this.setSearchTmpTerm(this.$route.query.keyword);
                this.setSearchSeasonTmpTerm(this.$route.query.season);
                this.$store.commit("search/setTerm", keyword);
                this.$store.commit("search/setSeasonTerm", season);
                this.$refs.autocomplete.setValue({name: keyword});
            }
        },
        watch: {
            $route() {
                this.onSearchKeywordUpdate();
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.onSearchKeywordUpdate();
            });
        }
    };
</script>

<style lang="scss">
    #category-dropdown {
        position: relative;

        > a {
            color: #313131;
            outline: none;
            font-size: 17px;
            @media screen and (max-width: 768px) {
                font-size: 15px;
            }
        }

        .dropdown-menu {
            width: 620px;
            background-color: #fff;
            box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
            border: none;
            border-radius: 5px;
            padding: 10px 8px;
            padding-left: 15px;

            li {
                padding: 5px 0;
            }

            .group-title {
                padding-bottom: 5px;
                font-weight: 700;
                font-size: 16px;
                text-transform: uppercase;
            }

            .group-items.flex {
                display: flex;
                flex-wrap: wrap;

                button {
                    flex-grow: 1;
                    width: 33%;
                    text-align: left;
                }
            }

            .group-items.inline {
                display: flex;
                align-items: center;
                justify-content: left;

                button {
                    text-align: left;
                    display: inline;
                    margin-right: 10px;
                }
            }

            button {
                display: block;
                margin: 7px 0;
                padding: 0;
                font-size: 16px;
                color: rgba(0, 0, 0, 0.4);
                border: none;
                background: transparent;
                outline: none;
                transition: color 0.2s;

                &:hover {
                    color: rgba(0, 0, 0, 0.7);
                }
            }
        }
    }

    .searchbox {
        position: relative;

        .autocomplete-input {
            outline: none;
            box-shadow: none;
            width: 500px;
            height: 38px;
            border-radius: 30px;
            padding: 0 20px;
            padding-right: 60px;
            border: 1px solid #d1d1d1 !important;
            line-height: 1.5;
            background-image: none;
            @media screen and (max-width: 768px) {
                font-size: 15px;
            }
        }

        .action-buttons {
            position: absolute;
            top: 0;
            right: 10px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .btn-action {
                margin-right: 5px;
                color: #c5c5c5;
                cursor: pointer;
                transition: color 0.2s;

                &:hover {
                    color: #aaa;
                }

                &.btn-clear {
                    font-size: 25px;
                }

                &.btn-search {
                    font-size: 16px;
                }
            }
        }
    }

    @media screen and (max-width: 1220px) {
        .searchbox .autocomplete-input {
            max-width: 375px;
            width: 100%;
        }

        #category-dropdown .dropdown-menu {
            width: 520px;
        }
    }
</style>
