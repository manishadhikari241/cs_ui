<template>
    <div class="page user">
        <b-container>
            <b-row>
                <b-col md="3" class="ignorePrint">
                    <UserMenu/>
                </b-col>
                <b-col md="9">
                    <div class="content">
                        <div class="payments-container" v-show="!invoice">
                            <div class="title">{{ $t('payment_history') }}</div>
                            <br>
                            <b-table :items="payments" :fields="fields" :responsive="'md'" striped>
                                <template v-slot:cell(package)="data">
                                    <span class="capitalize">{{ $t(data.item.package) }}</span>
                                </template>
                                <template v-slot:cell(amount)="data">
                                    <span v-if="data.item.channel != 'coupon'">{{ data.item.amount }} USD</span>
                                    <b-badge variant="primary" v-if="data.item.channel == 'coupon'">{{ $t('coupon') }}
                                    </b-badge>
                                </template>
                                <template v-slot:cell(quantity)="data">
                                    {{ data.item.quantity }}
                                    <span v-if="$i18n.locale == 'en'">{{ data.item.package == 'standard' || data.item.package == 'extended' ? 'designs' : 'requests' }}</span>
                                </template>
                                <template v-slot:cell(actions)="data">
                                    <b-button @click="showInvoice(data.item)" style="text-transform: capitalize">{{
                                        $t('view') }}
                                    </b-button>
                                </template>
                            </b-table>
                        </div>

                        <div class="invoice-container" v-if="invoice">
                            <div class="title">
                                <span>{{ $t('invoice') }} # {{ invoice.id }}</span>
                                <div class="row buttons d-flex">
                                    <button class="btn-back ignorePrint" @click="showInvoice(null)"><i
                                            class="fa fa-arrow-left" aria-hidden="true"></i> {{ $t('back') }}
                                    </button>
                                    <button size="sm" @click="print" class="btn-print ignorePrint">{{
                                        $t('print_invoice') }}
                                        <img src="~/assets/icons/print_black.png" style="height:auto; width:20px"/>

                                    </button>

                                </div>


                            </div>
                            <div class="invoice-header">
                                <div class="logo"><img alt="logo" src="~/assets/logo.svg"></div>
                                <div class="text">{{ $t('invoice_address') }}</div>
                                <div class="text">www.collectionstock.com</div>
                            </div>
                            <br>
                            <hr>
                            <div class="invoice-details">
                                <div class="prop">{{ $t('invoice_date') }}</div>
                                <div class="value">{{ $moment(invoice.created_at).format('DD/MM/YYYY') }}</div>
                                <div class="prop">{{ $t('payment_method') }}</div>
                                <div class="value">
                                    <span v-if="invoice.channel != 'coupon'">{{ $t('credit_card') }}</span>
                                    <span v-if="invoice.channel == 'coupon'">{{ $t('coupon') }}</span>
                                </div>
                                <div class="prop">{{ $t('billing_details') }}</div>
                                <div class="value" v-if="invoice.billing_details">{{ invoice.billing_details }}</div>
                                <div class="prop" v-if="invoice.channel != 'coupon'">{{ $t('transaction_id') }}</div>
                                <div class="value" v-if="invoice.channel != 'coupon'">{{ invoice.transaction_id }}</div>
                                <div class="prop">{{ $t('plan') }}</div>
                                <div class="value">
                                    <div v-if="invoice.package == 'standard' || invoice.package == 'extended'">
                                        <p><span class="capitalize">{{ $t(invoice.package) }}</span> {{ invoice.package
                                            == 'standard' || invoice.package == 'extended' ? 'License' : 'Requests' }} -
                                            ${{ invoice.amount }} for {{ invoice.quantity }} {{ invoice.package ==
                                            'standard' || invoice.package == 'extended' ? 'designs' : 'requests' }}</p>
                                        <p v-if="invoice.package == 'standard'">{{ $t('jpg_only') }}</p>
                                        <p v-if="invoice.package == 'extended'">{{ $t('jpg_pdf_ai_eps') }}</p>
                                        <p v-if="invoice.package == 'standard'">{{ $t('for_print_advertising_design')
                                            }}</p>
                                        <p v-if="invoice.package == 'extended'">{{
                                            $t('for_resale_items_or_reproduction') }}</p>
                                    </div>
                                    <div v-else-if="invoice.package == 'simulator'">
                                        <p>PRODUCT SIMULATOR - ${{ invoice.amount }} for {{ invoice.quantity }}
                                            products</p>
                                        <p>Add your own products into the simulator</p>
                                    </div>
                                    <div v-else>
                                        <p>Exclusive Designs - ${{ invoice.amount }} for {{ invoice.quantity }}
                                            designs</p>
                                        <p>JPG, PDF, AI, EPS</p>
                                        <p>Ownership Certificate</p>
                                        <p>Tailor-made on request</p>
                                    </div>
                                    <p>{{ $t('to_be_used_within') }}</p>
                                </div>
                                <div class="prop">{{ $t('period') }}</div>
                                <div class="value">{{ $t('one_year') }} : {{
                                    $moment(invoice.created_at).format('DD/MM/YYYY') }} - {{
                                    $moment(invoice.created_at).add('years', 1).format('DD/MM/YYYY') }}
                                </div>
                                <div class="prop">{{ $t('contract_start_date') }}</div>
                                <div class="value">{{ $moment(invoice.created_at).format('DD/MM/YYYY') }}</div>
                                <div class="prop">{{ $t('total') }}</div>
                                <div class="value">US$ {{ invoice.amount }}</div>
                                <div class="prop">{{ $t('important') }}</div>
                                <div class="value">
                                    <p>* {{ $t('payments_are_made_in_usd') }}</p>
                                    <p>* {{ $t('no_vat_applies') }}</p>
                                    <p>* {{ $t('on_all_downloads_license_will_apply') }}</p>
                                </div>
                                <br>
                                <!--<b-button class="back ignorePrint" @click="showInvoice(null)"><b-icon-chevron-left></b-icon-chevron-left> {{ $t('back') }}</b-button>-->
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
    import {BIconChevronLeft} from "bootstrap-vue";
    import UserMenu from "~/components/menus/user-menu";

    export default {
        middleware: "auth",
        components: {
            UserMenu,
            BIconChevronLeft
        },
        data() {
            return {
                payments: [],
                fields: [
                    {
                        key: "package",
                        label: this.$t("package"),
                    },
                    {
                        key: "amount",
                        label: this.$t("price"),
                        tdClass: 'hidden-xs',
                        thClass: 'hidden-xs'

                    },
                    {
                        key: "quantity",
                        label: this.$t("quota"),
                        tdClass: 'hidden-xs',
                        thClass: 'hidden-xs'


                    },
                    {
                        key: "actions",
                        label: this.$t("details")
                    }
                ],
                invoice: null
            };
        },
        methods: {
            load() {
                this.$axios
                    .$get(`/users/${this.$auth.user.id}/payments`)
                    .then(response => {
                        this.payments = response;
                    });
            },

            showInvoice(item) {
                this.invoice = item;
            },

            print() {
                if (process.client) {
                    window.print();
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.load();
            });
        }
    };
</script>

<style lang="scss">
    .page.user {
        .payments-container {
            .title {
                font-size: 25px;
                font-weight: 700;
                color: $black;
            }

            .capitalize {
                text-transform: capitalize;
            }

            button {
                font-size: 16px;
                color: $black;
                border: 1px solid $black;
                border-radius: 30px;
                padding: 5px 20px;
                background-color: #fff;
                font-weight: 700;
                @media screen and (max-width: 768px) {
                    font-size: 14px;

                }
            }
        }

        .invoice-container {
            .title {
                font-size: 25px;
                font-weight: 700;
                color: $black;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .btn-print {
                background-color: white;
                color: $black;
                font-size: 16px;
                opacity: 1;
                border: 1px solid #363636;
                border-radius: 30px;
                padding: 2px 15px;
                font-weight: 700;
                text-transform: uppercase;
                outline: none;

            }

            .invoice-header {
                padding-top: 15px;
                text-align: center;

                .logo {
                    margin-bottom: 10px;

                    img {
                        height: 70px;
                    }
                }

                .text {
                    color: #4a4a4a;
                    font-size: 14px;
                }
            }

            .invoice-details {
                font-size: 14px;

                .prop {
                    font-weight: 700;
                    padding: 10px;
                }

                .value {
                    padding: 10px;

                    p {
                        margin: 0;
                        padding: 0;
                    }

                    .capitalize {
                        text-transform: capitalize;
                    }
                }
            }

            .btn-back {
                font-size: 16px;
                color: $black;
                border: 1px solid $black;
                border-radius: 30px;
                padding: 5px 19px;
                background-color: #fff;
                font-weight: 700;
                margin-right: 20px;
                outline: none;

            }
            @media screen and (max-width: 500px) {
                .buttons {
                    .btn-back {
                        margin-bottom: 10px;

                    }
                }
            }
            @media screen and (max-width: 768px) {
                .btn-back {
                    font-size: 14px;
                    color: $black;
                    border: 1px solid $black;
                    border-radius: 30px;
                    padding: 5px 11px;
                    background-color: #fff;
                    font-weight: 700;
                    margin-right: 20px;
                    outline: none

                }

                .btn-print {
                    background-color: white;
                    color: $black;
                    font-size: 14px;
                    opacity: 1;
                    border: 1px solid #363636;
                    border-radius: 30px;
                    padding: 2px 15px;
                    font-weight: 700;
                    text-transform: uppercase;
                    outline: none;
                }
                .buttons {
                    margin-top: auto;
                    justify-content: flex-end;

                    // width: 103%;
                }
            }

        }
    }

    @media screen and (max-width: 500px) {
        .hidden-xs {
            display: none;
        }
    }

</style>