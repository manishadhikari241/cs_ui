<template>
    <div class="cmscomponent item">
        <div style="text-align: center" v-if="!item"><b-spinner type="grow" label="Loading..."></b-spinner></div>
        <div v-if="item">
            <div class="title">
                <span><i class="far fa-edit"></i>&nbsp;&nbsp;ID: {{ item.id }}</span>
                <div>
                    <b-button variant="outline-secondary" size="sm" @click="cancel">Cancel</b-button>
                </div>
            </div>
            <hr>
            <div>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="General" active>
                            <b-card-text>
                                <form @submit.prevent="update">
                                    <div class="item-content">
                                        <div class="item-row">
                                            <div class="prop">Title (EN)</div>
                                            <div class="value">
                                                <b-input type="text" name="titleEN" v-model="item.translations.en.title" required></b-input>
                                            </div>
                                        </div>
                                        <div class="item-row">
                                            <div class="prop">Title (CH)</div>
                                            <div class="value">
                                                <b-input type="text" name="titleCH" v-model="item.translations.ch.title" required></b-input>
                                            </div>
                                        </div>
                                        <div class="item-row">
                                            <div class="value">
                                                <div class="prop">Body (EN)</div><br>
                                                <wysiwyg style="background: #fff;" v-model="item.translations.en.body" />
                                            </div>
                                        </div>
                                        <div class="item-row">
                                            <div class="value">
                                                <div class="prop">Body (CH)</div><br>
                                                <wysiwyg style="background: #fff;" v-model="item.translations.ch.body" />
                                            </div>
                                        </div>
                                        <div class="item-row">
                                            <div class="prop">Info Title (EN)</div>
                                            <div class="value">
                                                <b-input type="text" name="infoTitleEN" v-model="item.translations.en.info_title"></b-input>
                                            </div>
                                        </div>
                                        <div class="item-row">
                                            <div class="prop">Info Title (CH)</div>
                                            <div class="value">
                                                <b-input type="text" name="infoTitleCH" v-model="item.translations.ch.info_title"></b-input>
                                            </div>
                                        </div>
                                        <div class="item-row">
                                            <div class="value">
                                                <div class="prop">Info Body (EN)</div><br>
                                                <wysiwyg style="background: #fff;" v-model="item.translations.en.info_body" />
                                            </div>
                                        </div>
                                        <div class="item-row">
                                            <div class="value">
                                                <div class="prop">Info Body (CH)</div><br>
                                                <wysiwyg style="background: #fff;" v-model="item.translations.ch.info_body" />
                                            </div>
                                        </div>
                                        <div class="item-row">
                                            <div class="prop">Meta Description (EN)</div>
                                            <div class="value">
                                                <b-input type="text" name="metaDescriptionEN" v-model="item.translations.en.meta_description"></b-input>
                                            </div>
                                        </div>
                                        <div class="item-row">
                                            <div class="prop">Meta Description (CH)</div>
                                            <div class="value">
                                                <b-input type="text" name="metaDescriptionCH" v-model="item.translations.ch.meta_description"></b-input>
                                            </div>
                                        </div>
                                        <div class="item-row">
                                            <div class="prop">Meta Keywords (EN)</div>
                                            <div class="value">
                                                <b-input type="text" name="metaKeywordsEN" v-model="item.translations.en.meta_keywords"></b-input>
                                            </div>
                                        </div>
                                        <div class="item-row">
                                            <div class="prop">Meta Keywords (CH)</div>
                                            <div class="value">
                                                <b-input type="text" name="metaKeywordsCH" v-model="item.translations.ch.meta_keywords"></b-input>
                                            </div>
                                        </div>


                                        <div v-if="this.$nuxt.$route.query.id ==5" class="item-row">
                                            <div class="prop">Email</div>
                                            <div class="value">
                                                <b-input type="text"  v-model="item.email.email" required></b-input>
                                            </div>
                                        </div>
                                        <div v-if="this.$nuxt.$route.query.id ==5" class="item-row">
                                            <div class="prop">Whatsapp</div>
                                            <div class="value">
                                                <b-input type="text"  v-model="item.email.whatsapp" required ></b-input>
                                            </div>
                                        </div>
                                        <div v-if="this.$nuxt.$route.query.id ==5" class="item-row">
                                            <div class="prop">WeChat </div>
                                            <div class="value">
                                                <b-input type="text"  v-model="item.email.wechat" required></b-input>
                                            </div>
                                        </div>
                                        <div v-if="this.$nuxt.$route.query.id ==5" class="item-row">
                                            <div class="prop">QQ</div>
                                            <div class="value">
                                                <b-input type="text"  v-model="item.email.qq" required></b-input>
                                            </div>
                                        </div>
                                        <div v-if="this.$nuxt.$route.query.id ==5" class="item-row">
                                            <div class="prop">Contact Image</div>
                                            <div class="value">
                                                <ImageUploader :id="-1" :url="item.email.image" :folder="'contact'" @uploaded="coverUploaded"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item-actions">
                                        <b-button variant="primary" type="submit" :disabled="loading"><i class="far fa-edit"></i>&nbsp;&nbsp;Update</b-button>
                                    </div>
                                </form>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Blocks" v-if="item.slug == 'home' || item.slug == 'request'">
                            <b-card-text>
                                <div>
                                    <b-button variant="success" size="sm" @click="createNewBlock"><i class="fas fa-plus"></i>&nbsp;&nbsp;Create new block</b-button>
                                </div>
                                <br>

                                <draggable class="draggable" v-model="blocks.items" group="blocks" @change="draggedBlock" handle=".handle">
                                    <div v-for="block in blocks.items" :key="block.id" class="block">
                                        <div class="handle"><i class="fas fa-arrows-alt"></i></div>
                                        <div class="content">
                                            <form @submit.prevent="updateBlock">
                                                <input type="hidden" name="id" :value="block.id">
                                                <div class="block-item-content">
                                                    <b-row>
                                                        <b-col>
                                                            <b-button-group size="sm">
                                                                <b-button variant="info" @click="toggleBlock(block)">{{ block.collapsed ? 'Hide Form' : 'Show Form' }}</b-button>
                                                                <b-button variant="danger" @click="deleteBlock(block.id)">Delete Block</b-button>
                                                            </b-button-group>
                                                            <br><br>
                                                            <div :class="`block-form-inputs${block.collapsed ? ' visible' : ''}`">
                                                                <div class="block-input-wrapper">
                                                                    <div class="block-input-wrapper-title">
                                                                        <span>Title (EN)</span>
                                                                    </div>
                                                                    <div class="input-wrapper">
                                                                        <b-input type="text" name="titleEN" v-model="block.translations.en.title"></b-input>
                                                                    </div>
                                                                </div>
                                                                <div class="block-input-wrapper">
                                                                    <div class="block-input-wrapper-title">
                                                                        <span>Title (CH)</span>
                                                                    </div>
                                                                    <div class="input-wrapper">
                                                                        <b-input type="text" name="titleCH" v-model="block.translations.ch.title"></b-input>
                                                                    </div>
                                                                </div>
                                                                <div class="block-input-wrapper">
                                                                    <div class="block-input-wrapper-title">
                                                                        <span>Description (EN)</span>
                                                                    </div>
                                                                    <div class="input-wrapper">
                                                                        <b-textarea name="descriptionEN" v-model="block.translations.en.description"></b-textarea>
                                                                    </div>
                                                                </div>
                                                                <div class="block-input-wrapper">
                                                                    <div class="block-input-wrapper-title">
                                                                        <span>Description (CH)</span>
                                                                    </div>
                                                                    <div class="input-wrapper">
                                                                        <b-textarea name="descriptionCH" v-model="block.translations.ch.description"></b-textarea>
                                                                    </div>
                                                                </div>
                                                                <div class="block-input-wrapper">
                                                                    <div class="block-input-wrapper-title">
                                                                        <span>Button Text (EN)</span>
                                                                    </div>
                                                                    <div class="input-wrapper">
                                                                        <b-input type="text" name="buttonTextEN" v-model="block.translations.en.button_text"></b-input>
                                                                    </div>
                                                                </div>
                                                                <div class="block-input-wrapper">
                                                                    <div class="block-input-wrapper-title">
                                                                        <span>Button Text (CH)</span>
                                                                    </div>
                                                                    <div class="input-wrapper">
                                                                        <b-input type="text" name="buttonTextCH" v-model="block.translations.ch.button_text"></b-input>
                                                                    </div>
                                                                </div>
                                                                <div class="block-input-wrapper">
                                                                    <div class="block-input-wrapper-title">
                                                                        <span>Button URL</span>
                                                                    </div>
                                                                    <div class="input-wrapper">
                                                                        <b-input type="text" name="button_url" v-model="block.button_url"></b-input>
                                                                    </div>
                                                                </div>
                                                                <div style="text-align: right;">
                                                                    <b-button variant="primary" size="sm" type="submit" :disabled="loading"><i class="far fa-edit"></i>&nbsp;&nbsp;Update</b-button>
                                                                </div>
                                                            </div>
                                                        </b-col>
                                                        <b-col md="3">
                                                            <ImageUploader :id="block.id" :url="block.image_url" @uploaded="updateBlockImageURL" />
                                                        </b-col>
                                                    </b-row>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </draggable>
                            </b-card-text>
                        </b-tab>

                        <b-tab title="Clients" v-if="item.slug == 'about'">
                            <b-card-text>
                                <form @submit.prevent="addClients">

                                    <div>
                                        <b-form-file ref="file" @change="generatePreview"
                                                     browse-text="Browse"
                                                     :state="Boolean(clients_preview)"
                                                     required
                                                     placeholder="Upload or Drop Files"
                                                     drop-placeholder="Drop file here..."></b-form-file>
                                        <figure v-if="clients.length > 0" >
                                            <img class="preview" :src="clients_preview" style="height:150px; width:150px">
                                        </figure>

                                    </div>
                                    <br>
                                    <b-button variant="primary" type="submit" :disabled="loading"><i class="far fa-edit"></i>&nbsp;&nbsp;Add Client
                                    </b-button>
                                </form>

                                <div class="item-row">
                                    <div class="value">
                                        <div class="prop">Images</div>
                                        <br>
                                        <b-table striped hover :items="allClients" :fields="fields">
                                            <template v-slot:cell(image)="data">
                                                <img style="height: 50px; width:50px" :src="data.item.image">
                                            </template>
                                            <template v-slot:cell(actions)="data">
                                                <b-button variant="outline-danger" size="sm" @click="deleteClient(data.item.id)"><i class="fas fa-trash"></i>&nbsp;&nbsp;Delete</b-button>
                                            </template>
                                        </b-table>


                                    </div>
                                </div>
                            </b-card-text>

                        </b-tab>

                    </b-tabs>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import draggable from "vuedraggable";
    import ImageUploader from "~/components/imageuploader";

    export default {
        props: ["itemId"],
        components: {
            draggable,
            ImageUploader
        },
        data() {
            return {
                item: null,
                loading: false,
                blocks: {
                    items: [],
                    inputBoxes: {}
                },
                clients: [],
                clients_preview: [],
                file: [],
                allClients: [],
                fields: [
                    {
                        key: "id",
                        label: "ID"
                    },
                    {
                        key: "image",
                        label: "Image"
                    },
                    {
                        key: "actions",
                        label: "Actions"
                    }
                ]
            };
        },
        methods: {
            generatePreview(e) {
                const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
                var self = this;
                // validate mimetype
                if (file.type != "image/jpeg" && file.type != "image/png") {
                    this.$refs.file.reset();

                    self.clients = "";
                    self.clients_preview = "";
                    this.$toast.error(this.$t("file_format_incorrect"));
                    e.preventDefault();
                    return false;
                }
                // validate filesize
                var fileSize = (file.size / (1024 * 1024)).toFixed(2);
                if (fileSize > 5) {
                    self.clients = "";
                    this.$refs.file.reset();

                    self.clients_preview = "";
                    this.$toast.error(this.$t("file_format_incorrect"));
                    e.preventDefault();
                    return false;
                }
                this.clients_preview = URL.createObjectURL(file);
                this.clients.push(file);
            },
            addClients() {
                this.loading = true;
                let formData = new FormData();
                formData.append("clients", this.clients[0]);

                this.$axios
                    .$post("/cms/pages/clients", formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    })
                    .then(response => {
                        this.loading = false;
                        this.$toast.success("Clients added successfully");
                        this.getClients();
                        this.$refs.file.reset();
                        this.clients = [];
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$toast.error(error.response.data.error.message);
                    });
            },
            getClients() {
                this.$axios
                    .$get("/cms/clients")
                    .then(response => {
                        this.allClients = response;
                    })
                    .catch(error => {
                        this.$toast.error(error.response.data.error.message);
                    });
            },
            deleteClient(id) {
                var message ="Are you sure ?";

                this.$bvModal
                    .msgBoxConfirm(message, {
                        centered: true,
                        bodyClass: "confirm-box-body-confirm",
                        footerClass: "confirm-box-footer-confirm",
                        okTitle: "YES",
                        cancelTitle: "NO",
                        buttonSize: "sm"
                    })
                    .then(value => {
                        if (value) {
                            this.$axios
                                .$delete(`/cms/pages/${id}/clients`)
                                .then(response => {
                                    this.$toast.success("Clients deleted successfully");
                                    this.getClients();
                                })
                                .catch(error => {
                                    this.$toast.error(error.response.data.error.message);
                                });
                        }
                    });
            },
            coverUploaded({ url }) {
                this.item.email.image = url;
            },
            loadPages() {
                this.$axios.$get(`/cms/pages/${this.itemId}`).then(response => {
                    this.item = response;
                });
            },

            loadBlocks() {
                this.$axios.$get(`/cms/pages/${this.itemId}/blocks`).then(response => {
                    this.blocks.items = response;
                });
            },

            cancel() {
                this.$emit("updated", { clearItemFrame: true });
            },
            update(e) {
                this.loading = true;
                this.$axios
                    .$patch(`/cms/pages/${this.itemId}`, {
                        titleEN: e.target.elements.titleEN.value,
                        titleCH: e.target.elements.titleCH.value,
                        bodyEN: this.item.translations.en.body,
                        bodyCH: this.item.translations.ch.body,
                        infoTitleEN: e.target.elements.infoTitleEN.value,
                        infoTitleCH: e.target.elements.infoTitleCH.value,
                        infoBodyEN: this.item.translations.en.info_body,
                        infoBodyCH: this.item.translations.ch.info_body,
                        metaDescriptionEN: e.target.elements.metaDescriptionEN.value,
                        metaDescriptionCH: e.target.elements.metaDescriptionCH.value,
                        metaKeywordsEN: e.target.elements.metaKeywordsEN.value,
                        metaKeywordsCH: e.target.elements.metaKeywordsCH.value,
                        email: this.item.email.email,
                        whatsapp: this.item.email.whatsapp,
                        qq: this.item.email.qq,
                        wechat: this.item.email.wechat,
                        image: this.item.email.image
                    })
                    .then(response => {
                        this.loading = false;
                        this.$toast.success("Page updated successfully");
                        this.$emit("updated", { refresh: true });
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$toast.error(error.response.data.error.message);
                    });
            },
            // update(e) {
            //   this.loading = true;
            //   const data = new FormData();
            //   data.append("titleEN", e.target.elements.titleEN.value);
            //   data.append("titleCH", e.target.elements.titleCH.value);
            //   data.append("bodyEN", this.item.translations.en.body);
            //   data.append("bodyCH", this.item.translations.ch.body);
            //   data.append("infoTitleEN", e.target.elements.infoTitleEN.value);
            //   data.append("infoTitleCH", e.target.elements.infoTitleCH.value);
            //   data.append("infoBodyEN", this.item.translations.en.info_body);
            //   data.append("infoBodyCH", this.item.translations.ch.info_body);
            //   data.append(
            //     "metaDescriptionEN",
            //     e.target.elements.metaDescriptionEN.value
            //   );
            //   data.append(
            //     "metaDescriptionCH",
            //     e.target.elements.metaDescriptionCH.value
            //   );
            //   data.append("metaKeywordsEN:", e.target.elements.metaDescriptionEN.value);
            //   data.append("metaKeywordsCH", e.target.elements.metaDescriptionCH.value);
            //   data.append("email", this.item.email.email);
            //   data.append("whatsapp", this.item.email.whatsapp);
            //   data.append("qq", this.item.email.qq);
            //   data.append("wechat", this.item.email.wechat);
            //   data.append("image", this.item.email.image);
            //   data.append("clients", this.clients);

            //   this.$axios
            //     .$post(`/cms/pages/${this.itemId}`, data, {
            //       headers: { "Content-Type": "multipart/form-data" }
            //     })
            //     .then(response => {
            //       this.loading = false;
            //       this.$toast.success("Page updated successfully");
            //       this.$emit("updated", { refresh: true });
            //     })
            //     .catch(error => {
            //       this.loading = false;
            //       this.$toast.error(error.response.data.error.message);
            //     });
            // },

            createNewBlock() {
                this.loading = true;
                this.$axios
                    .$post(`/cms/pages/${this.itemId}/blocks`)
                    .then(response => {
                        this.loading = false;
                        this.$toast.success(
                            "New block created successfully and added at the end"
                        );
                        this.loadBlocks();
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$toast.error(error.response.data.error.message);
                    });
            },

            updateBlock(e) {
                this.loading = true;
                this.$axios
                    .$patch(
                        `/cms/pages/${this.itemId}/blocks/${e.target.elements.id.value}`,
                        {
                            titleEN: e.target.elements.titleEN.value,
                            titleCH: e.target.elements.titleCH.value,
                            descriptionEN: e.target.elements.descriptionEN.value,
                            descriptionCH: e.target.elements.descriptionCH.value,
                            buttonTextEN: e.target.elements.buttonTextEN.value,
                            buttonTextCH: e.target.elements.buttonTextCH.value,
                            button_url: e.target.elements.button_url.value
                        }
                    )
                    .then(response => {
                        this.loading = false;
                        this.$toast.success("Block updated successfully");
                        this.loadBlocks();
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$toast.error(error.response.data.error.message);
                    });
            },

            updateBlockImageURL({ id, url }) {
                this.$axios
                    .$patch(`/cms/pages/${this.itemId}/blocks/${id}`, { image_url: url })
                    .then(response => {
                        this.$toast.success("Image updated successfully");
                        this.loadBlocks();
                    })
                    .catch(error => {
                        this.$toast.error(error.response.data.error.message);
                    });
            },

            draggedBlock(arg) {
                let order = [];
                this.blocks.items.forEach(block => {
                    order.push(block.id);
                });
                this.$axios
                    .$post(`/cms/pages/${this.itemId}/blocks/sort`, { order: order })
                    .then(response => {
                        this.$toast.success("Order updated successfully");
                    });
            },

            toggleBlock(block) {
                if ("collapsed" in block) {
                    block.collapsed = !block.collapsed;
                } else {
                    block["collapsed"] = true;
                }
                this.$forceUpdate();
            },

            deleteBlock(id) {
                this.$bvModal
                    .msgBoxConfirm("Are you sure?", {
                        centered: true,
                        bodyClass: "confirm-box-body",
                        footerClass: "confirm-box-footer"
                    })
                    .then(value => {
                        if (value) {
                            this.$axios
                                .$delete(`/cms/pages/${this.itemid}/blocks/${id}`)
                                .then(response => {
                                    this.$toast.success("Block deleted successfully");
                                    this.loadBlocks();
                                })
                                .catch(error => {
                                    this.$toast.error(error.response.data.error.message);
                                });
                        }
                    });
            }
        },
        watch: {
            itemId() {
                this.item = null;
                this.loadPages();
                this.loadBlocks();
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.loadPages();
                this.loadBlocks();
                this.getClients();
            });
        }
    };
</script>

<style lang="scss" scoped>
    .cmscomponent.item {
        .draggable {
            .block {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #fff;
                border: 1px solid #ddd;
                padding: 10px;
                margin: 5px 0;
                border-radius: 4px;

                .handle {
                    width: 30px;
                    text-align: center;
                    cursor: grab;
                }

                .content {
                    width: calc(100% - 50px);
                    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                    border-radius: 4px;
                    padding: 10px;
                }
            }
        }

        .block-item-content {
            .block-form-inputs {
                display: none;

                &.visible {
                    display: block;
                }

                .block-input-wrapper {
                    padding: 5px;
                    border-radius: 4px;
                    background: #ddd;
                    margin-bottom: 5px;
                    font-size: 14px;

                    .block-input-wrapper-title {
                        font-weight: 600;
                        cursor: pointer;
                    }

                    .input-wrapper {
                        input,
                        textarea {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
</style>