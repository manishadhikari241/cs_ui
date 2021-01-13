<template>
  <div class="component listboard">
    <button :class="`component listboardButton${notify ? ' pulse' : ''}`" @click="toggleBoard(true)">
        <i class="fas fa-th"></i>
    </button>

    <div class="component fsBoard" v-show="visible">
        <div class="mainframe">
            <div class="header">
                <b-button class="closeFsBoard" @click="toggleBoard(false)"><b-icon-x-circle-fill></b-icon-x-circle-fill></b-button>
            </div>
            <div class="board-container">
                <Board ref="board" class="listSimulatorBoard" />
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Board from "~/components/board";
import {BIconXCircleFill} from 'bootstrap-vue'

export default {
    components: {
        Board,
        BIconXCircleFill
    },
    computed: {
        ...mapState("board", ["notify", "counter", "container"])
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        toggleBoard(show) {
            this.visible = show;
            this.$store.commit('board/notified');
        }
    },
    watch: {
        counter(newValue) {
            this.$refs.board.addItem(this.container);
        }
    },
}
</script>

<style lang="scss" scoped>
@keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
}

.component.listboardButton {
    position: fixed;
    bottom: 10px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background-color: #000;
    text-align: center;
    color: #FFF;
    font-size: 25px;
    font-weight: 700;
    outline: none;
    box-shadow: 0 3px 6px rgba(0,0,0,.175);
    z-index: 9999;
    transition: all 1s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &.pulse {
        animation: pulse 2s infinite;
    }
}


@media screen and (max-width: 767px) {
    .component.listboardButton {
        display: none;
    }
}


.component.fsBoard  {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;

    .mainframe {
        width: 90%;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, .8);
        border-radius: 5px;

        .header {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            background-color: $black;
            text-align: right;
            padding: 5px 10px;

            .closeFsBoard {
                color: #fff;
                border: none;
                background: transparent;
                outline: none;
                box-shadow: none;

                &:hover {
                    background: transparent;
                }
            }
        }

        .board-container {
            padding: 20px;
            max-height: 90vh;
            overflow: auto;

            .listSimulatorBoard {
                width: 100%;
                box-sizing: border-box;
            }
        }
    }
}

</style>