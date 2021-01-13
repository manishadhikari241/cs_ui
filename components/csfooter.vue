<template>
  <div class="component csfooter">
    <span>{{ $moment(init.date).format('YYYY') }} © Collectionstock</span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("app", ["init"])
  }
}
</script>

<style lang="scss" scoped>
.component.csfooter {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #231f20;
  color: #fff;
  margin-top: 50px;
  text-align: center;
}
</style>