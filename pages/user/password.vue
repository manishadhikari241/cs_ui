<template>
    <div class="page user">
        <b-container>
            <b-row>
                <b-col md="3">
                    <UserMenu/>
                </b-col>
                <b-col md="9">
                    <div class="content">
                        <div class="password-container">
                            <div class="title">{{ $t('password') }}</div>
                            <br class="password">
                            <form @submit.prevent="updatePassword">
                                <div class="info-row">
                                    <div class="prop">{{ $t('old_password') }}</div>
                                    <div class="value">
                                        <b-input type="password" v-model="user.old_password" required></b-input>
                                    </div>
                                </div>
                                <div class="info-row">
                                    <div class="prop">{{ $t('new_password') }}</div>
                                    <div class="value">
                                        <b-input type="password" v-model="user.new_password"
                                                 :class="{'success': user.new_password.length && passwordsMatch}"
                                                 required></b-input>
                                    </div>
                                </div>
                                <div class="info-row">
                                    <div class="prop">{{ $t('password_confirmation') }}</div>
                                    <div class="value">
                                        <b-input type="password" v-model="user.new_password_confirm"
                                                 :class="{'success': user.new_password_confirm.length && passwordsMatch}"
                                                 required></b-input>
                                    </div>
                                </div>
                                <b-button type="submit" :disabled="updating || !passwordsMatch">{{ $t('update') }}
                                </b-button>
                            </form>
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
            passwordsMatch() {
                return this.user.new_password === this.user.new_password_confirm;
            }
        },
        data() {
            return {
                user: {
                    old_password: '',
                    new_password: '',
                    new_password_confirm: '',
                },
                updating: false
            }
        },
        methods: {
            updatePassword() {
                this.updating = true;
                this.$axios.$patch(`/users/${this.$auth.user.id}/updatePassword/`, this.user)
                    .then((response) => {
                        this.updating = false;
                        this.$toast.success(this.$t('password_updated_successfully'));
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    }).catch((error) => {
                    this.updating = false;
                    this.$toast.error(error.response.data.error.message);
                })
            }
        }
    }
</script>

<style lang="scss">
    .password{
        @media screen and (max-width: 768px) {
            display: none;        }
    }
    .page.user {
        .password-container {
            .title {
                font-size: 25px;
                font-weight: 700;
                color: $black;
                @media screen and (max-width: 550px) {
                    margin-top: -20px;
                }
            }

            .info-row {
                display: flex;
                padding: 10px 0;
                width: 100%;
                @media screen and (max-width: 500px) {
                    display: block;
                }

                .prop {
                    width: 200px;
                    font-size: 16px;
                    font-weight: 600;
                    @media screen and (max-width: 768px) {
                        font-size: 14px;
                    }
                }

                .value {
                    input {
                        @media screen and (min-width: 1024px) {
                            width: 400px
                        }
                        @media screen and (max-width: 768px) {
                            width: 300px;
                        }
                        @media screen and (max-width: 500px) {
                            width: 100%;
                        }
                        &.success {
                            background-color: lightgreen;
                        }
                    }
                }
            }

            button {
                margin-top: 40px;
                padding: 5px 40px;
                border: none;
                color: #fff;
                background: $black;
                border-radius: 30px;
                font-weight: 600;
                text-decoration: none;
                font-size: 16px;
                @media screen and (max-width: 768px) {
                    font-size: 14px;
                }

            }
        }
    }
</style>