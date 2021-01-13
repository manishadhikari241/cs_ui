<template>
  <div id="cms-container">
    <CMSHeader class="ignorePrint" />
    <div id="cms-content-wrapper">
      <nuxt />
    </div>
  </div>
</template>

<script>
import CMSHeader from '~/components/cms/cmsheader';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

export default ({
  components: {
    CMSHeader
  }
})
</script>

<style>
html, body {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

#cms-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#cms-content-wrapper {
  flex-grow: 1;
}

.cmspage {
  height: calc(100vh - 66px);
}

.cmspage .contentframe {
  display: flex;
  height: 100%;
}

.cmspage .contentframe .menuframe {
  width: 50%;
  height: 100%;
  overflow: auto;
  padding: 15px;
}

.cmspage .contentframe .menuframe .title {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cmspage .contentframe .itemframe {
  width: 50%;
  height: 100%;
  border-left: 1px solid #ddd;
  overflow: auto;
  padding: 15px;
}

.cmspage .contentframe .itemframe .cmscomponent.item .title {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cmspage .contentframe .itemframe .cmscomponent.item .item-content {
  
}

.cmspage .contentframe .itemframe .cmscomponent.item .item-content .item-row {
  display: flex;
  flex-direction: row;
  padding: 15px;
}

.cmspage .contentframe .itemframe .cmscomponent.item .item-content .item-row:nth-child(odd) {
  background: rgba(0, 0, 0, 0.05);
}

.cmspage .contentframe .itemframe .cmscomponent.item .item-content .item-row .prop {
  width: 200px;
  font-weight: 600;
}

.cmspage .contentframe .itemframe .cmscomponent.item .item-content .item-row .value {
  flex-grow: 1;
}

.cmspage .contentframe .itemframe .cmscomponent.item .item-actions {
  text-align: right;
  margin-top: 15px;
}

.cmspage .cmscomponent .additional-actions {
  display: flex;
  padding: 10px 0;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}



@media print {
  .ignorePrint {
    display: none !important;
  }
}
</style>
