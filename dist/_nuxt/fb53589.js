(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{446:function(o,t,e){var content=e(448);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(30).default)("655319ef",content,!0,{sourceMap:!1})},447:function(o,t,e){"use strict";e(446)},448:function(o,t,e){(t=e(29)(!1)).push([o.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary,.modal-dialog .confirm-box-footer-confirm .btn-secondary{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content .modal-header{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button{background-color:#363636;color:#363636;background-color:#fff}.black-button,.white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button{color:#fff;background-color:#363636}.component.pageinfo .pageinfo-head{display:flex;align-items:center;justify-content:space-between}.component.pageinfo .pageinfo-head .action-btn{border-radius:30px;background-color:#000;color:#fff;width:200px;height:35px;font-weight:700;text-transform:uppercase;padding:0}.component.pageinfo .pageinfo-head .action-btn.join-now-btn{background-color:#0e8dde;border:none}.component.pageinfo .description button{padding:10px 25px;background-color:#0e8dde;font-size:18px;border-radius:30px;box-shadow:0 5px 10px rgba(0,0,0,.5)}@media screen and (max-width:426px){.component.pageinfo .description button{margin-left:auto!important;margin-right:auto}}.component.pageinfo .pageinfo-title{font-weight:700;font-size:48.2px}.component.pageinfo .pageinfo-description{width:65%;margin:0;padding:0;color:#bbb;font-size:20px}.component.pageinfo .pageinfo-description br{display:none}.component.pageinfo .pageinfo-description a{color:#000!important;font-weight:700;text-decoration:none;display:inline-block}@media screen and (max-width:768px){.component.pageinfo .pageinfo-head{display:block;text-align:left}.component.pageinfo .pageinfo-head .action-btn{margin:10px 0 20px}.component.pageinfo .pageinfo-title{font-size:30px}.component.pageinfo .pageinfo-description{font-size:16px;max-width:100%}}@media screen and (max-width:768px) and (max-width:768px){.component.pageinfo .pageinfo-description{width:100%!important}}",""]),o.exports=t},449:function(o,t,e){"use strict";e(8),e(6),e(10);var n={props:["slug","button","buttonId"],data:function(){return{pageInfo:null,requestButton:!1,routeCheck:"/request"==this.$router.history.current.path||"/ch/request"==this.$router.history.current.path}},methods:{load:function(){var o=this;this.$axios.$get("/pages/".concat(this.slug)).then((function(t){o.pageInfo=t}))},checkAndRedirect:function(o){this.$auth.loggedIn?this.$router.push(o):this.$bvModal.show("modal-auth")},checkRequestButton:function(){var o=this;this.$auth.loggedIn?this.$axios.$get("/requests/collection?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group").then((function(t){console.log(t),0==t.data.length||0==Object.keys(t.data).length?o.requestButton=!0:o.requestButton=!1})):this.requestButton=!0}},created:function(){var o=this;this.checkRequestButton(),this.$nuxt.$on("login",(function(){o.checkRequestButton()})),this.$nuxt.$on("logout",(function(){o.checkRequestButton()}))},mounted:function(){var o=this;console.log(this.$router.history.current.path),this.$nextTick((function(){o.load()}))}},r=(e(447),e(21)),component=Object(r.a)(n,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"component pageinfo"},[e("div",{staticClass:"pageinfo-head"},[o.pageInfo?e("h1",{staticClass:"pageinfo-title"},[o._v("\n      "+o._s(o.pageInfo.translations[o.$i18n.locale].info_title)+"\n    ")]):o._e(),o._v(" "),o.button?e("b-button",{directives:[{name:"show",rawName:"v-show",value:o.pageInfo,expression:"pageInfo"}],staticClass:"action-btn",attrs:{id:o.buttonId}},[o._v(o._s(o.button))]):o._e()],1),o._v(" "),e("div",{staticClass:"d-flex align-items-end align-items-md-center justify-content-between flex-column flex-md-column flex-lg-row description"},[o.pageInfo?e("p",{staticClass:"pageinfo-description ",class:"simulator"==o.slug?"w-100":"",style:"request"==o.slug?"width:80%":"",domProps:{innerHTML:o._s(o.pageInfo.translations[o.$i18n.locale].info_body)}}):o._e(),o._v(" "),o.requestButton&&o.routeCheck?e("b-button",{staticClass:"border-0 d-inline-block font-weight-bold text-white text-nowrap ml-3 mt-3",on:{click:function(t){o.checkAndRedirect(o.localePath("/request/create"))}}},[o._v(o._s(o.$t("send_a_request_btn")))]):o._e()],1)])}),[],!1,null,null,null);t.a=component.exports},541:function(o,t,e){var content=e(689);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(30).default)("5ee5d583",content,!0,{sourceMap:!1})},688:function(o,t,e){"use strict";e(541)},689:function(o,t,e){(t=e(29)(!1)).push([o.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:120px;padding-bottom:50px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;color:#363636;background-color:#fff}.modal-dialog .confirm-box-footer-confirm .btn-primary,.modal-dialog .confirm-box-footer-confirm .btn-secondary{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;font-weight:700;margin-right:-163px}.modal-dialog .confirm-box-footer-confirm .btn-primary{color:#fff;background-color:#363636}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content .modal-header{margin-left:-1px;margin-top:-1px;background-color:#363636;color:#fff}.white-button{background-color:#363636;color:#363636;background-color:#fff}.black-button,.white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.black-button{color:#fff;background-color:#363636}.page.downloads .container{max-width:100%!important}.page.downloads .downloads-header{margin:10px 0}.page.downloads .downloads-header .actions{text-align:right}.page.downloads .downloads-header .actions button{outline:none;box-shadow:none;border:none;background:none;color:#363636;padding:0;font-size:20px;margin-left:5px;border-radius:0}.page.downloads .downloads-header .actions button:focus{outline:none;box-shadow:none;border:none}.page.downloads .downloads-header .actions button.active{font-weight:700;border-bottom:1px solid #363636}.page.downloads .designs .table td,.page.downloads .designs .table th{vertical-align:middle}.page.downloads .designs table .design-preview{width:100px;height:100px}",""]),o.exports=t},746:function(o,t,e){"use strict";e.r(t);e(11),e(9),e(8),e(6),e(10);var n=e(28),r=e(3),c=e(40),d=e(449),l=e(459),f=e(0);function m(object,o){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);o&&(e=e.filter((function(o){return Object.getOwnPropertyDescriptor(object,o).enumerable}))),t.push.apply(t,e)}return t}var h={middleware:"auth",components:{PageInfo:d.a,DesignList:l.a,BIconGridFill:f.Bn,BIconListTask:f.Gp,BIconX:f.Xv,BIconChevronDown:f.eh,BIconChevronUp:f.ih,BIconEyeFill:f.Yj,BIconClipboard:f.nh},computed:function(o){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(r.a)(o,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(o,t,Object.getOwnPropertyDescriptor(source,t))}))}return o}({},Object(c.b)("app",["init"])),data:function(){return{list:null,mode:"grid",type:"all",fields:[{key:"design",label:"ITEMS"},{key:"code",label:"CS CODE"},{key:"designer_id",label:"CREATOR"},{key:"actions",label:""}],itemsPerPage:20,page:0,maxPage:100,total:0,data:[],designs:[]}},methods:{loadMore:function(){var o=this;this.$axios.$get("/downloads?scope[]=designer.profile&scope[]=studio&recent=1&is_active=1&take=".concat(this.itemsPerPage,"&page=").concat(this.page+1,"&package=").concat(this.type)).then((function(t){var e,r;o.page=t.current_page,o.maxPage=t.last_page,o.total=t.total,(e=o.data).push.apply(e,Object(n.a)(t.data));var c=[];t.data.forEach((function(element){c.push(element.design)})),(r=o.designs).push.apply(r,c),o.$refs.infload.stateChanger.loaded(),o.page>=o.maxPage&&o.$refs.infload.stateChanger.complete()}))},changeMode:function(o){this.mode=o},changeType:function(o){o!==this.type&&(this.type=o,this.page=0,this.data=[],this.designs=[],this.$refs.infload.stateChanger.reset())}}},x=(e(688),e(21)),component=Object(x.a)(h,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"page downloads"},[e("b-container",[e("div",{staticClass:"component pageinfo"},[e("div",{staticClass:"pageinfo-head"},[e("h1",{staticClass:"pageinfo-title"},[o._v(o._s(o.$t("downloads")))])]),o._v(" "),e("p",{staticClass:"pageinfo-description"},[o._v(o._s(o.$t("all_designs_you_downloaded")))])])]),o._v(" "),e("b-container",{staticClass:"downloads-header"},[e("div",{staticClass:"actions"},[e("div",{staticClass:"types"},[e("b-button",{class:{active:"all"===o.type},on:{click:function(t){return o.changeType("all")}}},[o._v(o._s(o.$t("all")))]),o._v(" "),e("span",{staticClass:"separator"},[o._v("|")]),o._v(" "),e("b-button",{class:{active:"standard"===o.type},on:{click:function(t){return o.changeType("standard")}}},[o._v(o._s(o.$t("standard")))]),o._v(" "),e("span",{staticClass:"separator"},[o._v("|")]),o._v(" "),e("b-button",{class:{active:"extended"===o.type},on:{click:function(t){return o.changeType("extended")}}},[o._v(o._s(o.$t("extended")))]),o._v(" "),e("span",{staticClass:"separator"},[o._v("|")]),o._v(" "),e("b-button",{class:{active:"exclusive"===o.type},on:{click:function(t){return o.changeType("exclusive")}}},[o._v(o._s(o.$t("exclusive")))])],1)])]),o._v(" "),e("b-container",{staticClass:"designs"},[e("client-only",["grid"==o.mode?e("DesignList",{attrs:{designs:o.designs}}):o._e(),o._v(" "),"table"==o.mode?e("b-table",{attrs:{items:o.designs,fields:o.fields,responsive:"md",striped:""},scopedSlots:o._u([{key:"cell(design)",fn:function(data){return[e("img",{staticClass:"design-preview",attrs:{src:"https://dev.collectionstock.com/api/v1/image/thumbnail/design/"+data.item.code+"/tiny"}})]}}],null,!1,3511894273)}):o._e(),o._v(" "),e("infinite-loading",{ref:"infload",on:{infinite:o.loadMore}})],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);