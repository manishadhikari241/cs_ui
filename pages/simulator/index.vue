<template>
    <div class="page simulator">
        <PageInfo :slug="'simulator'"/>
        <div class="spacing"></div>
        <Simulator ref="simulator" :mode="'simulator'" @loaded="simulatorLoaded" @dragtoboard="dragToBoard" />
        <div v-show="isSimulatorLoaded">
            <br class="simulator-break">
            <br class="simulator-break">
            <br>
            <Board ref="board" />
        </div>
    </div>
</template>

<script>
    import PageInfo from "~/components/pageinfo";
    import Simulator from "~/components/simulator";
    import Board from "~/components/board";

    export default {
        components: {
            PageInfo,
            Simulator,
            Board
        },
        data() {
            return {
                isSimulatorLoaded: false
            }
        },
        methods: {
            simulatorLoaded() {
                this.isSimulatorLoaded = true;
            },

            dragToBoard() {
                this.$refs.board.addItem(this.$refs.simulator.$refs.designSlider.$refs.designContainer);
            }
        }
    };
</script>

<style lang="scss" scoped>
.spacing{
    margin-bottom:40px;
    @media screen and (max-width: 768px) {
    margin-bottom:30px;

}
}
@media screen and (max-width: 768px) {
  .simulator-break {
    display: none;
  }
}
</style>
