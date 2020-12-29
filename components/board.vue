<template>
    <div class="component board">
        <div class="board-container">
            <div class="header">
                <div class="editable">
                    <div ref="headerTitle" class="title" :contenteditable="true">{{$t('my_board')}}</div>
                    <button @click="focusHeaderTitle"><i class="fas fa-pencil-alt"></i></button>
                </div>
            </div>
            <div class="items">
                <b-row cols="3">
                    <b-col v-for="(url, $index) in items" :key="`board_item_${$index}`">
                        <div class="item">
                            <div class="image-container">
                                <img :src="url">
                                <div class="actions">
                                    <button @click="focusItemTitle($index)"><i class="fas fa-pencil-alt"></i></button>
                                    <button><i class="fas fa-times-circle"></i></button>
                                </div>
                            </div>
                            <div :ref="`itemTitle${$index}`" class="title" :contenteditable="true"></div>
                        </div>
                    </b-col>
                </b-row>
            </div>
            <div class="footer">
                <img :src="logo">
            </div>
        </div>

        <div class="board-actions">
            <b-row>
                <b-col class="button-col">
                    <button @click="saveBoard" class="btn-save-board" :disabled="!items.length"><i
                            class="far fa-save"></i>{{$t('save_board')}}
                    </button>
                </b-col>
                <b-col class="button-col">
                    <button @click="resetBoard" class="btn-reset-board" :disabled="!items.length"><i
                            class="far fa-save"></i>{{$t('reset_board')}}
                    </button>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [],
                boardTitle: '',
                logo: require('~/assets/logo.png')
            }
        },
        methods: {
            focusHeaderTitle() {
                setTimeout(() => {
                    this.$refs.headerTitle.focus();
                }, 0);
            },

            focusItemTitle(index) {
                setTimeout(() => {
                    var ref = `itemTitle${index}`;
                    this.$refs[ref][0].focus();
                }, 0);
            },

            async addItem() {
                const el = document.querySelector('.component.designSlider .designContainer');
                const dimension = 445;
                const options = {type: 'dataURL', width: dimension, height: dimension};
                let data = await this.$html2canvas(el, options);
                this.items.push(data);
            },

            async saveBoard() {
                const el = document.querySelector('.component.board .board-container');
                const options = {type: 'dataURL'};
                let data = await this.$html2canvas(el, options);

                var a = document.createElement("a");
                a.href = data;
                a.download = "CollectionStock_SimulationBoard.png";
                a.click();
            },

            resetBoard() {
                this.items = [];
                this.$refs.headerTitle.textContent = "My Board";
            }
        }
    }
</script>

<style lang="scss" scoped>
    .component.board {
        .board-container {
            // min-height: 400px;
            border: 5px solid $black;
            border-radius: 10px;
            padding: 20px;

            .footer {
                text-align: right;

                img {
                    height: 70px;
                }
            }

            .editable {
                display: flex;
                align-items: center;
                justify-content: center;

                div {
                    font-size: 25px;
                    font-weight: 700;
                    height: 35px;
                    min-width: 50px;
                }

                span:focus {
                    border: 1px solid $brand;
                }

                button {
                    background: none;
                    border: none;
                    padding: 0;
                    margin-left: 10px;
                    outline: none;
                    font-size: 25px;
                    font-weight: 700;
                }
            }

            .items {
                margin-top: 30px;

                .item {
                    margin-bottom: 20px;

                    &:hover {
                        .image-container .actions {
                            display: block;
                        }
                    }

                    .image-container {
                        margin-bottom: 10px;

                        img {
                            width: 100%;
                        }

                        .actions {
                            position: absolute;
                            top: 0;
                            right: 0;
                            display: flex;
                            margin-right: 20px;
                            margin-top: 5px;
                            display: none;

                            button {
                                background: none;
                                border: none;
                                padding: 0;
                                margin-left: 10px;
                                outline: none;
                                font-size: 30px;
                            }
                        }
                    }

                    .title {
                        font-size: 20px;
                        font-weight: 600;
                        height: 30px;
                        text-align: center;
                    }
                }
            }
        }

        .board-actions {
            margin-top: 30px;

            .button-col {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            button {
                border: 1px solid $black;
                border-radius: 30px;
                font-size: 16px;
                font-weight: 700;
                padding: 8px 20px;
                text-transform: uppercase;
                transition: all 0.2s;
                @media screen and (max-width: 768px) {
                    font-size: 14px;

                }

                    &:active {
                    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
                }

                &.btn-save-board {
                    background: $brand;
                    color: #fff;
                    border: none;
                    outline: none;
                }

                &.btn-reset-board {
                    background: $black;
                    color: #fff;
                    border: none;
                    outline: none;
                }
            }
        }
    }
</style>