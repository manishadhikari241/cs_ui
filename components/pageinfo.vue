<template>
    <div class="component pageinfo">
        <div class="pageinfo-head">
            <h1 class="pageinfo-title"  :class="slug == 'home' ? 'homepage' : ''" v-if="pageInfo">
                {{ pageInfo.translations[$i18n.locale].info_title }}
            </h1>
            
            <b-button
                    :class="slug == 'lists' ? 'lists-btn' : ''"
                    class="action-btn"
                    v-if="button && screenSize > 768"
                    :id="buttonId"
                    v-show="pageInfo"
            >{{ button }}
            </b-button>
        </div>
        <div
                class="d-flex align-items-start align-items-lg-center justify-content-between flex-column flex-md-column flex-lg-row description"
        >
            <p
                    class="pageinfo-description "
                    v-if="pageInfo"
                    :class="slug == 'home' ? 'homepage-description w-100':'' ? 'w-100' : ''"
                    :style="slug == 'request' ? 'width:80%' : 
                    slug == 'simulator' || slug =='extra' ? 'width:70%':''
                    "
                    v-html="pageInfo.translations[$i18n.locale].info_body"
            ></p>
            <b-button
                    v-if="requestButton && routeCheck"
                    @click="checkAndRedirect(localePath('/request/create'))"
                    class="border-0 d-inline-block font-weight-bold text-white text-nowrap mt-3"
            >{{ $t("send_a_request_btn") }}
            </b-button
            >
        </div>
        <div class="pageinfo-head ">
            <button
                    :class="slug == 'lists' ? 'lists-btn' : ''"
                    class="action-btn resp-btn  mt-3"
                    v-if="button"
                    :id="buttonId"
                    v-show="pageInfo"
            >{{ button }}
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["slug", "button", "buttonId"],
        data() {
            return {
                screenSize:'',
                pageInfo: null,
                requestButton: false,
                routeCheck:
                    this.$router.history.current.path == "/request" ||
                    this.$router.history.current.path == "/ch/request"
                        ? true
                        : false
            };
        },
        methods: {
            load() {
                this.$axios.$get(`/pages/${this.slug}`).then(res => {
                    this.pageInfo = res;
                });
            },
            checkAndRedirect(url) {
                if (!this.$auth.loggedIn) {
                    this.$bvModal.show("modal-auth");
                } else {
                    this.$router.push(url);
                }
            },
            checkRequestButton() {
                if (this.$auth.loggedIn) {
                    this.$axios
                        .$get(
                            `/requests/collection?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group`
                        )
                        .then(response => {
                            if (
                                response.data.length == 0 ||
                                Object.keys(response.data).length == 0
                            ) {
                                this.requestButton = true;
                            } else {
                                this.requestButton = false;
                            }
                        });
                } else {
                    this.requestButton = true;
                }
            }
        },
        created() {
            this.checkRequestButton();
            this.$nuxt.$on("login", () => {
                this.checkRequestButton();
            });
        },
        mounted() {
            this.$nextTick(() => {
                this.load();
            this.screenSize= window.innerWidth
            });
        }
    };
</script>

<style lang="scss">
    .component.pageinfo {
        .pageinfo-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .action-btn {
                border-radius: 30px;
                background-color: #000;
                color: #fff;
                width: 200px;
                height: 35px;
                font-weight: 700;
                text-transform: uppercase;
                padding: 0;
                outline: none;
                &.join-now-btn {
                    background-color: $brand;
                    border: none;
                }
            }
        }
        .description button {
            padding: 10px 25px;
            background-color: #0e8dde;
            font-size: 16px;
            border-radius: 30px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
            /*@media screen and (max-width: 426px) {*/
                /*margin-left: auto !important;*/
                /*margin-right: auto;*/
            /*}*/
            @media screen and (max-width: 768px) {
                font-size: 14px;
            }
        }
        .pageinfo-title {
            font-weight: 700;
            font-size: 48.2px;
                &.homepage{
      font-size: 55px;
      @media screen and (max-width: 768px) {
        font-size: 32px;
      }
      }
        }
        .pageinfo-description {
               &.homepage-description{
      font-size: 18px;
      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
    }
            // max-width: 65%;
            width: 65%;
            margin: 0;
            padding: 0;
            // color: #bbb;
            font-size: 20px;
            br {
                display: none;
            }
            a {
                color: #000 !important;
                font-weight: 700;
                text-decoration: none;
                display: inline-block;
            }
        }
    }
    @media screen and (max-width: 768px) {
        .component.pageinfo {
            .pageinfo-head {
                display: block;
                text-align: left;
                .action-btn {
                    margin: 10px 0 20px;
                }
                .lists-btn {
                    display: none;
                }
                .resp-btn {
                    display: block;
                    font-size: 14px;
                    outline: none;
                    border: none;
                }
            }
            .pageinfo-title {
                font-size: 30px;
                // white-space: break-spaces;
            }
            .pageinfo-description {
                font-size: 15px;
                max-width: 100%;
                @media screen and (max-width: 768px) {
                    width: 100% !important;
                }
            }
        }
    }
    .pageinfo-head .resp-btn {
        display: none;
    }
    .lists-btn {
        display: block;
        font-size: 16px;
    }
</style>