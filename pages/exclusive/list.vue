<template>
    <div class="page request-list ignorePrint">
        <div class="component pageinfo">
            <div class="pageinfo-head">
                <h1 class="pageinfo-title">{{ $t("your_designs_page") }}</h1>
            </div>
            <p class="pageinfo-description-exclusive">
                {{ $t("here_you_can_view") }}
            </p>
            <br/><br/>
            <div style="text-align: center" v-if="loading">
                <b-spinner type="grow" label="Loading..."></b-spinner>
            </div>
            <div class="list" v-if="!loading">
                <div class="designs">
                  <client-only>
                    <DesignList :is-exclusive="true"
                                @showInfo="showInfo"
                                @deleteDesign="deleteDesign"
                                @checkQuota="checkQuota"
                                :designs="allDesign" />
                  </client-only>
                </div>
            </div>
        </div>

        <RequestModal :request="selected"/>
    </div>
</template>

<script>
    import RequestModal from "~/components/modals/request";
    import {mapState} from "vuex";
    import DesignList from "~/components/designlist";

    export default {
        middleware: "auth",
        components: {
            RequestModal,
            DesignList
        },
        data() {
            return {
                loading: false,

                requests: [],
                selected: {},
                plan: {
                    selected: 0
                },
                type: "all",
                fields: [
                    {
                        key: "design",
                        label: "ITEMS"
                    },
                    {
                        key: "code",
                        label: "CS CODE"
                    },
                    {
                        key: "designer_id",
                        label: "CREATOR"
                    },
                    {
                        key: "actions",
                        label: ""
                    }
                ],
                designs: [],
                allDesign: []
            };
        },
        methods: {
            load() {
                this.loading = true;
                this.$axios
                    .$get(
                        `/requests/exclusive?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group`
                    )
                    .then(response => {
                        this.loading = false;
                        this.requests = response.data;
                        this.designs = response.data;
                        let designs = [];
                        let pseudo_design_id = 0;
                        response.data.forEach(element => {
                          if (element.designs.length) {
                            designs.push(Object.assign(element.designs[0], {
                              request_id: element.id,
                              request_name: element.name,
                              request_status: element.status
                            }));
                          } else {
                            designs.push({
                              id: `id_${pseudo_design_id}`,
                              code: `code_${pseudo_design_id}`,
                              request_id: element.id,
                              request_name: element.name,
                              request_status: element.status
                            })
                            pseudo_design_id ++
                          }
                        });
                        this.allDesign.push({id: 'plus'});
                        this.allDesign.push(...designs);
                    });
            },
            deleteDesign(id) {
                var message = this.$t("are_you_sure");

                this.$bvModal
                    .msgBoxConfirm(message, {
                        title: 'a',
                        hideHeaderClose: false,
                        centered: true,
                        headerClass:"confirm-box-header-confirm",
                        bodyClass: "confirm-box-body-confirm",
                        footerClass: "confirm-box-footer-confirm",
                        okTitle: this.$t("btn_yes"),
                        cancelTitle: this.$t("btn_no"),
                        buttonSize: "sm"
                    })
                    .then(value => {
                        if (value) {
                            this.$axios
                                .delete(`requests/exclusive/${id}/delete-reject`)
                                .then(response => {
                                    this.$toast.success(response.data.message);
                                    this.requests = [];
                                    this.designs = [];
                                    this.allDesign = [];
                                    this.load();
                                });
                        }
                    });
            },
            buy() {
                if (!this.$auth.loggedIn) this.$bvModal.show("modal-auth");
                else {
                    this.$bvModal.show("modal-payments");
                    this.$store.commit("payments/setPackage", {
                        key: "exclusive",
                        index: this.plan.selected
                    });
                }
            },

            checkQuota() {
                if (this.init.quota["exclusive"] <= 0) {
                    // this.$toast.error(this.$t("not_enough_quota"));
                    this.buy();
                } else {
                  (() => {
                    this.checkAndRedirect(this.localePath('/exclusive/create'));
                  })();
                };
            },

            checkAndRedirect(url) {
                if (!this.$auth.loggedIn) this.$bvModal.show("modal-auth");
                else this.$router.push(url);
            },
            showInfo(request_id) {
                this.selected = this.requests.find(request => request.id === request_id);
                this.$bvModal.show("modal-request");
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.load();
            });
        },
        computed: {
            ...mapState("app", ["init"])
        }
    };
</script>

<style lang="scss">
    .page.request-list {
        .socialBox {
            display: none !important;
        }
    }
</style>

<style lang="scss" scoped>
    .component.pageinfo {
        .pageinfo-description-exclusive {
            max-width: 98%;
            margin: 0;
            padding: 0;
            // color: #bbb;
            font-size: 20px;

            a {
                color: #000 !important;
                font-weight: 700;
                text-decoration: none;
                display: inline-block;
            }
        }
        .pageinfo-title {
            font-weight: 700;
            font-size: 48.2px;
        }
    }

    .page.request-list {
        .list {
            .request_new {
                width: 100%;
                // min-height: 265px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                margin-bottom: 20px;
            }
            .request {
                width: 100%;
                // min-height: 265px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                margin-bottom: 20px;
                height: 287px;
                width: 287px;
                margin: 0 auto;

                @media screen and (max-width: 768px) and (min-width: 500px) {
                    height: 178px;
                    width: 178px;
                }

                    &.empty {
                    height: 0;
                    border: none !important;
                }
                &:not(.approved) {
                    border: 1px solid #ddd;
                    // height: 93%;
                }

                .icon {
                    font-size: 80px;
                }

                .btn-info {
                    position: absolute;
                    bottom: 10px;
                    right: 2px;
                    border: none;
                    background: none;
                    color: rgba(0, 0, 0, 0.5);
                    transition: color 0.2s;
                    outline: none;
                    box-shadow: none;
                    z-index: 999;
                    font-size: 12px;

                    &:hover {
                        color: $black;
                    }
                }
                .btn-delete {
                    position: absolute;
                    top: 8px;
                    right: 16px;
                    border: none;
                    background: none;
                    color: rgba(0, 0, 0, 0.5);
                    transition: color 0.2s;
                    outline: none;
                    box-shadow: none;
                    z-index: 999;

                    &:hover {
                        color: $black;
                    }
                }

                .btn-visit-collection {
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    border: none;
                    background: none;
                    color: rgba(0, 0, 0, 0.5);
                    transition: color 0.2s;
                    outline: none;
                    box-shadow: none;
                    z-index: 999;

                    &:hover {
                        color: $black;
                    }
                }

                img {
                    width: 100%;
                    height: 100%;
                }

                .name-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 50px;
                    background-color: rgba(255, 255, 255, 0.7);
                    line-height: 50px;
                    font-size: 16px;
                    font-weight: 700;
                    color: $black;
                    text-align: center;
                    @media screen and (max-width: 768px) {
                      font-size: 14px;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        .component.pageinfo {
            .pageinfo-title {
                font-size: 30px;
                // white-space: break-spaces;
            }

            .pageinfo-description-exclusive {
                font-size: 16px;
                max-width: 100%;
                @media screen and (max-width: 768px) {
                    width: 100% !important;
                }
            }
        }
    }
</style>
