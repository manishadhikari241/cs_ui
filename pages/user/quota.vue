<template>
    <div class="page user">
        <b-container>
            <b-row>
                <b-col md="3">
                    <UserMenu/>
                </b-col>
                <b-col md="9">
                    <div class="content">
                        <b-row>
                            <b-col md="7">
                                <div class="quota-container">
                                    <div class="title">{{ $t('your_quota') }}</div>
                                    <div class="packages" v-if="init.quota">
                                        <b-row>
                                            <b-col sm="6" v-for="(plan, $index) in plans"
                                                   :key="`updated_quota_package_${$index}`">

                                                <div class="package" v-if="plan.package == 'extended' && $auth.user.is_existing_user">
                                                    <div class="package-title">{{ $t(plan.title) }}</div>
                                                    <div class="package-price">{{ init.plan_quota }}</div>
                                                    <div class="existing-plan-description">
                                                        <p>OUT OF {{ init.plan.lib_plan.quota }}</p>
                                                        <p>PER MONTH</p>
                                                    </div>
                                                </div>

                                                <div class="package" v-else>
                                                    <div class="package-title">{{ $t(plan.title) }}</div>
                                                    <div class="package-price">{{ init.quota[plan.package] }}</div>
                                                    <div class="package-expiry" v-if="init.quota[plan.package] > 0">
                                                        <strong>{{ $t('expires') }}</strong>: {{
                                                        $moment(init.quota[`${plan.package}_expiry`]).format('DD/MM/YY')
                                                        }}
                                                    </div>
                                                    <div class="package-expiry" v-else>&nbsp;</div>
                                                    <b-button class="get-more" @click="buy(plan.package)">{{
                                                        $t('get_more') }}
                                                    </b-button>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </div>
                            </b-col>
                            <b-col md="5" class="your-downloads">
                                <div class="downloads">
                                    <div class="title">{{ $t('your_downloads') }}</div>
                                    <div class="number">{{ nOfDownloads }}</div>
                                    <nuxt-link class="browse" to="/user/downloads">{{ $t('browse') }}</nuxt-link>
                                </div>
                            </b-col>
                        </b-row>

                        <br class="quota-break">
                        <br class="quota-break">

                        <div class="important-quota-message">
                            <p class="important-title">{{ $t('important_message') }}</p>

                            <p class="important-description" v-if="!$auth.user.is_existing_user">{{ $t('quota_expiration_notice') }}</p>
                            <template v-else>
                                <template v-if="init.quota">
                                    <p class="important-description" v-if="init.plan.lib_plan.key == 'starter'">
                                        Your Monthly Membership (Extended license – US${{ init.plan.lib_plan.price }}/month) will be charged automatically.<br>
                                        Designs downloaded with a monthly membership can only be used during your active membership period.
                                    </p>
                                    <p class="important-description" v-if="init.plan.lib_plan.key == 'pro'">
                                        Your Monthly Membership (Extended license – US${{ init.plan.lib_plan.price }}/month) will be charged automatically.<br>
                                        Designs downloaded with a monthly membership can only be used during your active membership period.
                                    </p>
                                    <p class="important-description" v-else-if="init.plan.lib_plan.key == 'starter_yearly' && init.plan.subscription_id">
                                        Your Starter Plan Yearly Membership (Extended license – US${{ init.plan.lib_plan.price }}/year) will expire on {{ $moment(init.plan.next_billing_at).format('DD/MM/YYYY') }} and will be auto renewed for another year. To cancel your membership, please contact us minimum 10 days before the expiry date. Once your Membership is auto renewed, refund will not be accepted. Designs downloaded with a yearly membership can only be used during your active Yearly membership period.
                                    </p>
                                    <p class="important-description" v-else-if="init.plan.lib_plan.key == 'starter_yearly' && !init.plan.subscription_id">
                                        Your Starter Plan Yearly Membership (Extended license – US${{ init.plan.lib_plan.price }}/year) will expire on {{ $moment(init.plan.next_billing_at).format('DD/MM/YYYY') }}.<br>
                                        To renew your membership, please contact us directly. Designs downloaded with a yearly membership can only be used during your active Yearly membership period.
                                    </p>
                                    <p class="important-description" v-else-if="init.plan.lib_plan.key == 'pro_yearly' && init.plan.subscription_id">
                                        Your Pro Plan Yearly Membership (Extended license – US${{ init.plan.lib_plan.price }}/year) will expire on {{ $moment(init.plan.next_billing_at).format('DD/MM/YYYY') }} and will be auto renewed for another year. To cancel your membership, please contact us minimum 10 days before the expiry date. Once your Membership is auto renewed, refund will not be accepted. Designs downloaded with a yearly membership can only be used during your active Yearly membership period.
                                    </p>
                                    <p class="important-description" v-else-if="init.plan.lib_plan.key == 'pro_yearly' && !init.plan.subscription_id">
                                        Your Pro Plan Yearly Membership (Extended license – US${{ init.plan.lib_plan.price }}/year) will expire on {{ $moment(init.plan.next_billing_at).format('DD/MM/YYYY') }}.<br>
                                        To renew your membership, please contact us directly. Designs downloaded with a yearly membership can only be used during your active Yearly membership period.
                                    </p>
                                </template>
                            </template>

                            <p class="important-terms" v-html="$t('for_more_info_terms')"></p>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import UserMenu from '~/components/menus/user-menu';

    export default {
        middleware: 'auth',
        components: {
            UserMenu
        },
        computed: {
            ...mapState('app', ['init']),
            ...mapState('pricing', ['packages']),
        },
        data() {
            return {
                plans: [
                    {
                        title: 'standard_license',
                        item: 'design',
                        package: 'standard'
                    },
                    {
                        title: 'extended_license',
                        item: 'design',
                        package: 'extended'
                    },
                    {
                        title: 'exclusive_design',
                        item: 'request',
                        package: 'exclusive'
                    },
                    {
                        title: 'product_simulator',
                        item: 'request',
                        package: 'simulator'
                    }
                ],
                nOfDownloads: 0
            }
        },
        methods: {
            getNumberOfDownloads() {
                this.$axios.$get('/downloads/numberOfDownloads')
                    .then((response) => {
                        this.nOfDownloads = response.count;
                    })
            },

            buy(pkg) {
                this.$bvModal.show('modal-payments');
                this.$store.commit('payments/setPackage', {key: pkg, index: 1});
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getNumberOfDownloads();
            })
        }
    }
</script>

<style lang="scss">
    @media screen and (max-width: 768px) {
        .quota-break {
    display: none;
        }
    }

    .page.user {
        .content {
            padding-left: 20px;

            .your-downloads {
                @media screen and (max-width: 500px) {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 19px;
                }
            }
        }

        .quota-container {
            .title {
                font-size: 25px;
                font-weight: 700;
                color: $black;
                @media screen and (max-width: 768px) {
                    font-size: 20px;
                }
                @media screen and (max-width: 550px) {
                    margin-top: -20px;
                }
            }

            .package {
                margin: 20px 0;
                text-align: center;
                color: $black;

                .package-title {
                    font-size: 16px;
                    font-weight: 600;
                    text-transform: uppercase;
                    @media screen and (max-width: 768px) {
                        font-size: 12px;

                    }
                }

                .package-price {
                    font-size: 40px;
                    font-weight: 700;
                }

                .package-expiry {
                    font-size: 14px;
                    margin-bottom: 3px;
                }

                .get-more {
                    display: inline-block;
                    width: 100%;
                    padding: 7px 0;
                    color: #fff;
                    background: $brand;
                    font-size: 16px;
                    font-weight: 700;
                    border-radius: 30px;
                    outline: none;
                    border: none;
                    box-shadow: none;
                    text-transform: uppercase;
                    @media screen and (max-width: 768px) {
                        font-size: 14px;

                    }
                }

                .existing-plan-description {
                    font-size: 16px;
                    color: #999;
                    margin-top: 10px;

                    p {
                        margin: 0;
                        font-weight: 600;
                    }
                }
            }
        }

        .downloads {
            float: right;
            border: 1px solid $black;
            text-align: center;
            padding: 50px 40px;
            border-radius: 4px;
            @media screen and (max-width: 768px) and (min-width: 550px) {
                padding: 50px 17px;
                margin-top: 16px;
            }
            @media screen and (max-width: 550px) {
                padding: 50px 55px;

            }

            .title {
                font-size: 22px;
                font-weight: 600;
                color: $black;
                @media screen and (max-width: 768px) {
                    font-size: 12px;

                }

            }

            .number {
                font-size: 50px;
                font-weight: 700;
                @media screen and (max-width: 768px) {
                    font-size: 40px;

                }
            }

            .browse {
                display: inline-block;
                padding: 5px 40px;
                border: 1px solid $black;
                color: $black;
                border-radius: 30px;
                font-weight: 700;
                font-size: 20px;
                text-decoration: none;
                text-transform: uppercase;
                @media screen and (max-width: 768px) {
                    font-size: 12px;

                }
            }
        }

        .important-quota-message {
            padding: 15px 20px;
            border: 1px solid $black;
            border-radius: 4px;
            color: $black;
            font-size: 14px;
            font-weight: 600;

            .important-title {
                font-weight: 700;
            }

            .important-terms {
                a {
                    color: inherit;
                    text-decoration: none;
                    border-bottom: 1px solid $black;
                }
            }
        }
    }

    @media screen and (max-width: 767px) {
        .page.user {
            .content {
                padding-left: 0;
            }
        }
    }
</style>