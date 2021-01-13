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
                        
                            <b-table class="payment-history" :items="payments" :fields="fields" :responsive="'md'" striped>
                                <template v-slot:cell(package)="data">
                                    <span class="capitalize" v-if="data.item.lib_plan_user">{{ data.item.lib_plan_user.lib_plan.key.replaceAll('_', ' ') }}</span>
                                    <span class="capitalize" v-else>{{ $t(data.item.package) }}</span>
                                </template>
                                <template v-slot:cell(amount)="data">
                                    <span v-if="data.item.channel != 'coupon'">{{ data.item.amount }} USD</span>
                                    <b-badge variant="primary" v-if="data.item.channel == 'coupon'">{{ $t('coupon') }}
                                    </b-badge>
                                </template>
                                <template v-slot:cell(quantity)="data">
                                    <template v-if="!data.item.lib_plan_user">
                                        {{ data.item.quantity }}
                                        <span class="lowercase">
                                        {{ data.item.package == 'standard' || data.item.package == 'extended' ?
                                        (data.item.quantity == 1 ? $t('download') : $t('downloads')) :
                                        data.item.package == 'exclusive' ?
                                            (data.item.quantity == 1 ? $t('design_quantifier') : $t('designs_quantifier')) :
                                            (data.item.quantity == 1 ? $t('product') : $t('products')) }}
                                        </span>
                                    </template>
                                    <template v-else>
                                        {{ data.item.lib_plan_user.lib_plan.quota }} designs
                                    </template>
                                </template>
                                <template v-slot:cell(actions)="data">
                                    <b-button @click="showInvoice(data.item)" style="text-transform: capitalize">{{
                                        $t('view') }}
                                    </b-button>
                                </template>
                            </b-table>
                        </div>

                        <div class="invoice-container" v-if="invoice">
                            <template v-if="!invoice.lib_plan_user">
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
                                    <div class="value" v-else >{{ this.$auth.user.first_name }} {{this.$auth.user.last_name}}</div>


                                    <div v-if="invoice.vat_number" class="prop">{{$t('vat_number')}}</div>
                                    <div class="value" v-if="invoice.vat_number">{{ invoice.vat_number }}</div>

                                    <div class="prop" v-if="invoice.channel != 'coupon'">{{ $t('transaction_id') }}</div>
                                    <div class="value" v-if="invoice.channel != 'coupon'">{{ invoice.transaction_id }}</div>
                                    <div class="prop">{{ $t('package') }}</div>
                                    <div class="value">
                                        <div v-if="invoice.package == 'standard' || invoice.package == 'extended'">
                                            <p><span class="capitalize">{{ $t(invoice.package) }}</span>{{ invoice.package
                                                == 'standard' || invoice.package == 'extended' ? $t('license') : 'Requests' }} -
                                                ${{ invoice.amount }} {{$t('for')}} {{ invoice.quantity }} {{ invoice.package ==
                                                'standard' || invoice.package == 'extended' ? invoice.quantity > 1 ? $i18n.locale == "en" ? $t('download') + "s" : $t('download') :$t('download') : 'requests' }}</p>
                                            <p v-if="invoice.package == 'standard'">{{ $t('jpg_only') }}</p>
                                            <p v-if="invoice.package == 'extended'">{{ $t('jpg_pdf_ai_eps') }}</p>
                                            <p v-if="invoice.package == 'standard'">{{ $t('for_editorial_avertising_web')
                                                }}</p>
                                            <p v-if="invoice.package == 'extended'">{{
                                                $t('for_resale_items_can_edit_modify') }}</p>
                                        </div>
                                        <div v-else-if="invoice.package == 'simulator'">
                                            <p>{{$t('product_simulator')}} - ${{ invoice.amount }} {{$t('for')}} {{ invoice.quantity
                                                }}
                                                {{$t('product')}}{{$i18n.locale == "en" ? "s" : ""}} </p>
                                            <p>{{$t('add_your_own_product_into')}}</p>
                                        </div>
                                        <div v-else>
                                            <p>{{$t('exclusive_design_invoice')}} - ${{ invoice.amount }}{{$t('for')}} {{
                                                invoice.quantity }}
                                                {{$t('design_single')}}{{invoice.quantity > 1 ? $i18n.locale == "en" ? "s" : "" :''}}</p>
                                            <p>{{$t('jpg_pdf_ai_eps')}}</p>

                                            <p>{{$t('ownership_certificate')}}</p>

                                            <p>{{$t('tailor_made_on_request')}}</p>
                                        </div>
                                        <p>{{ $t('to_be_used_within') }}</p>
                                    </div>
                                    <!--<div class="prop">{{ $t('period') }}</div>-->
                                    <!--<div class="value">{{ $t('one_year') }} : {{-->
                                    <!--$moment(invoice.created_at).format('DD/MM/YYYY') }} - {{-->
                                    <!--$moment(invoice.created_at).add('years', 1).format('DD/MM/YYYY') }}-->
                                    <!--</div>-->
                                    <!--<div class="prop">{{ $t('contract_start_date') }}</div>-->
                                    <!--<div class="value">{{ $moment(invoice.created_at).format('DD/MM/YYYY') }}</div>-->
                                    <div class="prop">{{ $t('total') }}</div>
                                    <div class="value">US$ {{ invoice.amount }}</div>
                                    <div class="prop">{{ $t('important') }}</div>
                                    <div class="value">
                                        <p>* {{ $t('payments_made_in') }}</p>
                                        <p>* {{ $t('no_vat_applies') }}</p>
                                        <!--<p>* {{ $t('on_all_downloads_license_will_apply') }}</p>-->
                                    </div>
                                    <br>
                                    <!--<b-button class="back ignorePrint" @click="showInvoice(null)"><b-icon-chevron-left></b-icon-chevron-left> {{ $t('back') }}</b-button>-->
                                </div>
                            </template>
                            <template v-else>
                                <!-- <div>---INVOICE FOR EXISTING USERS</div> -->
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
                                    <div class="value" v-else >{{ this.$auth.user.first_name }} {{this.$auth.user.last_name}}</div>


                                    <div v-if="invoice.vat_number" class="prop">{{$t('vat_number')}}</div>
                                    <div class="value" v-if="invoice.vat_number">{{ invoice.vat_number }}</div>

                                    <div class="prop" v-if="invoice.channel != 'coupon'">{{ $t('transaction_id') }}</div>
                                    <div class="value" v-if="invoice.channel != 'coupon'">{{ invoice.transaction_id }}</div>
                                    <div class="prop">{{ $t('plan') }}</div>
                                    <div class="value">
                                    
                                        <div v-if="invoice.lib_plan_user.lib_plan.key == 'starter'"><p>{{$t('monthly_membership')}} - US$ {{invoice.amount}}/{{$t('month')}} {{$t('for')}} {{invoice.lib_plan_user.lib_plan.quota}} {{$t('design_invoice')}}   {{$t('with_extended_license')}} </p></div>
                                             <div v-if="invoice.lib_plan_user.lib_plan.key == 'starter_yearly'"><p>{{$t('starter_plan_yearly')}} - US$ {{invoice.amount}}  {{$t('for')}} {{invoice.lib_plan_user.lib_plan.quota}} {{$t('design_invoice')}} {{$t('with_extended_license')}} </p></div>
                                                 <div v-if="invoice.lib_plan_user.lib_plan.key == 'pro_yearly'"><p>{{$t('pro_plan_yearly')}} - US$ {{invoice.amount}} {{$t('for')}} {{invoice.lib_plan_user.lib_plan.quota}} {{$t('design_invoice')}} {{$t('with_extended_license')}} </p></div>
                                    </div>
                                    <div class="prop">{{ $t('period') }}</div>
                                    <div  v-if="invoice.lib_plan_user.lib_plan.month_cycle == '12'" class="value">{{ $t('one_year') }} : {{$moment(invoice.created_at).format('DD/MM/YYYY') }} - {{$moment(invoice.created_at).add('years', 1).format('DD/MM/YYYY') }}
                                    </div>
                                   <div  v-if="invoice.lib_plan_user.lib_plan.month_cycle == '1'" class="value">{{ $t('one_month') }} : {{$moment(invoice.created_at).format('DD/MM/YYYY') }} - {{$moment(invoice.created_at).add('months', 1).format('DD/MM/YYYY') }}
                                    </div>

                                    <div class="prop">{{ $t('total') }}</div>
                                    <div class="value">US$ {{ invoice.amount }}</div>
                                    <div class="prop">{{ $t('important') }}</div>
                                    <div class="value">
                                        <p>* {{ $t('payments_made_in') }}</p>
                                        <p>* {{ $t('no_vat_applies') }}</p>
                                        <p>* {{ $t('extended_license_terms_will_apply') }}</p>
                                        <p v-if="invoice.lib_plan_user.lib_plan.key == 'starter'">* {{ $t('your_monthly_membership') }}</p>
                                        <p v-if="invoice.lib_plan_user.subscription_id != null && invoice.lib_plan_user.lib_plan.key == 'starter_yearly' || invoice.lib_plan_user.lib_plan.key == 'pro_yearly' ">* {{ $t('your_starter_yearly_membership') }}</p>


                                    </div>
                                    <br>
                                    <!--<b-button class="back ignorePrint" @click="showInvoice(null)"><b-icon-chevron-left></b-icon-chevron-left> {{ $t('back') }}</b-button>-->
                                </div>
                            </template>
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
                        tdClass: 'show-data',
                        thClass: 'show-head'
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
                        label: this.$t("details"),
                        tdClass: 'show-data',
                        thClass: 'show-head'
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
                        if (this.$auth.user.is_existing_user) {
                            this.payments = response.payments.concat(response.planPayments);
                            this.payments.sort(function (a, b) {
                                if (a.created_at < b.created_at)
                                    return 1;
                                else if (a.created_at > b.created_at)
                                    return -1;
                                return 0;
                            });
                        } else {
                            this.payments = response.payments;
                        }
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
                @media screen and (max-width: 768px) {
                    font-size: 20px;
                }
                @media screen and (max-width: 550px) {
                    margin-top: -20px;                }
            }
            .payment-history .hidden-xs {
                @media screen and (max-width: 768px) {
                    font-size: 12px;
                }
            }
            .payment-history .show-head {
                @media screen and (max-width: 768px) {
                    font-size: 14px;
                }
            }
            .payment-history .show-data {
                @media screen and (max-width: 768px) {
                    font-size: 12px;
                }
            }
            .capitalize {
                text-transform: capitalize;
            }

            .lowercase {
              text-transform: lowercase;
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
                    font-size: 12px;

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
                    margin-top: -18px;
                    @media screen and (max-width: 768px) {
                        font-size: 12px;
                    }
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
                    padding: 2px 8px;
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
