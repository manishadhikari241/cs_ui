(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{1167:function(e,t,o){"use strict";o.r(t);o(12),o(9),o(8),o(6),o(10);var n=o(3),r=(o(73),o(22),o(574)),c=o(32),d=o(515);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,o)}return t}var f={middleware:"auth",components:{RequestModal:r.a,DesignList:d.a},data:function(){return{loading:!1,requests:[],selected:{},plan:{selected:0},type:"all",fields:[{key:"design",label:"ITEMS"},{key:"code",label:"CS CODE"},{key:"designer_id",label:"CREATOR"},{key:"actions",label:""}],designs:[],allDesign:[]}},methods:{load:function(){var e=this;this.loading=!0,this.$axios.$get("/requests/exclusive?user_id=&is_hidden=0&scope[]=files&scope[]=designs&scope[]=group").then((function(t){var o;e.loading=!1,e.requests=t.data,e.designs=t.data;var n=[],r=0;t.data.forEach((function(element){element.designs.length?n.push(Object.assign(element.designs[0],{request_id:element.id,request_name:element.name,request_status:element.status})):(n.push({id:"id_".concat(r),code:"code_".concat(r),request_id:element.id,request_name:element.name,request_status:element.status}),r++)})),e.allDesign.push({id:"plus"}),(o=e.allDesign).push.apply(o,n)}))},deleteDesign:function(e){var t=this,o=this.$t("are_you_sure");this.$bvModal.msgBoxConfirm(o,{title:"a",hideHeaderClose:!1,centered:!0,headerClass:"confirm-box-header-confirm",bodyClass:"confirm-box-body-confirm",footerClass:"confirm-box-footer-confirm",okTitle:this.$t("btn_yes"),cancelTitle:this.$t("btn_no"),buttonSize:"sm"}).then((function(o){o&&t.$axios.delete("requests/exclusive/".concat(e,"/delete-reject")).then((function(e){t.$toast.success(e.data.message),t.requests=[],t.designs=[],t.allDesign=[],t.load()}))}))},buy:function(){this.$auth.loggedIn?(this.$bvModal.show("modal-payments"),this.$store.commit("payments/setPackage",{key:"exclusive",index:this.plan.selected})):this.$bvModal.show("modal-auth")},checkQuota:function(){var e=this;this.init.quota.exclusive<=0?this.buy():e.checkAndRedirect(e.localePath("/exclusive/create"))},checkAndRedirect:function(e){this.$auth.loggedIn?this.$router.push(e):this.$bvModal.show("modal-auth")},showInfo:function(e){this.selected=this.requests.find((function(t){return t.id===e})),this.$bvModal.show("modal-request")}},mounted:function(){var e=this;this.$nextTick((function(){e.load()}))},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(c.b)("app",["init"]))},m=(o(840),o(842),o(20)),component=Object(m.a)(f,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"page request-list ignorePrint"},[o("div",{staticClass:"component pageinfo"},[o("div",{staticClass:"pageinfo-head"},[o("h1",{staticClass:"pageinfo-title"},[e._v(e._s(e.$t("your_designs_page")))])]),e._v(" "),o("p",{staticClass:"pageinfo-description-exclusive"},[e._v("\n            "+e._s(e.$t("here_you_can_view"))+"\n        ")]),e._v(" "),o("br"),o("br"),e._v(" "),e.loading?o("div",{staticStyle:{"text-align":"center"}},[o("b-spinner",{attrs:{type:"grow",label:"Loading..."}})],1):e._e(),e._v(" "),e.loading?e._e():o("div",{staticClass:"list"},[o("div",{staticClass:"designs"},[o("client-only",[o("DesignList",{attrs:{"is-exclusive":!0,designs:e.allDesign},on:{showInfo:e.showInfo,deleteDesign:e.deleteDesign,checkQuota:e.checkQuota}})],1)],1)])]),e._v(" "),o("RequestModal",{attrs:{request:e.selected}})],1)}),[],!1,null,"ee1c3cac",null);t.default=component.exports},522:function(e,t,o){var content=o(549);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(25).default)("045d9f02",content,!0,{sourceMap:!1})},548:function(e,t,o){"use strict";o(522)},549:function(e,t,o){(t=o(24)(!1)).push([e.i,".nav-tabs .nav-link{color:#495057;outline:none;border:none;padding:6px 0 0;font-size:25px;margin-right:16px}@media screen and (max-width:768px){.nav-tabs .nav-link{font-size:14px}}.nav-tabs{border:none}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{color:#000;outline:none;font-weight:600;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff;font-size:25px;padding:6px 0 0;margin-right:20px}@media screen and (max-width:768px){.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{font-size:14px}}.modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}#modal-request header,.modal-content .black-button{color:#fff;background-color:#363636}#modal-request header button{color:#fff}#modal-request .modal-title{width:100%;text-align:center;font-weight:700}@media screen and (max-width:768px){#modal-request .modal-title{font-size:18px}}#modal-request .detail{padding:10px 0;border-bottom:1px solid #ddd;font-size:14px;color:#000;display:flex}@media screen and (max-width:768px){#modal-request .detail{font-size:12px}}#modal-request .detail:last-child{border-bottom:none}#modal-request .detail .prop{width:60%;flex-grow:1}@media screen and (max-width:500px){#modal-request .detail .prop{width:30%;margin-right:20px}}#modal-request .detail .value{width:40%;flex-grow:1;word-break:break-word;display:flex;overflow:auto}#modal-request .detail img{max-width:100%}",""]),e.exports=t},574:function(e,t,o){"use strict";var n={props:["request"],data:function(){return{}}},r=(o(548),o(20)),component=Object(r.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("b-modal",{attrs:{id:"modal-request",size:"md",centered:"","hide-footer":""},scopedSlots:e._u([{key:"modal-title",fn:function(){return[o("span",{staticClass:"ml-4"},[e._v(e._s(e.request.name))])]},proxy:!0}])},[e._v(" "),o("b-container",[8==e.request.status?o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v("Reject Message")]),e._v(" "),o("div",{staticClass:"value",staticStyle:{color:"#f30"}},[e._v(e._s(e.request.message))])]):e._e(),e._v(" "),o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v(e._s(e.$t("style_of_design")))]),e._v(" "),o("div",{staticClass:"value"},[e._v(e._s(e.request.style))])]),e._v(" "),e.request.other_style?o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v(e._s(e.$t("other_styles")))]),e._v(" "),o("div",{staticClass:"value"},[e._v(e._s(e.request.other_style))])]):e._e(),e._v(" "),o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v(e._s(e.$t("your_detailed_briefing")))]),e._v(" "),o("div",{staticClass:"value"},[e._v(e._s(e.request.briefing))])]),e._v(" "),e.request.tpx?o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v(e._s(e.$t("color_preferences_tpx")))]),e._v(" "),o("div",{staticClass:"value"},[e._v(e._s(e.request.tpx))])]):e._e(),e._v(" "),e.request.color_limit?o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v(e._s(e.$t("color_limitations_for_printing")))]),e._v(" "),o("div",{staticClass:"value"},[e._v(e._s(e.request.color_limit))])]):e._e(),e._v(" "),o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v(e._s(e.$t("your_product")))]),e._v(" "),o("div",{staticClass:"value"},[e._v(e._s(e.request.product))])]),e._v(" "),o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v(e._s(e.$t("your_customers")))]),e._v(" "),o("div",{staticClass:"value"},[e._v(e._s(e.request.age))])]),e._v(" "),o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v(e._s(e.$t("target_gender")))]),e._v(" "),o("div",{staticClass:"value"},[e._v(e._s(e.request.gender))])]),e._v(" "),o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v(e._s(e.$t("your_market")))]),e._v(" "),o("div",{staticClass:"value"},[e._v(e._s(e.request.country))])]),e._v(" "),o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v(e._s(e.$t("your_business")))]),e._v(" "),o("div",{staticClass:"value"},[e._v(e._s(e.request.business))])]),e._v(" "),o("div",{staticClass:"detail"},[o("div",{staticClass:"prop"},[e._v(e._s(e.$t("reference_file"))+":")]),e._v(" "),e.request&&e.request.files?o("div",{staticClass:"value file",staticStyle:{display:"block"}},e._l(e.request.files,(function(t,n){return o("img",{key:"img_"+n,attrs:{src:"/cloudfront/uploads/user/lib-request/"+e.request.files[n].name}})})),0):e._e()])])],1)],1)}),[],!1,null,null,null);t.a=component.exports},639:function(e,t,o){var content=o(841);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(25).default)("10984fe2",content,!0,{sourceMap:!1})},640:function(e,t,o){var content=o(843);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(25).default)("acccf990",content,!0,{sourceMap:!1})},840:function(e,t,o){"use strict";o(639)},841:function(e,t,o){(t=o(24)(!1)).push([e.i,".nav-tabs .nav-link{color:#495057;outline:none;border:none;padding:6px 0 0;font-size:25px;margin-right:16px}@media screen and (max-width:768px){.nav-tabs .nav-link{font-size:14px}}.nav-tabs{border:none}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{color:#000;outline:none;font-weight:600;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff;font-size:25px;padding:6px 0 0;margin-right:20px}@media screen and (max-width:768px){.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{font-size:14px}}.modal-dialog .confirm-box-body{text-align:center}.modal-dialog .confirm-box-header-confirm{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary{opacity:.5}.modal-content{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button,.modal-content .white-button{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button{color:#fff;background-color:#363636}.page.request-list .socialBox{display:none!important}",""]),e.exports=t},842:function(e,t,o){"use strict";o(640)},843:function(e,t,o){(t=o(24)(!1)).push([e.i,".nav-tabs .nav-link[data-v-ee1c3cac]{color:#495057;outline:none;border:none;padding:6px 0 0;font-size:25px;margin-right:16px}@media screen and (max-width:768px){.nav-tabs .nav-link[data-v-ee1c3cac]{font-size:14px}}.nav-tabs[data-v-ee1c3cac]{border:none}.nav-tabs .nav-item.show .nav-link[data-v-ee1c3cac],.nav-tabs .nav-link.active[data-v-ee1c3cac]{color:#000;outline:none;font-weight:600;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff;font-size:25px;padding:6px 0 0;margin-right:20px}@media screen and (max-width:768px){.nav-tabs .nav-item.show .nav-link[data-v-ee1c3cac],.nav-tabs .nav-link.active[data-v-ee1c3cac]{font-size:14px}}.modal-dialog .confirm-box-body[data-v-ee1c3cac]{text-align:center}.modal-dialog .confirm-box-header-confirm[data-v-ee1c3cac]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff;margin-bottom:-24px;border:none;height:10px;z-index:1}.modal-dialog .confirm-box-body-confirm[data-v-ee1c3cac]{text-align:center;padding-top:40px}.modal-dialog .confirm-box-footer-confirm[data-v-ee1c3cac]{height:93px;padding-bottom:68px;border-top:none;justify-content:center}.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-ee1c3cac]{background-color:#363636;font-size:13px;color:#363636;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#fff;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-secondary[data-v-ee1c3cac]{margin-right:-186px;margin-left:95px}}.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-ee1c3cac]{font-size:13px;color:#fff;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:-163px;background-color:#363636;font-weight:700;margin-right:-163px}@media screen and (max-width:550px){.modal-dialog .confirm-box-footer-confirm .btn-primary[data-v-ee1c3cac]{margin-right:93px;margin-left:-77px}}.modal-dialog .confirm-box-footer[data-v-ee1c3cac]{border-top:none;justify-content:center}.modal-dialog .confirm-box-footer button[data-v-ee1c3cac]{background:#363636;color:#fff;border:none;outline:none}.modal-dialog .confirm-box-footer button.btn-secondary[data-v-ee1c3cac]{opacity:.5}.modal-content[data-v-ee1c3cac]{border:none;box-shadow:10px 9px 5px 0 rgba(54,54,54,.13)}.modal-content confirm-box-body-confirm .modal-header[data-v-ee1c3cac]{margin-left:-1px;margin-top:-1px;background-color:#fff;color:#fff}.modal-content .white-button[data-v-ee1c3cac]{background-color:#363636;color:#363636;background-color:#fff}.modal-content .black-button[data-v-ee1c3cac],.modal-content .white-button[data-v-ee1c3cac]{font-size:13px;border:1px solid #363636;border-radius:30px;padding:5px 45px;margin-left:20px;font-weight:600;margin-right:20px;text-transform:uppercase}.modal-content .black-button[data-v-ee1c3cac]{color:#fff;background-color:#363636}.component.pageinfo .pageinfo-description-exclusive[data-v-ee1c3cac]{max-width:98%;margin:0;padding:0;font-size:20px}.component.pageinfo .pageinfo-description-exclusive a[data-v-ee1c3cac]{color:#000!important;font-weight:700;text-decoration:none;display:inline-block}.component.pageinfo .pageinfo-title[data-v-ee1c3cac]{font-weight:700;font-size:48.2px}.page.request-list .list .request_new[data-v-ee1c3cac]{width:100%;margin-bottom:20px}.page.request-list .list .request[data-v-ee1c3cac],.page.request-list .list .request_new[data-v-ee1c3cac]{display:flex;align-items:center;justify-content:center;position:relative}.page.request-list .list .request[data-v-ee1c3cac]{width:100%;height:287px;width:287px;margin:0 auto}@media screen and (max-width:768px) and (min-width:500px){.page.request-list .list .request[data-v-ee1c3cac]{height:178px;width:178px}}.page.request-list .list .request.empty[data-v-ee1c3cac]{height:0;border:none!important}.page.request-list .list .request[data-v-ee1c3cac]:not(.approved){border:1px solid #ddd}.page.request-list .list .request .icon[data-v-ee1c3cac]{font-size:80px}.page.request-list .list .request .btn-info[data-v-ee1c3cac]{position:absolute;bottom:10px;right:2px;border:none;background:none;color:rgba(0,0,0,.5);transition:color .2s;outline:none;box-shadow:none;z-index:999;font-size:12px}.page.request-list .list .request .btn-info[data-v-ee1c3cac]:hover{color:#363636}.page.request-list .list .request .btn-delete[data-v-ee1c3cac]{position:absolute;top:8px;right:16px;border:none;background:none;color:rgba(0,0,0,.5);transition:color .2s;outline:none;box-shadow:none;z-index:999}.page.request-list .list .request .btn-delete[data-v-ee1c3cac]:hover{color:#363636}.page.request-list .list .request .btn-visit-collection[data-v-ee1c3cac]{position:absolute;bottom:10px;left:10px;border:none;background:none;color:rgba(0,0,0,.5);transition:color .2s;outline:none;box-shadow:none;z-index:999}.page.request-list .list .request .btn-visit-collection[data-v-ee1c3cac]:hover{color:#363636}.page.request-list .list .request img[data-v-ee1c3cac]{width:100%;height:100%}.page.request-list .list .request .name-overlay[data-v-ee1c3cac]{position:absolute;bottom:0;left:0;width:100%;height:50px;background-color:hsla(0,0%,100%,.7);line-height:50px;font-size:16px;font-weight:700;color:#363636;text-align:center}@media screen and (max-width:768px){.page.request-list .list .request .name-overlay[data-v-ee1c3cac]{font-size:14px}}@media screen and (max-width:768px){.component.pageinfo .pageinfo-title[data-v-ee1c3cac]{font-size:30px}.component.pageinfo .pageinfo-description-exclusive[data-v-ee1c3cac]{font-size:16px;max-width:100%}}@media screen and (max-width:768px) and (max-width:768px){.component.pageinfo .pageinfo-description-exclusive[data-v-ee1c3cac]{width:100%!important}}",""]),e.exports=t}}]);