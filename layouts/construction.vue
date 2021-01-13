<template>
  <div id="app-container">
    <div class="col-md-6 construction">
        <img class="img-fluid" src="~/assets/static/construction.png"/>

      </div>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

export default {};
</script>
<style lang="scss" scoped>
#app-container{
  display:flex;
  justify-content: center;
}
  .construction{
       @media screen and (min-width: 1024px) {
  padding:110px;
 }
    @media screen and (max-width: 768px) {
  padding-top:110px;
 }
}

</style>
