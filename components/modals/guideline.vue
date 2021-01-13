<template>
    <div class="component guideLine">
        <b-modal id="guide" size="lg" hide-header hide-footer title="Product Image Guideline" ok-only>

            <img v-if="$i18n.locale == 'en'" class="img-fluid" src="~/assets/static/guideline_en.jpg"/>
            <img v-else class="img-fluid" src="~/assets/static/guideline_cn.jpg"/>
        </b-modal>

    </div>

</template>

<script>
    export default {
        name: "guideline"
    }
</script>

<style lang="scss">

    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1040;
        width: 100vw;
        height: 100vh;
        background-color: #f7f7f7;
        opacity: 0.7;
    }

    #guide {

        .modal-content {
            // position: relative;
            // display: flex;
            // flex-direction: column;
            // width: 86%;
            pointer-events: auto;
            background-color: #fff;
            background-clip: padding-box;
            border: 0px solid rgba(0, 0, 0, 0.2);
            border-radius: 0rem;
            outline: 0;
            // margin-left: 40px;
        }

        .modal-body {
            position: relative;
            flex: 1 1 auto;
            padding: 0rem;
        }
        img {
            height: auto;
            width:auto
        }
    }


</style>