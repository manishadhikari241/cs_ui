(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{1147:function(o,t,e){"use strict";e.r(t);var n=e(473),r=e(571),d={components:{PageInfo:n.a,PageBlocks:r.a},asyncData:function(o){return o.$axios.get("/pages/home").then((function(o){return{pageData:o.data}}))},head:function(){return{meta:[{hid:"description",name:"description",content:this.pageData.translations[this.$i18n.locale].meta_description},{hid:"keywords",name:"keywords",content:this.pageData.translations[this.$i18n.locale].meta_keywords}]}},data:function(){return{loading:!1,blocks:[]}},methods:{toggleLoading:function(){this.loading=!this.loading},loadPageBlocks:function(){var o=this;this.toggleLoading(),this.$axios.$get("/pages/home/blocks").then((function(t){o.toggleLoading(),o.blocks=t}))}},mounted:function(){this.loadPageBlocks()}},c=(e(712),e(20)),component=Object(c.a)(d,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"page home"},[e("client-only",[e("PageInfo",{attrs:{slug:"home"}}),o._v(" "),e("br"),e("br"),o._v(" "),o.loading?e("div",{staticStyle:{"text-align":"center"}},[e("b-spinner",{attrs:{type:"grow",label:"Loading..."}})],1):o._e(),o._v(" "),o.loading?o._e():e("PageBlocks",{attrs:{blocks:o.blocks}})],1)],1)}),[],!1,null,"01125ff2",null);t.default=component.exports},466:function(o,t,e){var content=e(469);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(25).default)("655319ef",content,!0,{sourceMap:!1})},468:function(o,t,e){"use strict";e(466)},469:function(o,t,e){(t=e(24)(!1)).push([o.i,".modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}.component.pageinfo .pageinfo-head{display:flex;align-items:center;justify-content:space-between}.component.pageinfo .pageinfo-head .action-btn{border-radius:30px;background-color:#000;color:#fff;width:200px;height:35px;font-weight:700;text-transform:uppercase;padding:0;outline:none}.component.pageinfo .pageinfo-head .action-btn.join-now-btn{background-color:#0e8dde;border:none}.component.pageinfo .description button{padding:10px 25px;background-color:#0e8dde;font-size:16px;border-radius:30px;box-shadow:0 5px 10px rgba(0,0,0,.5)}@media screen and (max-width:768px){.component.pageinfo .description button{font-size:14px}}.component.pageinfo .pageinfo-title{font-weight:700;font-size:48.2px}.component.pageinfo .pageinfo-description{width:65%;margin:0;padding:0;font-size:20px}.component.pageinfo .pageinfo-description br{display:none}.component.pageinfo .pageinfo-description a{color:#000!important;font-weight:700;text-decoration:none;display:inline-block}@media screen and (max-width:768px){.component.pageinfo .pageinfo-head{display:block;text-align:left}.component.pageinfo .pageinfo-head .action-btn{margin:10px 0 20px}.component.pageinfo .pageinfo-head .lists-btn{display:none}.component.pageinfo .pageinfo-head .resp-btn{display:block;font-size:14px;outline:none;border:none}.component.pageinfo .pageinfo-title{font-size:30px}.component.pageinfo .pageinfo-description{font-size:15px;max-width:100%}}@media screen and (max-width:768px) and (max-width:768px){.component.pageinfo .pageinfo-description{width:100%!important}}.pageinfo-head .resp-btn{display:none}.lists-btn{display:block;font-size:16px}",""]),o.exports=t},473:function(o,t,e){"use strict";e(8),e(6),e(10);var n={props:["slug","button","buttonId"],data:function(){return{pageInfo:null,requestButton:!1,routeCheck:"/request"==this.$router.history.current.path||"/ch/request"==this.$router.history.current.path}},methods:{load:function(){var o=this;this.$axios.$get("/pages/".concat(this.slug)).then((function(t){o.pageInfo=t}))},checkAndRedirect:function(o){this.$auth.loggedIn?this.$router.push(o):this.$bvModal.show("modal-auth")},checkRequestButton:function(){var o=this;this.$auth.loggedIn?this.$axios.$get("/requests/collection?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group").then((function(t){0==t.data.length||0==Object.keys(t.data).length?o.requestButton=!0:o.requestButton=!1})):this.requestButton=!0}},created:function(){var o=this;this.checkRequestButton(),this.$nuxt.$on("login",(function(){o.checkRequestButton()})),this.$nuxt.$on("logout",(function(){o.checkRequestButton()}))},mounted:function(){var o=this;this.$nextTick((function(){o.load()}))}},r=(e(468),e(20)),component=Object(r.a)(n,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"component pageinfo"},[e("div",{staticClass:"pageinfo-head"},[o.pageInfo?e("h1",{staticClass:"pageinfo-title"},[o._v("\n            "+o._s(o.pageInfo.translations[o.$i18n.locale].info_title)+"\n        ")]):o._e(),o._v(" "),o.button?e("b-button",{directives:[{name:"show",rawName:"v-show",value:o.pageInfo,expression:"pageInfo"}],staticClass:"action-btn",class:"lists"==o.slug?"lists-btn":"",attrs:{id:o.buttonId}},[o._v(o._s(o.button)+"\n        ")]):o._e()],1),o._v(" "),e("div",{staticClass:"d-flex align-items-start align-items-lg-center justify-content-between flex-column flex-md-column flex-lg-row description"},[o.pageInfo?e("p",{staticClass:"pageinfo-description ",class:"simulator"==o.slug||"extra"==o.slug||"contact"==o.slug?"w-100":"",style:"request"==o.slug?"width:80%":"",domProps:{innerHTML:o._s(o.pageInfo.translations[o.$i18n.locale].info_body)}}):o._e(),o._v(" "),o.requestButton&&o.routeCheck?e("b-button",{staticClass:"border-0 d-inline-block font-weight-bold text-white text-nowrap mt-3",on:{click:function(t){o.checkAndRedirect(o.localePath("/request/create"))}}},[o._v(o._s(o.$t("send_a_request_btn"))+"\n        ")]):o._e()],1),o._v(" "),e("div",{staticClass:"pageinfo-head "},[o.button?e("button",{directives:[{name:"show",rawName:"v-show",value:o.pageInfo,expression:"pageInfo"}],staticClass:"action-btn resp-btn  mt-3",class:"lists"==o.slug?"lists-btn":"",attrs:{id:o.buttonId}},[o._v(o._s(o.button)+"\n        ")]):o._e()])])}),[],!1,null,null,null);t.a=component.exports},517:function(o,t,e){var content=e(540);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(25).default)("e85532f4",content,!0,{sourceMap:!1})},539:function(o,t,e){"use strict";e(517)},540:function(o,t,e){(t=e(24)(!1)).push([o.i,".modal-dialog .confirm-box-body[data-v-fdebb890]{text-align:center}.modal-dialog .confirm-box-header-confirm[data-v-fdebb890]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm[data-v-fdebb890]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-fdebb890]{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-fdebb890]{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-fdebb890]{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-fdebb890]{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-fdebb890]{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer[data-v-fdebb890]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-fdebb890]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-fdebb890]{opacity:.5}.modal-content[data-v-fdebb890]{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header[data-v-fdebb890]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button[data-v-fdebb890]{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button[data-v-fdebb890],.modal-content .white-button[data-v-fdebb890]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button[data-v-fdebb890]{color:#fff;background-color:#363636}.component.pageblocks .pageblock-container[data-v-fdebb890]{margin:0;padding:0}.component.pageblocks .pageblock-container .row[data-v-fdebb890]{align-items:center;justify-content:center;margin-bottom:100px}@media screen and (max-width:768px){.component.pageblocks .pageblock-container .row[data-v-fdebb890]{margin-bottom:80px}}.component.pageblocks .pageblock[data-v-fdebb890]{display:flex;align-items:center}.component.pageblocks .pageblock.text h1[data-v-fdebb890]{margin:0;padding:0;font-size:35px;font-weight:700;color:#313131}@media screen and (max-width:768px){.component.pageblocks .pageblock.text h1[data-v-fdebb890]{font-size:22px}}.component.pageblocks .pageblock.text p[data-v-fdebb890]{margin:20px 0 0;padding:0;font-size:16px;color:#000}@media screen and (max-width:768px){.component.pageblocks .pageblock.text p[data-v-fdebb890]{font-size:14px}}.component.pageblocks .pageblock.text a[data-v-fdebb890]{margin-top:30px;display:inline-block;padding:10px 40px;border:1px solid #000;border-radius:30px;text-transform:uppercase;color:#000;font-size:16px;font-weight:700;text-decoration:none}@media screen and (max-width:768px){.component.pageblocks .pageblock.text a[data-v-fdebb890]{font-size:14px}}.component.pageblocks .pageblock img[data-v-fdebb890]{max-width:90%}@media screen and (max-width:768px){.component.pageblocks .pageblock img[data-v-fdebb890]{max-width:100%}}@media screen and (max-width:767px){.component.pageblocks .order-1[data-v-fdebb890]{order:2!important}.component.pageblocks .pageblock[data-v-fdebb890]{justify-content:center;text-align:center}.component.pageblocks .pageblock.text[data-v-fdebb890]{padding-top:30px}.component.pageblocks .pageblock.text h1[data-v-fdebb890]{font-size:20px}.component.pageblocks .pageblock.text a[data-v-fdebb890],.component.pageblocks .pageblock.text p[data-v-fdebb890]{font-size:14px}}.increment-no[data-v-fdebb890]{font-size:4.8rem;font-weight:700;margin-right:28px}@media screen and (max-width:768px){.increment-no[data-v-fdebb890]{font-size:50px}}",""]),o.exports=t},571:function(o,t,e){"use strict";var n={props:["blocks","changedirection"],data:function(){return{imgBaseURL:"https://newapi.collectionstock.com",routeCheck:"/request"==this.$router.history.current.path||"/ch/request"==this.$router.history.current.path}}},r=(e(539),e(20)),component=Object(r.a)(n,(function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"component pageblocks"},[e("b-container",{staticClass:"pageblock-container"},o._l(o.blocks,(function(t,n){return e("b-row",{key:t.id},[e("b-col",{attrs:{md:"6",order:n%2==0?o.changedirection?2:1:o.changedirection?1:2}},[e("div",{staticClass:"pageblock image"},[e("img",{attrs:{src:o.imgBaseURL+"/storage/"+t.image_url}})])]),o._v(" "),e("b-col",{attrs:{md:"6",order:n%2==0?o.changedirection?1:2:o.changedirection?2:1}},[e("div",{staticClass:"pageblock text"},[e("div",{staticClass:"d-flex align-items-center"},[o.routeCheck?e("span",{staticClass:"increment-no"},[o._v("\n              "+o._s(n+1)+"\n            ")]):o._e(),o._v(" "),e("div",[e("h1",[o._v(o._s(t.translations[o.$i18n.locale].title))]),o._v(" "),o.routeCheck?o._e():e("p",[o._v(o._s(t.translations[o.$i18n.locale].description))]),o._v(" "),t.button_url&&t.translations[o.$i18n.locale].button_text?e("nuxt-link",{attrs:{to:o.localePath(t.button_url)}},[o._v(o._s(t.translations[o.$i18n.locale].button_text))]):o._e()],1)])])])],1)})),1)],1)}),[],!1,null,"fdebb890",null);t.a=component.exports},577:function(o,t,e){var content=e(713);"string"==typeof content&&(content=[[o.i,content,""]]),content.locals&&(o.exports=content.locals);(0,e(25).default)("223d9e6a",content,!0,{sourceMap:!1})},712:function(o,t,e){"use strict";e(577)},713:function(o,t,e){(t=e(24)(!1)).push([o.i,".modal-dialog .confirm-box-body[data-v-01125ff2]{text-align:center}.modal-dialog .confirm-box-header-confirm[data-v-01125ff2]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm[data-v-01125ff2]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-01125ff2]{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-01125ff2]{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-01125ff2]{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-01125ff2]{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-01125ff2]{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer[data-v-01125ff2]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-01125ff2]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-01125ff2]{opacity:.5}.modal-content[data-v-01125ff2]{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header[data-v-01125ff2]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button[data-v-01125ff2]{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button[data-v-01125ff2],.modal-content .white-button[data-v-01125ff2]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button[data-v-01125ff2]{color:#fff;background-color:#363636}.page.home .container[data-v-01125ff2]{margin:0;padding:0}.page.home .container .row[data-v-01125ff2]{margin-bottom:100px}.page.home .block[data-v-01125ff2]{display:flex;align-items:center}.page.home .block.text h1[data-v-01125ff2]{margin:0;padding:0;font-size:40px;font-weight:700;color:#000;text-transform:uppercase}.page.home .block.text p[data-v-01125ff2]{margin:20px 0 0;padding:0;font-size:20px;color:#000}.page.home .block.text a[data-v-01125ff2]{margin-top:30px;display:inline-block;padding:10px 40px;border:1px solid #000;border-radius:30px;text-transform:uppercase;color:#000;font-size:18px;font-weight:700;text-decoration:none}.page.home .block img[data-v-01125ff2]{max-width:90%}@media screen and (max-width:426px){.page.home .block img[data-v-01125ff2]{max-width:100%}}@media screen and (max-width:767px){.page.home .block[data-v-01125ff2]{justify-content:center;text-align:center}.page.home .block.text[data-v-01125ff2]{padding-top:30px}.page.home .block.text h1[data-v-01125ff2]{font-size:30px}.page.home .block.text p[data-v-01125ff2]{font-size:18px}.page.home .block.text a[data-v-01125ff2]{font-size:14px}}",""]),o.exports=t}}]);