<template>
    <div class="page list">
        <div style="text-align: center" v-if="!list">
            <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
        <div v-if="list">
            <b-container class="list-header">
                <div v-show="!editTitleMode">
                    <h3>
                        <span>{{ list.name }}</span>
                        <b-button size="sm" variant="outline-secondary" class="btn-edit-list-title ignorePrint"
                                  @click="editTitleMode = true; $nextTick(() => { $refs.updateListTileInput.focus(); });">
                            <i class="fas fa-pencil-alt"></i>
                        </b-button>
                        <span>({{ productCount }})</span>
                    </h3>
                </div>
                <div v-show="editTitleMode">
                    <form @submit.prevent="updateListTitle">
                        <b-input-group>
                            <b-form-input ref="updateListTileInput" name="name" :value="list.name"
                                          v-on:blur="editListNameBlur" required></b-form-input>
                            <b-input-group-append>
                                <b-button class="updateListTileButton" variant="dark" type="submit" :disabled="loading">
                                    {{ $t('update') }}
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </form>
                </div>

                <div class="actions ignorePrint">
                    <!-- <b-button :class="{'active': mode === 'grid'}">
                      <b-icon-grid-fill></b-icon-grid-fill>
                    </b-button> -->
                    <!-- <b-button :class="{'active': mode === 'table'}">
                      <b-icon-list-task></b-icon-list-task>
                    </b-button> -->
                    <b-button size="sm" @click="print" class="btn-print ignorePrint">
                        {{ $t('print') }} <img src="~/assets/icons/print_black.png" style="height:auto; width:20px"/>
                    </b-button>
                </div>
            </b-container>

            <b-container class="share ignorePrint">
                <div class="share-box">
                    <div class="share-header" @click="toggleShareBox(!shareExpanded)">
                        <span>{{ $t('share_via_email') }}</span>
                        <div class="arrow">
                            <b-icon-chevron-down v-show="!shareExpanded"></b-icon-chevron-down>
                            <b-icon-chevron-up v-show="shareExpanded"></b-icon-chevron-up>
                        </div>
                    </div>
                    <div class="share-body" v-show="shareExpanded">
                        <div class="list-url-box">
                            <p>{{ $t('or_copy_this_link') }}:</p>
                            <p>{{ getListShareURL() }}</p>
                            <div class="actions">
                                <a :href="getListShareURL()" target="_blank" v-b-tooltip.hover
                                   :title="$t('preview_share_link')">
                                    <b-icon-eye-fill></b-icon-eye-fill>
                                </a>
                                <b-button v-b-tooltip.hover :title="clipboardTooltip" @click="copyListShareURL">
                                    <b-icon-clipboard></b-icon-clipboard>
                                </b-button>
                            </div>
                        </div>

                        <div class="share-form">
                            <form @submit.prevent="shareList">
                                <template v-for="(n, index) in shareEmailCount">
                                    <div :key="`recipient_email_${n}`" style="display: flex;">
                                        <b-input
                                                type="email"
                                                name="email[]"
                                                :placeholder="$t('recipient_email')"
                                                :required="index == 0"
                                        />
                                        <b-button tabindex="-1" v-if="index == shareEmailCount-1"
                                                  class="addShareRecipient" @click="addRecipientInput">
                                            <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
                                        </b-button>
                                    </div>
                                </template>
                                <b-input type="text" name="name" :placeholder="$t('recipient_name')" required/>
                                <b-textarea :placeholder="$t('message')" name="message"/>
                                <div class="button d-flex">
                                    <button class="btn-send" type="submit" :disabled="sharing">{{ $t('send') }}</button>
                                    <button class="btn-cancel" @click="cancelForm">{{ $t('cancel') }}</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </b-container>

            <b-container class="designs">
                <div v-if="mode == 'grid'">
                    
                    <DesignList ref="designList" :designs="list.products"/>
                </div>

                <!-- <div v-if="mode == 'table'">
                  <b-table :items="list.products" :fields="fields" :responsive="'md'" striped>
                    <template v-slot:cell(design)="data">
                      <img class="design-preview" :src="`/api/v1/image/thumbnail/design/${data.item.code}/tiny`">
                    </template>
                    <template v-slot:cell(download)="data">
                      <b-button class="btn-download">
                        <b-icon-download></b-icon-download>
                      </b-button>
                    </template>
                    <template v-slot:cell(actions)="data">
                      <b-button class="btn-delete" @click="confirmRemove(data.item.id)">
                        <b-icon-x v-show="!removing"></b-icon-x>
                        <b-spinner small type="grow" v-show="removing && selectedDesign == data.item.id"></b-spinner>
                      </b-button>
                    </template>
                  </b-table>
                </div> -->
            </b-container>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import DesignTile from "~/components/designtile";
    import DesignList from "~/components/designlist";
    import {
        BIconPlusCircleFill,
        BIconGridFill,
        BIconListTask,
        BIconX,
        BIconChevronDown,
        BIconChevronUp,
        BIconEyeFill,
        BIconClipboard,
        BIconDownload
    } from "bootstrap-vue";

    export default {
        middleware: "auth",
        components: {
            BIconPlusCircleFill,
            DesignTile,
            DesignList,
            BIconGridFill,
            BIconListTask,
            BIconX,
            BIconChevronDown,
            BIconChevronUp,
            BIconEyeFill,
            BIconClipboard,
            BIconDownload
        },
        asyncData(context) {
            return context.$axios.get("/pages/lists").then(res => {
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
        computed: {
            ...mapState("app", ["init"]),
            productCount() {
                if (!this.list) return 0;
                var count = 0;
                for (var design of this.list.products) {
                    if (!("quickDisplay" in design)) count++;
                }
                return count;
            }
        },
        data() {
            return {
                list: null,
                editTitleMode: false,
                loading: false,
                mode: "grid",
                fields: [
                    {
                        key: "design",
                        label: this.$t("designs")
                    },
                    {
                        key: "code",
                        label: this.$t("design_name")
                    },
                    {
                        key: "download",
                        label: this.$t("download")
                    },
                    {
                        key: "actions",
                        label: this.$t("delete")
                    }
                ],
                removing: false,
                selectedDesign: null,
                shareExpanded: false,
                clipboardTooltip: this.$t("copy_to_clipboard"),
                sharing: false,
                shareEmailCount: 1
            };
        },
        methods: {
            getList() {
                let id = this.$route.params.id;
                for (let i = 0; i < this.init.lists.length; i++) {
                    if (this.init.lists[i].id == id) {
                        this.list = JSON.parse(JSON.stringify(this.init.lists[i]));
                        break;
                    }
                }
            },

            changeMode(mode) {
                if (this.$refs.designList) this.$refs.designList.closeQuickDisplay();
                this.mode = mode;
            },

            selectDesign(id) {
                this.selectedDesign = id;
            },

            confirmRemove(id) {
                this.selectDesign(id);
                this.$bvModal
                    .msgBoxConfirm(this.$t("are_you_sure"), {
                        centered: true,
                        bodyClass: "confirm-box-body",
                        footerClass: "confirm-box-footer"
                    })
                    .then(value => {
                        if (value) this.remove();
                    });
            },

            remove() {
                this.removing = true;
                this.$axios
                    .$delete(`/list/${this.list.id}/design/${this.selectedDesign}`)
                    .then(response => {
                        for (let i = 0; i < this.init.lists.length; i++) {
                            if (this.init.lists[i].id == response.id) {
                                this.$store.commit("app/replaceList", {
                                    index: i,
                                    list: response
                                });
                                this.list = response;
                            }
                        }
                        this.removing = false;
                        this.selectDesign(null);
                    });
            },

            toggleShareBox(expanded) {
                this.shareExpanded = expanded;
            },

            getListShareURL() {
                return process.env.BASE_URL + "/shared/list/" + this.list.view_token;
            },

            copyListShareURL() {
                let copyContent = this.getListShareURL();
                this.$copyText(copyContent).then(e => {
                    this.listURLCopied();
                });
            },

            listURLCopied() {
                this.clipboardTooltip = this.$t("share_link_copied");
                setTimeout(() => {
                    this.clipboardTooltip = this.$t("copy_to_clipboard");
                }, 1500);
            },

            clearForm() {
                var inputs = document.querySelectorAll(".share-form input");
                inputs.forEach(el => {
                    el.value = "";
                });
                document.querySelector(".share-form textarea").value = "";
                this.shareEmailCount = 1;
            },

            cancelForm() {
                this.toggleShareBox(false);
                this.clearForm();
            },

            shareList(e) {
                let emailInputs = e.target.elements["email[]"];
                let emails = [];
                if (emailInputs.forEach) {
                    emailInputs.forEach(el => {
                        if (el.value.length) emails.push(el.value);
                    });
                } else {
                    emails.push(emailInputs.value);
                }

                this.sharing = true;
                this.$axios
                    .$post(`/list/share/${this.list.id}`, {
                        emails: emails,
                        name: e.target.elements.name.value,
                        message: e.target.elements.message.value
                    })
                    .then(response => {
                        this.sharing = false;
                        this.cancelForm();
                        this.$toast.success(this.$t("list_shared_success_message"));
                    })
                    .catch(error => {
                        this.sharing = false;
                        this.$toast.error(error.response.data.error.message);
                    });
            },

            addRecipientInput() {
                var emailInputs = document.querySelectorAll(
                    '.share-form input[type="email"]'
                );
                var lastEmailInput = emailInputs[emailInputs.length - 1];
                if (lastEmailInput.value.length > 0) {
                    this.shareEmailCount++;
                }
            },

            updateListTitle(e) {
                var updatedTitle = e.target.elements.name.value;

                this.loading = true;
                this.$axios
                    .$patch(`/list/${this.list.id}`, {name: updatedTitle})
                    .then(response => {
                        this.loading = false;
                        this.editTitleMode = false;
                        this.$toast.success(this.$t("list_name_updated_successfully"));
                        for (let i = 0; i < this.init.lists.length; i++) {
                            if (this.init.lists[i].id == this.list.id) {
                                this.$store.commit("app/updateListName", {
                                    index: i,
                                    name: updatedTitle
                                });
                                this.list.name = updatedTitle;
                            }
                        }
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$toast.error(error.response.data.error.message);
                    });
            },

            print() {
                if (process.client) {
                    window.print();
                }
            },

            editListNameBlur($event) {
                if (
                    !$event.relatedTarget ||
                    $event.relatedTarget.className.indexOf("updateListTileButton") == -1
                )
                    this.editTitleMode = false;
            }
        },
        watch: {
            init(newInit) {
                this.$nextTick(function () {
                    if (newInit.lists) this.getList();
                });
            }
        },
        mounted() {
            this.$nextTick(function () {
                if (this.init.lists) this.getList();
            });
        }
    };
</script>

<style lang="scss">
    .share-form {
        .btn-send {
            display: inline-block;
            padding: 0px;
            width: 100px;
            height: 30px;
            line-height: 30px;
            color: #fff;
            background-color: #363636;
            border-radius: 30px;
            font-size: 14px;
            font-weight: 650;
            text-align: center;
            text-decoration: none;
            outline: none;
            border: none;
            text-transform: uppercase;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

        }

        .btn-cancel {
            display: inline-block;
            padding: 0px;
            width: 100px;
            height: 30px;
            line-height: 30px;
            color: #363636;
            background-color: #fff;
            border-radius: 30px;
            font-size: 14px;
            font-weight: 650;
            text-align: center;
            text-decoration: none;
            outline: none;
            text-transform: uppercase;
            border: 1px solid #363636;
            margin-left: 15px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

        }
    }

    .page.list {
        .container {
            max-width: 100% !important;
        }

        .list-header {

            h3{
                @media screen and (max-width: 768px) {
                    font-size: 16px;
                }
            }
            display: flex;
            align-items: center;
            justify-content: space-between;

            .btn-edit-list-title {
                padding: 0;
                border: none;
                background: transparent !important;
                font-size: 18px;
                color: $black;
                padding: 0 5px;
            }

            .actions {
                button {
                    outline: none;
                    box-shadow: none;
                    border: none;
                    background: none;
                    color: $black;
                    padding: 0;
                    font-size: 20px;
                    margin-left: 5px;
                    opacity: 0.5;

                    &.active {
                        opacity: 1;
                    }

                    &.btn-print {
                        font-size: 16px;
                        opacity: 1;
                        border: 1px solid $black;
                        border-radius: 30px;
                        padding: 2px 15px;
                        font-weight: 700;
                        @media screen and (max-width: 768px) {
                            font-size: 14px;

                        }
                    }
                }
            }
        }

        .share {
            margin: 20px 0;

            .share-box {
                border: 1px solid #ddd;
                border-bottom: 2px solid #ddd;
                border-radius: 6px;

                .share-header {
                    padding: 20px;
                    font-size: 20px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    @media screen and (max-width: 768px) {
                        font-size: 16px;
                    }
                }

                .share-body {
                    padding: 20px;
                    border-top: 1px solid #ddd;

                    .list-url-box {
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 14px;
                        @media screen and (max-width: 768px) {
                            font-size: 12px;
                        }
                        p {
                            overflow-wrap: anywhere;
                        }
                        .actions {
                            button {
                                outline: none;
                                border: none;
                                color: $black;
                                box-shadow: none;
                                font-size: 14px;
                                background: transparent;
                                padding: 5px;
                            }

                            a {
                                font-size: 16px;
                                text-decoration: none;
                                color: $black;
                                position: relative;
                                top: 2px;
                            }
                        }
                    }

                    .share-form {
                        margin-top: 20px;

                        input {
                            width: 100%;
                            max-width: 400px;
                            margin-bottom: 10px;
                            @media screen and (max-width: 768px) {
                                font-size: 12px;
                            }
                        }

                        textarea {
                            margin-bottom: 10px;
                            height: 100px;
                            @media screen and (max-width: 768px) {
                                font-size: 12px;
                            }
                        }

                        .addShareRecipient {
                            border: none;
                            background: transparent;
                            padding: 0;
                            font-size: 18px;
                            color: $black;
                            position: relative;
                            right: -5px;
                            top: -5px;
                            outline: none;
                            box-shadow: none;
                            @media screen and (max-width: 768px) {
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
        }

        .designs {
            .table th,
            .table td {
                vertical-align: middle;
            }

            table {
                .design-preview {
                    width: 100px;
                    height: 100px;
                }

                th[aria-colindex="3"],
                th[aria-colindex="4"],
                td[aria-colindex="3"],
                td[aria-colindex="4"] {
                    text-align: center;
                }

                .btn-delete {
                    color: $black;
                    font-size: 40px;
                    text-align: center;
                    padding: 0;
                    background: transparent;
                    border: none;
                }

                .btn-download {
                    color: $black;
                    font-size: 20px;
                    text-align: center;
                    padding: 0;
                    background: transparent;
                    border: none;
                }
            }
        }
    }
</style>